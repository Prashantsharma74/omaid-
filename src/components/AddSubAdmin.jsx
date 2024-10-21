import React from "react";

const AddSubAdmin = () => {
  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1 className="">
          <span className="mr-4 fw-bold">&nbsp;Add Sub-Admin</span>
        </h1>
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
              <h4 className="mt-2">Add Sub-Admin</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component mb-3">
                <div className="alert alert-dismissible alert-success">
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="alert"
                  ></button>
                  <strong>Well done!</strong> Sub-Admin add successfully .
                </div>
              </div>
              <form method="" action="">
                <div className="row">
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Email address</label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Hospital/Clinic Name</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Hospital/Clinic name"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Location</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Location"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-control"
                      id="phone"
                      type="number"
                      placeholder="Enter Number"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Designation</label>
                    <input
                      className="form-control"
                      id="designation"
                      type="text"
                      placeholder="Enter Designation"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      id="weight"
                      type="text"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="mb-3 col-lg-12 col-sm-12 col-xs-12 text-center col-md-12">
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

export default AddSubAdmin;
