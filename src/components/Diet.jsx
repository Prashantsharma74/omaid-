import React from "react";
import { Link } from "react-router-dom";

const Diet = () => {
  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1 >
          <span className="mr-4 fw-bold">&nbsp; Manage Diet Meal plan</span>
        </h1>
      </div>

      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12 px-5 text-end">
          <div className="bt-ad-emp">
            <Link className="add-btt btn" to="/manage-program/manage/diet-plan/add-diet">
              <i className="fa-regular fa-plus"></i> Add Diet & Meal
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body">
              <div className="table-responsive">
                <table className="table table-bordered table-hover dt-responsive">
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Last Edit </th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>01</td>
                      <td>17-10-2024</td>
                      <td>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckChecked"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <a href="#" className="glass-button">
                            <i className="fa-regular fa-eye"></i>
                          </a>
                          <a
                            href="#"
                            className="glass-button2 delete"
                          >
                            <i className="fa-light fa-trash-can"></i>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Diet;
