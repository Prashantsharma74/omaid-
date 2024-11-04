import React, { useEffect, useRef } from "react";

const TableFitzone = ({
    setOpenDropdown,
    row,
    openDropdown,
    handleEdit,
  }) => {
    const dropdownRef = useRef(null);
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          if (openDropdown === row.srNum) {
            setOpenDropdown(null);
          }
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [openDropdown, setOpenDropdown, row.srNum]);
  return (
    <div className="dropdown text-center" ref={dropdownRef}>
      <button
        className="dropdown-button"
        onClick={() =>
          setOpenDropdown(openDropdown === row.srNum ? null : row.srNum)
        }
        aria-haspopup="true"
        aria-expanded={openDropdown === row.srNum}
      >
        <i
          className={`fa fa-ellipsis-v ${
            openDropdown === row.srNum ? "rotate-icon" : ""
          }`}
        ></i>
      </button>
      {openDropdown === row.srNum && (
        <div className="dropdown-menu show">
          <a
            className="dropdown-item"
            onClick={() => {
              handleEdit(row);
              setOpenDropdown(null);
            }}
          >
            <i className="fa fa-edit"></i> Edit
          </a>
          {/* <a
            className="dropdown-item"
            onClick={() => {
              handleDelete(row.srNum);
              setOpenDropdown(null);
            }}
          >
            <i className="fa fa-trash"></i> Delete
          </a> */}
        </div>
      )}
    </div>
  );
};

export default TableFitzone;
