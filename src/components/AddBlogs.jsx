import React from "react";

const AddBlogs = () => {
  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4">&nbsp; Add Blogs</span>
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
          <div className="tile w-50">
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
              <h4 className="mt-2">Add Blogs</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component mb-3">
                <div className="alert alert-dismissible alert-success">
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="alert"
                  ></button>
                  <strong>Well done!</strong> Blog added successfully .
                </div>
              </div>
              <form>
                <div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      id="food-search"
                      type="text"
                      placeholder="Enter Title Here"
                      list="food-suggestions"
                    />
                  </div>

                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="food-search"
                      type="text"
                      rows={6}
                      placeholder="Enter food name"
                      list="food-suggestions"
                    ></textarea>
                  </div>

                  <div className="form-group mb-0 pb-0">
                    <label className="form-label">Upload Image</label>
                    <div
                      className="dropify-wrapper"
                      style={{ height: "110px" }}
                    >
                      <div className="dropify-message">
                        <span className="file-icon"></span>{" "}
                        <p>Drag Or Upload Your Document Here</p>
                        <p className="dropify-error">
                          Incorrect file type. Please attach a PDF file.
                        </p>
                      </div>
                      <div className="dropify-loader"></div>
                      <div className="dropify-errors-container">
                        <ul></ul>
                      </div>
                      <input
                        name="pdf_file[]"
                        id="pdf_file"
                        type="file"
                        className="dropify"
                        data-height="100"
                        required=""
                        multiple=""
                        accept=".jpg,.jpeg,.png,.gif,.webp,.pdf"
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
                              <span className="file-icon"></span>{" "}
                              <span className="dropify-filename-inner"></span>
                            </p>
                            <p className="dropify-infos-message">
                              Drag and drop or click to replace
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <small className="form-text text-muted upload-info mt-2 mb-2">
                      {" "}
                      Maximum Document Size : Up to 6MB per upload{" "}
                    </small>
                  </div>
                  <div className="mt-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100">
                    <label className="form-label">Category</label>
                    <select
                      className="form-control"
                      id="food-search"
                      type="text"
                      placeholder="Enter food name"
                      list="food-suggestions"
                    ></select>
                  </div>
                  <div className="mt-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100 d-flex">
                    <label className="form-label">Status</label>
                    <span className="d-flex">
                      <input type="radio" />
                      <p>Public</p>
                    </span>
                    <span className="d-flex align-items-start justify-content-start">
                      <input type="radio" />
                      <p>Private</p>
                    </span>
                  </div>
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

export default AddBlogs;
