import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2
import ManageBlogsTable from "../components/TableFitzone/ManageBlogsTable";
import notfound from "../assets/images/notfound.png";

const ManageBlogs = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
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
          Title: "Post Title 1",
          Description: "Description for post 1",
          Category: "Category A",
          Status: "Published",
          "Publish/Private": "Publish",
          Image: "image1.jpg",
        },
        {
          srNum: 2,
          Title: "Post Title 2",
          Description: "Description for post 2",
          Category: "Category A",
          Status: "Published",
          "Publish/Private": "Private",
          Image: "image1.jpg",
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

  const toggleStatus = (index) => {
    setTableData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? {
              ...item,
              Status: item.Status === "Published" ? "Draft" : "Published",
            }
          : item
      )
    );
  };

  const handleEdit = (srNum) => {
    const user = tableData.find((u) => u.srNum === srNum);
    if (user) {
      navigate("/blogs/manage-blogs/add-blogs");
      setSelectedUser(user);
      console.log(user);
    }
  };

  const handleDelete = (srNum) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setTableData((prevData) =>
          prevData.filter((user) => user.srNum !== srNum)
        );
        Swal.fire("Deleted!", "The blog post has been deleted.", "success");
      }
    });
  };

  const handlePublishPrivateChange = (index, newValue) => {
    const currentItem = tableData[index];

    if (currentItem["Publish/Private"] !== newValue) {
      Swal.fire({
        title: "Are you sure?",
        text: `You are about to change the status to ${newValue}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, change it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setTableData((prevData) =>
            prevData.map((item, i) =>
              i === index ? { ...item, "Publish/Private": newValue } : item
            )
          );

          Swal.fire("Changed!", `Status changed to ${newValue}.`, "success");
        }
      });
    }
  };

  const filteredData = tableData.filter(
    (user) =>
      user.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleActionButtonClick = (index) => {
    setOpenDropdownIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>Manage Blogs</h1>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <Link className="add-btt btn" to="/blogs/manage-blogs/add-blogs">
              <i className="fa-regular fa-plus"></i> Add Blogs
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
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
                    <table className="table table-bordered table-hover dt-responsive mt-2">
                      <thead>
                        <tr>
                          <th>Sr.no</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Publish/Private</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              <img src={notfound} alt="" />
                            </td>
                          </tr>
                        ) : (
                          paginatedData.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1 + currentPage * itemsPerPage}</td>
                              <td>{row.Title}</td>
                              <td>{row.Description}</td>
                              <td>{row.Category}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    checked={row.Status === "Published"}
                                    onChange={() => toggleStatus(index)}
                                  />
                                </div>
                              </td>
                              <td>
                                <select
                                  value={row["Publish/Private"]}
                                  onChange={(e) =>
                                    handlePublishPrivateChange(
                                      index,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="Publish">Publish</option>
                                  <option value="Private">Private</option>
                                </select>
                              </td>
                              <td>
                                <ManageBlogsTable
                                  openDropdown={openDropdown}
                                  setOpenDropdown={setOpenDropdown}
                                  user={row}
                                  handleDelete={handleDelete}
                                  handleEdit={handleEdit}
                                />
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
                      <div
                        style={{
                          position: "absolute",
                          right: "12px",
                          margin: "0px 0px 0px 0px",
                        }}
                      >
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageBlogs;
