import React, { useState } from "react";

const DietMeal = () => {
  const [formData, setFormData] = useState({
    week: "",
    day: "",
    meal: "",
    food: "",
  });

  const [isAlert, setIsAlert] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the changed field
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.week) newErrors.week = "Week is required.";
    if (!formData.day) newErrors.day = "Day is required.";
    if (!formData.meal) newErrors.meal = "Meal type is required.";
    if (!formData.food) newErrors.food = "Food name is required.";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    console.log(formData);
    setIsAlert(true);
    // Optionally reset the form after submission
    setFormData({
      week: "",
      day: "",
      meal: "",
      food: "",
    });
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
          <span className="mr-4 fw-bold">&nbsp; Add Diet Meal Plan</span>
        </h1>
      </div>
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
              <h4 className="mt-2">Add Food</h4>
            </div>
            <div className="tile-body p-3">
              {isAlert && (
                <div className="bs-component mb-3">
                  <div className="alert alert-dismissible alert-success">
                    <button
                      className="btn-close"
                      type="button"
                      onClick={() => setIsAlert(false)}
                    ></button>
                    <strong>Well done!</strong> Diet & Meal Plan added successfully.
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-lg-12">
                    <h5 className="mt-3 mb-3">
                      <strong>Diet Meal</strong>
                    </h5>
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Choose Week
                    </label>
                    <select
                      className={`form-select ${errors.week ? "is-invalid" : ""}`}
                      id="week"
                      name="week"
                      value={formData.week}
                      onChange={handleChange}
                    >
                      <option value="">Select Week</option>
                      <option value="week1">Week 1</option>
                      <option value="week2">Week 2</option>
                      <option value="week3">Week 3</option>
                      <option value="week4">Week 4</option>
                    </select>
                    {errors.week && <div className="invalid-feedback">{errors.week}</div>}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">
                      Choose Day
                    </label>
                    <select
                      className={`form-select ${errors.day ? "is-invalid" : ""}`}
                      id="day"
                      name="day"
                      value={formData.day}
                      onChange={handleChange}
                    >
                      <option value="">Select Day</option>
                      <option value="monday">Monday</option>
                      <option value="tuesday">Tuesday</option>
                      <option value="wednesday">Wednesday</option>
                      <option value="thursday">Thursday</option>
                      <option value="friday">Friday</option>
                      <option value="saturday">Saturday</option>
                      <option value="sunday">Sunday</option>
                    </select>
                    {errors.day && <div className="invalid-feedback">{errors.day}</div>}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label" >
                      Choose Meal Type
                    </label>
                    <select
                      className={`form-select ${errors.meal ? "is-invalid" : ""}`}
                      id="meal-type"
                      name="meal"
                      value={formData.meal}
                      onChange={handleChange}
                    >
                      <option value="">Select Meal</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snacks">Snacks</option>
                    </select>
                    {errors.meal && <div className="invalid-feedback">{errors.meal}</div>}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label" >
                      Search Food
                    </label>
                    <input
                      className={`form-control ${errors.food ? "is-invalid" : ""}`}
                      id="food-search"
                      type="text"
                      placeholder="Enter food name"
                      list="food-suggestions"
                      name="food"
                      value={formData.food}
                      onChange={handleChange}
                    />
                    <datalist id="food-suggestions">
                      <option value="Apple"></option>
                      <option value="Banana"></option>
                      <option value="Chicken Salad"></option>
                      <option value="Oatmeal"></option>
                    </datalist>
                    {errors.food && <div className="invalid-feedback">{errors.food}</div>}
                  </div>

                  <div className="mb-3 col-lg-12 text-center mt-3">
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

export default DietMeal;
