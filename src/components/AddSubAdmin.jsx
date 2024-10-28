import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AddSubAdmin = ({ user, onClose }) => {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];

  const handleBlur = () => {
    setSuggestions([]);
  };

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

    // Existing validations...
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.hospital)
      newErrors.hospital = "Hospital/Clinic name is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.phone) newErrors.phone = "Phone number is required.";
    if (!formData.designation)
      newErrors.designation = "Designation is required.";

    // Password validation
    if (!formData.password && !isEditMode) {
      newErrors.password = "Password is required.";
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one numeric digit.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one special character.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (
      formData.phone &&
      (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, "")) ||
        formData.phone.length !== 10)
    ) {
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

    Swal.fire({
      title: "Sub-Admin Added!",
      text: `Sub-Admin added successfully`,
      icon: "success",
      confirmButtonText: "OK",
    });

    setFormData({
      name: "",
      email: "",
      hospital: "",
      location: "",
      phone: "",
      designation: "",
      password: "",
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    Swal.fire({
      title: "Sub-Admin Updated!",
      text: `Sub-Admin details updated successfully`,
      icon: "success",
      confirmButtonText: "OK",
    });

    setFormData({
      name: "",
      email: "",
      hospital: "",
      location: "",
      phone: "",
      designation: "",
      password: "",
    });
    setIsEditMode(false);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      hospital: "",
      location: "",
      phone: "",
      designation: "",
      password: "",
    });
    setIsEditMode(false);
    onClose();
  };

  return (
    <div className="" style={{ position: "relative" }}>
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
        <h4 className="mt-2">Sub-Admin</h4>
      </div>
      <div className="tile-body p-3">
        <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label">Name</label>
              <input
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
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
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                type="text"
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
              <select
                placeholder="Enter Country"
                id="location"
                className={`form-control ${
                  errors.location ? "is-invalid" : ""
                }`}
                value={formData.location}
                onChange={(e) => {
                  setFormData({ ...formData, location: e.target.value });
                  setSearchTerm(e.target.value);
                  setSuggestions([]);
                }}
                onFocus={() => setSuggestions(countries)}
              >
                <option value="" disabled>
                  Select a country
                </option>
                {suggestions.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.location && (
                <span className="text-danger">{errors.location}</span>
              )}
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                id="phone"
                type="number"
                placeholder="Enter Number"
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
                <div className="invalid-feedback">{errors.designation}</div>
              )}
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label">Password</label>
              <input
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
          </div>
          <div className="mb-3 col-lg-12 text-center">
            <button className="btn custom-btn text-white w-25" type="submit">
              <i className="fa-thin fa-paper-plane"></i> &nbsp;
              {isEditMode ? "Update Sub-Admin" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSubAdmin;
