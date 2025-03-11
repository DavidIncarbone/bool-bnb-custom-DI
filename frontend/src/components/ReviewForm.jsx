import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdContact } from "react-icons/io";
import { MdRateReview } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { PiListNumbersFill } from "react-icons/pi";
import { FaStar, FaTimes } from "react-icons/fa";
import axios from "axios";
import FormStyle from "../styles/ReviewForm.module.css";

import stylesReset from "../styles/ResetButton.module.css";
import StyleApartmentPostForm from "../styles/ApartmentPostForm.module.css";



function ReviewForm({ submit, formData, setFormData, onChange, onHandleStarHover, onHandleStarClick, onHandleInput, setHoverVote, hoverVote, errors }) {

    const isFormEmpty = Object.values(formData).every(value => value === "" || value == 0);
    const isVoteEmpty = formData.vote === 0;


    const clearInput = (inputName) => {

        onChange({ target: { name: inputName, value: "" } });
    };

    function handleReset() {
        setFormData(
            {
                text: "",
                name: "",
                entryDate: "",
                daysOfStay: "",
                vote: 0
            }
        )
    }

    // mi creo una variabile di controllo per verificare se la data inserite è al massimo miore o uguale a quella odierna
    const today = new Date().toISOString().split("T")[0];

    return (
        <form id="reviewForm" className="container m-auto py-1" onSubmit={submit} noValidate>
            <p className="mt-3">Fields marked with * are required</p>
            <label htmlFor="name">Name *</label>
            <div className={`pb-1  ${StyleApartmentPostForm.fieldInfo}`}>Min 2 Max 50 characters</div>
            <div className="input-group">
                <span className="input-group-text"><IoMdContact /></span>
                <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={onHandleInput} autoComplete="off" />
                {formData.name && (
                    <span
                        className="input-group-text cursor-pointer"
                        onClick={() => { clearInput("name") }}
                    >
                        <FaTimes />
                    </span>
                )}
            </div>
            <p>{errors.name && <span className={`error-message  mb-3 ${FormStyle.errorMessage}`}>{errors.name}</span>}</p>

            <label htmlFor="text">Comment *</label>
            <div className={`pb-1  ${StyleApartmentPostForm.fieldInfo}`}> Max 255 characters</div>
            <div className="input-group">
                <span className="input-group-text"><MdRateReview /></span>
                <textarea className="form-control" id="text" name="text" rows="3" placeholder="Enter your comment" value={formData.text} onChange={onHandleInput}></textarea>
                {formData.text && (
                    <span
                        className="input-group-text cursor-pointer"
                        onClick={() => { clearInput("text") }}
                    >
                        <FaTimes />
                    </span>
                )}
            </div>
            <p>{errors.text && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.text}</span>}</p>

            <label htmlFor="entryDate">Entry date *</label>
            <div className="input-group">
                <span className="input-group-text"><BsCalendarDateFill /></span>
                <input type="date" className="form-control" id="entryDate" name="entryDate" value={formData.entryDate} onChange={onHandleInput} max={today} />
                {formData.entryDate && (
                    <span
                        className="input-group-text cursor-pointer"
                        onClick={() => { clearInput("entryDate") }}
                    >
                        <FaTimes />
                    </span>
                )}
            </div>
            <p>{errors.entryDate && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.entryDate}</span>}</p>

            <label htmlFor="daysOfStay">Days of stay *</label>
            <div className="input-group">
                <span className="input-group-text"><PiListNumbersFill /></span>
                <input type="number" className="form-control" id="daysOfStay" name="daysOfStay" placeholder="Insert days of stay" value={formData.daysOfStay} onChange={onHandleInput} />
                {formData.daysOfStay && (
                    <span
                        className="input-group-text cursor-pointer"
                        onClick={() => { clearInput("daysOfStay") }}
                    >
                        <FaTimes />
                    </span>
                )}
            </div>
            <p>{errors.daysOfStay && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.daysOfStay}</span>}</p>

            <label>Vote *</label>
            <div className="input-group ">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        size={30}
                        onClick={() => onHandleStarClick(star)}
                        onMouseEnter={() => onHandleStarHover(star)}
                        onMouseLeave={() => setHoverVote(0)}
                        color={star <= (hoverVote || formData.vote) ? "#C6A664" : "gray"}
                        style={{ cursor: "pointer", marginRight: "5px" }}
                    />
                ))}
            </div>

            <p>{errors.vote && <span className={`error-message ${FormStyle.errorMessage}`}>{errors.vote}</span>}</p>
            <div className="mt-5">

                <button type="submit" className="btn btn-send">Add comment</button>
                <button
                    type="button"
                    className={`btn ms-2 ${stylesReset.btnReset}`}
                    onClick={handleReset}
                    disabled={isFormEmpty}
                >
                    Reset
                </button>
            </div>

        </form>
    );
}

export default ReviewForm;