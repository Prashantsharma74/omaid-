import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const DietMeal = () => {
  const location = useLocation();
  const dietData = location.state?.diet;

  const [formData, setFormData] = useState({
    week: dietData?.week || "",
    day: dietData?.day || "",
    meal: dietData?.meal || "",
    food: dietData?.food || "",
  });

  const [isAlert, setIsAlert] = useState(false);
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState(["Apple", "Banana", "Chicken Salad", "Oatmeal"]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    if (name === "food") {
      const isExisting = suggestions.includes(value);
      setShowAddButton(value && !isExisting);
    }
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
    setFormData({ week: "", day: "", meal: "", food: "" });
    setTimeout(() => setIsAlert(false), 3000);
  };

  const handleSuggestionClick = (food) => {
    setFormData((prevData) => ({ ...prevData, food }));
    setShowSuggestions(false);
    setShowAddButton(false);
  };

  const handleAddNewFood = () => {
    if (formData.food && !suggestions.includes(formData.food)) {
      setSuggestions((prevSuggestions) => [...prevSuggestions, formData.food]);
      setShowAddButton(false);
    }
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <h1>
          <span className="mr-4 fw-bold">{dietData ? "Edit" : "Add"} Diet Meal Plan</span>
        </h1>
      </div>
      <button
        className="btn mb-2 ms-2"
        style={{ backgroundColor: "#002538", color: "white" }}
        type="button"
        onClick={() => window.history.back()}
      >
        <i className="fa-solid fa-arrow-left" style={{ color: "#fff" }}></i> &nbsp;Previous
      </button>
      
      {isAlert && <div className="alert alert-success text-center">Meal plan saved successfully!</div>}

      <div className="row justify-content-center">
        <div className="col-md-10 px-5">
          <div className="tile">
            <div className="case-status d-flex justify-content-center" style={{
              backgroundColor: "#002538", color: "#fff", height: "50px", textAlign: "center", width: "100%"
            }}>
              <h4 className="mt-2">{dietData ? "Edit Food" : "Add Food"}</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-lg-12">
                    <h5 className="mt-3 mb-3">
                      <strong>Diet Meal</strong>
                    </h5>
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Choose Week</label>
                    <select className={`form-select ${errors.week ? "is-invalid" : ""}`} name="week" value={formData.week} onChange={handleChange}>
                      <option value="">Select Week</option>
                      <option value="week1">Week 1</option>
                      <option value="week2">Week 2</option>
                      <option value="week3">Week 3</option>
                      <option value="week4">Week 4</option>
                    </select>
                    {errors.week && <div className="invalid-feedback">{errors.week}</div>}
                  </div>

                  <div className="mb-3 col-md-6">
                    <label className="form-label">Choose Day</label>
                    <select className={`form-select ${errors.day ? "is-invalid" : ""}`} name="day" value={formData.day} onChange={handleChange}>
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
                    <label className="form-label">Choose Meal Type</label>
                    <select className={`form-select ${errors.meal ? "is-invalid" : ""}`} name="meal" value={formData.meal} onChange={handleChange}>
                      <option value="">Select Meal</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snacks">Snacks</option>
                    </select>
                    {errors.meal && <div className="invalid-feedback">{errors.meal}</div>}
                  </div>

                  <div className="mb-3 col-md-6" style={{ position: "relative" }}>
                    <label className="form-label">Search Food</label>
                    <input
                      className={`form-control ${errors.food ? "is-invalid" : ""}`}
                      type="text"
                      placeholder="Enter food name"
                      name="food"
                      value={formData.food}
                      onChange={handleChange}
                      onFocus={() => setShowSuggestions(true)} // Show suggestions on focus
                      onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide suggestions on blur
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div style={{
                        position: "absolute", top: "100%", left: "0", right: "0", backgroundColor: "#fff",
                        border: "1px solid #ccc", zIndex: 1000, maxHeight: "150px", overflowY: "auto", borderRadius: "4px"
                      }}>
                        {suggestions.map((food, index) => (
                          <div key={index} onClick={() => handleSuggestionClick(food)} style={{
                            padding: "8px", cursor: "pointer", borderBottom: "1px solid #f1f1f1"
                          }}>
                            {food}
                          </div>
                        ))}
                      </div>
                    )}
                    {showAddButton && (
                      <button type="button" onClick={handleAddNewFood} className="btn p-0" style={{color:"#002538"}}>
                        + Add "{formData.food}"
                      </button>
                    )}
                    {errors.food && <div className="invalid-feedback">{errors.food}</div>}
                  </div>

                  <div className="mb-3 col-lg-12 text-center mt-3">
                    <button className="btn custom-btn text-white w-50" type="submit">
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
