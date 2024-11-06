// const ManageBlogs = () => {
//   const [openDropdown, setOpenDropdown] = useState(null); // Track the open dropdown

//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Sr.no</th>
//           <th>Title</th>
//           <th>Description</th>
//           <th>Category</th>
//           <th>Status</th>
//           <th>Publish/Private</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {paginatedData.map((row, index) => (
//           <tr key={row.srNum}>
//             <td>{index + 1 + currentPage * itemsPerPage}</td>
//             <td>{row.Title}</td>
//             <td>{row.Description}</td>
//             <td>{row.Category}</td>
//             <td>
//               <div className="form-check form-switch">
//                 <input
//                   className="form-check-input"
//                   type="checkbox"
//                   checked={row.Status === "Published"}
//                   onChange={() => toggleStatus(index)}
//                 />
//               </div>
//             </td>
//             <td>
//               <select
//                 value={row["Publish/Private"]}
//                 onChange={(e) => handlePublishPrivateChange(index, e.target.value)}
//               >
//                 <option value="Publish">Publish</option>
//                 <option value="Private">Private</option>
//               </select>
//             </td>
//             <td>
//               <ManageBlogsTable
//                 openDropdown={openDropdown} // Pass openDropdown state
//                 setOpenDropdown={setOpenDropdown} // Pass the function to update the state
//                 user={row}
//                 handleDelete={handleDelete}
//                 handleEdit={handleEdit}
//               />
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };
