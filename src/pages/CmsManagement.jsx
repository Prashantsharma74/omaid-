import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";

const CmsManagement = () => {
  const editorRef = useRef(null);
  const api_key = "3e4i7xmjvw1ebtnzlwcfxtlk0tuwjfui4s1w0l2pibtj6egn";

  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageName, setPageName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [errors, setErrors] = useState({ pageName: "", editorContent: "" });
  const [openDropdown, setOpenDropdown] = useState(null);

  const fetchData = () => {
    setTimeout(() => {
      const users = [
        { srNum: 1, title: "About us", status: "Active" },
        { srNum: 2, title: "Terms & Conditions", status: "Inactive" },
        { srNum: 3, title: "Privacy Policy", status: "Active" },
        { srNum: 4, title: "FAQ", status: "Active" },
        { srNum: 5, title: "Contact Us", status: "Active" },
        { srNum: 6, title: "Support", status: "Inactive" },
        { srNum: 7, title: "Careers", status: "Active" },
        { srNum: 8, title: "Blog", status: "Active" },
        { srNum: 9, title: "Our Team", status: "Inactive" },
        { srNum: 10, title: "Testimonials", status: "Active" },
        { srNum: 11, title: "Pricing", status: "Active" },
        { srNum: 12, title: "User Guide", status: "Inactive" },
        { srNum: 13, title: "Features", status: "Active" },
        { srNum: 14, title: "Integrations", status: "Inactive" },
        { srNum: 15, title: "Security", status: "Active" },
        { srNum: 16, title: "Updates", status: "Active" },
        { srNum: 17, title: "Feedback", status: "Inactive" },
        { srNum: 18, title: "Community", status: "Active" },
        { srNum: 19, title: "Events", status: "Inactive" },
        { srNum: 20, title: "Webinars", status: "Active" },
        { srNum: 21, title: "Affiliate Program", status: "Active" },
        { srNum: 22, title: "Partnerships", status: "Inactive" },
        { srNum: 23, title: "Case Studies", status: "Active" },
        { srNum: 24, title: "Roadmap", status: "Inactive" },
        { srNum: 25, title: "Changelog", status: "Active" },
        { srNum: 26, title: "Media Kit", status: "Active" },
        { srNum: 27, title: "Sitemap", status: "Inactive" },
        { srNum: 28, title: "Accessibility", status: "Active" },
        { srNum: 29, title: "Legal", status: "Inactive" },
        { srNum: 30, title: "Downloads", status: "Active" },
        { srNum: 31, title: "Feedback Form", status: "Active" },
        { srNum: 32, title: "Newsletter", status: "Inactive" },
        { srNum: 33, title: "Announcements", status: "Active" },
        { srNum: 34, title: "Help Center", status: "Active" },
        { srNum: 35, title: "Documentation", status: "Inactive" },
        { srNum: 36, title: "Service Status", status: "Active" },
        { srNum: 37, title: "API Reference", status: "Active" },
        { srNum: 38, title: "Getting Started", status: "Inactive" },
        { srNum: 39, title: "Workshops", status: "Active" },
        { srNum: 40, title: "User Stories", status: "Active" },
        { srNum: 41, title: "Media Coverage", status: "Inactive" },
        { srNum: 42, title: "Press Releases", status: "Active" },
        { srNum: 43, title: "Investors", status: "Active" },
        { srNum: 44, title: "Vision & Mission", status: "Inactive" },
        { srNum: 45, title: "Corporate Responsibility", status: "Active" },
        { srNum: 46, title: "Product Updates", status: "Active" },
        { srNum: 47, title: "User Community", status: "Inactive" },
        { srNum: 48, title: "B2B Solutions", status: "Active" },
        { srNum: 49, title: "B2C Solutions", status: "Inactive" },
        { srNum: 50, title: "API Documentation", status: "Active" },
        { srNum: 51, title: "Support Resources", status: "Active" },
        { srNum: 52, title: "Customer Support", status: "Inactive" },
        { srNum: 53, title: "User Research", status: "Active" },
        { srNum: 54, title: "Quality Assurance", status: "Active" },
        { srNum: 55, title: "Terms of Use", status: "Inactive" },
      ];
      setTableData(users);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const toggleStatus = (srNum) => {
    setTableData((prevData) =>
      prevData.map((item) =>
        item.srNum === srNum
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  };

  const filteredData = tableData.filter(
    (user) =>
      user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = { pageName: "", editorContent: "" };

    if (!pageName) {
      newErrors.pageName = "Page Name is required.";
    }

    // Check if editorContent is empty
    if (!editorContent || editorContent.trim() === "") {
      newErrors.editorContent = "Page Content is required.";
    }

    if (newErrors.pageName || newErrors.editorContent) {
      setErrors(newErrors);
      return;
    }

    // Show confirmation dialog
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
          setTableData((prevData) =>
            prevData.map((item) =>
              item.srNum === editingItem.srNum
                ? { ...item, title: pageName, content: editorContent }
                : item
            )
          );
          setEditingItem(null);
        } else {
          const newItem = {
            srNum: tableData.length + 1,
            title: pageName,
            content: editorContent,
            status: "Active",
          };
          setTableData((prevData) => [...prevData, newItem]);
        }
        resetForm();
        Swal.fire("Success!", "Your item has been saved.", "success");
      }
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setPageName(item.title);
    setEditorContent(item.content || "");
  };

  const handleDelete = (srNum) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setTableData((prevData) =>
          prevData.filter((item) => item.srNum !== srNum)
        );
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const resetForm = () => {
    setPageName("");
    setEditorContent("");
    setErrors({ pageName: "", editorContent: "" });
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4 fw-bold">&nbsp;Add Cms</span>
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div
              className="case-status d-flex justify-content-center text-align-center"
              style={{
                backgroundColor: "#002538",
                color: "#fff",
                height: "50px",
                borderRadius: "10px 10px 0px 0px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h4 style={{ marginTop: "12px" }}>Add CMS</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12 mt-2">
                      <label className="form-label" htmlFor="pageName">
                        Page Name
                      </label>
                      <input
                        className={`form-control ${
                          errors.pageName ? "is-invalid" : ""
                        }`}
                        name="pageName"
                        id="pageName"
                        type="text"
                        placeholder="Page Name"
                        value={pageName}
                        onChange={(e) => setPageName(e.target.value)}
                      />
                      {errors.pageName && (
                        <div className="invalid-feedback">
                          {errors.pageName}
                        </div>
                      )}
                    </div>
                    <div className="col-lg-12 mt-2">
                      <label className="form-label" htmlFor="editorContent">
                        Page Content
                      </label>
                      <div>
                        <Editor
                          apiKey={api_key}
                          onEditorChange={(content) =>
                            setEditorContent(content)
                          }
                          onInit={(_evt, editor) =>
                            (editorRef.current = editor)
                          }
                        />
                      </div>
                      {errors.editorContent && (
                        <div className="invalid-feedback d-block">
                          {errors.editorContent}
                        </div>
                      )}
                    </div>
                    <div className="col-lg-12 col-sm-12 col-xs-12 col-md-12 mt-2 text-center">
                      <button
                        className="btn custom-btn text-white mt-2 w-20pr"
                        type="submit"
                      >
                        Add Page
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={25}
                          height={25}
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill="#fff"
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
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
                  <div className="table-responsive">
                    <table
                      className="table table-bordered table-hover dt-responsive mt-2"
                      id="data-table"
                    >
                      <thead>
                        <tr>
                          <th>Sr. num</th>
                          <th>Page name</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData?.length > 0 ? (
                          paginatedData?.map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1 + currentPage * itemsPerPage}</td>
                              <td>{row.title}</td>
                              <td>
                                <div className="form-check form-switch">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    role="switch"
                                    checked={row.status === "Active"}
                                    onChange={() => toggleStatus(row.srNum)}
                                  />
                                </div>
                              </td>
                              <td>
                                <div className="dropdown text-center">
                                  <button
                                    className="dropdown-button"
                                    onClick={() =>
                                      setOpenDropdown(
                                        openDropdown === row.srNum ? null : row.srNum
                                      )
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={openDropdown === row.srNum}
                                  >
                                    <i
                                      className={`fa fa-ellipsis-v ${
                                        openDropdown === row.srNum
                                          ? "rotate-icon"
                                          : ""
                                      }`}
                                    ></i>
                                  </button>
                                  {openDropdown === row.srNum && (
                                    <div className="dropdown-menu show">
                                      <a
                                        className="dropdown-item"
                                        onClick={() => {
                                          handleEdit(data.srNum)
                                          setOpenDropdown(null);
                                        } 
                                      }
                                      >
                                        <i className="fa fa-edit"></i> Edit
                                      </a>
                                      <a
                                        className="dropdown-item"
                                        onClick={() => {
                                          handleDelete(data.srNum)
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
                          ))
                        ) : (
                          <h1>No Data Found....</h1>
                        )}
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
                          className="page-btn"
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
                          className="page-btn"
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
                          className="page-btn"
                          onClick={() => handlePageChange(totalPages - 1)}
                          disabled={currentPage >= totalPages - 1}
                          aria-label="Last Page"
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

export default CmsManagement;
