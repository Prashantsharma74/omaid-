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
    
    // Password validation
    if (!formData.password && !isEditMode) {
      newErrors.password = "Password is required.";
    } else if (formData.password && formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one numeric digit.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one special character.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

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

    console.log("Updated Data:", formData);

    setFormData({
      name: "",
      email: "",
      hospital: "",
      location: "",
      phone: "",
      designation: "",
      password: "",
    });
    onClose(); // Close modal after update
  };

  useEffect(() => {
    if (searchTerm) {
      setSuggestions(countries.filter(country => 
        country.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  return (
    <div>
      <h2>{isEditMode ? "Edit Sub Admin" : "Add Sub Admin"}</h2>
      <form onSubmit={isEditMode ? handleUpdate : handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>

        <div>
          <label htmlFor="hospital">Hospital/Clinic Name</label>
          <input
            type="text"
            id="hospital"
            value={formData.hospital}
            onChange={handleChange}
          />
          {errors.hospital && <span>{errors.hospital}</span>}
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            id="location"
            value={formData.location}
            onChange={(e) => {
              setFormData({ ...formData, location: e.target.value });
              setSearchTerm(e.target.value); // Update search term when a country is selected
              setSuggestions([]); // Clear suggestions
            }}
          >
            <option value="" disabled>Select a country</option>
            {suggestions.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
          {errors.location && <span>{errors.location}</span>}
        </div>

        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <span>{errors.phone}</span>}
        </div>

        <div>
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            id="designation"
            value={formData.designation}
            onChange={handleChange}
          />
          {errors.designation && <span>{errors.designation}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="button" onClick={handlePasswordVisibility}>
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
          {errors.password && <span>{errors.password}</span>}
        </div>

        <button type="submit">{isEditMode ? "Update" : "Add"} Sub Admin</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddSubAdmin;
