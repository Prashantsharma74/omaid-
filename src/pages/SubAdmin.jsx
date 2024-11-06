import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import Swal from "sweetalert2";
import AddSubAdmin from "../components/AddSubAdmin";
import TableSubAdmin from "../components/TableSubAdmin";

const SubAdmin = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const visiblePages = 4;
  const dropdownRef = useRef(null);

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

  const handleFormSubmit = (user) => {
    if (user.srNum) {
      setTableData((prevData) =>
        prevData.map((u) => (u.srNum === user.srNum ? user : u))
      );
    } else {
      const newUser = {
        ...user,
        srNum: tableData.length + 1,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTableData((prevData) => [...prevData, newUser]);
    }
    Swal.fire({
      title: user.srNum ? "Sub-Admin Updated!" : "Sub-Admin Added!",
      icon: "success",
    });
    setShowModal(false);
    setSelectedUser(null);
  };

  const fetchData = () => {
    setTimeout(() => {
      const users = [
        {
            srNum: 1,
            createdAt: "2023-01-01",
            username: "John Doe",
            email: "john.doe@example.com",
            hospital: "Hospital A",
            location: "India",
            phone: "1234567801",
            designation: "Doctor",
            password: "password123",
            status: "Active",
        },
        {
            srNum: 2,
            createdAt: "2023-01-02",
            username: "Jane Smith",
            email: "jane.smith@example.com",
            hospital: "Hospital B",
            location: "India",
            phone: "1234567802",
            designation: "Nurse",
            password: "password234",
            status: "Active",
        },
        {
            srNum: 3,
            createdAt: "2023-01-03",
            username: "Michael Johnson",
            email: "michael.johnson@example.com",
            hospital: "Hospital C",
            location: "India",
            phone: "1234567803",
            designation: "Surgeon",
            password: "password345",
            status: "Inactive",
        },
        {
            srNum: 4,
            createdAt: "2023-01-04",
            username: "Emily Davis",
            email: "emily.davis@example.com",
            hospital: "Hospital A",
            location: "India",
            phone: "1234567804",
            designation: "Pediatrician",
            password: "password456",
            status: "Active",
        },
        {
            srNum: 5,
            createdAt: "2023-01-05",
            username: "Daniel Brown",
            email: "daniel.brown@example.com",
            hospital: "Hospital B",
            location: "India",
            phone: "1234567805",
            designation: "Radiologist",
            password: "password567",
            status: "Active",
        },
        {
            srNum: 6,
            createdAt: "2023-01-06",
            username: "Olivia Wilson",
            email: "olivia.wilson@example.com",
            hospital: "Hospital C",
            location: "India",
            phone: "1234567806",
            designation: "Anesthesiologist",
            password: "password678",
            status: "Active",
        },
        {
            srNum: 7,
            createdAt: "2023-01-07",
            username: "James Garcia",
            email: "james.garcia@example.com",
            hospital: "Hospital A",
            location: "India",
            phone: "1234567807",
            designation: "Pharmacist",
            password: "password789",
            status: "Inactive",
        },
        {
            srNum: 8,
            createdAt: "2023-01-08",
            username: "Sophia Martinez",
            email: "sophia.martinez@example.com",
            hospital: "Hospital B",
            location: "India",
            phone: "1234567808",
            designation: "Cardiologist",
            password: "password890",
            status: "Active",
        },
        {
            srNum: 9,
            createdAt: "2023-01-09",
            username: "Benjamin Rodriguez",
            email: "benjamin.rodriguez@example.com",
            hospital: "Hospital C",
            location: "India",
            phone: "1234567809",
            designation: "Dermatologist",
            password: "password901",
            status: "Active",
        },
        {
            srNum: 10,
            createdAt: "2023-01-10",
            username: "Mia Lee",
            email: "mia.lee@example.com",
            hospital: "Hospital A",
            location: "India",
            phone: "1234567810",
            designation: "Physical Therapist",
            password: "password012",
            status: "Inactive",
        },
        {
            srNum: 11,
            createdAt: "2023-01-11",
            username: "Ethan Hernandez",
            email: "ethan.hernandez@example.com",
            hospital: "Hospital B",
            location: "India",
            phone: "1234567811",
            designation: "Emergency Physician",
            password: "password1234",
            status: "Active",
        },
        {
            srNum: 12,
            createdAt: "2023-01-12",
            username: "Isabella Young",
            email: "isabella.young@example.com",
            hospital: "Hospital C",
            location: "India",
            phone: "1234567812",
            designation: "Oncologist",
            password: "password2345",
            status: "Active",
        },
        {
            srNum: 13,
            createdAt: "2023-01-13",
            username: "Alexander King",
            email: "alexander.king@example.com",
            hospital: "Hospital A",
            location: "India",
            phone: "1234567813",
            designation: "Neurologist",
            password: "password3456",
            status: "Active",
        },
        {
            srNum: 14,
            createdAt: "2023-01-14",
            username: "Charlotte Wright",
            email: "charlotte.wright@example.com",
            hospital: "Hospital B",
            location: "India",
            phone: "1234567814",
            designation: "Gastroenterologist",
            password: "password4567",
            status: "Inactive",
        },
        {
            srNum: 15,
            createdAt: "2023-01-15",
            username: "Liam Scott",
            email: "liam.scott@example.com",
            hospital: "Hospital C",
            location: "India",
            phone: "1234567815",
            designation: "Ophthalmologist",
            password: "password5678",
            status: "Active",
        },
        {
            srNum: 16,
            createdAt: "2023-01-16",
            username: "Ava Green",
            email: "ava.green@example.com",
            hospital: "Hospital A",
            location: "India",
            phone: "1234567816",
            designation: "Urologist",
            password: "password6789",
            status: "Active",
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

useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      if (openDropdown === selectedUser?.srNum) {
        setOpenDropdown(null);
      }
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [openDropdown, selectedUser]);


  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1 className="">
            <span className="mr-4 fw-bold">&nbsp;All Sub Admins</span>
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <a
              className="add-btt btn"
              onClick={() => {
                setSelectedUser(null);
                setShowModal(true);
              }}
            >
              <i className="fa-regular fa-plus"></i> Add Sub Admin
            </a>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddSubAdmin
              user={selectedUser}
              onClose={() => setShowModal(false)}
              onSubmit={handleFormSubmit}
            />
          </div>
        </div>
      )}
      <div className="row mt-4">
        <div className="col-md-12 px-5">
          <div className="tile p-3">
            <div className="tile-body">
              <div className="table-responsive">
                <div className="table-controls d-flex align-items-center justify-content-between">
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
                    <span className="entries-text ml-2">&nbsp;entries per page</span>
                  </div>
                  <div className="search-container">
                    <span className="search-text mr-2">Search:&nbsp;</span>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="search-input"
                    />
                  </div>
                </div>
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
                    <div className="loader"></div>
                  </div>
                ) : (
                  <div className="table-responsive mt-2">
                    <table className="table table-bordered table-hover dt-responsive">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Created At</th>
                          <th>User Name</th>
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
                          <tr key={user.srNum}>
                            <td>{index + 1 + currentPage * itemsPerPage}</td>
                            <td>{format(new Date(user.createdAt), "dd MMMM yyyy")}</td>
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
                                  checked={user.status === "Active"}
                                  onChange={() => handleToggleStatus(user.srNum)}
                                />
                              </div>
                            </td>
                            <td>
                              <TableSubAdmin openDropdown={openDropdown} setOpenDropdown={setOpenDropdown} user={user} handleDelete={handleDelete} handleEdit={handleEdit}/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="pagination mt-4 mb-2 d-flex align-items-start justify-content-between">
                      <span className="pagination-info">
                        Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                      </span>
                      <div>
                        <button  style={{
                            padding: "7px 10px",
                            backgroundColor: "#e9ecef",
                            color: "#002538",
                            border: "1px solid lightgrey",
                            borderRadius: "5px 0px 0px 5px",
                          }} className="page-btn" onClick={() => handlePageChange(0)} disabled={currentPage === 0}>&laquo;</button>
                        <button style={{
                            padding: "7px 10px",
                            backgroundColor: "#e9ecef",
                            color: "#002538",
                            border: "1px solid lightgrey",
                          }} className="page-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>&#x3c;</button>
                        {getPaginationButtons()}
                        <button  style={{
                            padding: "7px 10px",
                            backgroundColor: "#e9ecef",
                            color: "#002538",
                            border: "1px solid lightgrey",
                          }} className="page-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1}>&#x3e;</button>
                        <button style={{
                            padding: "7px 10px",
                            backgroundColor: "#e9ecef",
                            color: "#002538",
                            border: "1px solid lightgrey",
                            borderRadius: "0px 5px 5px 0px",
                          }} className="page-btn" onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage >= totalPages - 1}>&raquo;</button>
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
