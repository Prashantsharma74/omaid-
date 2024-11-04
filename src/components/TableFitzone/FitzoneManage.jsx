import React, { useEffect, useRef } from "react";

const FitzoneManage = () => {
    const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (openDropdown === user.srNum) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown, setOpenDropdown, user.srNum]);
  return (
    <div className="dropdown text-center" ref={dropdownRef}>
      <button
        className="dropdown-button"
        onClick={() => handleDropdownToggle(index)}
        aria-haspopup="true"
      >
        <i className="fa fa-ellipsis-v"></i>
      </button>
      {openDropdownIndex === index && (
        <div className="dropdown-menu show">
          <Link to={user.url} className="dropdown-item">
            <i className="fa fa-edit"></i> Edit
          </Link>
        </div>
      )}
    </div>
  );
};

export default FitzoneManage;
