import React, { useState } from "react";

const AddNutrition = () => {
  const [formData, setFormData] = useState({
    userId: "",
    title: "",
    proteins: "",
    carbs: "",
    calories: "",
    fats: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    for (const field in formData) {
      if (!formData[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Handle successful submission (e.g., send data to the server)
      console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1 className="">
            <span className="mr-4 fw-bold">&nbsp; Add Nutrition</span>
          </h1>
        </div>
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
              <h4 className="mt-2">Add Nutrition</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">User Default ID</label>
                    <input
                      className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                      id="userId"
                      type="text"
                      placeholder="User Default ID"
                      value={formData.userId}
                      onChange={handleChange}
                    />
                    {errors.userId && <div className="invalid-feedback">{errors.userId}</div>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Title</label>
                    <input
                      className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                      id="title"
                      type="text"
                      placeholder="Enter title"
                      value={formData.title}
                      onChange={handleChange}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Proteins</label>
                    <input
                      className={`form-control ${errors.proteins ? 'is-invalid' : ''}`}
                      id="proteins"
                      type="number"
                      placeholder="Enter Proteins"
                      value={formData.proteins}
                      onChange={handleChange}
                    />
                    {errors.proteins && <div className="invalid-feedback">{errors.proteins}</div>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Carbs</label>
                    <input
                      className={`form-control ${errors.carbs ? 'is-invalid' : ''}`}
                      id="carbs"
                      type="number"
                      placeholder="Enter Carbs"
                      value={formData.carbs}
                      onChange={handleChange}
                    />
                    {errors.carbs && <div className="invalid-feedback">{errors.carbs}</div>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Calories</label>
                    <input
                      className={`form-control ${errors.calories ? 'is-invalid' : ''}`}
                      id="calories"
                      type="number"
                      placeholder="Enter Calories"
                      value={formData.calories}
                      onChange={handleChange}
                    />
                    {errors.calories && <div className="invalid-feedback">{errors.calories}</div>}
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Fats</label>
                    <input
                      className={`form-control ${errors.fats ? 'is-invalid' : ''}`}
                      id="fats"
                      type="number"
                      placeholder="Enter Fats"
                      value={formData.fats}
                      onChange={handleChange}
                    />
                    {errors.fats && <div className="invalid-feedback">{errors.fats}</div>}
                  </div>

                  <div className="mb-3 col-md-6 w-100">
                    <label className="form-label">Description</label>
                    <textarea
                      className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                      id="description"
                      placeholder="Enter Description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                  </div>
                  <div className="mb-2 mt-2 col-lg-12 text-center">
                    <button className="btn custom-btn text-white w-50" type="submit">
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

export default AddNutrition;
