import React, { useState } from "react";

const AddUser = () => {
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

  const [errors, setErrors] = useState({});
  const [isAlert, setIsAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear the error when user types
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.userId) newErrors.userId = "User Default ID is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (formData.phone.toString().length < 10)
      newErrors.phone = "Phone number must be at least 10 digits.";
    if (!formData.assignSubAdmin)
      newErrors.assignSubAdmin = "Please select a Sub-Admin.";
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.height) newErrors.height = "Height is required.";
    if (!formData.weight) newErrors.weight = "Weight is required.";
    if (!formData.gender) newErrors.gender = "Gender is required.";
    if (!formData.password) newErrors.password = "Password is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log(formData);
    setIsAlert(true);
  };

  const handleCross = () => {
    setIsAlert(false);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1 className="">
          <span className="mr-4 fw-bold">&nbsp;Add User</span>
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
              <h4 className="mt-2">Add User</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component mb-3">
                {isAlert && (
                  <div className="alert alert-dismissible alert-success">
                    <button
                      className="btn-close"
                      type="button"
                      onClick={handleCross}
                    ></button>
                    <strong>Well done!</strong> User added successfully.
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Name</label>
                    <input
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">User Default ID</label>
                    <input
                      className={`form-control ${
                        errors.userId ? "is-invalid" : ""
                      }`}
                      name="userId"
                      type="text"
                      placeholder="User Default ID"
                      value={formData.userId}
                      onChange={handleChange}
                    />
                    {errors.userId && (
                      <div className="invalid-feedback">{errors.userId}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Email address</label>
                    <input
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Phone Number</label>
                    <input
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      name="phone"
                      type="number"
                      placeholder="Enter Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Assign Sub-Admin/List</label>
                    <select
                      className={`form-select ${
                        errors.assignSubAdmin ? "is-invalid" : ""
                      }`}
                      name="assignSubAdmin"
                      value={formData.assignSubAdmin}
                      onChange={handleChange}
                    >
                      <option value="">Select Sub-Admin</option>
                      <option value="subadmin1">Sub-Admin 1</option>
                      <option value="subadmin2">Sub-Admin 2</option>
                    </select>
                    {errors.assignSubAdmin && (
                      <div className="invalid-feedback">
                        {errors.assignSubAdmin}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Date of Birth</label>
                    <input
                      className={`form-control ${
                        errors.dob ? "is-invalid" : ""
                      }`}
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                    {errors.dob && (
                      <div className="invalid-feedback">{errors.dob}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Height (cm)</label>
                    <input
                      className={`form-control ${
                        errors.height ? "is-invalid" : ""
                      }`}
                      name="height"
                      type="number"
                      placeholder="Enter Height in cm"
                      value={formData.height}
                      onChange={handleChange}
                    />
                    {errors.height && (
                      <div className="invalid-feedback">{errors.height}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Weight (kg)</label>
                    <input
                      className={`form-control ${
                        errors.weight ? "is-invalid" : ""
                      }`}
                      name="weight"
                      type="number"
                      placeholder="Enter Weight in kg"
                      value={formData.weight}
                      onChange={handleChange}
                    />
                    {errors.weight && (
                      <div className="invalid-feedback">{errors.weight}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Gender</label>
                    <select
                      className={`form-select ${
                        errors.gender ? "is-invalid" : ""
                      }`}
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && (
                      <div className="invalid-feedback">{errors.gender}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6 col-sm-12">
                    <label className="form-label">Password</label>
                    <input
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      name="password"
                      type="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="mb-3 col-lg-12 col-sm-12">
                    <h5 className="mt-3 mb-3">
                      <strong>Add Insight</strong>
                    </h5>
                    <div className="mb-3 mt-3">
                      <label className="form-label">Nutrition Taken</label>
                      <textarea
                        className="form-control"
                        name="nutrition"
                        rows="6"
                        placeholder="Enter nutrition details"
                        value={formData.nutrition}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Water Tracking</label>
                      <div
                        className="form-check d-flex w-100"
                        style={{
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="waterTracking"
                          checked={formData.waterTracking}
                          onChange={handleChange}
                          style={{ display: "block" }}
                        />
                        <label className="form-check-label">
                          &nbsp;&nbsp;&nbsp;Track daily water intake
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 col-lg-12 text-center">
                    <button
                      className="btn custom-btn text-white w-50"
                      type="submit"
                    >
                      <i className="fa-thin fa-paper-plane"></i> &nbsp; Submit
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
