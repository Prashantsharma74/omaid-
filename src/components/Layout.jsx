import React, { useState } from "react";
import Headers from "./Headers";

const Layout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <div
      className={`app sidebar-mini modal-open ${
        isSideBarOpen ? " sidenav-toggled" : ""
      }`}
    >
      <Headers />
    </div>
  );
};

export default Layout;
