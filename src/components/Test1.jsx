import React, { useState } from "react";

const AddDiet = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [isAlert, setIsAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: selectedFile,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.file) {
      newErrors.file = "File upload is required.";
    } else if (!/\.(jpg|jpeg|png|gif|webp|pdf)$/.test(formData.file.name)) {
      newErrors.file = "Invalid file type. Please upload an image or PDF.";
    } else if (formData.file.size > 6 * 1024 * 1024) {
      newErrors.file = "File size exceeds 6MB.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setAlertMessage("Please correct the errors and try again.");
      setAlertType("danger");
      setIsAlert(true);
    } else {
      setErrors({});
      setAlertMessage("Diet added successfully!");
      setAlertType("success");
      setIsAlert(true);

      // Reset the form
      setFormData({ title: "", description: "", file: null });
      e.target.reset(); // Clear the file input field
    }
  };

  const handleCross = () => setIsAlert(false);

  const handleBack = () => window.history.back();

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1 className="">
            <span className="mr-4 fw-bold">&nbsp; Add Diet Plan</span>
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
              <h4 className="mt-2">Add Diet</h4>
            </div>
            <div className="tile-body p-3">
              {isAlert && (
                <div className={`alert alert-dismissible alert-${alertType}`}>
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="alert"
                    onClick={handleCross}
                  ></button>
                  <strong>{alertType === "success" ? "Well done!" : "Oops!"}</strong>{" "}
                  {alertMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <label className="form-label">Title</label>
                    <input
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      id="title"
                      type="text"
                      placeholder="Enter title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 w-100">
                    <label className="form-label">Description</label>
                    <textarea
                      id="description"
                      rows={6}
                      className={`form-control ${errors.description ? "is-invalid" : ""}`}
                      placeholder="Enter Description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">{errors.description}</div>
                    )}
                  </div>

                  <div className="form-group mb-0 pb-0">
                    <label htmlFor="pdf_file" className="form-label">
                      Upload Image
                    </label>
                    <input
                      name="pdf_file[]"
                      id="pdf_file"
                      type="file"
                      className={`form-control dropify ${errors.file ? "is-invalid" : ""}`}
                      onChange={handleFileChange}
                      accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
                    />
                    {errors.file && (
                      <div className="invalid-feedback">{errors.file}</div>
                    )}
                    <small className="form-text text-muted upload-info mt-2 mb-2">
                      Maximum Document Size: Up to 6MB per upload
                    </small>
                  </div>

                  <div className="mb-2 mt-2 col-lg-12 text-center">
                    <button
                      className="btn custom-btn text-white w-50"
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

export default AddDiet;
