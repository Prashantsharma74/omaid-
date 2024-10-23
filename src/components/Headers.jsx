import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import profile from "../assets/images/profile.png";
import $ from "jquery";
import BlogDropDown from "./BlogDropDown";

const Headers = ({ isSideBarOpen, setIsSideBarOpen }) => {
  useEffect(() => {
    const treeviewMenu = $(".app-menu");
    $("[data-toggle='treeview']").click(function (event) {
      event.preventDefault();
      if ($(this).parent().hasClass("is-expanded")) {
        treeviewMenu
          .find("[data-toggle='treeview']")
          .parent()
          .removeClass("is-expanded");
      } else {
        treeviewMenu
          .find("[data-toggle='treeview']")
          .parent()
          .addClass("is-expanded");
      }
    });

    const currentUrl = window.location.href;
    let isAnyExpanded = false;
    $(".app-menu a").each(function () {
      if (this.href === currentUrl) {
        $(this).parent().parent().prev().click();
      }
    });
    $(".treeview-menu a").each(function () {
      if (this.href === currentUrl) {
        $(this).parent().parent().prev().click();

        $(this).closest(".treeview").addClass("is-expanded");
        isAnyExpanded = true;
      }
    });
    if (isAnyExpanded) {
      treeviewMenu
        .find("[data-toggle='treeview']")
        .parent()
        .addClass("is-expanded");
    }
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $(".app").toggleClass("sidenav-toggled");
    });
    return () => {
      $("[data-toggle='treeview']").off("click");
      $('[data-toggle="sidebar"]').off("click");
    };
  }, []);

  const handleToggle = () => {
    setIsSideBarOpen(prev => !prev);
  };

  return (
    <>
      <header className="app-header d-lg-none d-sm-block d-md-none d-xl-none d-xs-block">
        <NavLink className="app-header__logo" to="/">
          <p className="mb-0">Fitness App</p>
        </NavLink>
        <a
          className="app-sidebar__toggle"
          to="#"
          data-toggle="sidebar"
          aria-label="Hide Sidebar"
          onClick={handleToggle}
        ></a>
      </header>

      {/* Sidebar menu */}
      <div className="app-sidebar__overlay"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src={profile}
            alt="User Image"
          />
          <div>
            <p className="app-sidebar__user-name text-white">Fitness</p>
            <p className="app-sidebar__user-designation text-white">
              Shabnam Ahmadi
            </p>
          </div>
        </div>
        <ul className="app-menu mt-4 your_class">
          <li>
            <NavLink className="app-menu__item" to="/">
              <svg
                className="app-menu__icon mx-3 new-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 31 30"
                fill="none"
              >
                <path
                  d="M3.25 7.5C3.25 5.14298 3.25 3.96446 3.98224 3.23224C4.71446 2.5 5.89298 2.5 8.25 2.5C10.607 2.5 11.7855 2.5 12.5178 3.23224C13.25 3.96446 13.25 5.14298 13.25 7.5V10C13.25 12.357 13.25 13.5355 12.5178 14.2677C11.7855 15 10.607 15 8.25 15C5.89298 15 4.71446 15 3.98224 14.2677C3.25 13.5355 3.25 12.357 3.25 10V7.5Z"
                  stroke="white"
                  strokeWidth="2.5"
                ></path>
                <path
                  d="M3.25 23.75C3.25 22.5851 3.25 22.0028 3.4403 21.5433C3.69404 20.9308 4.18073 20.444 4.79329 20.1903C5.25273 20 5.83515 20 7 20H9.5C10.6648 20 11.2473 20 11.7067 20.1903C12.3193 20.444 12.806 20.9308 13.0597 21.5433C13.25 22.0028 13.25 22.5851 13.25 23.75C13.25 24.9149 13.25 25.4972 13.0597 25.9567C12.806 26.5692 12.3193 27.056 11.7067 27.3097C11.2473 27.5 10.6648 27.5 9.5 27.5H7C5.83515 27.5 5.25273 27.5 4.79329 27.3097C4.18073 27.056 3.69404 26.5692 3.4403 25.9567C3.25 25.4972 3.25 24.9149 3.25 23.75Z"
                  stroke="white"
                  strokeWidth="2.5"
                ></path>
                <path
                  d="M18.25 20C18.25 17.643 18.25 16.4645 18.9823 15.7323C19.7145 15 20.893 15 23.25 15C25.607 15 26.7855 15 27.5177 15.7323C28.25 16.4645 28.25 17.643 28.25 20V22.5C28.25 24.857 28.25 26.0355 27.5177 26.7677C26.7855 27.5 25.607 27.5 23.25 27.5C20.893 27.5 19.7145 27.5 18.9823 26.7677C18.25 26.0355 18.25 24.857 18.25 22.5V20Z"
                  stroke="white"
                  strokeWidth="2.5"
                ></path>
                <path
                  d="M18.25 6.25C18.25 5.08515 18.25 4.50273 18.4402 4.04329C18.694 3.43073 19.1808 2.94404 19.7933 2.6903C20.2528 2.5 20.8351 2.5 22 2.5H24.5C25.6649 2.5 26.2472 2.5 26.7067 2.6903C27.3192 2.94404 27.806 3.43073 28.0597 4.04329C28.25 4.50273 28.25 5.08515 28.25 6.25C28.25 7.41485 28.25 7.99727 28.0597 8.45671C27.806 9.06927 27.3192 9.55596 26.7067 9.8097C26.2472 10 25.6649 10 24.5 10H22C20.8351 10 20.2528 10 19.7933 9.8097C19.1808 9.55596 18.694 9.06927 18.4402 8.45671C18.25 7.99727 18.25 7.41485 18.25 6.25Z"
                  stroke="white"
                  strokeWidth="2.5"
                ></path>
              </svg>
              <span className="app-menu__label">Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to="/sub-admin">
              <i className="fa-regular mx-3 fa-user app-menu__icon fa-light pr-1"></i>
              <span className="app-menu__label">Sub Admin Management</span>
            </NavLink>
          </li>

          <li>
            <NavLink className="app-menu__item" to="/users">
              <i
                className="app-menu__icon mx-3 fa-sharp fa-light fa-users pr-1"
                style={{ fontWeight: "700" }}
              ></i>
              <span className="app-menu__label">Users</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to="/manage-program">
              <i
                className="fa-solid mx-3 fa-bars-progress app-menu__icon"
                style={{ fontWeight: "700" }}
              ></i>
              <span className="app-menu__label">Manage Program</span>
            </NavLink>
          </li>

          <li>
            <NavLink className="app-menu__item" to="/fitzone-manage">
              <i className="app-menu__icon mx-3 fa-regular fa-heart"></i>
              <span className="app-menu__label">Fitzone Management</span>
            </NavLink>
          </li>

          <li className="treeview">
            <div className="app-menu__item" data-toggle="treeview">
              <i
                className="app-menu__icon fa-sharp mx-3 fa-light fa-clipboard-list-check"
                style={{ fontWeight: "700" }}
              ></i>
              <span className="app-menu__label">Data Management</span>
              <i className="treeview-indicator bi bi-chevron-right"></i>
            </div>

            <ul className="treeview-menu">
              <li>
                <NavLink
                  to="/data-manage/nutrition-food"
                  className="treeview-item"
                >
                  <i
                    className="app-menu__icon mx-3 fa-sharp fa-light fa-avocado"
                    style={{ fontWeight: "700" }}
                  ></i>
                  <span className="app-menu__label">Nutrition Food</span>
                </NavLink>
              </li>
              <li>
                <NavLink className="treeview-item" to="/data-manage/diet-plan">
                  <i
                    className="fa-sharp mx-3 fa-light app-menu__icon fa-salad"
                    style={{ fontWeight: "700" }}
                  ></i>
                  <span className="app-menu__label">Diet Plan</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <BlogDropDown />
          <li>
            <NavLink className="app-menu__item" to="/cms-manage">
              <i
                className="fa-sharp mx-3 fa-light fa-laptop app-menu__icon pr-1"
                style={{ fontWeight: "700" }}
              ></i>
              <span className="app-menu__label">CMS Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to="/faq">
              <i
                className="app-menu__icon mx-3 fa-regular fa-circle-info"
                style={{ fontWeight: "700" }}
              ></i>
              <span className="app-menu__label">FAQ Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to="/account-settings">
              <i
                className="app-menu__icon mx-3 fa-light fa-gear pr-1"
                style={{ fontWeight: "700" }}
              ></i>
              <span className="app-menu__label">Account Settings</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to="/notification">
              <i
                className="fa-sharp mx-3 fa-light fa-bell app-menu__icon"
                style={{ fontWeight: "700" }}
              ></i>
              <span className="app-menu__label">Notification Manage</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="app-menu__item" to="/login">
              <i
                className="app-menu__icon mx-3 fa-light fa-right-from-bracket pr-1"
                style={{ fontWeight: "700" }}
              ></i>
              <span className="app-menu__label">Logout</span>
            </NavLink>
          </li>
        </ul>
        <div className="text-center develop mt-5">
          <p
            className="d-flex align-items-center"
            style={{ margin: 0, fontSize: "11px" }}
          >
            <span style={{ color: "red" }}>&#10084;</span>
            <span>&nbsp;Developed By</span>
            <span style={{ color: "red" }}>&nbsp;Developer</span>
            <span style={{ color: "green" }}>&nbsp;Bazaar</span>
            <span style={{ color: "red" }}>&nbsp;Technologies</span>
          </p>
        </div>
      </aside>
    </>
  );
};

export default Headers;
