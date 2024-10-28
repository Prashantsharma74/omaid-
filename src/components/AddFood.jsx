import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useLocation } from "react-router-dom";

const AddFood = () => {
  const location = useLocation();
  const userData = location.state ? location.state.user : null;

  // State variables
  const [foodName, setFoodName] = useState(userData ? userData.FoodCategory : "");
  const [category, setCategory] = useState(userData ? userData.FoodCategory : "");
  const [foodType, setFoodType] = useState(userData ? userData.FoodType : "");
  const [approvalStatus, setApprovalStatus] = useState(userData ? userData.Approved : "");
  const [image, setImage] = useState(null); // State for uploaded image
  const [isImageAdded, setIsImageAdded] = useState(false); // Track if an image is added
  const [categories, setCategories] = useState(["Fruits", "Vegetables"]); // Predefined categories
  const [newCategory, setNewCategory] = useState(""); // New category input
  const [newCategoryImage, setNewCategoryImage] = useState(null); // State for new category image
  const [showModal, setShowModal] = useState(false); // Track modal visibility
  const [errors, setErrors] = useState({}); // State for storing field-specific errors

  // Use effect to set initial values when editing
  useEffect(() => {
    if (userData) {
      setFoodName(userData.FoodCategory);
      setCategory(userData.FoodCategory);
      setFoodType(userData.FoodType || "");
      setApprovalStatus(userData.Approved);
    }
  }, [userData]);

  // Validate form function
  const validateForm = () => {
    let formErrors = {};

    // Validate food name
    if (!foodName.trim()) {
      formErrors.foodName = "Food name is required.";
    }

    // Validate category
    if (!category) {
      formErrors.category = "Please select a category.";
    }

    // Validate food type
    if (!foodType.trim()) {
      formErrors.foodType = "Food type is required.";
    }

    // Validate approval status
    if (!approvalStatus) {
      formErrors.approvalStatus = "Please select an approval status.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!validateForm()) {
      return;
    }

    // Success alert using SweetAlert
    Swal.fire({
      icon: "success",
      title: userData ? "Food updated successfully" : "Food added successfully",
      text: "Your food item has been submitted!",
    });

    // Console log form data
    const formData = {
      foodName,
      category,
      foodType,
      approvalStatus,
      image,
    };

    console.log("Form data:", formData);

    // Reset form
    setFoodName("");
    setCategory("");
    setFoodType("");
    setApprovalStatus("");
    setImage(null);
    setNewCategory("");
    setIsImageAdded(false);
    setNewCategoryImage(null); // Reset new category image
    setErrors({}); // Clear errors after submission
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Store image URL for preview
      setIsImageAdded(true); // Mark image as added
    }
  };

  const handleNewCategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCategoryImage(URL.createObjectURL(file)); // Store new category image URL for preview
    }
  };

  const handleSaveCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory); // Set the new category as selected
      setNewCategory(""); // Clear the input after saving
      setNewCategoryImage(null); // Reset new category image

      // Show success alert for category addition
      Swal.fire({
        icon: "success",
        title: "Category added",
        text: `The category "${newCategory}" has been added successfully.`,
      });
    } else if (!newCategory) {
      // Show error alert for empty category
      Swal.fire({
        icon: "error",
        title: "Category is empty",
        text: "Please enter a valid category name!",
      });
    }
    setShowModal(false); // Close the modal after handling
  };

  // Function to go back to the previous page
  const handleBack = () => {
    window.history.back();
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
          <span className="mr-4 fw-bold">&nbsp;Food Categories</span>
        </h1>
      </div>

      <button
        className="btn mb-2 ms-2"
        style={{ backgroundColor: "#002538", color: "white" }}
        type="button"
        onClick={handleBack}
      >
        <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i>{" "}
        &nbsp;Previous
      </button>
      <div className="row justify-content-center">
        <div className="col-md-10 px-5">
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
              <h4 className="mt-2">{userData ? "Edit Food" : "Add Food"}</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Food Name</label>
                    <input
                      className={`form-control ${errors.foodName ? "is-invalid" : ""}`}
                      type="text"
                      placeholder="Enter food name"
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                    />
                    {errors.foodName && (
                      <div className="invalid-feedback">{errors.foodName}</div>
                    )}
                  </div>
                  <div className="mb-3 col-lg-12">
                    <label className="form-label">Category</label>
                    <div className="d-flex align-items-center">
                      <select
                        className={`form-select ${errors.category ? "is-invalid" : ""}`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((cat, index) => (
                          <option key={index} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      <button
                        className="btn ms-2"
                        type="button"
                        style={{ backgroundColor: "#002538", color: "white" }}
                        onClick={() => setShowModal(true)}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                    {errors.category && (
                      <div className="invalid-feedback">{errors.category}</div>
                    )}
                  </div>

                  <div className="mb-3 col-lg-12">
                    <label className="form-label">Food Type</label>
                    <input
                      className={`form-control ${errors.foodType ? "is-invalid" : ""}`}
                      type="text"
                      placeholder="Enter food type"
                      value={foodType}
                      onChange={(e) => setFoodType(e.target.value)}
                    />
                    {errors.foodType && (
                      <div className="invalid-feedback">{errors.foodType}</div>
                    )}
                  </div>

                  <div className="mb-3 col-lg-12">
                    <label className="form-label">Approval Status</label>
                    <div style={{ display: "flex" }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="approvalStatus"
                          value="Approved"
                          checked={approvalStatus === "Approved"}
                          onChange={(e) => setApprovalStatus(e.target.value)}
                        />
                        <label className="form-check-label" style={{ marginLeft: "5px" }}>
                          Approved
                        </label>
                      </div>
                      <div className="form-check" style={{ marginLeft: "10px" }}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="approvalStatus"
                          value="Non Approved"
                          checked={approvalStatus === "Non Approved"}
                          onChange={(e) => setApprovalStatus(e.target.value)}
                        />
                        <label className="form-check-label" style={{ marginLeft: "5px" }}>
                          Non Approved
                        </label>
                      </div>
                    </div>
                    {errors.approvalStatus && (
                      <div className="invalid-feedback">{errors.approvalStatus}</div>
                    )}
                  </div>

                  <div className="mb-3 text-center mt-3">
                    <button className="btn custom-btn text-white w-50" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Category Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content animated-modal">
            <div className="modal-header">
              <h5 className="modal-title">Add New Category</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="newCategory" className="form-label">
                  Category Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="newCategory"
                  placeholder="Enter new category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newCategoryImage" className="form-label">
                  Food Icon
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="newCategoryImage"
                  accept="image/*"
                  onChange={handleNewCategoryImageChange}
                />
                {newCategoryImage && (
                  <img
                    src={newCategoryImage}
                    alt="New Category Icon"
                    className="mt-2"
                    style={{ maxWidth: '100px', maxHeight: '100px' }} // Adjust as needed
                  />
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn ms-2"
                style={{ backgroundColor: "#002538", color: "white" }}
                onClick={handleSaveCategory}
              >
                Save Category
              </button>
            </div>
          </div>
        <div>
          <table>
            <thead>
              <th>Sr.No</th>
              <th>Category</th>
              <th>Action</th>
            </thead>
            <tbody>
              <tr>1</tr>
              <tr>Banana</tr>
              <tr>1</tr>
            </tbody>
          </table>
        </div>
        </div>
      )}

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: flex-start;
          padding-top: 50px;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          border-radius: 8px;
          padding: 20px;
          max-width: 500px;
          width: 100%;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .btn-close {
          background: none;
          border: none;
          font-size: 1.5rem;
        }
        @keyframes slideDown {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animated-modal {
          animation: slideDown 0.5s ease-in-out;
        }
      `}</style>
    </main>
  );
};

export default AddFood;
