import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "dropify/dist/css/dropify.css";
import $ from "jquery";
import "dropify";
import Swal from "sweetalert2";

const AddFitzone = () => {
  const location = useLocation(); // Get location
  const [isAlert, setIsAlert] = useState(false);

  // Initialize state for input fields
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Initialize Dropify
    $(".dropify").dropify();

    // Pre-fill the form if redirected with data for editing
    if (location.state && location.state.row) {
      const { name, description } = location.state.row;
      setFormData({ name, description, file: null });
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Field validation
    const formErrors = {};
    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.description) formErrors.description = "Description is required.";
    if (!formData.file) formErrors.file = "File upload is required.";

    if (formData.file) {
      const file = formData.file[0];
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        formErrors.file = "Invalid file type. Allowed types are JPG, PNG, GIF, and WEBP.";
      }
      if (file.size > 6 * 1024 * 1024) {
        formErrors.file = "File size is too large. Maximum size is 6MB.";
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("Form data submitted successfully:", formData);

      Swal.fire({
        title: "Success!",
        text: "Fitzone added successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form and Dropify after submission
      setFormData({ name: "", description: "", file: null });
      const dropifyElement = $(".dropify").dropify();
      dropifyElement.data("dropify").resetPreview();
      dropifyElement.data("dropify").clearElement();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      file: files,
    }));

    if (files.length > 0) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.file;
        return newErrors;
      });
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4">&nbsp; Add Fitzone</span>
          </h1>
        </div>
      </div>
      <div
        className="d-flex"
        style={{ alignItems: "center", justifyContent: "space-between" }}
      >
        <button
          className="btn mb-2 ms-2"
          style={{
            backgroundColor: "#002538",
            color: "white",
          }}
          type="button"
          onClick={handleBack}
        >
          <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i>{" "}
          &nbsp;Previous
        </button>
      </div>
      <div className="row">
        <div
          className="col-md-10 w-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="tile w-75">
            <div
              className="case-status d-flex justify-content-center text-align-center"
              style={{
                backgroundColor: "#002538",
                color: "#fff",
                height: "50px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h4 className="mt-2">Add Fitzone</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 col-md-6 w-100">
                  <label className="form-label">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Program Title"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <small className="text-danger">{errors.name}</small>
                  )}
                </div>

                <div className="mb-3 col-md-6 w-100">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={6}
                    className="form-control"
                    placeholder="Enter Program Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                  {errors.description && (
                    <small className="text-danger">{errors.description}</small>
                  )}
                </div>

                <div className="form-group mb-0 pb-0">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="dropify"
                    data-height="100"
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
                    onChange={handleFileChange}
                  />
                  {errors.file && (
                    <small className="text-danger">{errors.file}</small>
                  )}
                  <small className="form-text text-muted upload-info mt-2 mb-2">
                    Maximum Image Size: Up to 6MB per upload
                  </small>
                </div>

                <div className="mb-3 col-lg-12 text-center mt-3">
                  <button
                    className="btn custom-btn text-white"
                    type="submit"
                  >
                    <i className="fa-thin fa-paper-plane"></i> &nbsp; Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddFitzone;
