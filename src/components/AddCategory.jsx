import React, { useEffect, useState } from "react";
import "dropify/dist/css/dropify.css";
import $ from "jquery";
import "dropify";
import { useLocation } from "react-router-dom";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });
  const [errors, setErrors] = useState({});
  const [isAlert, setIsAlert] = useState(false);
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);

  // Initialize Dropify for file upload
  useEffect(() => {
    $(".dropify").dropify();
  }, []);

  // Check if editing existing category
  useEffect(() => {
    if (location.state?.row) {
      setFormData({
        title: location.state.row.title || "",
        description: location.state.row.description || "",
        file: location.state.row.file || null, // Assuming you have a file property
      });
      setIsEditMode(true);
    }
  }, [location.state]);

  // Modify form submission to validate file upload
  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {};

    // Validate Title
    if (!formData.title) {
      formErrors.title = "Title is required.";
    }

    // Validate Description
    if (!formData.description) {
      formErrors.description = "Description is required.";
    }

    // Validate File Upload
    if (!formData.file || formData.file.length === 0) {
      formErrors.file = "An icon is required.";
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const file = formData.file[0]; // Get the first file
      if (!validTypes.includes(file.type)) {
        formErrors.file =
          "Invalid file type. Allowed types are JPG, PNG, GIF, and WEBP.";
      }
      if (file.size > 6 * 1024 * 1024) {
        // 6MB limit
        formErrors.file = "File size is too large. Maximum size is 6MB.";
      }
    }

    // If there are errors, set the error state and do not submit
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // If no errors, proceed with form submission (e.g., API call)
    console.log("Form data submitted successfully:", formData);
    setErrors({}); // Clear errors on successful submission
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // File change handler
  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prev) => ({
      ...prev,
      file: files, // Update file state
    }));

    // Reset file error if the user selects a file
    if (files.length > 0) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.file; // Clear any previous file error
        return newErrors;
      });
    }
  };

  // Handle back button
  const handleBack = () => {
    window.history.back();
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
        onClick={handleBack}
      >
        <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i>{" "}
        &nbsp;Previous
      </button>

      <div className="row">
        <div
          className="col-md-10 px-5 w-100"
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
              <h4 className="mt-2">Add Category</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100">
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
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100">
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

                <div className="form-group mb-0 pb-0">
                  <label className="form-label">Upload Icon</label>
                  <input
                    name="pdf_file[]"
                    type="file"
                    className="dropify"
                    data-height="100"
                    required
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
                    onChange={handleFileChange} // Call file change handler
                  />
                  {errors.file && (
                    <small className="text-danger">{errors.file}</small>
                  )}{" "}
                  {/* Display file error */}
                  <small className="form-text text-muted upload-info mt-2 mb-2">
                    Maximum Icon Size: Up to 6MB per upload
                  </small>
                </div>

                <div className="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-12 text-center mt-3">
                  <button
                    className="btn custom-btn text-white w-50"
                    type="submit"
                    disabled={Object.keys(errors).length > 0} // Disable submit if there are errors
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
