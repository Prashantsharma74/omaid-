import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import profile from "../assets/images/profile.png";
import $ from "jquery";

const Headers = () => {
  const [isDataManagementOpen, setIsDataManagementOpen] = useState(false);
  const [isBlogSectionOpen, setIsBlogSectionOpen] = useState(false);

  const toggleDataManagement = () => {
    setIsDataManagementOpen(!isDataManagementOpen);
    setIsBlogSectionOpen(false); // Close the Blog Section dropdown if it's open
  };

  const toggleBlogSection = () => {
    setIsBlogSectionOpen(!isBlogSectionOpen);
    setIsDataManagementOpen(false); // Close the Data Management dropdown if it's open
  };

  useEffect(() => {
    const treeviewMenu = $(".app-menu");
    const currentUrl = window.location.href;

    // Highlight active menu item based on the current URL
    $(".app-menu a").each(function () {
      if (this.href === currentUrl) {
        $(this).addClass("active");
        $(this).parent().addClass("active");
        $(this).parent().parent().prev().addClass("active");
        $(this).parent().parent().prev().click();
      }
    });

    // Toggle sidebar functionality
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $(".app").toggleClass("sidenav-toggled");
    });

    return () => {
      $('[data-toggle="sidebar"]').off("click");
    };
  }, []);

  return (
    <>
      <header className="app-header">
        <Link className="app-header__logo" to="/">
          <p className="mb-0">Fitness App</p>
        </Link>
        <a
          className="app-sidebar__toggle"
          to="#"
          data-toggle="sidebar"
          aria-label="Hide Sidebar"
        ></a>
      </header>

      {/* Sidebar menu */}
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src={profile}
            alt="User Image"
          />
          <div>
            <p className="app-sidebar__user-name text-white">Fitness</p>
            <p className="app-sidebar__user-designation text-white">Admin Master</p>
          </div>
        </div>
        <ul className="app-menu">
          {/* Other menu items here */}
          <li className="treeview">
            <div className="app-menu__item" onClick={toggleDataManagement}>
              <i className="app-menu__icon fa-sharp fa-light fa-clipboard-list-check"></i>
              <span className="app-menu__label">Data Management</span>
              <i className={`treeview-indicator bi bi-chevron-${isDataManagementOpen ? 'down' : 'right'}`}></i>
            </div>
            {isDataManagementOpen && (
              <ul className="treeview-menu">
                <li>
                  <Link to="/data-manage/nutrition-food" className="treeview-item">
                    <i className="app-menu__icon fa-sharp fa-light fa-avocado"></i>
                    <span className="app-menu__label">Nutrition Food</span>
                  </Link>
                </li>
                <li>
                  <Link className="treeview-item" to="/data-manage/diet-plan">
                    <i className="fa-sharp fa-light app-menu__icon fa-salad"></i>
                    <span className="app-menu__label">Diet Plan</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="treeview">
            <div className="app-menu__item" onClick={toggleBlogSection}>
              <i className="fa-sharp fa-light fa-blog app-menu__icon pr-1"></i>
              <span className="app-menu__label">Blog Section</span>
              <i className={`treeview-indicator bi bi-chevron-${isBlogSectionOpen ? 'down' : 'right'}`}></i>
            </div>
            {isBlogSectionOpen && (
              <ul className="treeview-menu">
                <li>
                  <Link to="/blogs/manage-category" className="treeview-item">
                    <i className="app-menu__icon fa-sharp fa-light fa-list"></i>
                    <span className="app-menu__label">Manage Category</span>
                  </Link>
                </li>
                <li>
                  <Link className="treeview-item" to="/blogs/manage-blogs">
                    <i className="fa-sharp fa-light app-menu__icon fa-square-rss"></i>
                    <span className="app-menu__label">Manage Blogs</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          {/* Other menu items here */}
        </ul>
      </aside>
    </>
  );
};

export default Headers;
