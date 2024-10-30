import React, { useEffect, useState } from "react";
import "dropify/dist/css/dropify.css";
import $ from "jquery";
import "dropify";

const AddFitzoneSession = () => {

  const [formData, setFormData] = useState({
    title: "",
    video: "",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    $(".dropify").dropify();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
          <span className="mr-4">&nbsp; Add Session</span>
        </h1>
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
              <h4 className="mt-2">Add Session</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
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
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label">Video</label>
                  <input
                    name="video"
                    type="file"
                    className="dropify"
                    data-height="100"
                    accept=".mp4,.avi,.mov"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label">Category</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Category Here"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label">Description</label>
                  <textarea
                    rows={6}
                    className="form-control"
                    placeholder="Enter Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                <div className="text-center mt-3">
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
}

export default AddFitzoneSession