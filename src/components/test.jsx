<main class="app-content">
			<div class="app-title">
				<div>
					<h1 class="">
						<i class="fa-light fa-sharp fa-light fa-users"></i>
						<span class="mr-4">&nbsp; Manage Foods</span>
					</h1>
					<p></p>
				</div>
			</div>

               <!-- row for add user btn  -->
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12 col-lg-12 px-5 text-end">
                         <div class="bt-ad-emp">
                              <a class="add-btt btn" href="add-food.php"><i class="fa-regular fa-plus"></i> Add Foods</a>
                         </div>
                    </div>
                </div>
               <!-- row end for add user -->

               <!-- row for table start from here  -->
			<div class="row mt-4">
				<div class="col-md-12 px-5">
					<div class="tile">
						<div class="tile-body">
                                   <!-- table start from here -->
							<div class="table-responsive">
								<table class="table table-bordered table-hover dt-responsive">
									<thead>
                                                  <!-- table head  -->
										<tr>
											<th>S.No</th>
											<th>Last Edit </th>
                                            <th>Food Category</th>
                                            <th>Approved / Non approved </th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>
                                             <!-- table body -->
									<tbody>
										<tr>
											<td>01</td>
											<td>17-10-2024</td>
                                            <td>Herbs</td>
                                            <td><span class="badge badge-success">Approved</span></td>
                                                       <!-- status toggle  -->
											<td>
												<div class="form-check form-switch">
													<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked="">
												</div>
											</td>
											<td>
												<div class="d-flex gap-2">
													<a href="edit-intro.php" class="glass-button">
														<i class="fa-regular fa-eye"></i>
													</a>
													<a href="javascript:void(0)" class="glass-button2 delete">
														<i class="fa-light fa-trash-can"></i>
													</a>
												</div>
											</td>
										</tr>
                                        <!-- t2 -->
                                        <tr>
											<td>01</td>
											<td>17-10-2024</td>
                                            <td>Herbs</td>
                                            <td><span class="badge badge-warning">Non Approved</span></td>
                                                       <!-- status toggle  -->
											<td>
												<div class="form-check form-switch">
													<input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked="">
												</div>
											</td>
                                                       <!-- Action -->
											<td>
												<div class="d-flex gap-2">
													<a href="edit-intro.php" class="glass-button">
														<i class="fa-regular fa-eye"></i>
													</a>
													<a href="javascript:void(0)" class="glass-button2 delete">
														<i class="fa-light fa-trash-can"></i>
													</a>
												</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>