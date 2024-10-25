import React, { useState } from "react";

const AddFood = () => {
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your form submission logic here
    console.log({
      foodName,
      category,
      foodType,
      approvalStatus,
    });
    // Reset the form
    setFoodName("");
    setCategory("");
    setFoodType("");
    setApprovalStatus("");
  };

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1>
            <span className="mr-4 fw-bold">&nbsp;Food Categories</span>
          </h1>
        </div>
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
              <div className="bs-component mb-3">
                <div className="alert alert-dismissible alert-success" style={{ display: foodName ? "block" : "none" }}>
                  <button className="btn-close" type="button" data-bs-dismiss="alert"></button>
                  <strong>Well done!</strong> Food added successfully.
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="mb-3 col-lg-12">
                    <label className="form-label" htmlFor="food_name">Food Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="food_name"
                      placeholder="Enter food name"
                      value={foodName}
                      onChange={(e) => setFoodName(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 col-lg-12">
                    <label className="form-label" htmlFor="category">Category</label>
                    <div className="d-flex align-items-center">
                      <select
                        className="form-select"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="" disabled>Select a category</option>
                      
                      </select>
                      <button
                        type="button"
                        className="btn btn-outline-primary ms-2"
                        data-bs-toggle="modal"
                        data-bs-target="#addCategoryModal"
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </div>
                  </div>
{/* Show afte button click as popup  */}
		<div class="modal fade" id="addCategoryModal" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="addCategoryModalLabel">Add New Category</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<div class="mb-3">
							<label for="newCategory" class="form-label">Category Name</label>
							<input type="text" class="form-control" id="newCategory" placeholder="Enter new category name"/>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						<button type="button" class="btn btn-primary" id="saveCategory">Save Category</button>
					</div>
				</div>
			</div>
		</div>
    {/* Ends here  */}
                  <div className="mb-3 col-lg-12">
                    <label className="form-label" htmlFor="food_type">Food Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="food_type"
                      placeholder="Enter food type"
                      value={foodType}
                      onChange={(e) => setFoodType(e.target.value)}
                    />
                  </div>

                  <div className="mb-3 col-lg-12" style={{display:"flex",alignItems:"flex-start",flexDirection:"column"}}>
                    <label className="form-label">Approval Status</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="approvalStatus"
                        id="approved"
                        value="Approved"
                        checked={approvalStatus === "Approved"}
                        onChange={(e) => setApprovalStatus(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="approved">Approved</label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="approvalStatus"
                        id="non_approved"
                        value="Non Approved"
                        checked={approvalStatus === "Non Approved"}
                        onChange={(e) => setApprovalStatus(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="non_approved">Non Approved</label>
                    </div>
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

export default AddFood;
