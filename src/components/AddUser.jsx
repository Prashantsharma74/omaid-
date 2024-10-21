import React from "react";

const AddUser = () => {
  return (
    <main className="app-content">
      <div className="app-title tile p-3">
          <h1 className="">
            <span className="mr-4 fw-bold">&nbsp;Add User</span>
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
              <h4 className="mt-2">Add User</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component mb-3">
                <div className="alert alert-dismissible alert-success">
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="alert"
                  ></button>
                  <strong>Well done!</strong> User add successfully .
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
                    <label className="form-label">User Default ID</label>
                    <input
                      className="form-control"
                      id="user-id"
                      type="text"
                      placeholder="User Default ID"
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
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-control"
                      id="phone"
                      type="number"
                      placeholder="Enter Number"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Assign Sub-Admin/List</label>
                    <select className="form-select" id="assign-subadmin">
                      <option value="">Select Sub-Admin</option>
                      <option value="subadmin1">Sub-Admin 1</option>
                      <option value="subadmin2">Sub-Admin 2</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Date of Birth</label>
                    <input className="form-control" id="dob" type="date" />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Height (cm)</label>
                    <input
                      className="form-control"
                      id="height"
                      type="number"
                      placeholder="Enter Height in cm"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Weight (kg)</label>
                    <input
                      className="form-control"
                      id="weight"
                      type="number"
                      placeholder="Enter Weight in kg"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Gender</label>
                    <select className="form-select" id="gender">
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-12">
                    <h5 className="mt-3 mb-3">
                      <strong>Add Insight</strong>
                    </h5>
                    <div className="mb-3 mt-3">
                      <label className="form-label">Nutrition Taken</label>
                      <textarea
                        className="form-control"
                        id="nutrition"
                        rows="6"
                        placeholder="Enter nutrition details"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Water Tracking</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="water-tracking"
                        />
                        <label className="form-check-label">
                          {" "}
                          Track daily water intake{" "}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 col-lg-12 col-sm-12 col-xs-12 text-center col-md-12">
                    <button className="btn custom-btn text-white w-50" type="submit">
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

export default AddUser;
