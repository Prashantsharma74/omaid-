import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";

const DietPlan = () => {
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
          srNum: 1,
          title: "Title 1",
          description: "Description 1",
          status: "Active",
        },
        {
          srNum: 2,
          title: "Title 2",
          description: "Description 2",
          status: "Inactive",
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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = data[0];
      const newData = data.slice(1).map((row, index) => ({
        srNum: tableData.length + index + 1,
        title: row[0] || "No Title",
        description: row[1] || "No Description",
        status: row[2] || "Inactive",
      }));

      setTableData((prevData) => [...prevData, ...newData]);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
      alert("Failed to read file. Please try again.");
    };

    reader.readAsBinaryString(file);
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

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1 className="fw-bold">Diet Plan</h1>
      </div>

      <div className="row mb-5">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <Link to="/data-manage/diet-plan/add-diet" className="add-btt btn">
              <i className="fa-regular fa-plus"></i> Add Diet
            </Link>
            <a className="add-btt btn" style={{ marginLeft: "30px" }}>
              <label htmlFor="upload-excel">
                Upload Nutrition &nbsp;{" "}
                <i className="fa-regular fa-file-csv"></i>
                <input
                  type="file"
                  id="upload-excel"
                  style={{ display: "none" }}
                  accept=".xlsx,.xls"
                  onChange={handleFileUpload}
                />
              </label>
            </a>
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
                          <th>Title</th>
                          <th>Description</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((row) => (
                          <tr key={row.srNum}>
                            <td>{currentPage * itemsPerPage + row.srNum}</td>
                            <td>{row.title}</td>
                            <td>{row.description}</td>
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
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            style={{
                              padding: "7px 10px",
                              backgroundColor: "#e9ecef",
                              color: "#002538",
                              border: "1px solid lightgrey",
                            }}
                            key={index}
                            className={`page-btn ${
                              index === currentPage ? "active" : ""
                            }`}
                            onClick={() => handlePageChange(index)}
                          >
                            {index + 1}
                          </button>
                        ))}
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

export default DietPlan;
