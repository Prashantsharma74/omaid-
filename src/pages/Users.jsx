import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
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
        { id: 1, accountId: "U001", username: "john_doe", email: "john.doe@example.com", phone: "123-456-7890", assignedBy: "A", status: "Active" },
        { id: 2, accountId: "U002", username: "jane_smith", email: "jane.smith@example.com", phone: "234-567-8901", assignedBy: "B", status: "Inactive" },
        { id: 3, accountId: "U003", username: "alice_jones", email: "alice.jones@example.com", phone: "345-678-9012", assignedBy: "C", status: "Active" },
        { id: 4, accountId: "U004", username: "bob_brown", email: "bob.brown@example.com", phone: "456-789-0123", assignedBy: "D", status: "Active" },
        { id: 5, accountId: "U005", username: "charlie_white", email: "charlie.white@example.com", phone: "567-890-1234", assignedBy: "E", status: "Inactive" },
        { id: 6, accountId: "U006", username: "david_black", email: "david.black@example.com", phone: "678-901-2345", assignedBy: "F", status: "Active" },
        { id: 7, accountId: "U007", username: "eve_green", email: "eve.green@example.com", phone: "789-012-3456", assignedBy: "G", status: "Inactive" },
        { id: 8, accountId: "U008", username: "frank_yellow", email: "frank.yellow@example.com", phone: "890-123-4567", assignedBy: "H", status: "Active" },
        { id: 9, accountId: "U009", username: "grace_purple", email: "grace.purple@example.com", phone: "901-234-5678", assignedBy: "I", status: "Inactive" },
        { id: 10, accountId: "U010", username: "hank_red", email: "hank.red@example.com", phone: "012-345-6789", assignedBy: "J", status: "Active" },
        { id: 11, accountId: "U011", username: "iris_orange", email: "iris.orange@example.com", phone: "123-456-7891", assignedBy: "K", status: "Inactive" },
        { id: 12, accountId: "U012", username: "jack_blue", email: "jack.blue@example.com", phone: "234-567-8902", assignedBy: "L", status: "Active" },
        { id: 13, accountId: "U013", username: "karen_cyan", email: "karen.cyan@example.com", phone: "345-678-9013", assignedBy: "M", status: "Inactive" },
        { id: 14, accountId: "U014", username: "leo_magenta", email: "leo.magenta@example.com", phone: "456-789-0124", assignedBy: "N", status: "Active" },
        { id: 15, accountId: "U015", username: "mona_violet", email: "mona.violet@example.com", phone: "567-890-1235", assignedBy: "O", status: "Inactive" },
        { id: 16, accountId: "U016", username: "nina_turquoise", email: "nina.turquoise@example.com", phone: "678-901-2346", assignedBy: "P", status: "Active" },
        { id: 17, accountId: "U017", username: "oliver_silver", email: "oliver.silver@example.com", phone: "789-012-3457", assignedBy: "Q", status: "Inactive" },
        { id: 18, accountId: "U018", username: "paul_gold", email: "paul.gold@example.com", phone: "890-123-4568", assignedBy: "R", status: "Active" },
        { id: 19, accountId: "U019", username: "quinn_black", email: "quinn.black@example.com", phone: "901-234-5679", assignedBy: "S", status: "Inactive" },
        { id: 20, accountId: "U020", username: "rachel_white", email: "rachel.white@example.com", phone: "012-345-6780", assignedBy: "T", status: "Active" },
        { id: 21, accountId: "U021", username: "sam_gray", email: "sam.gray@example.com", phone: "123-456-7892", assignedBy: "U", status: "Inactive" },
        { id: 22, accountId: "U022", username: "tina_brown", email: "tina.brown@example.com", phone: "234-567-8903", assignedBy: "V", status: "Active" },
        { id: 23, accountId: "U023", username: "uma_pink", email: "uma.pink@example.com", phone: "345-678-9014", assignedBy: "W", status: "Inactive" },
        { id: 24, accountId: "U024", username: "victor_red", email: "victor.red@example.com", phone: "456-789-0125", assignedBy: "X", status: "Active" },
        { id: 25, accountId: "U025", username: "will_yellow", email: "will.yellow@example.com", phone: "567-890-1236", assignedBy: "Y", status: "Inactive" },
        { id: 26, accountId: "U026", username: "xena_green", email: "xena.green@example.com", phone: "678-901-2347", assignedBy: "Z", status: "Active" },
        { id: 27, accountId: "U027", username: "yara_blue", email: "yara.blue@example.com", phone: "789-012-3458", assignedBy: "A", status: "Inactive" },
        { id: 28, accountId: "U028", username: "zane_purple", email: "zane.purple@example.com", phone: "890-123-4569", assignedBy: "B", status: "Active" },
        { id: 29, accountId: "U029", username: "aaron_orange", email: "aaron.orange@example.com", phone: "901-234-5670", assignedBy: "C", status: "Inactive" },
        { id: 30, accountId: "U030", username: "brian_cyan", email: "brian.cyan@example.com", phone: "012-345-6781", assignedBy: "D", status: "Active" },
        { id: 31, accountId: "U031", username: "carl_magenta", email: "carl.magenta@example.com", phone: "123-456-7893", assignedBy: "E", status: "Inactive" },
        { id: 32, accountId: "U032", username: "debbie_violet", email: "debbie.violet@example.com", phone: "234-567-8904", assignedBy: "F", status: "Active" },
        { id: 33, accountId: "U033", username: "elliot_silver", email: "elliot.silver@example.com", phone: "345-678-9015", assignedBy: "G", status: "Inactive" },
        { id: 34, accountId: "U034", username: "fiona_gold", email: "fiona.gold@example.com", phone: "456-789-0126", assignedBy: "H", status: "Active" },
        { id: 35, accountId: "U035", username: "george_black", email: "george.black@example.com", phone: "567-890-1237", assignedBy: "I", status: "Inactive" },
        { id: 36, accountId: "U036", username: "hannah_white", email: "hannah.white@example.com", phone: "678-901-2348", assignedBy: "J", status: "Active" },
        { id: 37, accountId: "U037", username: "ivan_gray", email: "ivan.gray@example.com", phone: "789-012-3459", assignedBy: "K", status: "Inactive" },
        { id: 38, accountId: "U038", username: "julia_brown", email: "julia.brown@example.com", phone: "890-123-4570", assignedBy: "L", status: "Active" },
        { id: 39, accountId: "U039", username: "kevin_blue", email: "kevin.blue@example.com", phone: "901-234-5671", assignedBy: "M", status: "Inactive" },
        { id: 40, accountId: "U040", username: "lisa_red", email: "lisa.red@example.com", phone: "012-345-6782", assignedBy: "N", status: "Active" },
        { id: 41, accountId: "U041", username: "mike_green", email: "mike.green@example.com", phone: "123-456-7894", assignedBy: "O", status: "Inactive" },
        { id: 42, accountId: "U042", username: "nora_yellow", email: "nora.yellow@example.com", phone: "234-567-8905", assignedBy: "P", status: "Active" },
        { id: 43, accountId: "U043", username: "oscar_orange", email: "oscar.orange@example.com", phone: "345-678-9016", assignedBy: "Q", status: "Inactive" },
        { id: 44, accountId: "U044", username: "paula_purple", email: "paula.purple@example.com", phone: "456-789-0127", assignedBy: "R", status: "Active" },
        { id: 45, accountId: "U045", username: "quincy_cyan", email: "quincy.cyan@example.com", phone: "567-890-1238", assignedBy: "S", status: "Inactive" },
        { id: 46, accountId: "U046", username: "rachel_magenta", email: "rachel.magenta@example.com", phone: "678-901-2349", assignedBy: "T", status: "Active" },
        { id: 47, accountId: "U047", username: "steve_black", email: "steve.black@example.com", phone: "789-012-3460", assignedBy: "U", status: "Inactive" },
        { id: 48, accountId: "U048", username: "tina_white", email: "tina.white@example.com", phone: "890-123-4571", assignedBy: "V", status: "Active" },
        { id: 49, accountId: "U049", username: "uma_gray", email: "uma.gray@example.com", phone: "901-234-5672", assignedBy: "W", status: "Inactive" },
        { id: 50, accountId: "U050", username: "victor_red", email: "victor.red@example.com", phone: "012-345-6783", assignedBy: "X", status: "Active" },
        { id: 51, accountId: "U051", username: "will_yellow", email: "will.yellow@example.com", phone: "123-456-7895", assignedBy: "Y", status: "Inactive" },
        { id: 52, accountId: "U052", username: "xena_green", email: "xena.green@example.com", phone: "234-567-8906", assignedBy: "Z", status: "Active" },
        { id: 53, accountId: "U053", username: "yara_blue", email: "yara.blue@example.com", phone: "345-678-9017", assignedBy: "A", status: "Inactive" },
        { id: 54, accountId: "U054", username: "zane_purple", email: "zane.purple@example.com", phone: "456-789-0128", assignedBy: "B", status: "Active" },
        { id: 55, accountId: "U055", username: "aaron_orange", email: "aaron.orange@example.com", phone: "567-890-1239", assignedBy: "C", status: "Inactive" },
        { id: 56, accountId: "U056", username: "brian_cyan", email: "brian.cyan@example.com", phone: "678-901-2350", assignedBy: "D", status: "Active" },
        { id: 57, accountId: "U057", username: "carl_magenta", email: "carl.magenta@example.com", phone: "789-012-3461", assignedBy: "E", status: "Inactive" },
        { id: 58, accountId: "U058", username: "debbie_violet", email: "debbie.violet@example.com", phone: "890-123-4572", assignedBy: "F", status: "Active" },
        { id: 59, accountId: "U059", username: "elliot_silver", email: "elliot.silver@example.com", phone: "901-234-5673", assignedBy: "G", status: "Inactive" },
        { id: 60, accountId: "U060", username: "fiona_gold", email: "fiona.gold@example.com", phone: "012-345-6784", assignedBy: "H", status: "Active" },
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
            <span className="mr-4 fw-bold">&nbsp; All Users</span>
          </h1>
          <p></p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <Link className="add-btt btn" to="/users/add-user">
              <i className="fa-regular fa-plus"></i> Add User
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
                          <th>User Id</th>
                          <th>Username </th>
                          <th>Email ID</th>
                          <th>Phone Number</th>
                          <th>Sub Admin Name</th>
                          <th>Status</th>
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
                            <td>{user.assignedBy}</td>
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
};

export default Users;
