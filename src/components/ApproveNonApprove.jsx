import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const ApproveNonApprove = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  const visiblePages = 4;

  const getPaginationButtons = () => {
    const buttons = [];
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    let startPage = Math.max(0, currentPage - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(0, endPage - visiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const isActive = i === currentPage;
      buttons.push(
        <button
          key={i}
          style={{
            padding: "7px 10px",
            backgroundColor: isActive ? "#002538" : "#e9ecef",
            color: isActive ? "white" : "#002538",
            border: "1px solid lightgrey",
          }}
          className={`page-btn ${isActive ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </button>
      );
    }

    return buttons;
  };

  const fetchData = () => {
    setTimeout(() => {
      const users = [
        {
          SNo: 1,
          LastEdit: "2024-10-01",
          FoodCategory: "Fruits",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 2,
          LastEdit: "2024-10-02",
          FoodCategory: "Vegetables",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 3,
          LastEdit: "2024-10-03",
          FoodCategory: "Dairy",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 4,
          LastEdit: "2024-10-04",
          FoodCategory: "Meat",
          Approved: "Approved",
          Status: "Inactive",
        },
        {
          SNo: 5,
          LastEdit: "2024-10-05",
          FoodCategory: "Grains",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 6,
          LastEdit: "2024-10-06",
          FoodCategory: "Snacks",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 7,
          LastEdit: "2024-10-07",
          FoodCategory: "Beverages",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 8,
          LastEdit: "2024-10-08",
          FoodCategory: "Sweets",
          Approved: "Non approved",
          Status: "Inactive",
        },
        {
          SNo: 9,
          LastEdit: "2024-10-09",
          FoodCategory: "Seafood",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 10,
          LastEdit: "2024-10-10",
          FoodCategory: "Condiments",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 11,
          LastEdit: "2024-10-11",
          FoodCategory: "Fruits",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 12,
          LastEdit: "2024-10-12",
          FoodCategory: "Vegetables",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 13,
          LastEdit: "2024-10-13",
          FoodCategory: "Dairy",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 14,
          LastEdit: "2024-10-14",
          FoodCategory: "Meat",
          Approved: "Approved",
          Status: "Inactive",
        },
        {
          SNo: 15,
          LastEdit: "2024-10-15",
          FoodCategory: "Grains",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 16,
          LastEdit: "2024-10-16",
          FoodCategory: "Snacks",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 17,
          LastEdit: "2024-10-17",
          FoodCategory: "Beverages",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 18,
          LastEdit: "2024-10-18",
          FoodCategory: "Sweets",
          Approved: "Non approved",
          Status: "Inactive",
        },
        {
          SNo: 19,
          LastEdit: "2024-10-19",
          FoodCategory: "Seafood",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 20,
          LastEdit: "2024-10-20",
          FoodCategory: "Condiments",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 21,
          LastEdit: "2024-10-21",
          FoodCategory: "Fruits",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 22,
          LastEdit: "2024-10-22",
          FoodCategory: "Vegetables",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 23,
          LastEdit: "2024-10-23",
          FoodCategory: "Dairy",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 24,
          LastEdit: "2024-10-24",
          FoodCategory: "Meat",
          Approved: "Approved",
          Status: "Inactive",
        },
        {
          SNo: 25,
          LastEdit: "2024-10-25",
          FoodCategory: "Grains",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 26,
          LastEdit: "2024-10-26",
          FoodCategory: "Snacks",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 27,
          LastEdit: "2024-10-27",
          FoodCategory: "Beverages",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 28,
          LastEdit: "2024-10-28",
          FoodCategory: "Sweets",
          Approved: "Non approved",
          Status: "Inactive",
        },
        {
          SNo: 29,
          LastEdit: "2024-10-29",
          FoodCategory: "Seafood",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 30,
          LastEdit: "2024-10-30",
          FoodCategory: "Condiments",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 31,
          LastEdit: "2024-10-31",
          FoodCategory: "Fruits",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 32,
          LastEdit: "2024-11-01",
          FoodCategory: "Vegetables",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 33,
          LastEdit: "2024-11-02",
          FoodCategory: "Dairy",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 34,
          LastEdit: "2024-11-03",
          FoodCategory: "Meat",
          Approved: "Approved",
          Status: "Inactive",
        },
        {
          SNo: 35,
          LastEdit: "2024-11-04",
          FoodCategory: "Grains",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 36,
          LastEdit: "2024-11-05",
          FoodCategory: "Snacks",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 37,
          LastEdit: "2024-11-06",
          FoodCategory: "Beverages",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 38,
          LastEdit: "2024-11-07",
          FoodCategory: "Sweets",
          Approved: "Non approved",
          Status: "Inactive",
        },
        {
          SNo: 39,
          LastEdit: "2024-11-08",
          FoodCategory: "Seafood",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 40,
          LastEdit: "2024-11-09",
          FoodCategory: "Condiments",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 41,
          LastEdit: "2024-11-10",
          FoodCategory: "Fruits",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 42,
          LastEdit: "2024-11-11",
          FoodCategory: "Vegetables",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 43,
          LastEdit: "2024-11-12",
          FoodCategory: "Dairy",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 44,
          LastEdit: "2024-11-13",
          FoodCategory: "Meat",
          Approved: "Approved",
          Status: "Inactive",
        },
        {
          SNo: 45,
          LastEdit: "2024-11-14",
          FoodCategory: "Grains",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 46,
          LastEdit: "2024-11-15",
          FoodCategory: "Snacks",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 47,
          LastEdit: "2024-11-16",
          FoodCategory: "Beverages",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 48,
          LastEdit: "2024-11-17",
          FoodCategory: "Sweets",
          Approved: "Non approved",
          Status: "Inactive",
        },
        {
          SNo: 49,
          LastEdit: "2024-11-18",
          FoodCategory: "Seafood",
          Approved: "Approved",
          Status: "Active",
        },
        {
          SNo: 50,
          LastEdit: "2024-11-19",
          FoodCategory: "Condiments",
          Approved: "Non approved",
          Status: "Pending",
        },
        {
          SNo: 51,
          LastEdit: "2024-11-20",
          FoodCategory: "Fruits",
          Approved: "Approved",
          Status: "Active",
        },
      ];

      setTableData(users);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredData = tableData.filter((user) =>
    user.FoodCategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1 className="">
            <span className="mr-4 fw-bold">&nbsp;Food Categories</span>
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <Link
              className="add-btt btn"
              to="/manage-program/manage/food/add-food"
            >
              <i className="fa-regular fa-plus"></i> Add Food Item
            </Link>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12 px-5">
          <div className="tile p-3">
            <div className="tile-body">
              <div className="table-responsive">
                <div
                  className="table-controls"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className="items-per-page-container">
                    <select
                      value={itemsPerPage}
                      onChange={handleItemsPerPageChange}
                      className="items-per-page-select"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <span
                      className="entries-text"
                      style={{ marginLeft: "10px" }}
                    >
                      entries per page
                    </span>
                  </div>
                  <div className="search-container">
                    <span
                      className="search-text"
                      style={{ marginRight: "10px" }}
                    >
                      Search:
                    </span>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="search-input"
                    />
                  </div>
                </div>
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
                  <div className="table-responsive mt-2">
                    <table className="table table-bordered table-hover dt-responsive">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Last Edit</th>
                          <th>Food Category</th>
                          <th>Approved / Non approved</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((user, index) => (
                          <tr key={user.SNo}>
                            <td>{user.SNo}</td>
                            <td>
                              {format(new Date(user.LastEdit), "dd-MM-yyyy")}
                            </td>
                            <td>{user.FoodCategory}</td>
                            <td>
                              <span
                                className={`badge ${
                                  user.Approved === "Approved"
                                    ? "badge-success"
                                    : "badge-warning"
                                }`}
                              >
                                {user.Approved}
                              </span>
                            </td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  checked={user.Status === "Active"}
                                  onChange={() => handleToggleStatus(user.SNo)}
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
                                    <Link to="#" className="dropdown-item">
                                      <i className="fa fa-edit"></i> Edit
                                    </Link>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => handleDelete(user.SNo)}
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
                    <div
                      className="pagination"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className="pagination-info">
                        Showing {currentPage * itemsPerPage + 1} to{" "}
                        {Math.min(
                          (currentPage + 1) * itemsPerPage,
                          filteredData.length
                        )}{" "}
                        of {filteredData.length} entries
                      </span>
                      <div>
                        <button
                          style={{
                            padding: "7px 10px",
                            backgroundColor: "#e9ecef",
                            color: "#002538",
                            border: "1px solid lightgrey",
                            borderRadius: "5px 0px 0px 5px",
                          }}
                          onClick={() => handlePageChange(0)}
                          disabled={currentPage === 0}
                        >
                          &laquo;
                        </button>
                        <button
                          style={{
                            padding: "7px 10px",
                            backgroundColor: "#e9ecef",
                            color: "#002538",
                            border: "1px solid lightgrey",
                          }}
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 0}
                        >
                          &#x3c;
                        </button>
                        {getPaginationButtons()}
                        <button
                          style={{
                            padding: "7px 10px",
                            backgroundColor: "#e9ecef",
                            color: "#002538",
                            border: "1px solid lightgrey",
                          }}
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage >= totalPages - 1}
                        >
                          &#x3e;
                        </button>
                        <button
                          style={{
                            padding: "7px 10px",
                            backgroundColor: "#e9ecef",
                            color: "#002538",
                            border: "1px solid lightgrey",
                            borderRadius: "0px 5px 5px 0px",
                          }}
                          onClick={() => handlePageChange(totalPages - 1)}
                          disabled={currentPage >= totalPages - 1}
                        >
                          &raquo;
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ApproveNonApprove;
