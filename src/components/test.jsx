import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import send from "../assets/images/send.png";

const PushNotification = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageName, setPageName] = useState("");
  const [errors, setErrors] = useState({ pageName: "" });
  const [notifications, setNotifications] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [recipients, setRecipients] = useState({
    subAdmin: false,
    user: false,
    both: false,
  });

  const visiblePages = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchData = () => {
    setTimeout(() => {
      const users = [
        {
          srNum: 1,
          createdDate: "11/15/1999",
          recipients: "Sub-Admin",
          message: "I am Anjali Verma",
        },
        {
          srNum: 2,
          createdDate: "03/12/2000",
          recipients: "User",
          message: "Hello, I'm Rahul Singh",
        },
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

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setRecipients({
      ...recipients,
      [id]: checked,
    });
  };

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
          const selectedRecipients = [];
          if (recipients.subAdmin) selectedRecipients.push("Sub-Admin");
          if (recipients.user) selectedRecipients.push("User");
          if (recipients.both) selectedRecipients.push("Both");

          const newNotification = {
            srNum: notifications.length + 1,
            createdDate: new Date().toLocaleDateString(),
            message: pageName,
            recipients: selectedRecipients.join(", "),
          };

          setNotifications([...notifications, newNotification]);
          setPageName("");
          setRecipients({ subAdmin: false, user: false, both: false });
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

  const filteredData = notifications.filter((user) =>
    user.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
        <h1>
          <span className="mr-4 fw-bold">Add Notification</span>
        </h1>
      </div>
      <div
        className="row p-3"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="col-md-12 px-5">
          <div className="tile">
            <div
              className="case-status d-flex justify-content-center"
              style={{
                backgroundColor: "#002538",
                color: "#fff",
                height: "50px",
                borderRadius: "10px 10px 0px 0px",
              }}
            >
              <h4 className="mt-2">Add Message</h4>
            </div>
            <div className="tile-body p-3">
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
                      id="pageName"
                      rows={6}
                      placeholder="Enter Message Here"
                      value={pageName}
                      onChange={(e) => setPageName(e.target.value)}
                    />
                    {errors.pageName && (
                      <div className="invalid-feedback">{errors.pageName}</div>
                    )}
                  </div>
                  <div className="col-lg-12 mt-2">
                    <label className="form-label">To</label>
                    <div className="d-flex gap-3 mt-2">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="subAdmin"
                          checked={recipients.subAdmin}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">Sub-Admin</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="user"
                          checked={recipients.user}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">Users</label>
                      </div>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="both"
                          checked={recipients.both}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label">Both</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 text-center mt-2">
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
                    <span className="items-per-page-text">Items per page</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ width: "200px" }}
                  />
                </div>
                <table className="table table-hover table-bordered mt-3 text-center">
                  <thead style={{ backgroundColor: "#002538", color: "#fff" }}>
                    <tr>
                      <th>Sr No</th>
                      <th>Created Date</th>
                      <th>Sended To</th>
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
                          <td>{row.recipients}</td>
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
                                    onClick={() =>
                                      handleDeleteNotification(row.srNum)
                                    }
                                  >
                                    <i className="fa fa-trash"></i> Delete
                                  </a>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5">No Data Found...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="pagination d-flex justify-content-between align-items-center">
                  <button
                    disabled={currentPage === 0}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    &laquo;
                  </button>
                  {getPaginationButtons()}
                  <button
                    disabled={currentPage === totalPages - 1}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    &raquo;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PushNotification;
