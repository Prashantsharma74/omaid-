import React, { useState } from "react";
import Swal from "sweetalert2";

const AddFitezoneCategory = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!title.trim()) {
      formErrors.title = "Title is required.";
    }

    if (!description.trim()) {
      formErrors.description = "Duration is required.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Category Added",
      text: "Your category has been successfully submitted!",
      confirmButtonText: "Okay",
      customClass: {
        confirmButton: "btn btn-primary",
      },
      buttonsStyling: false,
    });

    const formData = {
      title,
      description,
    };

    console.log("Form data:", formData);

    // Reset form
    setTitle("");
    setDescription("");
    setErrors({});
    onClose();
  };

  return (
    <>
      <div
        className="case-status d-flex justify-content-between align-items-center"
        style={{
          backgroundColor: "#002538",
          color: "#fff",
          height: "50px",
          borderRadius: "10px 10px 0px 0px",
          padding: "0 15px",
          width: "100%",
        }}
      >
        <h4 className="mt-2">Add Category</h4>
        <button className="cross-button" aria-label="Close" onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </button>
      </div>
      <div className="tile-body p-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 w-100">
            <label className="form-label">Title</label>
            <input
              className={`form-control ${errors.title ? "is-invalid" : ""}`}
              type="text"
              placeholder="Enter Title Here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <div className="invalid-feedback">{errors.title}</div>
            )}
          </div>

          <div className="mb-3 w-100">
            <label className="form-label">Duration</label>
            <input
              className={`form-control ${errors.description ? "is-invalid" : ""}`}
              placeholder="Enter Duration"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
          </div>

          <div className="mb-3 text-center mt-3">
            <button className="btn custom-btn text-white w-25" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddFitezoneCategory;
