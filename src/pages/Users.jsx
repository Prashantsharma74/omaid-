import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate(); // Use navigate to go to the AddUser component

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
          id: 1,
          accountId: "U001",
          username: "John Doe",
          email: "john.doe@example.com",
          phone: "123-456-7890",
          assignSubAdmin: "Sub-Admin 1",
          dob: "1990-01-01",
          height: "180",
          weight: "75",
          gender: "male",
          nutrition: "vegan",
          waterTracking: true,
        },
        {
          id: 2,
          accountId: "U002",
          username: "Jane Smith",
          email: "jane.smith@example.com",
          phone: "123-456-7891",
          assignSubAdmin: "Sub-Admin 2",
          dob: "1991-02-02",
          height: "165",
          weight: "65",
          gender: "female",
          nutrition: "non-vegan",
          waterTracking: false,
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

  const handleDelete = (id) => {
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
        setTableData((prevData) => prevData.filter((user) => user.id !== id));
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  const handleEdit = (user) => {
    // Navigate to AddUser component for editing, passing the user data
    navigate("/users/edit-user", { state: { user } });
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
            <span className="mr-4 fw-bold">&nbsp; All Users</span>
          </h1>
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
                          <th>User Id</th>
                          <th>User Name</th>
                          <th>Email ID</th>
                          <th>Phone Number</th>
                          <th>Sub Admin Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1 + currentPage * itemsPerPage}</td>
                            <td>{user.accountId}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.assignSubAdmin}</td>
                            <td>
                              <div className="dropdown text-center">
                                <button
                                  className="dropdown-button"
                                  onClick={() =>
                                    setOpenDropdown(
                                      openDropdown === user.id
                                        ? null
                                        : user.id
                                    )
                                  }
                                  aria-haspopup="true"
                                  aria-expanded={openDropdown === user.id}
                                >
                                  <i
                                    className={`fa fa-ellipsis-v ${
                                      openDropdown === user.id
                                        ? "rotate-icon"
                                        : ""
                                    }`}
                                  ></i>
                                </button>
                                {openDropdown === user.id && (
                                  <div className="dropdown-menu show">
                                    <button
                                      className="dropdown-item"
                                      onClick={() => {
                                        handleEdit(user); // Trigger edit
                                        setOpenDropdown(null);
                                      }}
                                    >
                                      <i className="fa fa-edit"></i> Edit
                                    </button>
                                    <button
                                      className="dropdown-item"
                                      onClick={() => {
                                        handleDelete(user.id);
                                        setOpenDropdown(null);
                                      }}
                                    >
                                      <i className="fa fa-trash"></i> Delete
                                    </button>
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
                      <span className="pagination-text">
                        Page {currentPage + 1} of {totalPages}
                      </span>
                      <div>{getPaginationButtons()}</div>
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

export default Users;
