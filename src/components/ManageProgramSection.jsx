import React, { useState } from "react";
import { Link } from "react-router-dom";

const ManageProgramSection = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

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
        <h1>
          <span className="mr-4 fw-bold">&nbsp;Manage</span>
        </h1>
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
                <table className="table mt-2 table-bordered table-hover dt-responsive">
                  <thead>
                    <tr>
                      <th>S.Num</th>
                      <th>Manage</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Manually entering data */}
                    {[
                      { title: "Introduction", id: 1, url:"/manage-program/manage/edit-intro" },
                      { title: "Approved / Non-Approved Foods", id: 2,url:"/manage-program/manage/food" },
                      { title: "Diet Plan", id: 3,url:"/manage-program/manage/diet-plan" }
                    ].map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.title}</td>
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
                                <Link
                                  to={user.url}
                                  className="dropdown-item"
                                >
                                  <i className="fa fa-edit"></i> Edit
                                </Link>
                                <a className="dropdown-item" onClick={() => handleDelete(user.id)}>
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
                    of 1 entries
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
                      onClick={() => handlePageChange(totalPages - 1)}
                      disabled={currentPage >= totalPages - 1}
                      aria-label="Last Page"
                    >
                      &raquo;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageProgramSection;
