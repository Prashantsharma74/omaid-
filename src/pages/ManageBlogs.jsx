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
        { Title: "Post Title 1", Description: "Description for post 1", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image1.jpg" },
        { Title: "Post Title 2", Description: "Description for post 2", Category: "Category B", Status: "Draft", "Publish/Private": "Private", Image: "image2.jpg" },
        { Title: "Post Title 3", Description: "Description for post 3", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image3.jpg" },
        { Title: "Post Title 4", Description: "Description for post 4", Category: "Category C", Status: "Archived", "Publish/Private": "Private", Image: "image4.jpg" },
        { Title: "Post Title 5", Description: "Description for post 5", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image5.jpg" },
        { Title: "Post Title 6", Description: "Description for post 6", Category: "Category B", Status: "Draft", "Publish/Private": "Private", Image: "image6.jpg" },
        { Title: "Post Title 7", Description: "Description for post 7", Category: "Category C", Status: "Published", "Publish/Private": "Publish", Image: "image7.jpg" },
        { Title: "Post Title 8", Description: "Description for post 8", Category: "Category A", Status: "Draft", "Publish/Private": "Private", Image: "image8.jpg" },
        { Title: "Post Title 9", Description: "Description for post 9", Category: "Category B", Status: "Published", "Publish/Private": "Publish", Image: "image9.jpg" },
        { Title: "Post Title 10", Description: "Description for post 10", Category: "Category C", Status: "Archived", "Publish/Private": "Private", Image: "image10.jpg" },
        { Title: "Post Title 11", Description: "Description for post 11", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image11.jpg" },
        { Title: "Post Title 12", Description: "Description for post 12", Category: "Category B", Status: "Draft", "Publish/Private": "Private", Image: "image12.jpg" },
        { Title: "Post Title 13", Description: "Description for post 13", Category: "Category C", Status: "Published", "Publish/Private": "Publish", Image: "image13.jpg" },
        { Title: "Post Title 14", Description: "Description for post 14", Category: "Category A", Status: "Draft", "Publish/Private": "Private", Image: "image14.jpg" },
        { Title: "Post Title 15", Description: "Description for post 15", Category: "Category B", Status: "Published", "Publish/Private": "Publish", Image: "image15.jpg" },
        { Title: "Post Title 16", Description: "Description for post 16", Category: "Category C", Status: "Archived", "Publish/Private": "Private", Image: "image16.jpg" },
        { Title: "Post Title 17", Description: "Description for post 17", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image17.jpg" },
        { Title: "Post Title 18", Description: "Description for post 18", Category: "Category B", Status: "Draft", "Publish/Private": "Private", Image: "image18.jpg" },
        { Title: "Post Title 19", Description: "Description for post 19", Category: "Category C", Status: "Published", "Publish/Private": "Publish", Image: "image19.jpg" },
        { Title: "Post Title 20", Description: "Description for post 20", Category: "Category A", Status: "Draft", "Publish/Private": "Private", Image: "image20.jpg" },
        { Title: "Post Title 21", Description: "Description for post 21", Category: "Category B", Status: "Published", "Publish/Private": "Publish", Image: "image21.jpg" },
        { Title: "Post Title 22", Description: "Description for post 22", Category: "Category C", Status: "Archived", "Publish/Private": "Private", Image: "image22.jpg" },
        { Title: "Post Title 23", Description: "Description for post 23", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image23.jpg" },
        { Title: "Post Title 24", Description: "Description for post 24", Category: "Category B", Status: "Draft", "Publish/Private": "Private", Image: "image24.jpg" },
        { Title: "Post Title 25", Description: "Description for post 25", Category: "Category C", Status: "Published", "Publish/Private": "Publish", Image: "image25.jpg" },
        { Title: "Post Title 26", Description: "Description for post 26", Category: "Category A", Status: "Draft", "Publish/Private": "Private", Image: "image26.jpg" },
        { Title: "Post Title 27", Description: "Description for post 27", Category: "Category B", Status: "Published", "Publish/Private": "Publish", Image: "image27.jpg" },
        { Title: "Post Title 28", Description: "Description for post 28", Category: "Category C", Status: "Archived", "Publish/Private": "Private", Image: "image28.jpg" },
        { Title: "Post Title 29", Description: "Description for post 29", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image29.jpg" },
        { Title: "Post Title 30", Description: "Description for post 30", Category: "Category B", Status: "Draft", "Publish/Private": "Private", Image: "image30.jpg" },
        { Title: "Post Title 31", Description: "Description for post 31", Category: "Category C", Status: "Published", "Publish/Private": "Publish", Image: "image31.jpg" },
        { Title: "Post Title 32", Description: "Description for post 32", Category: "Category A", Status: "Draft", "Publish/Private": "Private", Image: "image32.jpg" },
        { Title: "Post Title 33", Description: "Description for post 33", Category: "Category B", Status: "Published", "Publish/Private": "Publish", Image: "image33.jpg" },
        { Title: "Post Title 34", Description: "Description for post 34", Category: "Category C", Status: "Archived", "Publish/Private": "Private", Image: "image34.jpg" },
        { Title: "Post Title 35", Description: "Description for post 35", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image35.jpg" },
        { Title: "Post Title 36", Description: "Description for post 36", Category: "Category B", Status: "Draft", "Publish/Private": "Private", Image: "image36.jpg" },
        { Title: "Post Title 37", Description: "Description for post 37", Category: "Category C", Status: "Published", "Publish/Private": "Publish", Image: "image37.jpg" },
        { Title: "Post Title 38", Description: "Description for post 38", Category: "Category A", Status: "Draft", "Publish/Private": "Private", Image: "image38.jpg" },
        { Title: "Post Title 39", Description: "Description for post 39", Category: "Category B", Status: "Published", "Publish/Private": "Publish", Image: "image39.jpg" },
        { Title: "Post Title 40", Description: "Description for post 40", Category: "Category C", Status: "Archived", "Publish/Private": "Private", Image: "image40.jpg" },
        { Title: "Post Title 41", Description: "Description for post 41", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image41.jpg" },
        { Title: "Post Title 42", Description: "Description for post 42", Category: "Category B", Status: "Draft", "Publish/Private": "Private", Image: "image42.jpg" },
        { Title: "Post Title 43", Description: "Description for post 43", Category: "Category C", Status: "Published", "Publish/Private": "Publish", Image: "image43.jpg" },
        { Title: "Post Title 44", Description: "Description for post 44", Category: "Category A", Status: "Draft", "Publish/Private": "Private", Image: "image44.jpg" },
        { Title: "Post Title 45", Description: "Description for post 45", Category: "Category B", Status: "Published", "Publish/Private": "Publish", Image: "image45.jpg" },
        { Title: "Post Title 46", Description: "Description for post 46", Category: "Category C", Status: "Archived", "Publish/Private": "Private", Image: "image46.jpg" },
        { Title: "Post Title 47", Description: "Description for post 47", Category: "Category A", Status: "Published", "Publish/Private": "Publish", Image: "image47.jpg" },
        { Title: "Post Title 48", Description: "Description for post 48", Category: "Category B", Status: "Draft", "Publish/Private": "Private", Image: "image48.jpg" },
        { Title: "Post Title 49", Description: "Description for post 49", Category: "Category C", Status: "Published", "Publish/Private": "Publish", Image: "image49.jpg" },
        { Title: "Post Title 50", Description: "Description for post 50", Category: "Category A", Status: "Draft", "Publish/Private": "Private", Image: "image50.jpg" },
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
                            <td>{index+1 + currentPage * itemsPerPage}</td>
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
                        <button  style={{
                        padding: "7px 10px",
                        backgroundColor: "#e9ecef",
                        color: "#002538",
                        border: "1px solid lightgrey",
                        borderRadius: "5px 0px 0px 5px",
                      }} onClick={() => handlePageChange(0)} disabled={currentPage === 0} aria-label="First Page">&laquo;</button>
                        <button style={{
                        padding: "7px 10px",
                        backgroundColor: "#e9ecef",
                        color: "#002538",
                        border: "1px solid lightgrey",
                      }} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} aria-label="Previous Page">&#x3c;</button>
                        {getPaginationButtons()}
                        <button style={{
                        padding: "7px 10px",
                        backgroundColor: "#e9ecef",
                        color: "#002538",
                        border: "1px solid lightgrey",
                      }} onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages - 1} aria-label="Next Page">&#x3e;</button>
                        <button style={{
                        padding: "7px 10px",
                        backgroundColor: "#e9ecef",
                        color: "#002538",
                        border: "1px solid lightgrey",
                        borderRadius: "0px 5px 5px 0px",
                      }} onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage >= totalPages - 1} aria-label="Last Page">&raquo;</button>
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
