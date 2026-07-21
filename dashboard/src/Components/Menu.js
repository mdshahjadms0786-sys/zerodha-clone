import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (index) => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ZU";

  return (
    <div className="menu-container">
      <img src={process.env.PUBLIC_URL + "/logo.png"} style={{ width: "130px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(5)}
            >
              <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{initials}</div>
          <p className="username">{user?.name?.toUpperCase() || "USERID"}</p>
        </div>
        {isProfileDropdownOpen && (
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              left: "10px",
              background: "#fff",
              border: "1px solid #ddd",
              borderRadius: "4px",
              padding: "8px 0",
              minWidth: "160px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 100,
            }}
          >
            <div
              style={{
                padding: "8px 16px",
                fontSize: "13px",
                color: "#333",
                borderBottom: "1px solid #eee",
              }}
            >
              {user?.email}
            </div>
            <div
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                fontSize: "13px",
                color: "#d32f2f",
                cursor: "pointer",
              }}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
