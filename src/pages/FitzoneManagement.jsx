import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FitzoneManagement = () => {
  const DEFAULT_ITEMS_PER_PAGE = 10;
  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    // Simulating a data fetch with a timeout
    setTimeout(() => {
      const users = [
        {
          srNum: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 1,
          subscriptionPlan: "Premium",
          amount: 450,
          date: "2024-01-01",
          billingPeriod: "01.02.23 - 01.03.24",
        },
        {
          srNum: 2,
          name: "Jane Smith",
          email: "jane.smith@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 188,
          subscriptionPlan: "Premium",
          amount: 999,
          date: "2024-01-01",
          billingPeriod: "01.02.23 - 01.03.24",
        },
        {
          srNum: 3,
          name: "Michael Johnson",
          email: "michael.johnson@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 54,
          subscriptionPlan: "Standard",
          amount: 890,
          date: "2024-01-01",
          billingPeriod: "01.02.23 - 01.03.24",
        },
        {
          srNum: 4,
          name: "Emily Davis",
          email: "emily.davis@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 1554,
          subscriptionPlan: "Premium",
          amount: 450,
          date: "2024-01-01",
          billingPeriod: "01.02.23 - 01.03.24",
        },
        {
          srNum: 5,
          name: "John Smith",
          email: "john.smith@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 12141,
          subscriptionPlan: "Basic",
          amount: 999,
          date: "2024-01-01",
          billingPeriod: "01.02.23 - 01.03.24",
        },
        {
          srNum: 6,
          name: "Alice Brown",
          email: "alice.brown@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 202,
          subscriptionPlan: "Standard",
          amount: 350,
          date: "2024-01-02",
          billingPeriod: "01.03.23 - 01.04.24",
        },
        {
          srNum: 7,
          name: "Chris Green",
          email: "chris.green@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 305,
          subscriptionPlan: "Premium",
          amount: 750,
          date: "2024-01-02",
          billingPeriod: "01.03.23 - 01.04.24",
        },
        {
          srNum: 8,
          name: "Sarah White",
          email: "sarah.white@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 408,
          subscriptionPlan: "Basic",
          amount: 199,
          date: "2024-01-03",
          billingPeriod: "01.04.23 - 01.05.24",
        },
        {
          srNum: 9,
          name: "David Black",
          email: "david.black@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 509,
          subscriptionPlan: "Premium",
          amount: 850,
          date: "2024-01-03",
          billingPeriod: "01.04.23 - 01.05.24",
        },
        {
          srNum: 10,
          name: "Jessica Yellow",
          email: "jessica.yellow@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 610,
          subscriptionPlan: "Standard",
          amount: 500,
          date: "2024-01-04",
          billingPeriod: "01.05.23 - 01.06.24",
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

  const filteredData = tableData.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1 className="fw-bold">Fitzone Management</h1>
      </div>

      <div className="row mb-5">
        <div className="col-md-12 px-5">
          <div className="bt-ad-emp">
            <a href="#" className="add-btt btn">
              <i className="fa-regular fa-plus"></i> Add Fitzone
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
                          <th>Name</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData?.map((row, index) => (
                          <tr key={index}>
                            <td>{row.srNum}</td>
                            <td>{row.name}</td>
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

export default FitzoneManagement;
