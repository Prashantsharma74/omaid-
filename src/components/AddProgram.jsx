import React, { useEffect, useState } from "react";
import "dropify/dist/css/dropify.css";
import $ from "jquery";
import "dropify";

const AddProgram = ({ isOpen, setIsOpen, programData }) => {
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

  const handleCross = () => {
    setIsOpen(false);
    setFormData({ title: "", description: "", image: "", duration: "" });
    setErrors({});
  };

  useEffect(() => {
    $(".dropify").dropify();

    $(".dropify").on("change", function () {
      const fileName = $(this).val().split("\\").pop();
      setFormData((prevData) => ({ ...prevData, image: fileName }));
    });
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.image) newErrors.image = "Image is required.";
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

    if (programData) {
      console.log("Updating Program: ", formData);
    } else {
      console.log("Adding Program: ", formData);
      // Call your add API here
    }

    setIsAlert(true);
    handleCross(); // Close modal after submit
  };

  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      style={{ display: isOpen ? "block" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Program</h5>
            <button type="button" className="close" onClick={handleCross}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {isAlert && (
              <div className="alert alert-dismissible alert-success">
                <strong>Well done!</strong> Program{" "}
                {programData ? "updated" : "added"} successfully.
              </div>
            )}
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
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>
                <div className="form-group mb-0 pb-0">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="dropify"
                    data-height="100"
                    required
                    multiple
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
                  />
                  {errors.image && (
                    <div className="invalid-feedback">{errors.image}</div>
                  )}
                  <small className="form-text text-muted upload-info mt-2 mb-2">
                    Maximum Image Size: Up to 6MB per upload
                  </small>
                </div>
                <div className="mb-3 col-md-12">
                  <label className="form-label">Duration</label>
                  <input
                    className={`form-control ${
                      errors.duration ? "is-invalid" : ""
                    }`}
                    name="duration"
                    type="text"
                    placeholder="Enter Duration"
                    value={formData.duration}
                    onChange={handleChange}
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
  );
};

export default AddProgram;
