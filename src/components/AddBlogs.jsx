import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";

const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [image, setImage] = useState(null);
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [categories, setCategories] = useState([
    { name: "Tech", icon: null },
    { name: "Health", icon: null },
    { name: "Lifestyle", icon: null },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [status, setStatus] = useState("Public");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const editorRef = useRef(null);
  const api_key = "3e4i7xmjvw1ebtnzlwcfxtlk0tuwjfui4s1w0l2pibtj6egn";

  const handleSaveCategory = () => {
    if (newCategory) {
      const updatedCategories = [...categories];
      if (editIndex !== null) {
        // Edit existing category
        updatedCategories[editIndex] = {
          name: newCategory,
          icon: newCategoryImage,
        };
        Swal.fire({
          icon: "success",
          title: "Category updated",
          text: `The category has been updated to "${newCategory}".`,
        });
      } else {
        // Add new category
        updatedCategories.push({ name: newCategory, icon: newCategoryImage });
        Swal.fire({
          icon: "success",
          title: "Category added",
          text: `The category "${newCategory}" has been added successfully.`,
        });
      }
      setCategories(updatedCategories);
      resetModal(); // Reset modal state
    } else {
      Swal.fire({
        icon: "error",
        title: "Category is empty",
        text: "Please enter a valid category name!",
      });
    }
  };

  const resetModal = () => {
    setNewCategory("");
    setNewCategoryImage(null);
    setEditIndex(null);
    setShowModal(false);
  };

  const handleDeleteCategory = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories(categories.filter((_, i) => i !== index));
        Swal.fire("Deleted!", "Your category has been deleted.", "success");
      }
    });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!title.trim()) formErrors.title = "Title is required.";

    if (!editorContent.trim() || !/<[^>]+>/.test(editorContent)) {
      formErrors.description = "Description is required.";
    }

    if (!selectedCategory.trim())
      formErrors.selectedCategory = "Please select a category."; // Ensure category is selected

    if (!status.trim()) formErrors.status = "Please select a status."; // Ensure status is selected

    setErrors(formErrors); // Update error state
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    Swal.fire({
      icon: "success",
      title: "Blog added successfully",
      text: "Your blog has been submitted!",
    });
    setTitle("");
    setDescription("");
    setImage(null);
    setSelectedCategory("");
    setNewCategory("");
    setIsImageAdded(false);
    setErrors({});
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpg", "image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB limit
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Invalid file type",
          text: "Please upload a valid image (jpg, jpeg, png).",
        });
        return;
      }
      if (file.size > maxSize) {
        Swal.fire({
          icon: "error",
          title: "File size exceeded",
          text: "The image size should be less than 5MB.",
        });
        return;
      }
      setImage(URL.createObjectURL(file));
      setIsImageAdded(true);
    }
  };

  const handleNewCategoryImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewCategoryImage(URL.createObjectURL(file));
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
          <span className="mr-4 fw-bold">&nbsp; Add Blogs</span>
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

      <div className="row ">
        <div
          className="col-md-10 blogs-form w-100"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="tile blogs-add ">
            <div
              className="case-status d-flex justify-content-center"
              style={{
                backgroundColor: "#002538",
                color: "#fff",
                height: "50px",
                textAlign: "center",
                width: "100%",
              }}
            >
              <h4 className="mt-2">Add Blogs</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
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

                <div className="mb-3 col-lg-12 mt-2">
                  <label className="form-label">Category</label>
                  <div className="d-flex align-items-center">
                    <select
                      className={`form-select ${
                        errors.selectedCategory ? "is-invalid" : ""
                      }`}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.name}>
                          {category.name}
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
                  {errors.selectedCategory && (
                    <div className="invalid-feedback">
                      {errors.selectedCategory}
                    </div>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Upload Image</label>
                  {!isImageAdded ? (
                    <div
                      className="dropify-wrapper"
                      style={{ height: "110px", position: "relative" }}
                    >
                      <input
                        type="file"
                        className="dropify"
                        onChange={handleImageChange}
                        accept=".jpg,.jpeg,.png,.gif,.webp"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "#888",
                          fontSize: "16px",
                        }}
                      >
                        <p>Click or Drag to Upload an Image</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3">
                      <p className="text-success">Image added successfully.</p>
                      <img
                        src={image}
                        alt="Uploaded"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </div>
                  )}
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label">Description</label>
                  <Editor
                    apiKey={api_key}
                    value={editorContent}
                    onEditorChange={(content, editor) =>
                      setEditorContent(content)
                    }
                    init={{
                      height: 250,
                      menubar: false,
                      plugins: "lists link image",
                      toolbar:
                        "bold italic | alignleft aligncenter alignright | bullist numlist",
                    }}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                <div className="mt-3 w-100">
                  <label className="form-label">Status</label>
                  <div className="d-flex">
                    <label
                      className="mr-3"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="radio"
                        value="Public"
                        checked={status === "Public"}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`form-check-input ${
                          errors.status ? "is-invalid" : ""
                        }`} // Add error class if status is invalid
                      />{" "}
                      &nbsp; Public
                    </label>
                    <label
                      style={{
                        marginLeft: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        type="radio"
                        value="Private"
                        checked={status === "Private"}
                        onChange={(e) => setStatus(e.target.value)}
                        className={`form-check-input ${
                          errors.status ? "is-invalid" : ""
                        }`} // Add error class if status is invalid
                      />{" "}
                      &nbsp; Private
                    </label>
                  </div>
                  {errors.status && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors.status} {/* Display error message for status */}
                    </div>
                  )}
                </div>

                <div className="mb-3 text-center mt-3">
                  <button className="btn custom-btn text-white" type="submit">
                    <i className="fa-light fa-blog"></i>&nbsp; Add Blog
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Category Modal */}
      {showModal && (
        <div
          className="modal-overlay"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <div className="modal-content animated-modal p-0">
            <div className="modal-header">
              <div
                className="case-status d-flex justify-content-center"
                style={{
                  backgroundColor: "#002538",
                  color: "#fff",
                  height: "50px",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                <h4 className="mt-2">Add Blogs</h4>
              </div>
            </div>
            <div className="modal-body p-2">
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
                  Icon
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
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
              </div>
            </div>
            <div
              className="modal-footer p-2"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
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
                style={{
                  backgroundColor: "#002538",
                  color: "white",
                  marginLeft: "10px",
                }}
                onClick={handleSaveCategory}
              >
                Save Category
              </button>
            </div>
            <table className="table mt-4 table-bordered table-hover dt-responsive">
              <thead>
                <tr>
                  <th>Sr.No</th>
                  <th>Category</th>
                  <th>Icon</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{category.name}</td>
                    <td>
                      {category.icon ? (
                        <img
                          src={category.icon}
                          alt="icon"
                          style={{ maxWidth: "50px", maxHeight: "50px" }}
                        />
                      ) : (
                        "No Icon"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning"
                        style={{ padding: "2px 6px" }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "10px", padding: "2px 6px" }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
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

export default AddBlogs;
