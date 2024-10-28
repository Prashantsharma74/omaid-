import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddUser = ({ user, onClose }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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

  // State for error messages
  const [errors, setErrors] = useState({});

  // Set form data when the user prop changes
  useEffect(() => {
    if (user) {
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
        password: user.password || "",
        nutrition: user.nutrition || "",
        waterTracking: user.waterTracking || false,
      });
      setIsEditMode(true);
    }
  }, [user]);

  // Handle form field changes and update the formData state
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));

    // Clear the error for the specific field when the user types
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Handle form submission for both creation and update
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }

    if (!formData.userId) {
      newErrors.userId = "User ID is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }

    if (
      formData.phone &&
      (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, "")) ||
        formData.phone.length !== 10)
    ) {
      newErrors.phone = "Phone number must be a 10-digit numeric value.";
    }

    if (!formData.assignSubAdmin) {
      newErrors.assignSubAdmin = "Assign Sub-Admin is required.";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of Birth is required.";
    }

    if (!formData.height) {
      newErrors.height = "Height is required.";
    } else if (formData.height <= 0 || formData.height > 300) {
      newErrors.height = "Height must be between 1 and 300 cm.";
    }

    if (!formData.weight) {
      newErrors.weight = "Weight is required.";
    } else if (formData.weight <= 0 || formData.weight > 500) {
      newErrors.weight = "Weight must be between 1 and 500 kg.";
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required.";
    }

    if (!isEditMode && (!formData.password || formData.password.length < 8)) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    // If there are errors, set the error state and return
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed with form submission if there are no errors
    if (isEditMode) {
      // Logic for updating the user
      Swal.fire({
        title: "User Updated!",
        text: `User details updated successfully`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      // Logic for creating a new user
      Swal.fire({
        title: "User Created!",
        text: `User added successfully`,
        icon: "success",
        confirmButtonText: "OK",
      });
    }
  };

  const resetForm = () => {
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
    setErrors({}); // Clear errors on reset
    setIsEditMode(false); // Exit edit mode
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <div style={{ position: "relative" }}>
      <button className="cross-button" aria-label="Close" onClick={handleClose}>
        <i className="fa-solid fa-times"></i>
      </button>
      <div
        className="case-status d-flex justify-content-center text-align-center"
        style={{
          backgroundColor: "#002538",
          color: "#fff",
          height: "50px",
          borderRadius: "10px 10px 0px 0px",
          textAlign: "center",
        }}
      >
        <h4 className="mt-2">{isEditMode ? "Edit" : "Add"} User</h4>
      </div>
      <div className="tile-body p-3">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/** Input fields */}
            <div className="mb-3 col-md-6">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                id="name"
                type="text"
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}{" "}
              {/* Error message */}
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
              {errors.userId && (
                <div className="text-danger">{errors.userId}</div>
              )}{" "}
              {/* Error message */}
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Email address</label>
              <input
                className="form-control"
                id="email"
                type="text"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}{" "}
              {/* Error message */}
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                className="form-control"
                id="phone"
                type="number"
                placeholder="Enter Phone Number"
                value={formData.phone}
                onChange={handleChange}
                pattern="[0-9]*"
                minLength="10"
                maxLength="15"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}{" "}
              {/* Error message */}
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
              {errors.assignSubAdmin && (
                <div className="text-danger">{errors.assignSubAdmin}</div>
              )}{" "}
              {/* Error message */}
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
              {errors.dob && <div className="text-danger">{errors.dob}</div>}{" "}
              {/* Error message */}
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
                min="0"
                max="300"
                step="1"
              />
              {errors.height && (
                <div className="text-danger">{errors.height}</div>
              )}{" "}
              {/* Error message */}
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
                min="0"
                max="500"
                step="0.1"
              />
              {errors.weight && (
                <div className="text-danger">{errors.weight}</div>
              )}{" "}
              {/* Error message */}
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
              {errors.gender && (
                <div className="text-danger">{errors.gender}</div>
              )}{" "}
              {/* Error message */}
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Password</label>
              <div className="input-group">
                <input
                  className="form-control"
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isEditMode}
                  minLength={8}
                />
                <button
                  style={{
                    border: "none",
                    color: "#002538",
                  }}
                  type="button"
                  className="toggle-password"
                  onClick={handlePasswordVisibility}
                  aria-label={
                    isPasswordVisible ? "Hide password" : "Show password"
                  }
                >
                  <i
                    className={
                      isPasswordVisible
                        ? "fa-solid fa-eye-slash eye"
                        : "fa-solid fa-eye eye"
                    }
                  ></i>
                </button>
              </div>
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}{" "}
              {/* Error message */}
            </div>
            <div className="mb-3 col-lg-12 text-center">
              <button className="btn custom-btn text-white w-25" type="submit">
                <i className="fa-thin fa-paper-plane"></i> &nbsp;
                {isEditMode ? "Update User" : "Submit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
