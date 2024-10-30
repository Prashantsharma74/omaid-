import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import "dropify/dist/css/dropify.css";
import $ from "jquery";
import "dropify";

const AddFitzone = () => {
  const location = useLocation(); // Get location
  const [isAlert, setIsAlert] = useState(false);

  // Initialize state for input fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    $(".dropify").dropify(); // Initialize dropify on component mount

    if (location.state && location.state.row) {
      const { name, description } = location.state.row; // Destructure the row data
      setName(name);
      setDescription(description);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAlert(true); // Show success alert on submit
  };

  const handleCross = () => {
    setIsAlert(false);
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
                    value={name} // Bind input value
                    onChange={(e) => setName(e.target.value)} // Update state on change
                  />
                </div>

                <div className="mb-3 col-md-6 w-100">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={6}
                    className="form-control"
                    placeholder="Enter Program Description"
                    value={description} // Bind input value
                    onChange={(e) => setDescription(e.target.value)} // Update state on change
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
                    className="btn custom-btn text-white w-25"
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
