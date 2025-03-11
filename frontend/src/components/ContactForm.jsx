import emailjs from 'emailjs-com';
import { useState } from "react";
import { Link } from 'react-router-dom';
import styles from '../styles/ContactForm.module.css';
import { MdRateReview, MdMail } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

export default function ContactForm({ ownerMail, city, category, info, name }) {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);  // Stato per la checkbox
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Gestori per i cambiamenti nei campi del form
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleMessageChange = (e) => setMessage(e.target.value);
    const handleTermsChange = (e) => setIsTermsAccepted(e.target.checked);  // Gestore per la checkbox

    // Funzione per svuotare un input
    const clearInput = (setField) => {
        setField('');
    };

    // Funzione per resettare tutto il form
    const handleReset = () => {
        setEmail('');
        setMessage('');
        setIsTermsAccepted(false);
        setErrors({});
        setStatusMessage('');
    };

    const validateForm = (formData) => {
        const errors = {};

        if (!formData.user_email.trim()) {
            errors.user_email = 'Email required';
        } else if (!emailPattern.test(formData.user_email)) {
            errors.user_email = 'Please enter a valid email address';
        } else if (formData.user_email.length > 255) {
            errors.user_email = 'Email must be at most 255 characters long';
        }

        if (!formData.message.trim()) {
            errors.message = 'Comments required';
        }

        if (!formData.isTermsAccepted) {  // Controllo sulla checkbox
            errors.isTermsAccepted = 'You must accept the terms and conditions';
        }

        return errors;
    }

    // Funzione per inviare la mail
    const handleSubmit = (e) => {
        e.preventDefault();
        const templateParams = {
            user_email: email,
            message: message,
            to_email: ownerMail,
            owner_name: name,
            apartment_info: info,
            isTermsAccepted: isTermsAccepted  // Aggiungi l'informazione della checkbox
        };
        const newErrors = validateForm(templateParams);
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {

            setIsSubmitting(true);
            // Inviare la mail tramite EmailJS
            emailjs
                .send('service_8ildxuc', 'template_0lntz26', templateParams, 'WYoHdRceyJKxA4E26')
                .then(
                    (result) => {
                        console.log(result.text);

                        console.log('statusMessage after success:', statusMessage);  // Aggiungi un log
                        handleReset();  // Reset del form dopo invio
                        setStatusMessage('Email sent successfully');  // Aggiungi un messaggio di successo
                    },
                    (error) => {
                        console.log(error.text);
                        setStatusMessage('An error occurred. Try again.');
                    }
                )
                .finally(() => {
                    setIsSubmitting(false);
                });

            console.log("Il form è stato inviato con successo!");
        } else {
            console.log("L'invio del modulo non è riuscito a causa di errori di convalida");
        }
    };

    // Funzione per controllare se tutti i campi sono vuoti o non selezionati
    const isFormValid = () => {
        return email.trim() !== '' || message.trim() !== '' || isTermsAccepted;
    };

    return (
        <div className={`container ${styles.contactFormContainer}`}>
            <h2 className="w-100 mb-4 text-start">Send mail for {city}'s {category.name}</h2>
            <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
                <div className="mb-3">
                    <p className="mt-3 text-start">Fields marked with * are required</p>
                    <label htmlFor="email" className="form-label w-100 text-start">Your Email *</label>
                    <div className="input-group">
                        <span className="input-group-text"><MdMail /></span>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Insert your email"
                            required
                            autoComplete="off"
                        />
                        {email && (
                            <span
                                className="input-group-text cursor-pointer"
                                onClick={() => clearInput(setEmail)}
                            >
                                <FaTimes />
                            </span>
                        )}
                    </div>
                    {errors.user_email && (
                        <span className={`error-message ${styles.errorMessage}`}>
                            {errors.user_email}
                        </span>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="message" className="form-label w-100 text-start">Your message *</label>
                    <div className="input-group">
                        <span className="input-group-text"><MdRateReview /></span>
                        <textarea
                            id="message"
                            className="form-control"
                            rows="4"
                            value={message}
                            onChange={handleMessageChange}
                            placeholder="Insert your message"
                            autocomplete="off"
                            required
                        />
                        {message && (
                            <span
                                className="input-group-text cursor-pointer"
                                onClick={() => clearInput(setMessage)}
                            >
                                <FaTimes />
                            </span>
                        )}
                    </div>
                    {errors.message && (
                        <span className={`error-message ${styles.errorMessage}`}>
                            {errors.message}
                        </span>
                    )}
                </div>
                <div className="form-check mb-3 text-start">
                    <input
                        type="checkbox"
                        id="terms"
                        className="form-check-input"
                        checked={isTermsAccepted}
                        onChange={handleTermsChange}
                    />
                    <label htmlFor="terms" className="form-check-label">
                        I accept the <a href='/terms' target="_blank">terms and conditions </a>*
                    </label>
                </div>
                {errors.isTermsAccepted && (
                    <span className={`error-message ${styles.errorMessage}`}>
                        {errors.isTermsAccepted}
                    </span>
                )}
                <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-send" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send'}
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={handleReset}
                        disabled={isSubmitting || !isFormValid()}
                    >
                        Reset
                    </button>
                </div>
            </form>
            {statusMessage && <p className={`mt-3 text-center ${styles.statusMessage}`}>{statusMessage}</p>}
        </div>
    );
}
