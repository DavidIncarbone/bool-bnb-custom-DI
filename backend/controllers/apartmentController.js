import connection from "../connection.js";
import { RandomNum } from "../utilities/functions.js";
import { upload, formattingSlug } from "../utilities/functions.js";


function index(req, res) {
    let { search, category, minRooms, minBeds, page } = req.query;

    console.log("Query parameters:", req.query);

    search = search ? `%${search.trim()}%` : '%';
    category = category ? category : '0';
    minRooms = minRooms ? minRooms : '0';
    minBeds = minBeds ? minBeds : '0';
    page = page && page !== "0" ? parseInt(page) : 1;
    const limit = 8;
    const offset = limit * (page - 1);

    const sqlCount = `
         SELECT COUNT(*) AS count 
        FROM apartments
    WHERE
        (address LIKE ? OR city LIKE ?)
    AND(rooms_number >= ?)
    AND(beds_number >= ?)
    AND(id_category = ? OR ? = '0')
    
    `;

    connection.query(sqlCount, [search, search, minRooms, minBeds, category, category], (err, resultss) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        console.log(resultss[0])
        const count = resultss[0].count;

        const sql = `
        SELECT apartments.*, categories.name AS category_name, owners.email
        FROM apartments
        JOIN categories ON apartments.id_category = categories.id
        JOIN owners ON apartments.id_owner = owners.id 
    WHERE
        (address LIKE ? OR city LIKE ?)
    AND(rooms_number >= ?)
    AND(beds_number >= ?)
    AND(id_category = ? OR ? = '0')
     LIMIT ? OFFSET ?
        `
        // console.log("Query eseguita:", sql); // Per debug
        connection.query(sql, [search, search, minRooms, minBeds, category, category, limit, offset], (err, results) => {
            if (err) return res.status(500).json({ error: 'Errore del server', details: err });
            const response = {
                status: "success",
                count,
                items: results,
                limit
            }
            // console.log(response)
            res.json(response);
        })
    })
}

function indexMostLovedHomePage(req, res) {

    const limit = 5;

    const sql = `SELECT apartments.* 
    FROM apartments 
    ORDER BY likes DESC
    LIMIT ?`;

    connection.query(sql, [limit], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        console.log(results[0])

        const response = {
            success: true,
            count: results.length,
            items: results
        };

        res.json(response);
    });

}
function indexMostVisitedCityHomePage(req, res) {

    const limit = 10;

    const sql = `WITH city_counts AS (
    SELECT city, COUNT(*) AS city_count
    FROM apartments
    GROUP BY city
    ORDER BY city_count DESC
    LIMIT ?
)
SELECT a.*, c.city_count
FROM apartments a
JOIN city_counts c ON a.city = c.city
WHERE a.id IN (
    SELECT MIN(id)
    FROM apartments
    WHERE city = a.city
    GROUP BY city
);`;

    connection.query(sql, [limit], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        console.log(results[0])

        const response = {
            success: true,
            count: results.length,
            items: results
        };

        res.json(response);
    });

}

function indexLastTimeChanceHomePage(req, res) {

    const limit = 6;
    const sql = `
        SELECT * FROM apartments
        ORDER BY RAND()
        LIMIT ?;
    `;

    connection.query(sql, [limit], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });

        res.json({
            success: true,
            count: results.length,
            items: results
        });
    });
}

function indexCategoriesHomePage(req, res) {
    const sql = `
        SELECT a.*, c.name
FROM apartments a
JOIN categories c ON a.id_category = c.id
WHERE a.id IN (
    SELECT MIN(id)
    FROM apartments
    GROUP BY id_category
);
    `;

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });

        res.json({
            success: true,
            count: results.length,
            items: results
        });
    });
}

function indexCategories(req, res) {
    const sql = `SELECT * FROM categories;`

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        const response = {
            success: true,
            count: results.length,
            items: results
        }

        res.json(response);
    })
}

function show(req, res) {
    const slug = req.params.slug
    const limit = parseInt(req.query.limitReviews) + 1 || 3;

    const sql = `SELECT apartments.*, owners.email,owners.name, owners.surname FROM apartments
    JOIN owners ON apartments.id_owner = owners.id
    WHERE apartments.slug = ?`
    connection.query(sql, [slug], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore del server', details: err });
        if (results.length == 0) return res.status(404).json({ error: 'Appartamento non trovato', err });
        const item = results[0];

        if (item.slug == null) return res.status(404).json({ error: 'Appartamento non trovato', err });
        const sqlreviews = "SELECT * FROM `reviews` WHERE `apartment_slug` = ? ORDER BY update_date DESC LIMIT ?";
        connection.query(sqlreviews, [item.slug, limit], (err, reviews) => {
            if (err) return res.status(500).json({ error: "Error server", err });

            item.reviews = reviews;

            reviews.forEach((review) => {
                const tempString = JSON.stringify(review.entry_date);
                review.entry_date = tempString.slice(1, 11);
            });

            let response = {
                status: "success",
                item

            }

            const sqlReviewLenght = "SELECT * FROM `reviews` WHERE `apartment_slug` = ?";
            connection.query(sqlReviewLenght, [item.slug], (err, reviews) => {
                if (err) return res.status(500).json({ error: "Error server", err });
                response = {
                    ...response,
                    reviewsCount: reviews.length,

                }
                res.json(response)
            });
        })
    })
}

function store(req, res) {
    const errors = {};


    // Controllo se c'è un file
    if (!req.file) {
        errors.image = 'No file uploaded';
    } else {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!validImageTypes.includes(req.file.mimetype)) {
            errors.image = 'The uploaded file must be an image (JPEG, PNG, JPG)';
        } else if (req.file.size > 10000000) { // 10 MB in bytes
            errors.image = 'The image file must not be larger than 10MB';
        }
    }

    // Validazione descrizione
    let { description, address, city, state, category, roomsNumber, bedsNumber, bathroomsNumber, squareMeters } = req.body;


    if (!description.trim()) {
        errors.description = "The `Summary Title` field cannot be empty";
    } else if (description.length < 5) {
        errors.description = "The `Summary Title` field must be at least 5 characters long";
    } else if (description.length > 100) {
        errors.description = "The `Summary Title` field must be at most 100 characters long";
    } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(description)) {
        errors.description = "The `Summary Title` can only contain letters, numbers, commas, periods, and spaces.";
    }

    // Validazione indirizzo
    if (!address.trim()) {
        errors.address = "The `Full address` field cannot be empty";
    } else if (address.length < 5) {
        errors.address = "The `Full address` field must be at least 5 characters long";
    } else if (address.length > 100) {
        errors.address = "The `Full address` field must be at most 100 characters long";
    } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(address)) {
        errors.address = "The `Address` can only contain letters, numbers, commas, periods, and spaces.";
    }

    // Validazione città
    if (!city.trim()) {
        errors.city = "The `State` field cannot be empty";
    } else if (city.length > 100) {
        errors.city = "The `State` field must be at most 100 characters long";
    } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(city)) {
        errors.city = "The `State` can only contain letters, numbers, commas, periods, and spaces.";
    }

    if (!state.trim()) {
        errors.state = "The `City` field cannot be empty";
    } else if (state.length > 100) {
        errors.state = "The `City` field must be at most 100 characters long";
    } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(state)) {
        errors.state = "The `City` can only contain letters, numbers, commas, periods, and spaces.";
    }

    // Validazione campi numerici
    const validateNumber = (field, value) => {
        if (value < 1 || !Number.isInteger(Number(value)) || value.startsWith("0") || value.includes('e') || value.includes('E')) {
            errors[field] = `The number of ${field} must be a positive integer and cannot start with 0 or contain "e".`;
        }
    };

    validateNumber("rooms", roomsNumber);
    validateNumber("beds", bedsNumber);
    validateNumber("bathrooms", bathroomsNumber);
    validateNumber("square meters", squareMeters);

    // Validazione categoria
    if (!category || category < 1 || !Number.isInteger(Number(category)) || category.startsWith("0") || category.includes('e') || category.includes('E') || category > 6) {
        errors.category = "Invalid category field";
    }

    // Se ci sono errori, restituisci la lista degli errori
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    // Se non ci sono errori, continua con l'inserimento nel database
    const { path } = req.file;
    const imageUrl = `${path.slice(11)}`;
    let likes = req.body.likes || 0;
    let slug = [
        formattingSlug(description),
        formattingSlug(state),
        formattingSlug(city),
        formattingSlug(address),
        formattingSlug(category)
    ].join('-');

    console.log(slug)


    // Query per inserire nel database
    const sql = `INSERT INTO apartments (id_owner, id_category, description, address, city, state, rooms_number, beds_number, bathrooms_number, square_meters, img, likes, slug)
                VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [
        RandomNum(),
        category,
        description,
        address,
        city,
        state,
        roomsNumber,
        bedsNumber,
        bathroomsNumber,
        squareMeters,
        imageUrl,
        likes,
        slug

    ], (err, results) => {
        if (err) {
            console.error('Errore durante il salvataggio nel database:', err);
            return res.status(500).json({ error: 'Errore nel salvataggio nel database', err });
        }

        res.status(200).json({
            message: 'Apartment added successfully',
            id: results.insertId,
            file: req.file,
            imageUrl: imageUrl,
            slug
        });
    });
}


function storereviews(req, res) {
    const { slug } = req.params;
    console.log(slug)
    const { text, name, entryDate, daysOfStay, vote } = req.body;
    const errors = {};

    // Validazione name
    if (!name.trim()) {
        errors.name = 'Name required';
    } else if (name.length < 2) {
        errors.name = 'The name must contain at least 2 characters';
    } else if (name.length > 50) {
        errors.name = 'The name must contain at most 50 characters';
    }

    // Validazione text
    if (!text.trim()) {
        errors.text = 'Comments required';
    } else if (text.length > 255) {
        errors.text = 'The comment must contain at most 255 characters';
    }

    // Validazione vote
    if (!vote) {
        errors.vote = 'Vote required';
    } else if (!Number.isInteger(Number(vote)) || vote < 1 || vote > 5) {
        errors.text = 'Invalid field for vote (min 1 max 5)';
    }

    // Validazione entryDate
    const today = new Date();
    const minDate = new Date('2000-01-01'); // Esempio di data minima

    // Controlla se l'input è vuoto
    if (!entryDate) {
        errors.entryDate = 'Entry date required';
    } else {
        // Verifica che l'input sia nel formato YYYY-MM-DD
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(entryDate)) {
            errors.entryDate = 'The entry date must be in the format YYYY-MM-DD';
        } else {
            const enteredDate = new Date(entryDate);

            // Verifica se la data è valida
            if (isNaN(enteredDate.getTime()) || enteredDate.toString() === "Invalid Date") {
                errors.entryDate = 'The entry date must be a valid date';
            } else if (enteredDate > today) {
                errors.entryDate = 'entryDate You cannot enter a future date';
            } else if (enteredDate < minDate) {
                errors.entryDate = 'entryDate The date is too old';
            }
        }
    }



    // Validazione daysOfStay
    if (!daysOfStay) {
        errors.daysOfStay = 'Days of stay required';
    } else if (daysOfStay < 1) {
        errors.daysOfStay = 'Days of stay must be at least 1';
    } else if (daysOfStay.toString().includes('e') || daysOfStay.toString().includes('E')) {
        errors.daysOfStay = 'daysOfStay You must enter a number';
    } else if (!Number.isInteger(Number(daysOfStay)) || daysOfStay.startsWith("0")) {
        errors.text = 'daysOfStay Only integer numbers are accepted ';
    }

    // Se ci sono errori, restituisci gli errori
    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ success: false, errors });
    }

    // Se non ci sono errori, inserisci i dati nel database
    const sql = `INSERT INTO bool_bnb.reviews (apartment_slug, text, name, entry_date, days_of_stay, vote)
                 VALUES (?, ?, ?, ?, ?, ?)`;

    connection.query(sql, [slug, text, name, entryDate, daysOfStay, vote], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Review added", results });
    });
}


function modify(req, res) {
    const { slug } = req.params;
    const likeCountSql = `SELECT apartments.likes FROM apartments
    WHERE apartments.slug = ?`;

    connection.query(likeCountSql, [slug], (err, results) => {
        if (err) return results.status(500).json({ error: err });


        let like = results[0].likes;
        (like === 0 || like === "undefined" || like === null) ? 0 : like = +(like) + 1;

        const sql = `UPDATE bool_bnb.apartments SET likes = ? WHERE (apartments.slug = ?)`;
        connection.query(sql, [like, slug], (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({
                success: true,
                message: "Likes incrementato correttamente",
                result,
                likes: like
            });
        })
    })
}

export { index, indexCategories, indexMostLovedHomePage, indexMostVisitedCityHomePage, indexLastTimeChanceHomePage, indexCategoriesHomePage, show, storereviews, store, upload, modify };
