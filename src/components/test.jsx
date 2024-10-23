import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const SubAdmin = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);

  const visiblePages = 4;

  const getPaginationButtons = () => {
    // ... pagination logic remains unchanged
  };

  const fetchData = () => {
    // ... fetching logic remains unchanged
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleItemsPerPageChange = (e) => {
    // ... handle items per page change logic remains unchanged
  };

  const handleSearchChange = (e) => {
    // ... handle search change logic remains unchanged
  };

  const handlePageChange = (page) => {
    // ... handle page change logic remains unchanged
  };

  const handleToggleStatus = (id) => {
    // ... handle toggle status logic remains unchanged
  };

  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
    // Implement edit logic, e.g., navigate to edit page
  };

  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
    // Implement delete logic, e.g., show confirmation dialog and delete user
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
      {/* ... UI elements above remain unchanged */}
      <tbody>
        {paginatedData.map((user, index) => (
          <tr key={index}>
            <td>{index + 1 + currentPage * itemsPerPage}</td>
            <td>{format(new Date(user.createdAt), "dd MMMM yyyy")}</td>
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
                    setOpenDropdown(openDropdown === user.id ? null : user.id)
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
                        handleEdit(user.id);
                        setOpenDropdown(null);
                      }}
                    >
                      <i className="fa fa-edit"></i> Edit
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        handleDelete(user.id);
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
      {/* ... pagination logic below remains unchanged */}
    </main>
  );
};

export default SubAdmin;
