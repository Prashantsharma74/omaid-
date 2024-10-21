import React, { useEffect, useState } from "react";
import del from "../assets/images/del-icon.svg";
import editIcon from "../assets/images/edit-icon.svg";
import { Link } from "react-router-dom";

const ManageBlogs = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setTimeout(() => {
      const users = [
        {
          Title: "Post Title 1",
          Description: "Description for post 1",
          Category: "Category A",
          Status: "Published",
          "Publish/Private": "Publish",
          Image: "image1.jpg",
        },
        {
          Title: "Post Title 2",
          Description: "Description for post 2",
          Category: "Category B",
          Status: "Draft",
          "Publish/Private": "Private",
          Image: "image2.jpg",
        },
        {
          Title: "Post Title 3",
          Description: "Description for post 3",
          Category: "Category A",
          Status: "Published",
          "Publish/Private": "Publish",
          Image: "image3.jpg",
        },
        {
          Title: "Post Title 4",
          Description: "Description for post 4",
          Category: "Category C",
          Status: "Archived",
          "Publish/Private": "Private",
          Image: "image4.jpg",
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

  const toggleStatus = (index) => {
    setTableData((prevData) =>
      prevData.map((item, i) =>
        i === index
          ? {
              ...item,
              Status: item.Status === "Published" ? "Draft" : "Published",
            }
          : item
      )
    );
  };

  const filteredData = tableData.filter(
    (user) =>
      user.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Description.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1>
          Manage Blogs
          </h1>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <Link className="add-btt btn" to="/blogs/manage-blogs/add-blogs">
              <i className="fa-regular fa-plus"></i> Add Blogs
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile">
            <div className="tile-body p-3">
              <div className="table-responsive">
                <div className="table-controls" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="items-per-page-container">
                    <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="items-per-page-select">
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                    </select>
                    <span className="entries-text" style={{ marginLeft: "10px" }}>entries per page</span>
                  </div>
                  <div className="search-container">
                    <span className="search-text" style={{ marginRight: "10px" }}>Search:</span>
                    <input type="text" value={searchTerm} onChange={handleSearchChange} className="search-input" />
                  </div>
                </div>

                {loading ? (
                  <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="loader"></div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered table-hover dt-responsive mt-2">
                      <thead>
                        <tr>
                          <th>Sr.no</th>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Publish/Private</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((row, index) => (
                          <tr key={index}>
                            <td>{index+1}</td>
                            <td>{row.Title}</td>
                            <td>{row.Description}</td>
                            <td>{row.Category}</td>
                            <td>
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  checked={row.Status === "Published"}
                                  onChange={() => toggleStatus(index)}
                                />
                              </div>
                            </td>
                            <td>{row["Publish/Private"]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div className="pagination" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span className="pagination-info">
                        Showing {currentPage * itemsPerPage + 1} to {Math.min((currentPage + 1) * itemsPerPage, filteredData.length)} of {filteredData.length} entries
                      </span>
                      <div>
                        <button onClick={() => handlePageChange(0)} disabled={currentPage === 0} aria-label="First Page">&laquo;</button>
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} aria-label="Previous Page">&#x3c;</button>
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button key={index} className={`page-btn ${index === currentPage ? "active" : ""}`} onClick={() => handlePageChange(index)}>
                            {index + 1}
                          </button>
                        ))}
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1} aria-label="Next Page">&#x3e;</button>
                        <button onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage >= totalPages - 1} aria-label="Last Page">&raquo;</button>
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

export default ManageBlogs;
