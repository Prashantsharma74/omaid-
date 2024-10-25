import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Swal from "sweetalert2";

const SubAdmin = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

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
        { srNum: 1, createdAt: "2023-01-01", username: "John Doe", email: "john.doe@example.com", hospital: "Hospital A", location: "Location A", phone: "123-456-7801", designation: "Doctor", password: "password123" },
        { srNum: 2, createdAt: "2023-01-02", username: "Jane Smith", email: "jane.smith@example.com", hospital: "Hospital B", location: "Location B", phone: "123-456-7802", designation: "Nurse", password: "password123" },
        { srNum: 3, createdAt: "2023-01-03", username: "Michael Johnson", email: "michael.johnson@example.com", hospital: "Hospital C", location: "Location C", phone: "123-456-7803", designation: "Surgeon", password: "password123" },
        { srNum: 4, createdAt: "2023-01-04", username: "Emily Davis", email: "emily.davis@example.com", hospital: "Hospital D", location: "Location D", phone: "123-456-7804", designation: "Technician", password: "password123" },
        { srNum: 5, createdAt: "2023-01-05", username: "James Brown", email: "james.brown@example.com", hospital: "Hospital E", location: "Location E", phone: "123-456-7805", designation: "Admin", password: "password123" },
        { srNum: 6, createdAt: "2023-01-06", username: "Patricia Taylor", email: "patricia.taylor@example.com", hospital: "Hospital F", location: "Location F", phone: "123-456-7806", designation: "Doctor", password: "password123" },
        { srNum: 7, createdAt: "2023-01-07", username: "Robert Wilson", email: "robert.wilson@example.com", hospital: "Hospital G", location: "Location G", phone: "123-456-7807", designation: "Nurse", password: "password123" },
        { srNum: 8, createdAt: "2023-01-08", username: "Linda Martinez", email: "linda.martinez@example.com", hospital: "Hospital H", location: "Location H", phone: "123-456-7808", designation: "Surgeon", password: "password123" },
        { srNum: 9, createdAt: "2023-01-09", username: "David Anderson", email: "david.anderson@example.com", hospital: "Hospital I", location: "Location I", phone: "123-456-7809", designation: "Technician", password: "password123" },
        { srNum: 10, createdAt: "2023-01-10", username: "Susan Thomas", email: "susan.thomas@example.com", hospital: "Hospital J", location: "Location J", phone: "123-456-7810", designation: "Admin", password: "password123" },
        // Add more users as needed
        { srNum: 11, createdAt: "2023-01-11", username: "Daniel Jackson", email: "daniel.jackson@example.com", hospital: "Hospital A", location: "Location A", phone: "123-456-7811", designation: "Doctor", password: "password123" },
        { srNum: 12, createdAt: "2023-01-12", username: "Jessica White", email: "jessica.white@example.com", hospital: "Hospital B", location: "Location B", phone: "123-456-7812", designation: "Nurse", password: "password123" },
        { srNum: 13, createdAt: "2023-01-13", username: "William Harris", email: "william.harris@example.com", hospital: "Hospital C", location: "Location C", phone: "123-456-7813", designation: "Surgeon", password: "password123" },
        { srNum: 14, createdAt: "2023-01-14", username: "Sarah Martin", email: "sarah.martin@example.com", hospital: "Hospital D", location: "Location D", phone: "123-456-7814", designation: "Technician", password: "password123" },
        { srNum: 15, createdAt: "2023-01-15", username: "Charles Thompson", email: "charles.thompson@example.com", hospital: "Hospital E", location: "Location E", phone: "123-456-7815", designation: "Admin", password: "password123" },
        { srNum: 16, createdAt: "2023-01-16", username: "Barbara Garcia", email: "barbara.garcia@example.com", hospital: "Hospital F", location: "Location F", phone: "123-456-7816", designation: "Doctor", password: "password123" },
        { srNum: 17, createdAt: "2023-01-17", username: "Matthew Martinez", email: "matthew.martinez@example.com", hospital: "Hospital G", location: "Location G", phone: "123-456-7817", designation: "Nurse", password: "password123" },
        { srNum: 18, createdAt: "2023-01-18", username: "Elizabeth Rodriguez", email: "elizabeth.rodriguez@example.com", hospital: "Hospital H", location: "Location H", phone: "123-456-7818", designation: "Surgeon", password: "password123" },
        { srNum: 19, createdAt: "2023-01-19", username: "Christopher Lewis", email: "christopher.lewis@example.com", hospital: "Hospital I", location: "Location I", phone: "123-456-7819", designation: "Technician", password: "password123" },
        { srNum: 20, createdAt: "2023-01-20", username: "Jessica Lee", email: "jessica.lee@example.com", hospital: "Hospital J", location: "Location J", phone: "123-456-7820", designation: "Admin", password: "password123" },
        // Add more users if needed
    ];
    console.log(users);
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

  const handleToggleStatus = (srNum) => {
    setTableData((prevData) =>
      prevData.map((user) =>
        user.srNum === srNum
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active",
            }
          : user
      )
    );
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
    }).then((result) => {
      if (result.isConfirmed) {
        setTableData((prevData) =>
          prevData.filter((user) => user.srNum !== srNum)
        );
        Swal.fire("Deleted!", "Your user has been deleted.", "success");
      }
    });
  };

  const handleEdit = (srNum) => {
    const user = tableData.find((u) => u.srNum === srNum);
    if (user) {
      setSelectedUser(user);
      navigate("/sub-admin/add-subadmin", { state: { user } });
    }
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
            <Link className="add-btt btn" to="/sub-admin/add-subadmin">
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
                          <th>User Name </th>
                          <th>Email ID</th>
                          <th>Hospital/Clinic Name</th>
                          <th>Designation</th>
                          <th>Location</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((user, index) => (
                          <tr key={index}>
                            <td>{index + 1 + currentPage * itemsPerPage}</td>
                            <td>
                              {format(new Date(user.createdAt), "dd MMMM yyyy")}
                            </td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.hospital}</td>
                            <td>{user.designation}</td>
                            <td>{user.location}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`toggle-${user.srNum}`}
                                  checked={user.status === "Active"}
                                  onChange={() =>
                                    handleToggleStatus(user.srNum)
                                  }
                                />
                              </div>
                            </td>
                            <td>
                              <div className="dropdown text-center">
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
                                        handleEdit(user.srNum);
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
                        ))}
                      </tbody>
                    </table>
                    <div
                      className="pagination"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
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
