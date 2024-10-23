import React, { useEffect, useState } from 'react'

const ApproveNonApprove = () => {
    const DEFAULT_ITEMS_PER_PAGE = 10;
    const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDropdown, setOpenDropdown] = useState(null);
  
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
          { srNum: 1, createdAt: "2023-01-01", username: "user1", email: "user1@example.com", hospital: "Hospital A", location: "Location A", phone: "123-456-7890", designation: "Doctor" },
          { srNum: 2, createdAt: "2023-01-02", username: "user2", email: "user2@example.com", hospital: "Hospital B", location: "Location B", phone: "123-456-7891", designation: "Nurse" },
          { srNum: 3, createdAt: "2023-01-03", username: "user3", email: "user3@example.com", hospital: "Hospital C", location: "Location C", phone: "123-456-7892", designation: "Surgeon" },
          { srNum: 4, createdAt: "2023-01-04", username: "user4", email: "user4@example.com", hospital: "Hospital D", location: "Location D", phone: "123-456-7893", designation: "Pediatrician" },
          { srNum: 5, createdAt: "2023-01-05", username: "user5", email: "user5@example.com", hospital: "Hospital E", location: "Location E", phone: "123-456-7894", designation: "Dermatologist" },
          { srNum: 6, createdAt: "2023-01-06", username: "user6", email: "user6@example.com", hospital: "Hospital F", location: "Location F", phone: "123-456-7895", designation: "Cardiologist" },
          { srNum: 7, createdAt: "2023-01-07", username: "user7", email: "user7@example.com", hospital: "Hospital G", location: "Location G", phone: "123-456-7896", designation: "Oncologist" },
          { srNum: 8, createdAt: "2023-01-08", username: "user8", email: "user8@example.com", hospital: "Hospital H", location: "Location H", phone: "123-456-7897", designation: "Neurologist" },
          { srNum: 9, createdAt: "2023-01-09", username: "user9", email: "user9@example.com", hospital: "Hospital I", location: "Location I", phone: "123-456-7898", designation: "Anesthesiologist" },
          { srNum: 10, createdAt: "2023-01-10", username: "user10", email: "user10@example.com", hospital: "Hospital J", location: "Location J", phone: "123-456-7899", designation: "General Practitioner" },
          { srNum: 11, createdAt: "2023-01-11", username: "user11", email: "user11@example.com", hospital: "Hospital K", location: "Location K", phone: "123-456-7800", designation: "Physiotherapist" },
          { srNum: 12, createdAt: "2023-01-12", username: "user12", email: "user12@example.com", hospital: "Hospital L", location: "Location L", phone: "123-456-7801", designation: "Radiologist" },
          { srNum: 13, createdAt: "2023-01-13", username: "user13", email: "user13@example.com", hospital: "Hospital M", location: "Location M", phone: "123-456-7802", designation: "Pathologist" },
          { srNum: 14, createdAt: "2023-01-14", username: "user14", email: "user14@example.com", hospital: "Hospital N", location: "Location N", phone: "123-456-7803", designation: "Urologist" },
          { srNum: 15, createdAt: "2023-01-15", username: "user15", email: "user15@example.com", hospital: "Hospital O", location: "Location O", phone: "123-456-7804", designation: "Orthopedic Surgeon" },
          { srNum: 16, createdAt: "2023-01-16", username: "user16", email: "user16@example.com", hospital: "Hospital P", location: "Location P", phone: "123-456-7805", designation: "Endocrinologist" },
          { srNum: 17, createdAt: "2023-01-17", username: "user17", email: "user17@example.com", hospital: "Hospital Q", location: "Location Q", phone: "123-456-7806", designation: "Gastroenterologist" },
          { srNum: 18, createdAt: "2023-01-18", username: "user18", email: "user18@example.com", hospital: "Hospital R", location: "Location R", phone: "123-456-7807", designation: "Hematologist" },
          { srNum: 19, createdAt: "2023-01-19", username: "user19", email: "user19@example.com", hospital: "Hospital S", location: "Location S", phone: "123-456-7808", designation: "Allergist" },
          { srNum: 20, createdAt: "2023-01-20", username: "user20", email: "user20@example.com", hospital: "Hospital T", location: "Location T", phone: "123-456-7809", designation: "Infectious Disease Specialist" },
          { srNum: 21, createdAt: "2023-01-21", username: "user21", email: "user21@example.com", hospital: "Hospital U", location: "Location U", phone: "123-456-7810", designation: "Psychiatrist" },
          { srNum: 22, createdAt: "2023-01-22", username: "user22", email: "user22@example.com", hospital: "Hospital V", location: "Location V", phone: "123-456-7811", designation: "Ophthalmologist" },
          { srNum: 23, createdAt: "2023-01-23", username: "user23", email: "user23@example.com", hospital: "Hospital W", location: "Location W", phone: "123-456-7812", designation: "ENT Specialist" },
          { srNum: 24, createdAt: "2023-01-24", username: "user24", email: "user24@example.com", hospital: "Hospital X", location: "Location X", phone: "123-456-7813", designation: "Pulmonologist" },
          { srNum: 25, createdAt: "2023-01-25", username: "user25", email: "user25@example.com", hospital: "Hospital Y", location: "Location Y", phone: "123-456-7814", designation: "Nephrologist" },
          { srNum: 26, createdAt: "2023-01-26", username: "user26", email: "user26@example.com", hospital: "Hospital Z", location: "Location Z", phone: "123-456-7815", designation: "Clinical Psychologist" },
          { srNum: 27, createdAt: "2023-01-27", username: "user27", email: "user27@example.com", hospital: "Hospital A", location: "Location A", phone: "123-456-7816", designation: "Occupational Therapist" },
          { srNum: 28, createdAt: "2023-01-28", username: "user28", email: "user28@example.com", hospital: "Hospital B", location: "Location B", phone: "123-456-7817", designation: "Speech Therapist" },
          { srNum: 29, createdAt: "2023-01-29", username: "user29", email: "user29@example.com", hospital: "Hospital C", location: "Location C", phone: "123-456-7818", designation: "Dietitian" },
          { srNum: 30, createdAt: "2023-01-30", username: "user30", email: "user30@example.com", hospital: "Hospital D", location: "Location D", phone: "123-456-7819", designation: "Pharmacist" },
          { srNum: 31, createdAt: "2023-01-31", username: "user31", email: "user31@example.com", hospital: "Hospital E", location: "Location E", phone: "123-456-7820", designation: "Medical Assistant" },
          { srNum: 32, createdAt: "2023-02-01", username: "user32", email: "user32@example.com", hospital: "Hospital F", location: "Location F", phone: "123-456-7821", designation: "Clinical Nurse Specialist" },
          { srNum: 33, createdAt: "2023-02-02", username: "user33", email: "user33@example.com", hospital: "Hospital G", location: "Location G", phone: "123-456-7822", designation: "Case Manager" },
          { srNum: 34, createdAt: "2023-02-03", username: "user34", email: "user34@example.com", hospital: "Hospital H", location: "Location H", phone: "123-456-7823", designation: "Nurse Practitioner" },
          { srNum: 35, createdAt: "2023-02-04", username: "user35", email: "user35@example.com", hospital: "Hospital I", location: "Location I", phone: "123-456-7824", designation: "Health Educator" },
          { srNum: 36, createdAt: "2023-02-05", username: "user36", email: "user36@example.com", hospital: "Hospital J", location: "Location J", phone: "123-456-7825", designation: "Chiropractor" },
          { srNum: 37, createdAt: "2023-02-06", username: "user37", email: "user37@example.com", hospital: "Hospital K", location: "Location K", phone: "123-456-7826", designation: "Fitness Trainer" },
          { srNum: 38, createdAt: "2023-02-07", username: "user38", email: "user38@example.com", hospital: "Hospital L", location: "Location L", phone: "123-456-7827", designation: "Nutritionist" },
          { srNum: 39, createdAt: "2023-02-08", username: "user39", email: "user39@example.com", hospital: "Hospital M", location: "Location M", phone: "123-456-7828", designation: "Social Worker" },
          { srNum: 40, createdAt: "2023-02-09", username: "user40", email: "user40@example.com", hospital: "Hospital N", location: "Location N", phone: "123-456-7829", designation: "Research Scientist" },
          { srNum: 41, createdAt: "2023-02-10", username: "user41", email: "user41@example.com", hospital: "Hospital O", location: "Location O", phone: "123-456-7830", designation: "Health Services Manager" },
          { srNum: 42, createdAt: "2023-02-11", username: "user42", email: "user42@example.com", hospital: "Hospital P", location: "Location P", phone: "123-456-7831", designation: "Quality Improvement Manager" },
          { srNum: 43, createdAt: "2023-02-12", username: "user43", email: "user43@example.com", hospital: "Hospital Q", location: "Location Q", phone: "123-456-7832", designation: "Clinical Research Coordinator" },
          { srNum: 44, createdAt: "2023-02-13", username: "user44", email: "user44@example.com", hospital: "Hospital R", location: "Location R", phone: "123-456-7833", designation: "Health Policy Analyst" },
          { srNum: 45, createdAt: "2023-02-14", username: "user45", email: "user45@example.com", hospital: "Hospital S", location: "Location S", phone: "123-456-7834", designation: "Medical Coder" },
          { srNum: 46, createdAt: "2023-02-15", username: "user46", email: "user46@example.com", hospital: "Hospital T", location: "Location T", phone: "123-456-7835", designation: "Billing Specialist" },
          { srNum: 47, createdAt: "2023-02-16", username: "user47", email: "user47@example.com", hospital: "Hospital U", location: "Location U", phone: "123-456-7836", designation: "Clinical Informatics Specialist" },
          { srNum: 48, createdAt: "2023-02-17", username: "user48", email: "user48@example.com", hospital: "Hospital V", location: "Location V", phone: "123-456-7837", designation: "Patient Advocate" },
          { srNum: 49, createdAt: "2023-02-18", username: "user49", email: "user49@example.com", hospital: "Hospital W", location: "Location W", phone: "123-456-7838", designation: "Emergency Medical Technician" },
          { srNum: 50, createdAt: "2023-02-19", username: "user50", email: "user50@example.com", hospital: "Hospital X", location: "Location X", phone: "123-456-7839", designation: "Hospital Administrator" },
          { srNum: 51, createdAt: "2023-02-20", username: "user51", email: "user51@example.com", hospital: "Hospital Y", location: "Location Y", phone: "123-456-7840", designation: "Medical Writer" },
          { srNum: 52, createdAt: "2023-02-21", username: "user52", email: "user52@example.com", hospital: "Hospital Z", location: "Location Z", phone: "123-456-7841", designation: "Telemedicine Specialist" },
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
                            <tr key={index}>
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
                              <div className="dropdown text-center">
                              <button
                                className="dropdown-button"
                                onClick={() =>
                                  setOpenDropdown(
                                    openDropdown === user.id ? null : user.id
                                  )
                                }
                                aria-haspopup="true"
                                aria-expanded={openDropdown === user.id}
                              >
                                <i
                                  className={`fa fa-ellipsis-v ${
                                    openDropdown === user.id ? "rotate-icon" : ""
                                  }`}
                                ></i>
                              </button>
                              {openDropdown === user.id && (
                                <div className="dropdown-menu show">
                                  <a
                                    className="dropdown-item"
                                    onClick={() => {
                                      handleEdit(user.id)
                                      setOpenDropdown(null);
                                    } 
                                  }
                                  >
                                    <i className="fa fa-edit"></i> Edit
                                  </a>
                                  <a
                                    className="dropdown-item"
                                    onClick={() => {
                                      handleDelete(user.id)
                                      setOpenDropdown(null);
                                    } 
                                  }
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
}

export default ApproveNonApprove