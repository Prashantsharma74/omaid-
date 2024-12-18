import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const Faq = () => {
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState([
    {
      id: 3,
      que: "How do I update my profile information?",
      ans: "Go to your profile settings and edit your information.",
      status: true,
    },
  ]);

  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [error, setError] = useState({ question: "", answer: "" });
  const [editId, setEditId] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
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

  useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;
    const newError = { question: "", answer: "" };

    if (!newQuestion) {
      newError.question = "Question is required.";
      hasError = true;
    }
    if (!newAnswer) {
      newError.answer = "Answer is required.";
      hasError = true;
    }

    if (hasError) {
      setError(newError);
      return;
    }

    const editingItem = editId !== null;

    Swal.fire({
      title: editingItem ? "Update Item?" : "Add New Item?",
      text: editingItem
        ? "Are you sure you want to update this item?"
        : "Are you sure you want to add this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (editingItem) {
          setFormData((prevData) =>
            prevData.map((item) =>
              item.id === editId
                ? { ...item, que: newQuestion, ans: newAnswer }
                : item
            )
          );
          Swal.fire("Updated!", "Your item has been updated.", "success");
        } else {
          const newId = Date.now();
          setFormData((prevData) => [
            ...prevData,
            { id: newId, que: newQuestion, ans: newAnswer, status: true },
          ]);
          Swal.fire("Success!", "Your item has been added.", "success");
        }
        resetForm();
      }
    });
  };

  const handleEdit = (id) => {
    const faqToEdit = formData.find((item) => item.id === id);
    setNewQuestion(faqToEdit.que);
    setNewAnswer(faqToEdit.ans);
    setEditId(id);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the FAQ!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData((prevData) => prevData.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Your FAQ has been deleted.", "success");
      }
    });
    setNewQuestion("");
    setNewAnswer("");
  };

  const toggleStatus = (id) => {
    setFormData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };

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

  const filteredData = formData.filter(
    (item) =>
      item.que.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ans.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const resetForm = () => {
    setNewQuestion("");
    setNewAnswer("");
    setError({ question: "", answer: "" });
    setEditId(null);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
          <span className="mr-4 fw-bold">&nbsp;FAQ</span>
        </h1>
      </div>

      <div className="row">
        <div
          className="col-md-12 mx-auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="tile faq-res w-75">
            <div
              className="case-status d-flex justify-content-center text-align-center"
              style={{
                backgroundColor: "#002538",
                color: "#fff",
                height: "50px",
                textAlign: "center",
              }}
            >
              <h4 className="mt-2">Add FAQ</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12 mt-2">
                    <label className="form-label">Question</label>
                    <input
                      className={`form-control mt-2 ${
                        error.question ? "is-invalid" : ""
                      }`}
                      type="text"
                      placeholder="Question"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    {error.question && (
                      <div className="invalid-feedback">{error.question}</div>
                    )}
                  </div>
                  <div className="col-lg-12 mt-3">
                    <label className="form-label">Answer</label>
                    <textarea
                      className={`form-control ${
                        error.answer ? "is-invalid" : ""
                      }`}
                      rows="3"
                      value={newAnswer}
                      placeholder="Answer"
                      onChange={(e) => setNewAnswer(e.target.value)}
                    ></textarea>
                    {error.answer && (
                      <div className="invalid-feedback">{error.answer}</div>
                    )}
                  </div>
                  <div className="col-lg-12 mt-3">
                    <button type="submit" className="btn custom-btn text-white">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
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
                <table className="table mt-2 table-bordered table-hover dt-responsive">
                  <thead>
                    <tr>
                      <th>S.Num</th>
                      <th>Question</th>
                      <th>Answer</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((data, index) => (
                      <tr key={data.id}>
                        <td>{index + 1 + currentPage * itemsPerPage}</td>
                        <td>{data.que}</td>
                        <td>{data.ans}</td>
                        <td>
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              role="switch"
                              checked={data.status}
                              onChange={() => toggleStatus(data.id)}
                            />
                          </div>
                        </td>
                        <td>
                          <div
                            className="dropdown text-center"
                            ref={dropdownRef}
                          >
                            <button
                              className="dropdown-button"
                              onClick={() =>
                                setOpenDropdown(
                                  openDropdown === data.id ? null : data.id
                                )
                              }
                              aria-haspopup="true"
                              aria-expanded={openDropdown === data.id}
                            >
                              <i
                                className={`fa fa-ellipsis-v ${
                                  openDropdown === data.id ? "rotate-icon" : ""
                                }`}
                              ></i>
                            </button>
                            {openDropdown === data.id && (
                              <div className="dropdown-menu show">
                                <a
                                  className="dropdown-item"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleEdit(data.id);
                                    setOpenDropdown(null); // Close the dropdown after edit
                                  }}
                                >
                                  <i className="fa fa-edit"></i> Edit
                                </a>
                                <a
                                  className="dropdown-item"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleDelete(data.id);
                                    setOpenDropdown(null); // Close the dropdown after delete
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
                  <div
                    style={{
                      position: "absolute",
                      right: "12px",
                      margin: "0px 0px 0px 0px",
                    }}
                  >
                    <button
                      style={{
                        padding: "7px 10px",
                        backgroundColor: "#e9ecef",
                        color: "#002538",
                        border: "1px solid lightgrey",
                        borderRadius: "5px 0px 0px 5px",
                      }}
                      onClick={() => handlePageChange(0)}
                      disabled={currentPage === 0}
                      aria-label="First Page"
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
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 0}
                      aria-label="Previous Page"
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
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages - 1}
                      aria-label="Next Page"
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
                      onClick={() => handlePageChange(totalPages - 1)}
                      disabled={currentPage >= totalPages - 1}
                      aria-label="Last Page"
                    >
                      &raquo;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Faq;
