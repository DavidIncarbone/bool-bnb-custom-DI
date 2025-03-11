import multer from "multer";
import path from "path";
import fs from "fs";
function RandomNum() {
    return Math.floor(Math.random() * (5 - 1 + 1)) + 1;
}

// FUNZIONI PER L'UPLOAD DI IMMAGINI

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'public/img';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir); // Directory dove salvare i file
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname); // Estensione del file
        const fileName = Date.now() + fileExtension; // Usa un timestamp per il nome del file
        cb(null, fileName); // Nome del file finale
    }
});

// console.log(storage)


const upload = multer({

    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limite di 10MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb('Error: Only image files are allowed!');
        }
    }
});

const formattingSlug = (string) => {
    return string
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .replace(/\.\s/g, '.')
};

export { RandomNum, upload, formattingSlug };

