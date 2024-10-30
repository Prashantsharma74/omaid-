import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddProgram from "../components/AddProgram";

const ManageProgram = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null); // Store the program to edit
  
  const dropdownRef = useRef(null);
  const visiblePages = 4;

  const fetchData = () => {
    setTimeout(() => {
      const users = [
        {
          srNum: 1,
          title: "Title 1",
          description: "Description for Title 1",
          image:
            "https://images.unsplash.com/photo-1576158113928-4c240eaaf360?w=500&auto=format&fit=crop&q=60",
          duration: "2 hours",
          status: "Active",
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

  const handleDelete = (srNum) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this program!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTableData((prevData) =>
          prevData.filter((item) => item.srNum !== srNum)
        );
        Swal.fire("Deleted!", "Your program has been deleted.", "success");
      }
    });
  };

  const handleAdd = () => {
    setSelectedProgram(null); // For add, no program is selected
    setIsModalOpen(true);
  };

  const handleEdit = (program) => {
    setSelectedProgram(program); // Set the program to edit
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProgram(null);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4 fw-bold">&nbsp; Manage Program</span>
          </h1>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <button onClick={handleAdd} className="add-btt btn">
              <i className="fa-regular fa-plus"></i> Add Program
            </button>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        {/* Table content and other elements remain the same */}
        <tbody>
          {paginatedData.map((user, index) => (
            <tr key={user.srNum}>
              <td>{currentPage * itemsPerPage + index + 1}</td>
              <td>{user.title}</td>
              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    checked={user.status === "Active"}
                    onChange={() => toggleStatus(user.srNum)}
                  />
                </div>
              </td>
              <td>
                <button
                  className="btn"
                  onClick={() => handleEdit(user)}
                  style={{
                    borderBottom: "3px solid #002538",
                  }}
                  title="Manage Program"
                >
                  Edit
                </button>
              </td>
              {/* Other table columns */}
            </tr>
          ))}
        </tbody>
      </div>

      {/* Add Program Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <AddProgram program={selectedProgram} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageProgram;
