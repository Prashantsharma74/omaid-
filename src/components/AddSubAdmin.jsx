import React, { useState } from "react";
import Swal from "sweetalert2";

const AddSubAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hospital: "",
    location: "",
    phone: "",
    designation: "",
    password: "",
  });
  const [isAlert, setIsAlert] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Clear the error for the input being changed
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.hospital)
      newErrors.hospital = "Hospital/Clinic name is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.designation)
      newErrors.designation = "Designation is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (formData.phone && !/^\d+$/.test(formData.phone))
      newErrors.phone = "Phone number must be numeric.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    Swal.fire({
      title: "Sub-Admin Added!",
      text: `Sub-Admin added successfully`,
      icon: "success",
      confirmButtonText: "OK",
    });

    console.log("Form Data:", formData);
    setFormData({
      name: "",
      email: "",
      hospital: "",
      location: "",
      phone: "",
      designation: "",
      password: "",
    });
    setIsAlert(true);
  };

  const handleToggle = () => {
    setIsAlert(false);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1 className="">
          <span className="mr-4 fw-bold">&nbsp;Add Sub-Admin</span>
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
              <h4 className="mt-2">Add Sub-Admin</h4>
            </div>
            <div className="tile-body p-3">
              <div className="bs-component mb-3">
                {isAlert && (
                  <div className="alert alert-dismissible alert-success">
                    <button
                      className="btn-close"
                      type="button"
                      data-bs-dismiss="alert"
                      onClick={handleToggle}
                    ></button>
                    <strong>Well done!</strong> Sub-Admin added successfully.
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      type="text"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    {errors.name && (
                      <div className="invalid-feedback">{errors.name}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Email address</label>
                    <input
                      className={`form-control ${
                        errors.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Hospital/Clinic Name</label>
                    <input
                      className={`form-control ${
                        errors.hospital ? "is-invalid" : ""
                      }`}
                      id="hospital"
                      type="text"
                      placeholder="Enter Hospital/Clinic name"
                      value={formData.hospital}
                      onChange={handleChange}
                    />
                    {errors.hospital && (
                      <div className="invalid-feedback">{errors.hospital}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Location</label>
                    <input
                      className={`form-control ${
                        errors.location ? "is-invalid" : ""
                      }`}
                      id="location"
                      type="text"
                      placeholder="Enter Location"
                      value={formData.location}
                      onChange={handleChange}
                    />
                    {errors.location && (
                      <div className="invalid-feedback">{errors.location}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input
                      className={`form-control ${
                        errors.phone ? "is-invalid" : ""
                      }`}
                      id="phone"
                      type="number"
                      placeholder="Enter Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    {errors.phone && (
                      <div className="invalid-feedback">{errors.phone}</div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Designation</label>
                    <input
                      className={`form-control ${
                        errors.designation ? "is-invalid" : ""
                      }`}
                      id="designation"
                      type="text"
                      placeholder="Enter Designation"
                      value={formData.designation}
                      onChange={handleChange}
                    />
                    {errors.designation && (
                      <div className="invalid-feedback">
                        {errors.designation}
                      </div>
                    )}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Password</label>
                    <input
                      className={`form-control ${
                        errors.password ? "is-invalid" : ""
                      }`}
                      id="password"
                      type="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
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

export default AddSubAdmin;
