import React, { useState } from "react";
import Swal from "sweetalert2";

const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isImageAdded, setIsImageAdded] = useState(false);
  const [categories, setCategories] = useState([{ name: "Tech", icon: null }, { name: "Health", icon: null }, { name: "Lifestyle", icon: null }]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryImage, setNewCategoryImage] = useState(null);
  const [status, setStatus] = useState("Public");
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [editIndex, setEditIndex] = useState(null); // Track index of category being edited

  const openEditModal = (index) => {
    const category = categories[index];
    setNewCategory(category.name); // Set category name to input
    setNewCategoryImage(category.icon); // Set category icon for preview
    setEditIndex(index); // Set the index to identify edit mode
    setShowModal(true); // Open modal
  };

  const handleSaveCategory = () => {
    if (newCategory) {
      const updatedCategories = [...categories];
      if (editIndex !== null) {
        // Edit existing category
        updatedCategories[editIndex] = { name: newCategory, icon: newCategoryImage };
        Swal.fire({ icon: "success", title: "Category updated", text: `The category has been updated to "${newCategory}".` });
      } else {
        // Add new category
        updatedCategories.push({ name: newCategory, icon: newCategoryImage });
        Swal.fire({ icon: "success", title: "Category added", text: `The category "${newCategory}" has been added successfully.` });
      }
      setCategories(updatedCategories);
      resetModal(); // Reset modal state
    } else {
      Swal.fire({ icon: "error", title: "Category is empty", text: "Please enter a valid category name!" });
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
    if (!description.trim()) formErrors.description = "Description is required.";
    if (!selectedCategory) formErrors.selectedCategory = "Please select a category.";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    Swal.fire({ icon: "success", title: "Blog added successfully", text: "Your blog has been submitted!" });
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
        <h1><span className="mr-4">&nbsp; Add Blogs</span></h1>
      </div>
      <button
        className="btn mb-2 ms-2"
        style={{ backgroundColor: "#002538", color: "white" }}
        type="button"
        onClick={handleBack}
      >
        <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i> &nbsp;Previous
      </button>

      <div className="row">
        <div className="col-md-10 px-5 w-100" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div className="tile w-75">
            <div className="case-status d-flex justify-content-center" style={{ backgroundColor: "#002538", color: "#fff", height: "50px", textAlign: "center", width: "100%" }}>
              <h4 className="mt-2">Add Blogs</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="mb-3 w-100">
                  <label className="form-label">Title</label>
                  <input
                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                    type="text"
                    placeholder="Enter Title Here"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                <div className="mb-3 w-100">
                  <label className="form-label">Description</label>
                  <textarea
                    className={`form-control ${errors.description ? "is-invalid" : ""}`}
                    rows={6}
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="form-group">
                  <label className="form-label">Upload Image</label>
                  {!isImageAdded ? (
                    <div className="dropify-wrapper" style={{ height: "110px" }}>
                      <input type="file" className="dropify" onChange={handleImageChange} accept=".jpg,.jpeg,.png,.gif,.webp" />
                    </div>
                  ) : (
                    <div className="mt-3">
                      <p className="text-success">Image added successfully.</p>
                    </div>
                  )}
                </div>

                <div className="mb-3 col-lg-12">
                  <label className="form-label">Category</label>
                  <div className="d-flex align-items-center">
                    <select
                      className={`form-select ${errors.selectedCategory ? "is-invalid" : ""}`}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="" disabled>Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.name}>{category.name}</option>
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
                </div>

                <div className="mt-3 w-100">
                  <label className="form-label">Status</label>
                  <div className="d-flex">
                    <label className="mr-3">
                      <input type="radio" value="Public" checked={status === "Public"} onChange={(e) => setStatus(e.target.value)} /> Public
                    </label>
                    <label>
                      <input type="radio" value="Private" checked={status === "Private"} onChange={(e) => setStatus(e.target.value)} /> Private
                    </label>
                  </div>
                </div>

                <div className="mb-3 text-center mt-3">
                  <button className="btn custom-btn text-white w-50" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Category Modal */}
      {showModal && (
        <div className="modal-overlay" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", flexDirection: "column" }}>
          <div className="modal-content animated-modal">
            <div className="modal-header">
              <h5 className="modal-title">Add New Category</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="newCategory" className="form-label">Category Name</label>
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
                <label htmlFor="newCategoryImage" className="form-label">Icon</label>
                <input type="file" className="form-control" id="newCategoryImage" accept="image/*" onChange={handleNewCategoryImageChange} />
                {newCategoryImage && <img src={newCategoryImage} alt="New Category Icon" className="mt-2" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
              <button type="button" className="btn ms-2" style={{ backgroundColor: "#002538", color: "white" }} onClick={handleSaveCategory} style={{ backgroundColor: "#002538", color: "white", marginLeft: "10px" }}>Save Category</button>
            </div>
          </div>
          <div className="mt-3 modal-content animated-modal">
            <table className="table mt-2 table-bordered table-hover dt-responsive">
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
                        <img src={category.icon} alt="icon" style={{ maxWidth: '50px', maxHeight: '50px' }} />
                      ) : (
                        "No Icon"
                      )}
                    </td>
                    <td>
                      <button className="btn btn-warning">Edit</button>
                      <button className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
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
