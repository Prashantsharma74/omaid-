import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddSubAdmin = ({ user, onClose }) => {
  const countries = ["United States", "Canada", "Mexico", "United Kingdom", "India", "Australia"]; // Populate with actual country data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    hospital: "",
    location: "",
    phone: "",
    designation: "",
    password: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.username,
        email: user.email,
        hospital: user.hospital,
        location: user.location,
        phone: user.phone,
        designation: user.designation,
        password: user.password,
      });
      setIsEditMode(true);
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.hospital) newErrors.hospital = "Hospital/Clinic name is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.designation) newErrors.designation = "Designation is required.";
    if (!formData.password && !isEditMode) newErrors.password = "Password is required.";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters long.";
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) newErrors.email = "Please enter a valid email address.";
    
    if (formData.phone && (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, "")) || formData.phone.length !== 10)) {
      newErrors.phone = "Phone number must be a 10-digit numeric value.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    Swal.fire({ title: "Sub-Admin Added!", text: `Sub-Admin added successfully`, icon: "success", confirmButtonText: "OK" });
    setFormData({ name: "", email: "", hospital: "", location: "", phone: "", designation: "", password: "" });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    Swal.fire({ title: "Sub-Admin Updated!", text: `Sub-Admin details updated successfully`, icon: "success", confirmButtonText: "OK" });
    setFormData({ name: "", email: "", hospital: "", location: "", phone: "", designation: "", password: "" });
    setIsEditMode(false);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, location: value });
    setSearchTerm(value);
    setSuggestions(value ? countries.filter((country) => country.toLowerCase().includes(value.toLowerCase())) : []);
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({ ...formData, location: suggestion });
    setSearchTerm(suggestion);
    setSuggestions([]);
  };

  const handleClose = () => {
    setFormData({ name: "", email: "", hospital: "", location: "", phone: "", designation: "", password: "" });
    setIsEditMode(false);
    onClose();
  };

  return (
    <div style={{ position: "relative" }}>
      <button className="cross-button" aria-label="Close" onClick={handleClose}>
        <i className="fa-solid fa-times"></i>
      </button>
      <div className="case-status d-flex justify-content-center text-align-center" style={{ backgroundColor: "#002538", color: "#fff", height: "50px", textAlign: "center" }}>
        <h4 className="mt-2">Sub-Admin</h4>
      </div>
      <div className="tile-body p-3">
        <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
          <div className="row">
            {/* Other form fields */}

            <div className="mb-3 col-md-6">
              <label className="form-label">Location</label>
              <input
                id="location"
                type="text"
                className={`form-control ${errors.location ? "is-invalid" : ""}`}
                placeholder="Enter Country"
                value={searchTerm}
                onChange={handleLocationChange}
                onFocus={() => setSuggestions(countries)}
              />
              {suggestions.length > 0 && (
                <div className="autocomplete-suggestions">
                  {suggestions.map((country, index) => (
                    <div key={index} className="autocomplete-item" onClick={() => handleSuggestionClick(country)}>
                      {country}
                    </div>
                  ))}
                </div>
              )}
              {errors.location && <span className="text-danger">{errors.location}</span>}
            </div>

            {/* Submit button */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubAdmin;
