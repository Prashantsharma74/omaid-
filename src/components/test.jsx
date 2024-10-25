import React, { useEffect, useState, useRef } from "react";
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

  // Create a ref for the dropdown
  const dropdownRef = useRef(null);

  const visiblePages = 4;

  useEffect(() => {
    const fetchData = async () => {
      // Replace with your data fetching logic
      try {
        // Simulating a data fetch
        const data = [
          { srNum: 1, name: "John Doe", email: "john@example.com" },
          { srNum: 2, name: "Jane Smith", email: "jane@example.com" },
          // Add more users as needed
        ];
        setTableData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Event listener to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEdit = (srNum) => {
    const user = tableData.find((u) => u.srNum === srNum);
    if (user) {
      setSelectedUser(user);
      navigate("/sub-admin/add-subadmin", { state: { user } });
    }
  };

  const handleDelete = (srNum) => {
    // Your delete logic here
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTableData(tableData.filter(user => user.srNum !== srNum));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  // Pagination Logic
  const paginatedData = tableData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <main className="app-content">
      <div className="container">
        <h1>Sub Admin Management</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>SR Number</th>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((user, index) => (
                <tr key={index}>
                  <td>{user.srNum}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <div className="dropdown text-center" ref={dropdownRef}>
                      <button
                        className="dropdown-button"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === user.srNum ? null : user.srNum
                          )
                        }
                        aria-haspopup="true"
                        aria-expanded={openDropdown === user.srNum}
                      >
                        <i
                          className={`fa fa-ellipsis-v ${
                            openDropdown === user.srNum ? "rotate-icon" : ""
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
        )}
      </div>
    </main>
  );
};

export default SubAdmin;
