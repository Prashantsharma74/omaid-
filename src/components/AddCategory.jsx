import React, { useEffect, useState } from "react";
import "dropify/dist/css/dropify.css";
import $ from "jquery";
import "dropify";
import { useLocation } from "react-router-dom";

const AddCategory = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [formData,setFormData] = useState({
    title:"",
    duration:""
  })
  const [errors, setErrors] = useState({});
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    $(".dropify").dropify();
  }, []);

  useEffect(() => {
    if (location.state?.row) {
      setFormData({
        name: location.state.user.row,
        email: location.state.user.email,
      });
      console.log(formData);

      setIsEditMode(true);
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCross = () => {
    setIsAlert(false);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4">&nbsp; Add Category</span>
          </h1>
          <p></p>
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
              <h4 className="mt-2">Add Category</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-12">
                  <h5 className="mt-3 mb-3">
                    <strong>Add Category</strong>
                  </h5>
                </div>
                <div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Title Here"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100">
                    <label className="form-label">Description</label>
                    <textarea
                      rows={6}
                      className="form-control"
                      placeholder="Enter food name"
                    ></textarea>
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
                  />
                  <small className="form-text text-muted upload-info mt-2 mb-2">
                    Maximum Icon Size : Up to 6MB per upload
                  </small>
                </div>

                <div className="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-12 text-center mt-3">
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
