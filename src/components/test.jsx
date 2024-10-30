import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Swal from "sweetalert2";

const CmsManagement = () => {
  const editorRef = useRef(null);
  const api_key = "3e4i7xmjvw1ebtnzlwcfxtlk0tuwjfui4s1w0l2pibtj6egn";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageName, setPageName] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [errors, setErrors] = useState({ pageName: "", editorContent: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setTimeout(() => {
      setTableData([
        {
          srNum: 1,
          title: "About us",
          content: "This is the content of the About us page.",
          status: "Active",
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setPageName(item.title);
    setEditorContent(item.content);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = { pageName: "", editorContent: "" };

    if (!pageName) {
      newErrors.pageName = "Page Name is required.";
    }

    if (!editorContent || editorContent.trim() === "") {
      newErrors.editorContent = "Page Content is required.";
    }

    if (newErrors.pageName || newErrors.editorContent) {
      setErrors(newErrors);
      return;
    }

    Swal.fire({
      title: editingItem ? "Update Item?" : "Add New Item?",
      text: editingItem
        ? "Are you sure you want to update this item?"
        : "Are you sure you want to add this item?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (editingItem) {
          setTableData((prevData) =>
            prevData.map((item) =>
              item.srNum === editingItem.srNum
                ? { ...item, title: pageName, content: editorContent }
                : item
            )
          );
        } else {
          const newItem = {
            srNum: tableData.length + 1,
            title: pageName,
            content: editorContent,
            status: "Active",
          };
          setTableData((prevData) => [...prevData, newItem]);
        }
        resetForm();
        Swal.fire("Success!", "Your item has been saved.", "success");
        setIsModalOpen(false); // Close modal
      }
    });
  };

  const resetForm = () => {
    setPageName("");
    setEditorContent("");
    setErrors({ pageName: "", editorContent: "" });
    setEditingItem(null);
    if (editorRef.current) {
      editorRef.current.setContent("");
    }
  };

  return (
    <main className="app-content">
      <div className="row">
        <div className="col-md-12 px-5">
          <div className="tile p-3">
            <h1 className="text-center">CMS Management</h1>
            <div className="table-responsive">
              <table className="table table-bordered mt-2">
                <thead>
                  <tr>
                    <th>Sr. num</th>
                    <th>Page name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{row.title}</td>
                      <td>{row.status}</td>
                      <td>
                        <button onClick={() => handleEdit(row)}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
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
              <h4 style={{ marginTop: "12px" }}>{editingItem ? "Edit CMS" : "Add CMS"}</h4>
            </div>
            <div className="tile-body p-3">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-12 mt-2">
                    <label className="form-label" htmlFor="pageName">
                      Page Name
                    </label>
                    <input
                      className={`form-control ${
                        errors.pageName ? "is-invalid" : ""
                      }`}
                      name="pageName"
                      id="pageName"
                      type="text"
                      placeholder="Page Name"
                      value={pageName}
                      onChange={(e) => setPageName(e.target.value)}
                    />
                    {errors.pageName && (
                      <div className="invalid-feedback">
                        {errors.pageName}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 mt-2">
                    <label className="form-label" htmlFor="editorContent">
                      Page Content
                    </label>
                    <div>
                      <Editor
                        apiKey={api_key}
                        onEditorChange={(content) =>
                          setEditorContent(content)
                        }
                        value={editorContent}
                        onInit={(evt, editor) => (editorRef.current = editor)}
                      />
                    </div>
                    {errors.editorContent && (
                      <div className="invalid-feedback d-block">
                        {errors.editorContent}
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 text-center mt-2">
                    <button
                      className="btn custom-btn text-white mt-2 w-20pr"
                      type="submit"
                    >
                      {editingItem ? "Update Page" : "Add Page"}
                    </button>
                    <button
                      className="btn btn-secondary mt-2 w-20pr"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CmsManagement;
