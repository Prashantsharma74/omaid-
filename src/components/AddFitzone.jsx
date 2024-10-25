import React, { useEffect, useState } from "react";
import "dropify/dist/css/dropify.css";
import $ from "jquery";
import "dropify";

const AddProgram = () => {
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    $(".dropify").dropify(); // Initialize dropify on component mount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAlert(true); // Show success alert on submit
  };

  const handleCross = () => {
    setIsAlert(false);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4">&nbsp; Add Program</span>
          </h1>
        </div>
      </div>
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
                borderRadius: "10px 10px 0px 0px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h4 className="mt-2">Add Program</h4>
            </div>
            <div className="tile-body p-3">
              {isAlert && (
                <div className="bs-component mb-3">
                  <div className="alert alert-dismissible alert-success">
                    <button
                      className="btn-close"
                      type="button"
                      data-bs-dismiss="alert"
                      onClick={handleCross}
                    ></button>
                    <strong>Well done!</strong> Program added successfully.
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3 col-md-6 w-100">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Program Title"
                  />
                </div>

                <div className="mb-3 col-md-6 w-100">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={6}
                    className="form-control"
                    placeholder="Enter Program Description"
                  ></textarea>
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
                  <small className="form-text text-muted upload-info mt-2 mb-2">
                    Maximum Image Size: Up to 6MB per upload
                  </small>
                </div>

                <div className="mb-3 col-lg-12 text-center mt-3">
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

export default AddProgram;
