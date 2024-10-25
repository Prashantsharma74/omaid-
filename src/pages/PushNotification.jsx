import React, { useEffect, useState } from "react";
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
  const [openDropdown, setOpenDropdown] = useState(null);

  const visiblePages = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = () => {
    setTimeout(() => {
      const users = [
        {
          srNum: 1,
          createdDate: "10/12/1998",
          message: "I am Prashant Sharma",
        },
        { srNum: 2, createdDate: "11/15/1999", message: "I am Anjali Verma" },
        { srNum: 3, createdDate: "12/20/2000", message: "I am Rohit Mehta" },
        { srNum: 4, createdDate: "01/25/2001", message: "I am Sneha Rao" },
        { srNum: 5, createdDate: "02/10/2002", message: "I am Vikram Singh" },
        { srNum: 6, createdDate: "03/05/2003", message: "I am Priya Joshi" },
        { srNum: 7, createdDate: "04/30/2004", message: "I am Karan Gupta" },
        { srNum: 8, createdDate: "05/12/2005", message: "I am Neha Bansal" },
        { srNum: 9, createdDate: "06/18/2006", message: "I am Ankit Agarwal" },
        { srNum: 10, createdDate: "07/22/2007", message: "I am Kavita Sharma" },
        { srNum: 11, createdDate: "08/17/2008", message: "I am Suresh Nair" },
        {
          srNum: 12,
          createdDate: "09/10/2009",
          message: "I am Pooja Choudhury",
        },
        { srNum: 13, createdDate: "10/15/2010", message: "I am Ramesh Iyer" },
        { srNum: 14, createdDate: "11/23/2011", message: "I am Simran Kaur" },
        {
          srNum: 15,
          createdDate: "12/30/2012",
          message: "I am Abhishek Patel",
        },
        { srNum: 16, createdDate: "01/29/2013", message: "I am Tanvi Desai" },
        { srNum: 17, createdDate: "02/11/2014", message: "I am Nikhil Reddy" },
        { srNum: 18, createdDate: "03/03/2015", message: "I am Riya Sethi" },
        { srNum: 19, createdDate: "04/28/2016", message: "I am Manish Kumar" },
        { srNum: 20, createdDate: "05/19/2017", message: "I am Aditi Sharma" },
        { srNum: 21, createdDate: "06/15/2018", message: "I am Deepak Singh" },
        { srNum: 22, createdDate: "07/23/2019", message: "I am Meera Gupta" },
        { srNum: 23, createdDate: "08/29/2020", message: "I am Sameer Joshi" },
        { srNum: 24, createdDate: "09/30/2021", message: "I am Kavya Rao" },
        { srNum: 25, createdDate: "10/18/2022", message: "I am Ashish Kumar" },
        { srNum: 26, createdDate: "11/27/2023", message: "I am Soniya Verma" },
        { srNum: 27, createdDate: "12/05/2024", message: "I am Rohan Mehta" },
        { srNum: 28, createdDate: "01/10/2025", message: "I am Gaurav Yadav" },
        { srNum: 29, createdDate: "02/14/2026", message: "I am Neetu Sethi" },
        {
          srNum: 30,
          createdDate: "03/22/2027",
          message: "I am Prateek Sharma",
        },
        { srNum: 31, createdDate: "04/17/2028", message: "I am Isha Singh" },
        { srNum: 32, createdDate: "05/25/2029", message: "I am Amit Bansal" },
        { srNum: 33, createdDate: "06/29/2030", message: "I am Rina Iyer" },
        { srNum: 34, createdDate: "07/30/2031", message: "I am Sanjay Rao" },
        { srNum: 35, createdDate: "08/18/2032", message: "I am Vidya Joshi" },
        { srNum: 36, createdDate: "09/12/2033", message: "I am Mohit Gupta" },
        {
          srNum: 37,
          createdDate: "10/20/2034",
          message: "I am Tina Choudhury",
        },
        { srNum: 38, createdDate: "11/15/2035", message: "I am Harsh Nair" },
        { srNum: 39, createdDate: "12/05/2036", message: "I am Snehal Patel" },
        { srNum: 40, createdDate: "01/22/2037", message: "I am Ravi Sharma" },
        { srNum: 41, createdDate: "02/16/2038", message: "I am Pallavi Verma" },
        { srNum: 42, createdDate: "03/11/2039", message: "I am Jatin Singh" },
        { srNum: 43, createdDate: "04/09/2040", message: "I am Sheetal Reddy" },
        { srNum: 44, createdDate: "05/03/2041", message: "I am Anu Gupta" },
        { srNum: 45, createdDate: "06/25/2042", message: "I am Akshay Iyer" },
        { srNum: 46, createdDate: "07/14/2043", message: "I am Neha Bansal" },
        { srNum: 47, createdDate: "08/29/2044", message: "I am Nitin Kumar" },
        { srNum: 48, createdDate: "09/22/2045", message: "I am Kavita Rao" },
        {
          srNum: 49,
          createdDate: "10/30/2046",
          message: "I am Ramesh Choudhury",
        },
        { srNum: 50, createdDate: "11/16/2047", message: "I am Simran Mehta" },
      ];
      setNotifications(users);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleDropdown = (srNum) => {
    setOpenDropdown(openDropdown === srNum ? null : srNum);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
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
        className="row p-3"
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
                    <div className="col-lg-12 mt-2">
                      <label className="form-label">
                        To
                      </label>
                      <input type="checkbox" placeholder="Sub-Admin"/>
                      <input type="checkbox" placeholder="Users"/>
                      <input type="checkbox" placeholder="Both"/>
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
                              <td>{index + 1 + currentPage * itemsPerPage}</td>
                              <td>{row.createdDate}</td>
                              <td>
                                {row.message.length > 10
                                  ? row.message.substring(0, 100) + "..."
                                  : row.message}
                              </td>
                              <td>
                                <div className="dropdown text-center">
                                  <button
                                    className="dropdown-button"
                                    onClick={() => toggleDropdown(row.srNum)}
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
                                      {/* <a
                                        className="dropdown-item"
                                        onClick={() => {
                                          setOpenDropdown(null);
                                        }}
                                      >
                                        <i className="fa fa-edit"></i>
                                        Edit
                                      </a> */}
                                      <a
                                        className="dropdown-item"
                                        onClick={() => {
                                          handleDeleteNotification(row.srNum);
                                          setOpenDropdown(null);
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <i className="fa fa-trash"></i>
                                        Delete
                                      </a>
                                    </div>
                                  )}
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

export default PushNotification;
