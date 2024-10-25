import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const AddUser = () => {
  const location = useLocation();
  const [isEditMode, setIsEditMode] = useState(false);
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
    if (location.state?.user) {
      const user = location.state.user;
      console.log("User data received:", user);

      setFormData({
        name: user.username || "",
        userId: user.accountId || "",
        email: user.email || "",
        phone: user.phone || "",
        assignSubAdmin: user.assignSubAdmin || "",
        dob: user.dob || "",
        height: user.height || "",
        weight: user.weight || "",
        gender: user.gender || "",
        password: user.password ||  "",  
        nutrition: user.nutrition || "",
        waterTracking: user.waterTracking || false,
      });
      setIsEditMode(true);
    } else {
      console.log("No user data found, defaulting to add mode");
    }
  }, [location.state]);

  // Handle form field changes and update the formData state
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Handle form submission for both creation and update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      // Logic for updating the user
      Swal.fire({
        title: "User Updated!",
        text: `User details updated successfully`,
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log("Updated User Data:", formData);
    } else {
      // Logic for creating a new user
      Swal.fire({
        title: "User Created!",
        text: `User added successfully`,
        icon: "success",
        confirmButtonText: "OK",
      });
      console.log("New User Data:", formData);
    }

    // Reset the form after submission
    setFormData({
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
    setIsEditMode(false); // Exit edit mode
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1 className="">
          <span className="mr-4 fw-bold">
            &nbsp;{isEditMode ? "Edit" : "Add"} User
          </span>
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
              <h4 className="mt-2">{isEditMode ? "Edit" : "Add"} User</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      className="form-control"
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                      value={formData.name} // This ensures that the input is filled with the user's data
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">User Default ID</label>
                    <input
                      className="form-control"
                      id="userId"
                      type="text"
                      placeholder="User Default ID"
                      value={formData.userId}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Email address</label>
                    <input
                      className="form-control"
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-control"
                      id="phone"
                      type="text"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Assign Sub-Admin</label>
                    <select
                      className="form-select"
                      id="assignSubAdmin"
                      value={formData.assignSubAdmin}
                      onChange={handleChange}
                    >
                      <option value="">Select Sub-Admin</option>
                      <option value="subadmin1">Sub-Admin 1</option>
                      <option value="subadmin2">Sub-Admin 2</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Date of Birth</label>
                    <input
                      className="form-control"
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Height (cm)</label>
                    <input
                      className="form-control"
                      id="height"
                      type="number"
                      placeholder="Enter Height in cm"
                      value={formData.height}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Weight (kg)</label>
                    <input
                      className="form-control"
                      id="weight"
                      type="number"
                      placeholder="Enter Weight in kg"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      id="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      className="form-control"
                      id="password"
                      type="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isEditMode} // Password is disabled in edit mode
                    />
                  </div>
                  <div className="mb-3 col-lg-12 text-center">
                    <button
                      className="btn custom-btn text-white w-50"
                      type="submit"
                    >
                      {isEditMode ? "Update User" : "Submit"}
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
