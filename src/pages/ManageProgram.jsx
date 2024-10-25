import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ManageProgram = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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
          description: "Description for Title 1",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "2 hours",
          status: "Active",
        },
        {
          srNum: 2,
          title: "Title 2",
          description: "Description for Title 2",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "3 hours",
          status: "Inactive",
        },
        {
          srNum: 3,
          title: "Title 3",
          description: "Description for Title 3",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "1.5 hours",
          status: "Active",
        },
        {
          srNum: 4,
          title: "Title 4",
          description: "Description for Title 4",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "4 hours",
          status: "Inactive",
        },
        {
          srNum: 5,
          title: "Title 5",
          description: "Description for Title 5",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "5 hours",
          status: "Active",
        },
        {
          srNum: 6,
          title: "Title 6",
          description: "Description for Title 6",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "30 minutes",
          status: "Inactive",
        },
        {
          srNum: 7,
          title: "Title 7",
          description: "Description for Title 7",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "2 hours",
          status: "Active",
        },
        {
          srNum: 8,
          title: "Title 8",
          description: "Description for Title 8",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "1 hour",
          status: "Inactive",
        },
        {
          srNum: 9,
          title: "Title 9",
          description: "Description for Title 9",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "3 hours",
          status: "Active",
        },
        {
          srNum: 10,
          title: "Title 10",
          description: "Description for Title 10",
          image: "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "4.5 hours",
          status: "Inactive",
        },
      ];
      
      setTableData(users);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = (srNum) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this program!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTableData((prevData) =>
          prevData.filter((item) => item.srNum !== srNum)
        );
        Swal.fire("Deleted!", "Your program has been deleted.", "success");
      }
    });
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

  const filteredData = tableData.filter((user) =>
    user.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleEdit = (user) => {
    navigate("/manage-program/add-program", { state: { program: user } });
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4 fw-bold">&nbsp; Manage Program</span>
          </h1>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <Link to="/manage-program/add-program" className="add-btt btn">
              <i className="fa-regular fa-plus"></i> Add Program
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body p-3">
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
                          <th>S.No</th>
                          <th>Program</th>
                          <th>Status</th>
                          <th>Manage</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="5" className="text-center">
                              Loading...
                            </td>
                          </tr>
                        ) : (
                          paginatedData.map((user, index) => (
                            <tr key={user.srNum}>
                              <td>{currentPage * itemsPerPage + index + 1}</td>
                              <td>{user.title}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    checked={user.status === "Active"}
                                    onChange={() => toggleStatus(user.srNum)}
                                  />
                                </div>
                              </td>
                              <td>
                                <Link
                                  className="btn ctb"
                                  to="/manage-program/manage"
                                >
                                  <i className="fa-sharp fa-light fa-pen mx-1"></i>{" "}
                                  Manage
                                </Link>
                              </td>
                              <td>
                                <div ref={dropdownRef} className="dropdown text-center">
                                  <button
                                    className="dropdown-button"
                                    onClick={() =>
                                      setOpenDropdown(
                                        openDropdown === user.srNum
                                          ? null
                                          : user.srNum
                                      )
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={openDropdown === user.srNum}
                                  >
                                    <i
                                      className={`fa fa-ellipsis-v ${
                                        openDropdown === user.srNum
                                          ? "rotate-icon"
                                          : ""
                                      }`}
                                    ></i>
                                  </button>
                                  {openDropdown === user.srNum && (
                                    <div className="dropdown-menu show">
                                      <a
                                        className="dropdown-item"
                                        onClick={() => {
                                          handleEdit(user);
                                          setOpenDropdown(null);
                                        }}
                                      >
                                        <i className="fa fa-edit"></i> Edit
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        onClick={() => {
                                          handleDelete(user.srNum);
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
                          ))
                        )}
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

export default ManageProgram;
