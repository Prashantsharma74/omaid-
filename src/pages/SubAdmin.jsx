import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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
          createdAt: "2023-01-01",
          username: "user1",
          email: "user1@example.com",
          hospital: "Hospital A",
          location: "Location A",
          phone: "123-456-7890",
          designation: "Doctor",
        },
        {
          createdAt: "2023-01-02",
          username: "user2",
          email: "user2@example.com",
          hospital: "Hospital B",
          location: "Location B",
          phone: "123-456-7891",
          designation: "Nurse",
        },
        {
          createdAt: "2023-01-03",
          username: "user3",
          email: "user3@example.com",
          hospital: "Hospital C",
          location: "Location C",
          phone: "123-456-7892",
          designation: "Surgeon",
        },
        {
          createdAt: "2023-01-04",
          username: "user4",
          email: "user4@example.com",
          hospital: "Hospital D",
          location: "Location D",
          phone: "123-456-7893",
          designation: "Technician",
        },
        {
          createdAt: "2023-01-05",
          username: "user5",
          email: "user5@example.com",
          hospital: "Hospital E",
          location: "Location E",
          phone: "123-456-7894",
          designation: "Administrator",
        },
        {
          createdAt: "2023-01-06",
          username: "user6",
          email: "user6@example.com",
          hospital: "Hospital F",
          location: "Location F",
          phone: "123-456-7895",
          designation: "Pharmacist",
        },
        {
          createdAt: "2023-01-07",
          username: "user7",
          email: "user7@example.com",
          hospital: "Hospital G",
          location: "Location G",
          phone: "123-456-7896",
          designation: "Counselor",
        },
        {
          createdAt: "2023-01-08",
          username: "user8",
          email: "user8@example.com",
          hospital: "Hospital H",
          location: "Location H",
          phone: "123-456-7897",
          designation: "Researcher",
        },
        {
          createdAt: "2023-01-09",
          username: "user9",
          email: "user9@example.com",
          hospital: "Hospital I",
          location: "Location I",
          phone: "123-456-7898",
          designation: "Receptionist",
        },
        {
          createdAt: "2023-01-10",
          username: "user10",
          email: "user10@example.com",
          hospital: "Hospital J",
          location: "Location J",
          phone: "123-456-7899",
          designation: "Support Staff",
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
                          <th>Created At </th>
                          <th>Username </th>
                          <th>Email ID</th>
                          <th>Hospital/Clinic Name</th>
                          <th>Location</th>
                          <th>Phone Number</th>
                          <th>Designation</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1 + currentPage * itemsPerPage}</td>
                            <td>
                              {format(
                                new Date(user.createdAt),
                                "dd MMMM yyyy"
                              )}
                            </td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.hospital}</td>
                            <td>{user.location}</td>
                            <td>{user.phone}</td>
                            <td>{user.designation}</td>
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
                              <div className="more mt-2">
                                <input
                                  style={{ display: "none" }}
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
