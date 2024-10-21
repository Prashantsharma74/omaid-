import React from "react";

const AddDiet = () => {
  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1 className="">
            <span className="mr-4 fw-bold">&nbsp; Add Diet Plan</span>
          </h1>
          <p></p>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 px-5">
          <div className="tile">
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
              <h4 className="mt-2">Add Diet</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component mb-3">
                <div className="alert alert-dismissible alert-success">
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="alert"
                  ></button>
                  <strong>Well done!</strong> Diet added successfully .
                </div>
              </div>
              <form>
                <div className="row">
                  <div className="mb-3 col-md-12 col-sm-12 col-xs-12 ">
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      id="text"
                      type="text"
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100">
                    <label className="form-label">Description</label>
                    <textarea
                    rows={6}
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                  </div>
                  <div className="form-group mb-0 pb-0">
                    <label className="form-label">Upload Document</label>
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
                  <div className="mb-2 mt-2 col-lg-12 col-sm-12 col-xs-12 col-md-12 text-center">
                    <button
                      className="btn custom-btn text-white w-50"
                      type="submit"
                    >
                      <i className="fa-thin fa-paper-plane"></i> &nbsp; Submit{" "}
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
