import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert

const AddSubAdmin = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hospital: "",
    location: "",
    phone: "",
    designation: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid.";
    if (!formData.hospital)
      newErrors.hospital = "Hospital/Clinic name is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    else if (formData.phone.length < 10)
      newErrors.phone = "Phone number must be at least 10 digits.";
    if (!formData.designation)
      newErrors.designation = "Designation is required.";
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

    // SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You are about to add a new Sub-Admin!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, add it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Form submission logic here
        console.log(formData);
        setIsAlert(true);
        // Optionally reset the form
        setFormData({
          name: "",
          email: "",
          hospital: "",
          location: "",
          phone: "",
          designation: "",
          password: "",
        });
      }
    });
  };

  const handleCross = () => {
    setIsAlert(false);
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
          <span className="mr-4 fw-bold">&nbsp;Add Sub-Admin</span>
        </h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8 px-5">
          <div className="tile">
            <div
              className="case-status d-flex justify-content-center"
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
              <div className="bs-component">
                {isAlert && (
                  <div className="alert alert-dismissible alert-success">
                    <button
                      className="btn-close"
                      type="button"
                      onClick={handleCross}
                    ></button>
                    <strong>Well done!</strong> Sub-Admin added successfully.
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* Form Fields */}
                  {/* Repeat the field structure for each input */}
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Name</label>
                    <input
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
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
                  {/* Add other input fields here... */}
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

export default AddSubAdmin;
