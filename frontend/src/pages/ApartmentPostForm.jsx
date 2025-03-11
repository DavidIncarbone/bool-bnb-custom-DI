import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useGlobalContext } from "../contexts/GlobalContext";
import StyleApartmentPostForm from "../styles/ApartmentPostForm.module.css";
import { toast } from 'react-toastify'; // Importa il Toast
import { FaHome, FaCity, FaMapMarkerAlt, FaBed, FaBath, FaRulerCombined, FaBuilding, FaDoorClosed, FaGlobeEurope, FaTimes } from 'react-icons/fa';
import styles from "../styles/ResetButton.module.css";

export default function ApartmentPostForm() {
    const initialNewApartment = {
        category: 0,
        city: "",
        state: "",
        address: "",
        description: "",
        roomsNumber: "",
        bedsNumber: "",
        bathroomsNumber: "",
        squareMeters: "",
        likes: 0
    };


    const [apartmentData, setApartmentData] = useState(initialNewApartment);
    const [apartments, setApartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [slug, setSlug] = useState("");
    const navigate = useNavigate();
    const categoriesAPI = "https://bool-bnb-custom-backend.onrender.com/api/apartments/categories";
    const apartmentsAPI = "https://bool-bnb-custom-backend.onrender.com/api/apartments/";
    const isFormEmpty = Object.values(apartmentData).every(value => value === "" || value == 0);

    useEffect(() => {
        getCategories();
        getApartments();
        if (slug) {
            navigate(`/apartment/${slug}`);
            toast.success("Apartment added succesfully"), {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                rtl: false,
            }
        }
    }, [slug]);

    function handleReset() {
        setApartmentData(
            {
                category: 0,
                city: "",
                state: "",
                address: "",
                description: "",
                roomsNumber: "",
                bedsNumber: "",
                bathroomsNumber: "",
                squareMeters: "",
                likes: 0
            }
        )
    }

    function getCategories() {
        axios
            .get(categoriesAPI)
            .then((res) => {
                setCategories(res.data.items);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                console.log("Chiamata alle categorie effettuata");
            });
    }

    function getApartments() {
        axios
            .get(apartmentsAPI)
            .then((res) => {
                setApartments(res.data.items);
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
            .finally(() => {
                console.log("Chiamata agli appartamenti effettuata");
            });
    }

    function handleInput(event) {
        const { name, value } = event.target;
        setApartmentData({ ...apartmentData, [name]: value });
    }

    const handleFileChange = (event) => {
        setApartmentData({
            ...apartmentData,
            image: event.target.files[0], // Salva il file caricato
        });
    };

    const validateForm = (formData) => {
        const errors = {};

        // Description (Summary Title)
        if (!formData.description.trim()) {
            errors.description = "The `Summary Title` field cannot be empty";
        } else if (formData.description.length < 5) {
            errors.description = "The `Summary Title` field must be at least 5 characters long";
        } else if (formData.description.length > 100) {
            errors.description = "The `Summary Title` field must be to the utmost 100 characters long";
        } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(formData.description)) {
            errors.description = "The `Summary Title` can only contain letters, numbers, commas, periods, and spaces."
        }

        // Address (Full address)
        if (!formData.address.trim()) {
            errors.address = "The `Full address` field cannot be empty";
        } else if (formData.address.length < 5) {
            errors.address = "The `Full Address` field must be at least 5 characters long";
        } else if (formData.address.length > 100) {
            errors.address = "The `Full Address` field must be to the utmost 100 characters long";
        } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(formData.address)) {
            errors.address = "The `Address` can only contain letters, numbers, commas, periods, and spaces."
        }

        // City (Full city)
        if (!formData.city.trim()) {
            errors.city = "The `City` field cannot be empty";
        }
        else if (formData.city.length > 100) {
            errors.city = "The `City` field must be to the utmost 100 characters long";
        } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(formData.city)) {
            errors.city = "The `City` can only contain letters, numbers, commas, periods, and spaces."
        }

        if (!formData.state.trim()) {
            errors.state = "The `State` field cannot be empty";
        }
        else if (formData.state.length > 100) {
            errors.state = "The `State` field must be to the utmost 100 characters long";
        } else if (!/^[a-zA-Z0-9,.'\sàèéìòù]*$/.test(formData.state)) {
            errors.state = "The `State` can only contain letters, numbers, commas, periods, and spaces."
        }

        // Image (Upload Image)
        if (!formData.image) {
            errors.image = "An image must be uploaded";
        } else {
            const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validImageTypes.includes(formData.image.type)) {
                errors.image = "The uploaded file must be an image (JPEG, PNG, JPG)";
            } else if (formData.image.size > 10000000) { // 10 MB in bytes
                errors.image = "The image file must not be larger than 10MB";
            }
        }

        // Rooms, Beds, Bathrooms, and Square Meters
        if (formData.roomsNumber < 1) {
            errors.roomsNumber = "The number of rooms must be at least 1";
        } else if (!Number.isInteger(Number(formData.roomsNumber))) {
            errors.roomsNumber = "only integer numbers are accepted"
        } else if (formData.roomsNumber.startsWith("0")) {
            errors.roomsNumber = "The number of rooms cannot start with 0";
        } else if (formData.roomsNumber.includes('e') || formData.roomsNumber.includes('E')) {
            errors.roomsNumber = 'You must enter a number';
        }
        if (formData.bedsNumber < 1) {
            errors.bedsNumber = "The number of beds must be at least 1";
        } else if (!Number.isInteger(Number(formData.bedsNumber))) {
            errors.bedsNumber = "only integer numbers are accepted"
        } else if (formData.bedsNumber.startsWith("0")) {
            errors.bedsNumber = "The number of beds cannot start with 0";
        } else if (formData.bedsNumber.includes('e') || formData.bedsNumber.includes('E')) {
            errors.bedsNumber = 'You must enter a number';
        }


        if (formData.bathroomsNumber < 1) {
            errors.bathroomsNumber = "The number of bathrooms must be at least 1";
        } else if (!Number.isInteger(Number(formData.bathroomsNumber))) {
            errors.bathroomsNumber = "only integer numbers are accepted"
        } else if (formData.bathroomsNumber.startsWith("0")) {
            errors.bathroomsNumber = "The number of bathrooms cannot start with 0";
        } else if (formData.bathroomsNumber.includes('e') || formData.bathroomsNumber.includes('E')) {
            errors.bathroomsNumber = 'You must enter a number';
        }
        if (formData.squareMeters < 1) {
            errors.squareMeters = "The area must be at least 1 square meter";
        } else if (!Number.isInteger(Number(formData.squareMeters))) {
            errors.squareMeters = "only integer numbers are accepted"
        } else if (formData.squareMeters.startsWith("0")) {
            errors.squareMeters = "The number of square meters cannot start with 0";
        } else if (formData.squareMeters.includes('e') || formData.squareMeters.includes('E')) {
            errors.squareMeters = 'You must enter a number';
        }

        // Category (Property category)
        if (!formData.category || formData.category === '0') {
            errors.category = "A property category must be selected";
        }

        return errors;
    };

    function handleSubmit(event) {
        event.preventDefault();
        const trimmedApartmentData = {
            ...apartmentData,
            description: apartmentData.description.trim(),
            address: apartmentData.address.trim(),
            city: apartmentData.city.trim(),
        };

        const newErrors = validateForm(trimmedApartmentData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const formData = new FormData();
            for (const key in trimmedApartmentData) {
                if (key !== "image") {
                    formData.append(key, trimmedApartmentData[key]);
                }
            }
            if (apartmentData.image) {
                formData.append("file", apartmentData.image); // Assicurati che il nome del campo 'file' corrisponda a quello nel backend
            }
            axios
                .post("https://bool-bnb-custom-backend.onrender.com/api/apartments", formData)
                .then((res) => {
                    setSlug(res.data.slug);
                    setApartmentData(initialNewApartment);

                })
                .catch((err) => {
                    setToastMessage("There was an error submitting your apartment");
                    setToastType("error");
                    setShowToast(true);
                });
        }
    }


    const clearInput = (inputName) => {

        handleInput({ target: { name: inputName, value: "" } });
    };

    return (
        <motion.section
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={StyleApartmentPostForm.formContainer}>
            <div className="container mb-5">
                <form onSubmit={handleSubmit} className="p-4 shadow-lg rounded bg-light" noValidate>
                    <motion.h2
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className=" mb-4">Add a New Property
                    </motion.h2>


                    <div className="mb-3">
                        <div className={`pb-3 ps-2 ${StyleApartmentPostForm.fieldInfo}`}>Fields marked with * are required</div>
                        <label htmlFor="description" className="form-label">Summary Title describing the property *</label>
                        <div className={`pb-1  ${StyleApartmentPostForm.fieldInfo}`}>Min 5 Max 100 characters</div>
                        <div className="input-group">
                            <span className="input-group-text"><FaBuilding /></span>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                className="form-control"
                                value={apartmentData.description}
                                placeholder={"Enter summary title describing the property"}
                                onChange={handleInput}
                                autoComplete="off"
                            />
                            {apartmentData.description && (
                                <span
                                    className="input-group-text cursor-pointer"
                                    onClick={() => { clearInput("description") }}
                                >
                                    <FaTimes />
                                </span>
                            )}

                        </div>
                        {errors.description && (
                            <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                                {errors.description}
                            </span>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Full address *</label>
                        <div className={`pb-1  ${StyleApartmentPostForm.fieldInfo}`}>Min 5 Max 100 characters</div>
                        <div className="input-group">
                            <span className="input-group-text"><FaMapMarkerAlt /></span>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                value={apartmentData.address}
                                placeholder={"Enter full address"}
                                onChange={handleInput}
                                autoComplete="off"
                            />
                            {apartmentData.address && (
                                <span
                                    className="input-group-text cursor-pointer"
                                    onClick={() => { clearInput("address") }}
                                >
                                    <FaTimes />
                                </span>
                            )}

                        </div>
                        {errors.address && (
                            <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                                {errors.address}
                            </span>
                        )}
                    </div>
                    <div className="row">

                        <div className="mb-3 col-md-6">
                            <label htmlFor="city" className="form-label">City *</label>
                            <div className={`pb-1 ${StyleApartmentPostForm.fieldInfo}`}>Max 100 characters</div>
                            <div className="input-group">
                                <span className="input-group-text"><FaCity /></span>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    className="form-control"
                                    value={apartmentData.city}
                                    placeholder={"Enter city"}
                                    onChange={handleInput}
                                    autoComplete="off"
                                />
                                {apartmentData.city && (
                                    <span
                                        className="input-group-text cursor-pointer"
                                        onClick={() => { clearInput("city") }}
                                    >
                                        <FaTimes />
                                    </span>
                                )}

                            </div>
                            {errors.city && (
                                <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                                    {errors.city}
                                </span>
                            )}
                        </div>


                        <div className="mb-3 col-md-6">
                            <label htmlFor="state" className="form-label">State *</label>
                            <div className={`pb-1 ${StyleApartmentPostForm.fieldInfo}`}>Max 100 characters</div>
                            <div className="input-group">
                                <span className="input-group-text"><FaGlobeEurope /></span>
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    className="form-control"
                                    value={apartmentData.state}
                                    placeholder={"Enter state"}
                                    onChange={handleInput}
                                    autoComplete="off"
                                />
                                {apartmentData.state && (
                                    <span
                                        className="input-group-text cursor-pointer"
                                        onClick={() => { clearInput("state") }}
                                    >
                                        <FaTimes />
                                    </span>
                                )}

                            </div>
                            {errors.state && (
                                <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                                    {errors.state}
                                </span>
                            )}
                        </div>

                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload an Image *</label>
                        <div className={`pb-1 ps-2 ${StyleApartmentPostForm.fieldInfo}`}>The uploaded file must be an image (JPEG, PNG, JPG), max-size 10MB</div>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="form-control"
                            onChange={handleFileChange}

                            accept="image/jpg, image/png, image/jpeg"
                        />

                        {errors.image && (
                            <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                                {errors.image}
                            </span>
                        )}
                    </div>

                    <div className="row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="roomsNumber" className="form-label">Number of rooms *</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaDoorClosed /></span>
                                <input
                                    type="number"
                                    id="roomsNumber"
                                    name="roomsNumber"
                                    className="form-control"
                                    value={apartmentData.roomsNumber}
                                    placeholder="Enter number of rooms"
                                    onChange={handleInput}
                                    autoComplete="off"

                                />
                                {apartmentData.roomsNumber && (
                                    <span
                                        className="input-group-text cursor-pointer"
                                        onClick={() => { clearInput("roomsNumber") }}
                                    >
                                        <FaTimes />
                                    </span>
                                )}

                            </div>
                            {errors.roomsNumber && (
                                <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                                    {errors.roomsNumber}
                                </span>
                            )}
                        </div>

                        <div className="col-md-3 mb-3">
                            <label htmlFor="bedsNumber" className="form-label">Number of beds *</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaBed /></span>
                                <input
                                    type="number"
                                    id="bedsNumber"
                                    name="bedsNumber"
                                    className="form-control"
                                    value={apartmentData.bedsNumber}
                                    placeholder="Enter number of beds"
                                    onChange={handleInput}
                                    autoComplete="off"

                                />
                                {apartmentData.bedsNumber && (
                                    <span
                                        className="input-group-text cursor-pointer"
                                        onClick={() => { clearInput("bedsNumber") }}
                                    >
                                        <FaTimes />
                                    </span>
                                )}

                            </div>
                            {errors.bedsNumber && (
                                <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                                    {errors.bedsNumber}
                                </span>
                            )}
                        </div>

                        <div className="col-md-3 mb-3">
                            <label htmlFor="bathroomsNumber" className="form-label">Number of bath<span className="d-inline d-md-none d-lg-inline">rooms</span>: *</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaBath /></span>
                                <input
                                    type="number"
                                    id="bathroomsNumber"
                                    name="bathroomsNumber"
                                    className="form-control"
                                    value={apartmentData.bathroomsNumber}
                                    placeholder="Enter number of bathrooms"
                                    onChange={handleInput}
                                    autoComplete="off"
                                />
                                {apartmentData.bathroomsNumber && (
                                    <span
                                        className="input-group-text cursor-pointer"
                                        onClick={() => { clearInput("bathroomsNumber") }}
                                    >
                                        <FaTimes />
                                    </span>
                                )}

                            </div>
                            {errors.bathroomsNumber && (
                                <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                                    {errors.bathroomsNumber}
                                </span>
                            )}
                        </div>

                        <div className="col-md-3 mb-3">
                            <label htmlFor="squareMeters" className="form-label">Square meters *</label>
                            <div className="input-group">
                                <span className="input-group-text"><FaRulerCombined /></span>
                                <input
                                    type="number"
                                    id="squareMeters"
                                    name="squareMeters"
                                    className="form-control"
                                    value={apartmentData.squareMeters}
                                    placeholder="Enter square meters"
                                    onChange={handleInput}
                                    autoComplete="off"
                                />
                                {apartmentData.squareMeters && (
                                    <span
                                        className="input-group-text cursor-pointer"
                                        onClick={() => { clearInput("squareMeters") }}
                                    >
                                        <FaTimes />
                                    </span>
                                )}

                            </div>
                            {errors.squareMeters && (
                                <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                                    {errors.squareMeters}
                                </span>
                            )}
                        </div>

                    </div>
                    <label htmlFor="category" className="form-label">Property category *</label>
                    <div className=" input-group">
                        <span className="input-group-text"><FaHome /></span>
                        <select
                            id="category"
                            name="category"
                            className="form-select"
                            value={apartmentData.category}
                            onChange={handleInput}
                        >

                            <option value={0}>Select apartment category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}

                        </select>
                        {apartmentData.category != 0 && (
                            <span
                                className="input-group-text cursor-pointer"
                                onClick={() => { clearInput("category") }}
                            >
                                <FaTimes />
                            </span>
                        )}

                    </div>
                    {errors.category && (
                        <span className={`error-message ${StyleApartmentPostForm.errorMessage}`}>
                            {errors.category}
                        </span>
                    )}

                    <button type="submit" className="btn btn-send w-100 mt-3">Add apartment</button>
                    <button

                        type="button" className={`btn w-100 mt-3 ${styles.btnReset}`} onClick={handleReset} disabled={isFormEmpty} > Reset</button >
                </form>
            </div>
        </motion.section>
    );
}
