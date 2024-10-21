import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const BlogDropDown = () => {
  useEffect(() => {
    const treeviewMenu = $(".app-menu");
    $("[data-toggle='treeview1']").click(function (event) {
      event.preventDefault();
      if ($(this).parent().hasClass("is-expanded")) {
        treeviewMenu
          .find("[data-toggle='treeview1']")
          .parent()
          .removeClass("is-expanded");
      } else {
        treeviewMenu
          .find("[data-toggle='treeview1']")
          .parent()
          .addClass("is-expanded");
      }
    });

    const currentUrl = window.location.href;
    let isAnyExpanded = false;
    $(".app-menu a").each(function () {
      if (this.href === currentUrl) {
        // $(this).addClass("active");
        // $(this).parent().addClass("active");
        // $(this).parent().parent().prev().addClass("active");
        $(this).parent().parent().prev().click();
      }
    });
    $(".treeview-menu a").each(function () {
      if (this.href === currentUrl) {
        // $(this).addClass("active");
        // $(this).parent().addClass("active");
        // $(this).parent().parent().prev().addClass("active");
        $(this).parent().parent().prev().click();

        $(this).closest(".treeview1").addClass("is-expanded");
        isAnyExpanded = true;
      }
    });
    if (isAnyExpanded) {
      treeviewMenu
        .find("[data-toggle='treeview1']")
        .parent()
        .addClass("is-expanded");
    }
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $(".app").toggleClass("sidenav-toggled");
    });
    return () => {
      $("[data-toggle='treeview1']").off("click");
      $('[data-toggle="sidebar"]').off("click");
    };
  }, []);

  return (
    <li className="treeview">
      <div className="app-menu__item" data-toggle="treeview1">
        <i className="fa-sharp fa-light mx-3 fa-blog app-menu__icon pr-1"></i>
        <span className="app-menu__label">Blog Section</span>
        <i className="treeview-indicator bi bi-chevron-right"></i>
      </div>

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
    </li>
  );
};

export default BlogDropDown;
