import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SubAdmin = () => {
  const DEFAULT_ITEMS_PER_PAGE = 5;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = () => {
    setTimeout(() => {
      const users = [
        {
          id: 1,
          username: "john_doe",
          email: "john.doe@example.com",
          hospital: "City Hospital",
          location: "New York, NY",
          phone: "123-456-7890",
          designation: "Doctor",
          password: "password123",
          status: "Active",
        },
        {
          id: 2,
          username: "jane_smith",
          email: "jane.smith@example.com",
          hospital: "General Clinic",
          location: "Los Angeles, CA",
          phone: "234-567-8901",
          designation: "Nurse",
          password: "password234",
          status: "Inactive",
        },
        {
          id: 3,
          username: "alice_jones",
          email: "alice.jones@example.com",
          hospital: "Care Center",
          location: "Chicago, IL",
          phone: "345-678-9012",
          designation: "Receptionist",
          password: "password345",
          status: "Active",
        },
        {
          id: 4,
          username: "bob_brown",
          email: "bob.brown@example.com",
          hospital: "Health Clinic",
          location: "Houston, TX",
          phone: "456-789-0123",
          designation: "Surgeon",
          password: "password456",
          status: "Active",
        },
        {
          id: 5,
          username: "charlie_white",
          email: "charlie.white@example.com",
          hospital: "Wellness Center",
          location: "Phoenix, AZ",
          phone: "567-890-1234",
          designation: "Therapist",
          password: "password567",
          status: "Inactive",
        },
        {
          id: 6,
          username: "david_black",
          email: "david.black@example.com",
          hospital: "City Hospital",
          location: "Philadelphia, PA",
          phone: "678-901-2345",
          designation: "Physician",
          password: "password678",
          status: "Active",
        },
        {
          id: 7,
          username: "emma_green",
          email: "emma.green@example.com",
          hospital: "General Clinic",
          location: "San Antonio, TX",
          phone: "789-012-3456",
          designation: "Pharmacist",
          password: "password789",
          status: "Inactive",
        },
        {
          id: 8,
          username: "frank_yellow",
          email: "frank.yellow@example.com",
          hospital: "Care Center",
          location: "San Diego, CA",
          phone: "890-123-4567",
          designation: "Radiologist",
          password: "password890",
          status: "Active",
        },
        {
          id: 9,
          username: "grace_purple",
          email: "grace.purple@example.com",
          hospital: "Health Clinic",
          location: "Dallas, TX",
          phone: "901-234-5678",
          designation: "Surgeon",
          password: "password901",
          status: "Active",
        },
        {
          id: 10,
          username: "henry_orange",
          email: "henry.orange@example.com",
          hospital: "Wellness Center",
          location: "Austin, TX",
          phone: "012-345-6789",
          designation: "Nurse",
          password: "password012",
          status: "Inactive",
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

  const handleToggleStatus = (id) => {
    setTableData((prevData) =>
      prevData.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
  };

  const filteredData = tableData.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="">
            <span className="mr-4 fw-bold">&nbsp;All Sub Admins</span>
          </h1>
          <p></p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <Link className="add-btt btn" to="/sub-admin/add-sub-admin">
              <i className="fa-regular fa-plus"></i> Add Sub Admin
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
                          <th>Username </th>
                          <th>Email ID</th>
                          <th>Hospital/Clinic Name</th>
                          <th>Location</th>
                          <th>Phone Number</th>
                          <th>Designation</th>
                          <th>Password</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1 + currentPage * itemsPerPage}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.hospital}</td>
                            <td>{user.location}</td>
                            <td>{user.phone}</td>
                            <td>{user.designation}</td>
                            <td>{user.password}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`toggle-${user.id}`}
                                  checked={user.status === "Active"}
                                  onChange={() => handleToggleStatus(user.id)}
                                />
                              </div>
                            </td>
                            <td>
                              <div className="more">
                                <input
                                  type="checkbox"
                                  id={`more-menu-toggle-${user.id}`}
                                />
                                <label
                                  htmlFor={`more-menu-toggle-${user.id}`}
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
                                      <button
                                        className="more-menu-btn"
                                        onClick={() => handleEdit(user)}
                                      >
                                        <i className="fa-regular fa-pen"></i>
                                        Edit
                                      </button>
                                    </li>
                                    <li className="more-menu-item">
                                      <button
                                        className="more-menu-btn d-flex w-100"
                                        onClick={() => handleDelete(user.id)}
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

export default SubAdmin;
