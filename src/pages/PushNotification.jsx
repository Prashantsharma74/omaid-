import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import send from "../assets/images/send.png";

const PushNotification = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageName, setPageName] = useState("");
  const [errors, setErrors] = useState({ pageName: "" });
  const [notifications, setNotifications] = useState([]);

  const fetchData = () => {
    setTimeout(() => {
      const users = [
        {
          srNum: 1,
          createdDate: "10/12/1998",
          message: "I am Prashant Sharma",
        },
        {
          srNum: 2,
          createdDate: "10/12/1998",
          message: "I am Prashant Sharma",
        },
        {
          srNum: 2,
          createdDate: "10/12/1998",
          message: "I am Prashant Sharma",
        },
        {
          srNum: 2,
          createdDate: "10/12/1998",
          message: "I am Prashant Sharma",
        },
        {
          srNum: 2,
          createdDate: "10/12/1998",
          message: "I am Prashant Sharma",
        },
      ];
      setNotifications(users);
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

  const filteredData = notifications.filter((user) =>
    user.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleAddNotification = (e) => {
    e.preventDefault();
    if (pageName.trim()) {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to add this notification?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, add it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const newNotification = {
            srNum: notifications.length + 1,
            createdDate: new Date().toLocaleDateString(),
            message: pageName,
          };
          setNotifications([...notifications, newNotification]);
          setPageName("");
          Swal.fire("Success!", "Notification added!", "success");
        }
      });
    } else {
      setErrors({ pageName: "Message cannot be empty." });
    }
  };

  const handleDeleteNotification = (srNum) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedNotifications = notifications.filter(
          (notification) => notification.srNum !== srNum
        );
        setNotifications(updatedNotifications);
        Swal.fire("Deleted!", "Notification has been deleted.", "success");
      }
    });
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4 fw-bold">&nbsp;Add Notification</span>
          </h1>
        </div>
      </div>
      <div
        className="row w-100"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="col-md-12 px-5">
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
              <h4 className="mt-2">Add Message</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component">
                <form onSubmit={handleAddNotification}>
                  <div className="row">
                    <div className="col-lg-12 mt-2">
                      <label className="form-label" htmlFor="pageName">
                        Message
                      </label>
                      <textarea
                        className={`form-control ${
                          errors.pageName ? "is-invalid" : ""
                        }`}
                        name="pageName"
                        id="pageName"
                        type="text"
                        rows={6}
                        placeholder="Enter Message Here"
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                      />
                      {errors.pageName && (
                        <div className="invalid-feedback">
                          {errors.pageName}
                        </div>
                      )}
                    </div>
                    <div
                      className="col-lg-12 col-sm-12 col-xs-12 col-md-12 mt-2 text-center"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        className="btn custom-btn text-white mt-2 w-20pr"
                        type="submit"
                      >
                        Send
                        <img
                          src={send}
                          alt="send"
                          style={{ marginLeft: "5px", height: "14px" }}
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
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
                          <th>Create Date</th>
                          <th>Message</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.length > 0 ? (
                          paginatedData.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.createdDate}</td>
                              <td>
                                {row.message.length > 10
                                  ? row.message.substring(0, 100) + "..."
                                  : row.message}
                              </td>
                              <td>
                                <div className="more">
                                  <input
                                    type="checkbox"
                                    id="more-menu-toggle"
                                  />
                                  <label
                                    htmlFor="more-menu-toggle"
                                    className="more-btn"
                                  >
                                    <span className="more-dot"></span>
                                    <span className="more-dot"></span>
                                    <span className="more-dot"></span>
                                  </label>
                                  <div className="more-menu">
                                    <div className="more-menu-caret">
                                      <div className="more-menu-caret-outer"></div>
                                      <div className="more-menu-caret-inner"></div>
                                    </div>
                                    <ul className="more-menu-items">
                                      <li className="more-menu-item">
                                        <button className="more-menu-btn">
                                          <i className="fa-regular fa-pen"></i>
                                          Edit
                                        </button>
                                      </li>
                                      <li className="more-menu-item">
                                        <button
                                          className="more-menu-btn d-flex w-100"
                                          style={{ display: "flex" }}
                                        >
                                          <i className="fa-solid fa-trash"></i>
                                          Delete
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <h1>No Data Found....</h1>
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
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            style={{
                              padding: "7px 10px",
                              backgroundColor: "#e9ecef",
                              color: "#002538",
                              border: "1px solid lightgrey",
                            }}
                            key={index}
                            className={`page-btn ${
                              index === currentPage ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(index)}
                          >
                            {index + 1}
                          </button>
                        ))}
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

export default PushNotification;
