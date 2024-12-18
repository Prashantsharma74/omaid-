import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dashSide from "../assets/images/dash.gif";

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [userIP, setUserIP] = useState("");

  const formatTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return { hours, minutes, seconds, ampm };
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const fetchUserIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("Error fetching the IP address:", error);
      }
    };

    fetchUserIP();

    return () => clearInterval(intervalId);
  }, []);

  const { hours, minutes, seconds, ampm } = formatTime(time);

  return (
    <main className="app-content">
      <div className="app-title tile p-3">
        <div>
          <h1 style={{ fontWeight: "700" }}>Dashboard</h1>
          <p></p>
        </div>
        <ul className="app-breadcrumb breadcrumb"></ul>
      </div>
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-md-6 col-lg-6">
              <Link className="text-decoration-none" to="/users">
                <div className="widget-small ctm-bg-4 coloured-icon">
                  <i className="icon fa-sharp fa-light fa-users"></i>
                  <div className="info">
                    <h4>Total Active User</h4>
                    <p>
                      <b>500</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-6">
              <Link className="text-decoration-none" to="/sub-admin">
                <div className="widget-small ctm-bg-2 coloured-icon">
                  <i className="icon fa-light fa-user-group"></i>
                  <div className="info">
                    <h4>Total Sub-Admin</h4>
                    <p>
                      <b>12</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-6">
              <Link className="text-decoration-none" to="/fitzone-manage">
                <div className="widget-small ctm-bg-1 coloured-icon">
                  <i className="icon fa-light fa-rocket"></i>
                  <div className="info">
                    <h4>Total sessions</h4>
                    <p>
                      <b>3</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-6">
              <Link className="text-decoration-none" to="/blogs/manage-blogs">
                <div className="widget-small ctm-bg-1 coloured-icon">
                  <i className="icon fa-thin fa-file-lines"></i>
                  <div className="info">
                    <h4>Total Blogs</h4>
                    <p>
                      <b>4</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-6">
              <Link className="text-decoration-none" to="/manage-program">
                <div className="widget-small ctm-bg-1 coloured-icon">
                  <i className="icon fa-light fa-file-chart-column"></i>
                  <div className="info">
                    <h4>Total Programs</h4>
                    <p>
                      <b>6</b>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-lg-6">
              <Link className="text-decoration-none">
                <div className="widget-small ctm-bg-1 coloured-icon">
                  <i className="icon fa-light fa-server"></i>
                  <div className="info">
                    <h4>Server Status</h4>
                    <div className="box">
                      <div className="server running">
                        <ul>
                          <li></li>
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </div>
                      <span>RUNNING</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="tile rounded-2 p-3">
            <div className="tile-body">
              <div className="row">
                <div className="col-lg-12">
                  <div
                    id="clock"
                    className="d-flex"
                    style={{
                      width: "200px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <p>
                      <i className="fa-sharp fa-regular fa-clock unit fa-xl pt-3"></i>
                    </p>
                    <p className="unit dots" id="hours">
                      {hours}
                    </p>
                    <p className="unit dots" id="minutes">
                      {minutes}
                    </p>
                    <p className="unit" id="seconds">
                      {seconds}
                    </p>
                    <p className="unit" id="ampm">
                      {ampm}
                    </p>
                  </div>
                </div>
                <div className="col-lg-12 p-3">
                  <h2>
                    Welcome{" "}
                    <strong style={{ color: "#002538", fontWeight: "900" }}>
                      Omaid
                    </strong>
                  </h2>
                  <h6>
                    Welcome to our Dashboard, Omaid. Get to know our development
                    tools by following these onboarding steps, or just feel free
                    to dive right in!
                  </h6>
                  {userIP && (
                    <h6>
                      Your IP address is:{" "}
                      <strong className="animated-ip">{userIP}</strong>
                    </h6>
                  )}
                </div>
              </div>
              <div className="col-lg-12 text-end">
                <img
                  src={dashSide}
                  alt="Dashboard Side"
                  className="responsive-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
