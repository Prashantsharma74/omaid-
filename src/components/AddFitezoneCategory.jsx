import React, { useState } from "react";
import Swal from "sweetalert2";

const AddFitezoneCategory = () => {
  const [isAlert, setIsAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [categories, setCategories] = useState(["Tech", "Health", "Lifestyle"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [status, setStatus] = useState("Public");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let formErrors = {};

    if (!title.trim()) {
      formErrors.title = "Title is required.";
    }

    if (!description.trim()) {
      formErrors.description = "Duration is required.";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

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
            <span className="mr-4">&nbsp; Add Category</span>
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
              <h4 className="mt-2">Add Category</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div>
                  <div className="mb-3 w-100">
                    <label className="form-label">Title</label>
                    <input
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
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
                    <label className="form-label">Duration</label>
                    <input
                      className={`form-control ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      placeholder="Enter Duration"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 text-center mt-3">
                    <button
                      className="btn custom-btn text-white w-25"
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

export default AddFitezoneCategory;
