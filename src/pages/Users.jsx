import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddUser from "../components/AddUser";
import TableUser from "../components/TableUser";

const Users = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
            id: 1,
            srNum: 1,
            status: "Inactive",
            accountId: "U002",
            username: "Jane Smith",
            email: "jane.smith@example.com",
            phone: "1234567891",
            assignSubAdmin: "Sub-Admin 1",
            dob: "1991-02-02",
            height: "165",
            weight: "65",
            gender: "female",
            nutrition: "non-vegan",
            waterTracking: false,
            password: "c6s5d45466546",
        },
        {
            id: 2,
            srNum: 2,
            status: "Active",
            accountId: "U003",
            username: "John Doe",
            email: "john.doe@example.com",
            phone: "1234567892",
            assignSubAdmin: "Sub-Admin 2",
            dob: "1988-03-15",
            height: "175",
            weight: "75",
            gender: "male",
            nutrition: "vegan",
            waterTracking: true,
            password: "d7f8g91829202",
        },
        {
            id: 3,
            srNum: 3,
            status: "Active",
            accountId: "U004",
            username: "Michael Johnson",
            email: "michael.johnson@example.com",
            phone: "1234567893",
            assignSubAdmin: "Sub-Admin 3",
            dob: "1985-04-25",
            height: "180",
            weight: "80",
            gender: "male",
            nutrition: "vegetarian",
            waterTracking: true,
            password: "a1b2c3d4e5f6",
        },
        {
            id: 4,
            srNum: 4,
            status: "Inactive",
            accountId: "U005",
            username: "Emily Davis",
            email: "emily.davis@example.com",
            phone: "1234567894",
            assignSubAdmin: "Sub-Admin 1",
            dob: "1993-05-30",
            height: "160",
            weight: "55",
            gender: "female",
            nutrition: "non-vegan",
            waterTracking: false,
            password: "z9x8y7w6v5u4",
        },
        {
            id: 5,
            srNum: 5,
            status: "Active",
            accountId: "U006",
            username: "Daniel Brown",
            email: "daniel.brown@example.com",
            phone: "1234567895",
            assignSubAdmin: "Sub-Admin 2",
            dob: "1987-06-10",
            height: "177",
            weight: "73",
            gender: "male",
            nutrition: "non-vegan",
            waterTracking: true,
            password: "q1w2e3r4t5y6",
        },
        {
            id: 6,
            srNum: 6,
            status: "Active",
            accountId: "U007",
            username: "Olivia Wilson",
            email: "olivia.wilson@example.com",
            phone: "1234567896",
            assignSubAdmin: "Sub-Admin 3",
            dob: "1990-07-22",
            height: "162",
            weight: "60",
            gender: "female",
            nutrition: "vegetarian",
            waterTracking: true,
            password: "u7y8t9r0q1p2",
        },
        {
            id: 7,
            srNum: 7,
            status: "Inactive",
            accountId: "U008",
            username: "James Garcia",
            email: "james.garcia@example.com",
            phone: "1234567897",
            assignSubAdmin: "Sub-Admin 1",
            dob: "1995-08-05",
            height: "172",
            weight: "78",
            gender: "male",
            nutrition: "vegan",
            waterTracking: false,
            password: "s3t4r5e6w7q8",
        },
        {
            id: 8,
            srNum: 8,
            status: "Active",
            accountId: "U009",
            username: "Sophia Martinez",
            email: "sophia.martinez@example.com",
            phone: "1234567898",
            assignSubAdmin: "Sub-Admin 2",
            dob: "1986-09-12",
            height: "155",
            weight: "50",
            gender: "female",
            nutrition: "non-vegan",
            waterTracking: true,
            password: "h1j2k3l4m5n6",
        },
        {
            id: 9,
            srNum: 9,
            status: "Active",
            accountId: "U010",
            username: "Benjamin Rodriguez",
            email: "benjamin.rodriguez@example.com",
            phone: "1234567899",
            assignSubAdmin: "Sub-Admin 3",
            dob: "1989-10-18",
            height: "180",
            weight: "85",
            gender: "male",
            nutrition: "vegetarian",
            waterTracking: true,
            password: "m6n7b8v9c0d1",
        },
        {
            id: 10,
            srNum: 10,
            status: "Inactive",
            accountId: "U011",
            username: "Mia Lee",
            email: "mia.lee@example.com",
            phone: "1234567800",
            assignSubAdmin: "Sub-Admin 1",
            dob: "1992-11-30",
            height: "168",
            weight: "54",
            gender: "female",
            nutrition: "non-vegan",
            waterTracking: false,
            password: "x2y3z4a5b6c7",
        },
        {
            id: 11,
            srNum: 11,
            status: "Active",
            accountId: "U012",
            username: "Ethan Hernandez",
            email: "ethan.hernandez@example.com",
            phone: "1234567801",
            assignSubAdmin: "Sub-Admin 2",
            dob: "1994-12-15",
            height: "176",
            weight: "70",
            gender: "male",
            nutrition: "vegan",
            waterTracking: true,
            password: "q3r4t5y6u7i8",
        },
        {
            id: 12,
            srNum: 12,
            status: "Active",
            accountId: "U013",
            username: "Isabella Young",
            email: "isabella.young@example.com",
            phone: "1234567802",
            assignSubAdmin: "Sub-Admin 3",
            dob: "1984-01-24",
            height: "162",
            weight: "58",
            gender: "female",
            nutrition: "vegetarian",
            waterTracking: true,
            password: "e1f2g3h4i5j6",
        },
        {
            id: 13,
            srNum: 13,
            status: "Active",
            accountId: "U014",
            username: "Alexander King",
            email: "alexander.king@example.com",
            phone: "1234567803",
            assignSubAdmin: "Sub-Admin 1",
            dob: "1982-02-17",
            height: "185",
            weight: "90",
            gender: "male",
            nutrition: "non-vegan",
            waterTracking: true,
            password: "k8l9m0n1o2p3",
        },
        {
            id: 14,
            srNum: 14,
            status: "Inactive",
            accountId: "U015",
            username: "Charlotte Wright",
            email: "charlotte.wright@example.com",
            phone: "1234567804",
            assignSubAdmin: "Sub-Admin 2",
            dob: "1990-03-03",
            height: "170",
            weight: "65",
            gender: "female",
            nutrition: "vegan",
            waterTracking: false,
            password: "r1s2t3u4v5w6",
        },
        {
            id: 15,
            srNum: 15,
            status: "Active",
            accountId: "U016",
            username: "Liam Scott",
            email: "liam.scott@example.com",
            phone: "1234567805",
            assignSubAdmin: "Sub-Admin 3",
            dob: "1983-04-22",
            height: "178",
            weight: "77",
            gender: "male",
            nutrition: "non-vegan",
            waterTracking: true,
            password: "h7g8f9d0c1b2",
        },
        {
            id: 16,
            srNum: 16,
            status: "Active",
            accountId: "U017",
            username: "Ava Green",
            email: "ava.green@example.com",
            phone: "1234567806",
            assignSubAdmin: "Sub-Admin 1",
            dob: "1995-05-11",
            height: "164",
            weight: "62",
            gender: "female",
            nutrition: "vegetarian",
            waterTracking: true,
            password: "y3x4z5a6b7c8",
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
        setTableData((prevData) => prevData.filter((user) => user.srNum !== srNum));
        Swal.fire("Deleted!", "The user has been deleted.", "success");
      }
    });
  };

  const handleEdit = (srNum) => {
    const user = tableData.find((u) => u.srNum === srNum);
    if (user) {
      setSelectedUser(user);
      setShowModal(true);
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

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1 className="">
            <span className="mr-4 fw-bold">&nbsp; All Users</span>
          </h1>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddUser
              user={selectedUser}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
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
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((user, index) => (
                          <tr key={index}>
                            <td>{index + 1 + currentPage * itemsPerPage}</td>
                            <td>{user.accountId}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.assignSubAdmin}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id={`toggle-${user.srNum}`} // Use user.id
                                  checked={user.status === "Active"}
                                  onChange={() => handleToggleStatus(user.srNum)} // Use user.id
                                />
                              </div>
                            </td>
                            <td>
                              <TableUser openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} user={user} handleDelete={handleDelete} handleEdit={handleEdit}/>
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
                        marginTop: "30px",
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

export default Users;
