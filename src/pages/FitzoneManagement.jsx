import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FitzoneManagement = () => {
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
        {
          srNum: 11,
          name: "Mark Wilson",
          email: "mark.wilson@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 711,
          subscriptionPlan: "Basic",
          amount: 300,
          date: "2024-01-05",
          billingPeriod: "01.06.23 - 01.07.24",
        },
        {
          srNum: 12,
          name: "Laura Garcia",
          email: "laura.garcia@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 812,
          subscriptionPlan: "Premium",
          amount: 1200,
          date: "2024-01-05",
          billingPeriod: "01.06.23 - 01.07.24",
        },
        {
          srNum: 13,
          name: "Tom Martinez",
          email: "tom.martinez@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 913,
          subscriptionPlan: "Standard",
          amount: 450,
          date: "2024-01-06",
          billingPeriod: "01.07.23 - 01.08.24",
        },
        {
          srNum: 14,
          name: "Anna Rodriguez",
          email: "anna.rodriguez@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 1014,
          subscriptionPlan: "Basic",
          amount: 250,
          date: "2024-01-06",
          billingPeriod: "01.07.23 - 01.08.24",
        },
        {
          srNum: 15,
          name: "Jake Lee",
          email: "jake.lee@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 1115,
          subscriptionPlan: "Premium",
          amount: 1100,
          date: "2024-01-07",
          billingPeriod: "01.08.23 - 01.09.24",
        },
        {
          srNum: 16,
          name: "Linda Hall",
          email: "linda.hall@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 1216,
          subscriptionPlan: "Standard",
          amount: 500,
          date: "2024-01-07",
          billingPeriod: "01.08.23 - 01.09.24",
        },
        {
          srNum: 17,
          name: "Robert King",
          email: "robert.king@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 1317,
          subscriptionPlan: "Basic",
          amount: 299,
          date: "2024-01-08",
          billingPeriod: "01.09.23 - 01.10.24",
        },
        {
          srNum: 18,
          name: "Sophia Wright",
          email: "sophia.wright@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 1418,
          subscriptionPlan: "Premium",
          amount: 750,
          date: "2024-01-08",
          billingPeriod: "01.09.23 - 01.10.24",
        },
        {
          srNum: 19,
          name: "Henry Green",
          email: "henry.green@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 1519,
          subscriptionPlan: "Standard",
          amount: 420,
          date: "2024-01-09",
          billingPeriod: "01.10.23 - 01.11.24",
        },
        {
          srNum: 20,
          name: "Olivia Brown",
          email: "olivia.brown@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 1620,
          subscriptionPlan: "Basic",
          amount: 210,
          date: "2024-01-09",
          billingPeriod: "01.10.23 - 01.11.24",
        },
        {
          srNum: 21,
          name: "William Davis",
          email: "william.davis@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 1721,
          subscriptionPlan: "Premium",
          amount: 980,
          date: "2024-01-10",
          billingPeriod: "01.11.23 - 01.12.24",
        },
        {
          srNum: 22,
          name: "Mia Miller",
          email: "mia.miller@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 1822,
          subscriptionPlan: "Standard",
          amount: 540,
          date: "2024-01-10",
          billingPeriod: "01.11.23 - 01.12.24",
        },
        {
          srNum: 23,
          name: "James Taylor",
          email: "james.taylor@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 1923,
          subscriptionPlan: "Basic",
          amount: 320,
          date: "2024-01-11",
          billingPeriod: "01.12.23 - 01.01.25",
        },
        {
          srNum: 24,
          name: "Emma Thomas",
          email: "emma.thomas@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 2024,
          subscriptionPlan: "Premium",
          amount: 1190,
          date: "2024-01-11",
          billingPeriod: "01.12.23 - 01.01.25",
        },
        {
          srNum: 25,
          name: "Liam Jackson",
          email: "liam.jackson@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 2125,
          subscriptionPlan: "Standard",
          amount: 420,
          date: "2024-01-12",
          billingPeriod: "01.01.24 - 01.02.25",
        },
        {
          srNum: 26,
          name: "Ava Martinez",
          email: "ava.martinez@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 2226,
          subscriptionPlan: "Basic",
          amount: 199,
          date: "2024-01-12",
          billingPeriod: "01.01.24 - 01.02.25",
        },
        {
          srNum: 27,
          name: "Ethan White",
          email: "ethan.white@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 2327,
          subscriptionPlan: "Premium",
          amount: 950,
          date: "2024-01-13",
          billingPeriod: "01.02.24 - 01.03.25",
        },
        {
          srNum: 28,
          name: "Sophia Harris",
          email: "sophia.harris@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 2428,
          subscriptionPlan: "Standard",
          amount: 360,
          date: "2024-01-13",
          billingPeriod: "01.02.24 - 01.03.25",
        },
        {
          srNum: 29,
          name: "Noah Lewis",
          email: "noah.lewis@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 2529,
          subscriptionPlan: "Basic",
          amount: 250,
          date: "2024-01-14",
          billingPeriod: "01.03.24 - 01.04.25",
        },
        {
          srNum: 30,
          name: "Isabella Young",
          email: "isabella.young@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 2630,
          subscriptionPlan: "Premium",
          amount: 800,
          date: "2024-01-14",
          billingPeriod: "01.03.24 - 01.04.25",
        },
        {
          srNum: 31,
          name: "Mason King",
          email: "mason.king@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 2731,
          subscriptionPlan: "Standard",
          amount: 470,
          date: "2024-01-15",
          billingPeriod: "01.04.24 - 01.05.25",
        },
        {
          srNum: 32,
          name: "Charlotte Scott",
          email: "charlotte.scott@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 2832,
          subscriptionPlan: "Basic",
          amount: 220,
          date: "2024-01-15",
          billingPeriod: "01.04.24 - 01.05.25",
        },
        {
          srNum: 33,
          name: "Lucas Allen",
          email: "lucas.allen@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 2933,
          subscriptionPlan: "Premium",
          amount: 600,
          date: "2024-01-16",
          billingPeriod: "01.05.24 - 01.06.25",
        },
        {
          srNum: 34,
          name: "Amelia Wright",
          email: "amelia.wright@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 3034,
          subscriptionPlan: "Standard",
          amount: 480,
          date: "2024-01-16",
          billingPeriod: "01.05.24 - 01.06.25",
        },
        {
          srNum: 35,
          name: "Henry Moore",
          email: "henry.moore@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 3135,
          subscriptionPlan: "Basic",
          amount: 310,
          date: "2024-01-17",
          billingPeriod: "01.06.24 - 01.07.25",
        },
        {
          srNum: 36,
          name: "Evelyn Turner",
          email: "evelyn.turner@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 3236,
          subscriptionPlan: "Premium",
          amount: 1300,
          date: "2024-01-17",
          billingPeriod: "01.06.24 - 01.07.25",
        },
        {
          srNum: 37,
          name: "Jack Hall",
          email: "jack.hall@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 3337,
          subscriptionPlan: "Standard",
          amount: 450,
          date: "2024-01-18",
          billingPeriod: "01.07.24 - 01.08.25",
        },
        {
          srNum: 38,
          name: "Grace Allen",
          email: "grace.allen@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 3438,
          subscriptionPlan: "Basic",
          amount: 200,
          date: "2024-01-18",
          billingPeriod: "01.07.24 - 01.08.25",
        },
        {
          srNum: 39,
          name: "Oliver Carter",
          email: "oliver.carter@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 3539,
          subscriptionPlan: "Premium",
          amount: 700,
          date: "2024-01-19",
          billingPeriod: "01.08.24 - 01.09.25",
        },
        {
          srNum: 40,
          name: "Chloe Evans",
          email: "chloe.evans@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 3640,
          subscriptionPlan: "Standard",
          amount: 330,
          date: "2024-01-19",
          billingPeriod: "01.08.24 - 01.09.25",
        },
        {
          srNum: 41,
          name: "Daniel Adams",
          email: "daniel.adams@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 3741,
          subscriptionPlan: "Basic",
          amount: 270,
          date: "2024-01-20",
          billingPeriod: "01.09.24 - 01.10.25",
        },
        {
          srNum: 42,
          name: "Victoria Hill",
          email: "victoria.hill@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 3842,
          subscriptionPlan: "Premium",
          amount: 900,
          date: "2024-01-20",
          billingPeriod: "01.09.24 - 01.10.25",
        },
        {
          srNum: 43,
          name: "Matthew Green",
          email: "matthew.green@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 3943,
          subscriptionPlan: "Standard",
          amount: 480,
          date: "2024-01-21",
          billingPeriod: "01.10.24 - 01.11.25",
        },
        {
          srNum: 44,
          name: "Samantha Scott",
          email: "samantha.scott@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 4044,
          subscriptionPlan: "Basic",
          amount: 230,
          date: "2024-01-21",
          billingPeriod: "01.10.24 - 01.11.25",
        },
        {
          srNum: 45,
          name: "Anthony Young",
          email: "anthony.young@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 4145,
          subscriptionPlan: "Premium",
          amount: 880,
          date: "2024-01-22",
          billingPeriod: "01.11.24 - 01.12.25",
        },
        {
          srNum: 46,
          name: "Lily Lewis",
          email: "lily.lewis@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 4246,
          subscriptionPlan: "Standard",
          amount: 320,
          date: "2024-01-22",
          billingPeriod: "01.11.24 - 01.12.25",
        },
        {
          srNum: 47,
          name: "Ella Hill",
          email: "ella.hill@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 4347,
          subscriptionPlan: "Basic",
          amount: 200,
          date: "2024-01-23",
          billingPeriod: "01.12.24 - 01.01.25",
        },
        {
          srNum: 48,
          name: "Gabriel King",
          email: "gabriel.king@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 4448,
          subscriptionPlan: "Premium",
          amount: 950,
          date: "2024-01-23",
          billingPeriod: "01.12.24 - 01.01.25",
        },
        {
          srNum: 49,
          name: "Zoe Moore",
          email: "zoe.moore@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 4549,
          subscriptionPlan: "Standard",
          amount: 270,
          date: "2024-01-24",
          billingPeriod: "01.01.25 - 01.02.25",
        },
        {
          srNum: 50,
          name: "Michael Turner",
          email: "michael.turner@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 4650,
          subscriptionPlan: "Basic",
          amount: 150,
          date: "2024-01-24",
          billingPeriod: "01.01.25 - 01.02.25",
        },
        {
          srNum: 51,
          name: "Ava Wilson",
          email: "ava.wilson@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 4751,
          subscriptionPlan: "Premium",
          amount: 990,
          date: "2024-01-25",
          billingPeriod: "01.02.25 - 01.03.25",
        },
        {
          srNum: 52,
          name: "James Brown",
          email: "james.brown@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 4852,
          subscriptionPlan: "Standard",
          amount: 480,
          date: "2024-01-25",
          billingPeriod: "01.02.25 - 01.03.25",
        },
        {
          srNum: 53,
          name: "Amelia Taylor",
          email: "amelia.taylor@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 4953,
          subscriptionPlan: "Basic",
          amount: 370,
          date: "2024-01-26",
          billingPeriod: "01.03.25 - 01.04.25",
        },
        {
          srNum: 54,
          name: "Lucas Johnson",
          email: "lucas.johnson@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 5054,
          subscriptionPlan: "Premium",
          amount: 1200,
          date: "2024-01-26",
          billingPeriod: "01.03.25 - 01.04.25",
        },
        {
          srNum: 55,
          name: "Charlotte Williams",
          email: "charlotte.williams@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 5155,
          subscriptionPlan: "Standard",
          amount: 280,
          date: "2024-01-27",
          billingPeriod: "01.04.25 - 01.05.25",
        },
        {
          srNum: 56,
          name: "Ethan Brown",
          email: "ethan.brown@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 5256,
          subscriptionPlan: "Basic",
          amount: 490,
          date: "2024-01-27",
          billingPeriod: "01.04.25 - 01.05.25",
        },
        {
          srNum: 57,
          name: "Mia Johnson",
          email: "mia.johnson@example.com",
          paymentMethod: "Debit Card",
          invoiceNum: 5357,
          subscriptionPlan: "Premium",
          amount: 660,
          date: "2024-01-28",
          billingPeriod: "01.05.25 - 01.06.25",
        },
        {
          srNum: 58,
          name: "Isabella Garcia",
          email: "isabella.garcia@example.com",
          paymentMethod: "Bank Transfer",
          invoiceNum: 5458,
          subscriptionPlan: "Standard",
          amount: 340,
          date: "2024-01-28",
          billingPeriod: "01.05.25 - 01.06.25",
        },
        {
          srNum: 59,
          name: "Oliver Lee",
          email: "oliver.lee@example.com",
          paymentMethod: "Credit Card",
          invoiceNum: 5559,
          subscriptionPlan: "Basic",
          amount: 230,
          date: "2024-01-29",
          billingPeriod: "01.06.25 - 01.07.25",
        },
        {
          srNum: 60,
          name: "Ella White",
          email: "ella.white@example.com",
          paymentMethod: "PayPal",
          invoiceNum: 5660,
          subscriptionPlan: "Premium",
          amount: 950,
          date: "2024-01-29",
          billingPeriod: "01.06.25 - 01.07.25",
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
            <Link to="/fitzone-manage/add-fitzone" className="add-btt btn">
              <i className="fa-regular fa-plus"></i> Add Fitzone
            </Link>
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

export default FitzoneManagement;
