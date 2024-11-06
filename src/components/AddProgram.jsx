import React, { useEffect, useState, useRef } from "react";
import "dropify/dist/css/dropify.css";
import $ from "jquery";
import "dropify";
import { useLocation } from "react-router-dom";
import Select from "react-select";

const AddProgram = () => {
  const location = useLocation();
  const programData = location.state?.program;
  const dropifyRef = useRef(null);
  const [isAlert, setIsAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: programData ? programData.title : "",
    description: programData ? programData.description : "",
    image: programData ? programData.image : "",
    duration: programData ? programData.duration : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleCross = () => {
    setIsAlert(false);
  };

  useEffect(() => {
    // Initialize Dropify
    const dropifyElement = $(".dropify").dropify();

    // Handle file input change event
    $(".dropify").on("change", function (event) {
      const file = event.target.files[0];
      setFormData((prevData) => ({ ...prevData, image: file }));
      setErrors((prevErrors) => ({ ...prevErrors, image: "" }));
    });

    // Cleanup Dropify instance on component unmount
    return () => {
      if (dropifyElement) {
        $(".dropify").dropify("destroy");
      }
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.image) {
      newErrors.image = "Image upload is required.";
    } else {
      const file = formData.image[0];
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!validTypes.includes(file.type)) {
        newErrors.image =
          "Invalid file type. Allowed types are JPG, PNG, GIF, and WEBP.";
      }
      if (file.size > 6 * 1024 * 1024) {
        newErrors.image = "File size is too large. Maximum size is 6MB.";
      }
    }

    if (!formData.duration) newErrors.duration = "Duration is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    Swal.fire({
      title: "Success!",
      text: `Program ${programData ? "updated" : "added"} successfully.`,
      icon: "success",
      confirmButtonText: "OK",
    });

    setFormData({ title: "", description: "", image: null, duration: "" });
    const dropifyElement = $(".dropify").dropify();
    dropifyElement.data("dropify").resetPreview();
    dropifyElement.data("dropify").clearElement();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFormData((prevData) => ({
      ...prevData,
      image: files,
    }));

    if (files.length > 0) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors.image;
        return newErrors;
      });
    }
  };

  // Options for Duration dropdown
  const durationOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} Week Plan`,
  }));

  const handleDurationChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      duration: selectedOption.value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, duration: "" }));
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
          <span className="mr-4 fw-bold">&nbsp;Add Program</span>
        </h1>
      </div>
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
      <div className="row justify-content-center">
        <div className="col-md-8 px-5">
          <div className="tile">
            <div
              className="case-status d-flex justify-content-center"
              style={{
                backgroundColor: "#002538",
                color: "#fff",
                height: "50px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h4 className="mt-2">Add Program</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component mb-3">
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <label className="form-label">Title</label>
                    <input
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      name="title"
                      type="text"
                      placeholder="Enter Title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-12">
                    <label className="form-label">Description</label>
                    <textarea
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      name="description"
                      rows="6"
                      placeholder="Enter description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <div className="form-group mb-0 pb-0">
                    <label className="form-label">Upload Image</label>
                    <input
                      type="file"
                      className={`dropify ${errors.image ? "is-invalid" : ""}`}
                      data-height="100"
                      accept=".jpg,.jpeg,.png,.gif,.webp"
                      onChange={handleFileChange}
                    />
                    {errors.image && (
                      <small className="text-danger">{errors.image}</small>
                    )}
                    <small className="form-text text-muted upload-info mt-2 mb-2">
                      Maximum Image Size: Up to 6MB per upload
                    </small>
                  </div>

                  <div className="mb-3 col-md-12">
                    <label className="form-label">Duration</label>
                    <Select
                      options={durationOptions}
                      value={durationOptions.find(
                        (option) => option.value === formData.duration
                      )}
                      onChange={handleDurationChange}
                      className={`${errors.duration ? "is-invalid" : ""}`}
                    />
                    {errors.duration && (
                      <div className="invalid-feedback">{errors.duration}</div>
                    )}
                  </div>

                  <div className="mb-3 col-lg-12 text-center">
                    <button
                      className="btn custom-btn text-white w-25"
                      type="submit"
                    >
                      <i className="fa-thin fa-paper-plane"></i> &nbsp; Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddProgram;
