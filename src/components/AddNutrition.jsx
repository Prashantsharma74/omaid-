import React from "react";

const AddNutrition = () => {
  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1 className="">
            <span className="mr-4 fw-bold">&nbsp; Add Nutrition</span>
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
              <h4 className="mt-2">Add Nutriion</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component mb-3">
                <div className="alert alert-dismissible alert-success">
                  <button
                    className="btn-close"
                    type="button"
                    data-bs-dismiss="alert"
                  ></button>
                  <strong>Well done!</strong> Nutrition added successfully .
                </div>
              </div>
              <form>
                <div className="row">
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
                    <label className="form-label">Title</label>
                    <input
                      className="form-control"
                      id="text"
                      type="text"
                      placeholder="Enter title"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Proteins</label>
                    <input
                      className="form-control"
                      id="height"
                      type="number"
                      placeholder="Enter Proteins"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Carbs</label>
                    <input
                      className="form-control"
                      id="weight"
                      type="number"
                      placeholder="Enter Carbs"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Calories</label>
                    <input
                      className="form-control"
                      id="password"
                      type="number"
                      placeholder="Enter Calories"
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6">
                    <label className="form-label">Fats</label>
                    <input
                      className="form-control"
                      id="nutrition"
                      type="number"
                      placeholder="Enter Fats"
                    />
                  </div>

                  <div className="mb-3 col-md-6 col-sm-12 col-xs-12 col-lg-6 w-100">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                  </div>
                  <div className="mb-2 mt-2 col-lg-12 col-sm-12 col-xs-12 col-md-12 text-center">
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

export default AddNutrition;
