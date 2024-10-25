import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddBlogs = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // to store uploaded image
  const [isImageAdded, setIsImageAdded] = useState(false); // to track if image is added
  const [categories, setCategories] = useState(["Tech", "Health", "Lifestyle"]); // predefined categories
  const [selectedCategory, setSelectedCategory] = useState(""); // user selection
  const [newCategory, setNewCategory] = useState(""); // new category input
  const [status, setStatus] = useState("Public");
  const [showModal, setShowModal] = useState(false); // track modal visibility
  const [errors, setErrors] = useState({}); // state for storing field-specific errors

  // Validate form function
  const validateForm = () => {
    let formErrors = {};

    // Validate title
    if (!title.trim()) {
      formErrors.title = "Title is required.";
    }

    // Validate description
    if (!description.trim()) {
      formErrors.description = "Description is required.";
    }

    // Validate selected category
    if (!selectedCategory) {
      formErrors.selectedCategory = "Please select a category.";
    }

    setErrors(formErrors);

    // If formErrors is empty, validation is successful
    return Object.keys(formErrors).length === 0;
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
      title: "Blog added successfully",
      text: "Your blog has been submitted!",
    });

    // Console log form data
    const formData = {
      title,
      description,
      image,
      category: selectedCategory,
      status,
    };

    console.log("Form data:", formData);

    // Reset form
    setIsAlert(true);
    setTitle("");
    setDescription("");
    setImage(null);
    setSelectedCategory("");
    setNewCategory("");
    setIsImageAdded(false); // Reset image status after submission
    setErrors({}); // Clear errors after successful submission
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Store image URL for preview
      setIsImageAdded(true); // Mark image as added
    }
  };

  const handleSaveCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategory(""); // Clear the input after saving

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

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4">&nbsp; Add Blogs</span>
          </h1>
        </div>
      </div>
      <div className="row">
        <div
          className="col-md-10 px-5 w-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="tile w-75">
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
              <h4 className="mt-2">Add Blogs</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Title</label>
                    <input
                      className={`form-control ${errors.title ? "is-invalid" : ""
                        }`}
                      type="text"
                      placeholder="Enter Title Here"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && (
                      <div className="invalid-feedback">{errors.title}</div>
                    )}
                  </div>

                  <div className="mb-3 w-100">
                    <label className="form-label">Description</label>
                    <textarea
                      className={`form-control ${errors.description ? "is-invalid" : ""
                        }`}
                      rows={6}
                      placeholder="Enter Description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload Image</label>
                    {!isImageAdded ? (
                      <div
                        className="dropify-wrapper"
                        style={{ height: "110px" }}
                      >
                        <input
                          type="file"
                          className="dropify"
                          onChange={handleImageChange}
                          accept=".jpg,.jpeg,.png,.gif,.webp"
                        />
                      </div>
                    ) : (
                      <div className="mt-3">
                        <p className="text-success">
                          Image added successfully.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Category Dropdown and Add Category Button */}
                  <div className="mb-3 col-lg-12 col-sm-12 col-xs-12 col-md-12">
                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                    <div className="d-flex align-items-center">
                      <select
                        className={`form-select ${errors.selectedCategory ? "is-invalid" : ""
                          }`}
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {categories.map((category, index) => (
                          <option key={index} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      {/* Add New Category Button */}
                      <button
                        type="button"
                        className="btn btn-outline-primary ms-2"
                        onClick={() => setShowModal(true)} // Trigger modal on button click
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
                  {errors.selectedCategory && (
                    <div className="invalid-feedback">
                      {errors.selectedCategory}
                    </div>
                  )}

                  <div className="mt-3 w-100">
                    <label className="form-label">Status</label>
                    <div className="d-flex">
                      <label className="mr-3">
                        <input
                          type="radio"
                          value="Public"
                          checked={status === "Public"}
                          onChange={(e) => setStatus(e.target.value)}
                        />{" "}
                        Public
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="Private"
                          checked={status === "Private"}
                          onChange={(e) => setStatus(e.target.value)}
                        />{" "}
                        Private
                      </label>
                    </div>
                  </div>

                  <div className="mb-3 text-center mt-3">
                    <button
                      className="btn custom-btn text-white w-50"
                      type="submit"
                    >
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
                onClick={() => setShowModal(false)} // Close modal
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
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)} // Close modal
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveCategory} // Save new category and close modal
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS for modal, overlay, and animation */}
      <style jsx>{`
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
          padding-top: 50px; /* Space from the top */
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

        /* Keyframe for slide-down animation */
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

export default AddBlogs;
