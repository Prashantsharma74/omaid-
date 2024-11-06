import React, { useEffect, useState } from "react";
import "dropify/dist/css/dropify.css";
import $ from "jquery";
import "dropify";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Initialize Dropify
    $(".dropify").dropify();
  }, []);

  useEffect(() => {
    if (location.state?.row) {
      setFormData({
        title: location.state.row.title || "",
        description: location.state.row.description || "",
        file: location.state.row.file || null,
      });
      setIsEditMode(true);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};

    if (!formData.title) formErrors.title = "Title is required.";
    if (!formData.description)
      formErrors.description = "Description is required.";
    if (!formData.file) formErrors.file = "An icon is required.";

    if (formData.file) {
      const file = formData.file[0];
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        formErrors.file =
          "Invalid file type. Allowed types are JPG, PNG, GIF, and WEBP.";
      }
      if (file.size > 6 * 1024 * 1024) {
        formErrors.file = "File size is too large. Maximum size is 6MB.";
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log("Form data submitted successfully:", formData);
      setErrors({});

      // SweetAlert Success Message
      Swal.fire({
        title: "Success!",
        text: "Your form has been submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Clear form data after successful submission
      setFormData({
        title: "",
        description: "",
        file: null,
      });

      // Clear the Dropify input
      const dropifyElement = $(".dropify").dropify();
      dropifyElement.data("dropify").resetPreview(); // Clears preview
      dropifyElement.data("dropify").clearElement(); // Clears the file input
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prev) => ({
      ...prev,
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

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4">&nbsp; Add Category</span>
          </h1>
        </div>
      </div>
      <button
        className="btn mb-2 ms-2"
        style={{ backgroundColor: "#002538", color: "white" }}
        type="button"
        onClick={() => window.history.back()}
      >
        <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i>{" "}
        &nbsp;Previous
      </button>

      <div className="row">
        <div className="col-md-10 px-5 w-100 d-flex align-items-center justify-content-center">
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
              <h4 className="mt-2">Add Category</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Title Here"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                    {errors.title && (
                      <small className="text-danger">{errors.title}</small>
                    )}
                  </div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Description</label>
                    <textarea
                      rows={6}
                      className="form-control"
                      placeholder="Enter description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    ></textarea>
                    {errors.description && (
                      <small className="text-danger">
                        {errors.description}
                      </small>
                    )}
                  </div>
                </div>

                <div className="form-group mb-0">
                  <label className="form-label">Upload Icon</label>
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
                    Maximum Icon Size: Up to 6MB per upload
                  </small>
                </div>

                <div className="mb-3 text-center mt-3">
                  <button
                    className="btn custom-btn text-white w-50"
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

export default AddCategory;
