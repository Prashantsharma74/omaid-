import React, { useEffect, useState } from "react";
import del from "../assets/images/del-icon.svg";
import editIcon from "../assets/images/edit-icon.svg";
import AddCategory from "../components/AddCategory";
import { Link } from "react-router-dom";

const ManageBlogsCategory = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const visiblePages = 4;

  const getPaginationButtons = () => {
    const buttons = [];
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
          srNum: 1,
          title: "Title 1",
          description: "Description 1",
          status: "Active",
        },
        {
          srNum: 2,
          title: "Title 2",
          description: "Description 2",
          status: "Inactive",
        },
        {
          srNum: 3,
          title: "Title 3",
          description: "Description 3",
          status: "Active",
        },
        {
          srNum: 4,
          title: "Title 4",
          description: "Description 4",
          status: "Inactive",
        },
        {
          srNum: 5,
          title: "Title 5",
          description: "Description 5",
          status: "Active",
        },
        {
          srNum: 6,
          title: "Title 6",
          description: "Description 6",
          status: "Inactive",
        },
        {
          srNum: 7,
          title: "Title 7",
          description: "Description 7",
          status: "Active",
        },
        {
          srNum: 8,
          title: "Title 8",
          description: "Description 8",
          status: "Inactive",
        },
        {
          srNum: 9,
          title: "Title 9",
          description: "Description 9",
          status: "Active",
        },
        {
          srNum: 10,
          title: "Title 10",
          description: "Description 10",
          status: "Inactive",
        },
        {
          srNum: 11,
          title: "Title 11",
          description: "Description 11",
          status: "Active",
        },
        {
          srNum: 12,
          title: "Title 12",
          description: "Description 12",
          status: "Inactive",
        },
        {
          srNum: 13,
          title: "Title 13",
          description: "Description 13",
          status: "Active",
        },
        {
          srNum: 14,
          title: "Title 14",
          description: "Description 14",
          status: "Inactive",
        },
        {
          srNum: 15,
          title: "Title 15",
          description: "Description 15",
          status: "Active",
        },
        {
          srNum: 16,
          title: "Title 16",
          description: "Description 16",
          status: "Inactive",
        },
        {
          srNum: 17,
          title: "Title 17",
          description: "Description 17",
          status: "Active",
        },
        {
          srNum: 18,
          title: "Title 18",
          description: "Description 18",
          status: "Inactive",
        },
        {
          srNum: 19,
          title: "Title 19",
          description: "Description 19",
          status: "Active",
        },
        {
          srNum: 20,
          title: "Title 20",
          description: "Description 20",
          status: "Inactive",
        },
        {
          srNum: 21,
          title: "Title 21",
          description: "Description 21",
          status: "Active",
        },
        {
          srNum: 22,
          title: "Title 22",
          description: "Description 22",
          status: "Inactive",
        },
        {
          srNum: 23,
          title: "Title 23",
          description: "Description 23",
          status: "Active",
        },
        {
          srNum: 24,
          title: "Title 24",
          description: "Description 24",
          status: "Inactive",
        },
        {
          srNum: 25,
          title: "Title 25",
          description: "Description 25",
          status: "Active",
        },
        {
          srNum: 26,
          title: "Title 26",
          description: "Description 26",
          status: "Inactive",
        },
        {
          srNum: 27,
          title: "Title 27",
          description: "Description 27",
          status: "Active",
        },
        {
          srNum: 28,
          title: "Title 28",
          description: "Description 28",
          status: "Inactive",
        },
        {
          srNum: 29,
          title: "Title 29",
          description: "Description 29",
          status: "Active",
        },
        {
          srNum: 30,
          title: "Title 30",
          description: "Description 30",
          status: "Inactive",
        },
        {
          srNum: 31,
          title: "Title 31",
          description: "Description 31",
          status: "Active",
        },
        {
          srNum: 32,
          title: "Title 32",
          description: "Description 32",
          status: "Inactive",
        },
        {
          srNum: 33,
          title: "Title 33",
          description: "Description 33",
          status: "Active",
        },
        {
          srNum: 34,
          title: "Title 34",
          description: "Description 34",
          status: "Inactive",
        },
        {
          srNum: 35,
          title: "Title 35",
          description: "Description 35",
          status: "Active",
        },
        {
          srNum: 36,
          title: "Title 36",
          description: "Description 36",
          status: "Inactive",
        },
        {
          srNum: 37,
          title: "Title 37",
          description: "Description 37",
          status: "Active",
        },
        {
          srNum: 38,
          title: "Title 38",
          description: "Description 38",
          status: "Inactive",
        },
        {
          srNum: 39,
          title: "Title 39",
          description: "Description 39",
          status: "Active",
        },
        {
          srNum: 40,
          title: "Title 40",
          description: "Description 40",
          status: "Inactive",
        },
        {
          srNum: 41,
          title: "Title 41",
          description: "Description 41",
          status: "Active",
        },
        {
          srNum: 42,
          title: "Title 42",
          description: "Description 42",
          status: "Inactive",
        },
        {
          srNum: 43,
          title: "Title 43",
          description: "Description 43",
          status: "Active",
        },
        {
          srNum: 44,
          title: "Title 44",
          description: "Description 44",
          status: "Inactive",
        },
        {
          srNum: 45,
          title: "Title 45",
          description: "Description 45",
          status: "Active",
        },
        {
          srNum: 46,
          title: "Title 46",
          description: "Description 46",
          status: "Inactive",
        },
        {
          srNum: 47,
          title: "Title 47",
          description: "Description 47",
          status: "Active",
        },
        {
          srNum: 48,
          title: "Title 48",
          description: "Description 48",
          status: "Inactive",
        },
        {
          srNum: 49,
          title: "Title 49",
          description: "Description 49",
          status: "Active",
        },
        {
          srNum: 50,
          title: "Title 50",
          description: "Description 50",
          status: "Inactive",
        },
        {
          srNum: 51,
          title: "Title 51",
          description: "Description 51",
          status: "Active",
        },
        {
          srNum: 52,
          title: "Title 52",
          description: "Description 52",
          status: "Inactive",
        },
        {
          srNum: 53,
          title: "Title 53",
          description: "Description 53",
          status: "Active",
        },
        {
          srNum: 54,
          title: "Title 54",
          description: "Description 54",
          status: "Inactive",
        },
        {
          srNum: 55,
          title: "Title 55",
          description: "Description 55",
          status: "Active",
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

  const toggleStatus = (srNum) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.srNum === srNum
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  const filteredData = tableData.filter(
    (user) =>
      user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1 className="fw-bold">Manage Category</h1>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <Link
              to="/blog/manage-category/add-category"
              className="add-btt btn"
            >
              <i className="fa-regular fa-plus"></i> Add Category
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
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
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-hover dt-responsive mt-2"
                      id="data-table"
                    >
                      <thead>
                        <tr>
                          <th>Sr. num</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((row, index) => (
                          <tr key={row.srNum}>
                            <td>{index + 1 + currentPage * itemsPerPage}</td>
                            <td>{row.title}</td>
                            <td>{row.description}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  checked={row.status === "Active"}
                                  onChange={() => toggleStatus(row.srNum)}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="dropdown text-center">
                                <button
                                  className="dropdown-button"
                                  onClick={() =>
                                    setOpenDropdown(
                                      openDropdown === row.srNum ? null : row.srNum
                                    )
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={openDropdown === row.srNum}
                                >
                                  <i
                                    className={`fa fa-ellipsis-v ${
                                      openDropdown === row.srNum
                                        ? "rotate-icon"
                                        : ""
                                    }`}
                                  ></i>
                                </button>
                                {openDropdown === row.srNum && (
                                  <div className="dropdown-menu show">
                                    <a
                                      className="dropdown-item"
                                      onClick={() => {
                                        handleEdit(row.srNum);
                                        setOpenDropdown(null);
                                      }}
                                    >
                                      <i className="fa fa-edit"></i> Edit
                                    </a>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => {
                                        handleDelete(row.srNum);
                                        setOpenDropdown(null);
                                      }}
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
                          className="page-btn"
                          onClick={() => handlePageChange(0)}
                          disabled={currentPage === 0}
                          aria-label="First Page"
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
                          className="page-btn"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 0}
                          aria-label="Previous Page"
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
                          className="page-btn"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage >= totalPages - 1}
                          aria-label="Next Page"
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
                          className="page-btn"
                          onClick={() => handlePageChange(totalPages - 1)}
                          disabled={currentPage >= totalPages - 1}
                          aria-label="Last Page"
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

export default ManageBlogsCategory;
