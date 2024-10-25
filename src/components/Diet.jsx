import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";

const Diet = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const fetchData = () => {
    setTimeout(() => {
      const dietPlans = [
        {
          SNo: 1,
          LastEdit: "2024-10-17",
          Status: "Active",
        },
        {
          SNo: 2,
          LastEdit: "2024-10-18",
          Status: "Inactive",
        },
      ];
      setTableData(dietPlans);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleStatus = (sNo) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.SNo === sNo
          ? {
              ...item,
              Status: item.Status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  const handleEdit = (diet) => {
    navigate("/manage-program/manage/diet-plan/add-diet", { state: { diet } });
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
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
                {loading ? (
                  <div
                    style={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className="loader"></div>
                  </div>
                ) : (
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
                      {tableData.map((diet, index) => (
                        <tr key={diet.SNo}>
                          <td>{diet.SNo}</td>
                          <td>{format(new Date(diet.LastEdit), "dd-MM-yyyy")}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                checked={diet.Status === "Active"}
                                onChange={() => handleToggleStatus(diet.SNo)}
                              />
                            </div>
                          </td>
                          <td>
                            <div className="dropdown text-center">
                              <button
                                className="dropdown-button"
                                onClick={() => handleDropdownToggle(index)}
                                aria-haspopup="true"
                              >
                                <i className="fa fa-ellipsis-v"></i>
                              </button>
                              {openDropdownIndex === index && (
                                <div className="dropdown-menu show">
                                  <button
                                    className="dropdown-item"
                                    onClick={() => handleEdit(diet)}
                                  >
                                    <i className="fa fa-edit"></i> Edit
                                  </button>
                                  <a
                                    className="dropdown-item"
                                    onClick={() => handleDelete(diet.SNo)}
                                  >
                                    <i className="fa fa-trash"></i> Delete
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Diet;
