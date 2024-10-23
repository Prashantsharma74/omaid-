import React, { useState } from "react";

const AddProgram = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    slot: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.image) newErrors.image = "Image is required.";
    if (!formData.slot) newErrors.slot = "Video Length is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log(formData);
    setIsAlert(true);
  };

  const handleCross = () => {
    setIsAlert(false);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
          <span className="mr-4 fw-bold">&nbsp;Add Program</span>
        </h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 px-5">
          <div className="tile">
            <div
              className="case-status d-flex justify-content-center"
              style={{
                backgroundColor: "#002538",
                color: "#fff",
                height: "50px",
                borderRadius: "10px 10px 0px 0px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h4 className="mt-2">Add Program</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component mb-3">
                {isAlert && (
                  <div className="alert alert-dismissible alert-success">
                    <button
                      className="btn-close"
                      type="button"
                      onClick={handleCross}
                    ></button>
                    <strong>Well done!</strong> Program added successfully.
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-12">
                    <label className="form-label">Title</label>
                    <input
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      name="name"
                      type="text"
                      placeholder="Enter Name"
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
                      type="text"
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
                    <label htmlFor="pdf_file" className="form-label">
                      Upload Document
                    </label>
                    <div
                      className="dropify-wrapper"
                      style={{ height: "110px" }}
                    >
                      <div className="dropify-message">
                        <span className="file-icon"></span>
                        <p>Drag Or Upload Your Document Here</p>
                      </div>
                      <div className="dropify-loader"></div>
                      <div className="dropify-errors-container">
                        <ul></ul>
                      </div>
                      <input
                        name="pdf_file[]"
                        id="pdf_file"
                        type="file"
                        className={`form-control dropify ${
                          errors.file ? "is-invalid" : ""
                        }`}
                        data-height="100"
                        required
                        multiple
                        // onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png,.svg,.webp"
                      />
                      <button
                        type="button"
                        className="dropify-clear"
                        style={{ display: "none" }}
                      >
                        Remove
                      </button>
                      <div className="dropify-preview">
                        <span className="dropify-render"></span>
                        <div className="dropify-infos">
                          <div className="dropify-infos-inner">
                            <p className="dropify-filename">
                              <span className="file-icon"></span>
                              <span className="dropify-filename-inner"></span>
                            </p>
                            <p className="dropify-infos-message">
                              Drag and drop or click to replace
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {errors.file && (
                      <div className="invalid-feedback">{errors.file}</div>
                    )}
                    <small className="form-text text-muted upload-info mt-2 mb-2">
                      Maximum Document Size: Up to 6MB per upload
                    </small>
                  </div>
                  <div className="mb-3 col-md-12">
                    <label className="form-label">Duration</label>

                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                  <div className="mb-3 col-lg-12 text-center">
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

export default AddProgram;
