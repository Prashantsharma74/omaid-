import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || { user: {} }; // Access the user data

  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    email: "",
    phone: "",
    assignSubAdmin: "",
    dob: "",
    height: "",
    weight: "",
    gender: "",
    password: "",
    nutrition: "",
    waterTracking: false,
  });

  useEffect(() => {
    // Check if user data exists and update formData
    if (user) {
      setFormData({
        name: user.username || "",
        userId: user.accountId || "",
        email: user.email || "",
        phone: user.phone || "",
        assignSubAdmin: user.assignSubAdmin || "", // Assuming these fields exist in user
        dob: user.dob || "", // Assuming these fields exist in user
        height: user.height || "", // Assuming these fields exist in user
        weight: user.weight || "", // Assuming these fields exist in user
        gender: user.gender || "", // Assuming these fields exist in user
        nutrition: user.nutrition || "", // Assuming these fields exist in user
        waterTracking: user.waterTracking || false, // Assuming this field exists in user
      });
    }
  }, [user]); // Only run this effect when user changes

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to update the user details, e.g., send a request to the API
    console.log("Updated User Data:", formData);

    // Redirect back to users list or show a success message
    navigate("/users"); // Adjust as needed
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1 className="">
          <span className="mr-4 fw-bold">&nbsp;Edit User</span>
        </h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 px-5">
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
              <h4 className="mt-2">Edit User</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                      value={formData.name} // Controlled input
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">User Default ID</label>
                    <input
                      className="form-control"
                      id="userId"
                      type="text"
                      placeholder="User Default ID"
                      value={formData.userId} // Controlled input
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Email address</label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      value={formData.email} // Controlled input
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-control"
                      id="phone"
                      type="number"
                      placeholder="Enter Number"
                      value={formData.phone} // Controlled input
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Assign Sub-Admin/List</label>
                    <select
                      className="form-select"
                      id="assignSubAdmin"
                      value={formData.assignSubAdmin} // Controlled input
                      onChange={handleChange}
                    >
                      <option value="">Select Sub-Admin</option>
                      <option value="subadmin1">Sub-Admin 1</option>
                      <option value="subadmin2">Sub-Admin 2</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Date of Birth</label>
                    <input
                      className="form-control"
                      id="dob"
                      type="date"
                      value={formData.dob} // Controlled input
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Height (cm)</label>
                    <input
                      className="form-control"
                      id="height"
                      type="number"
                      placeholder="Enter Height in cm"
                      value={formData.height} // Controlled input
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Weight (kg)</label>
                    <input
                      className="form-control"
                      id="weight"
                      type="number"
                      placeholder="Enter Weight in kg"
                      value={formData.weight} // Controlled input
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      id="gender"
                      value={formData.gender} // Controlled input
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Enter Password"
                    />
                  </div>
                  <div className="mb-3 col-lg-12 text-center">
                    <button
                      className="btn custom-btn text-white w-50"
                      type="submit"
                    >
                      <i className="fa-thin fa-paper-plane"></i> &nbsp; Submit{" "}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AddUser;
