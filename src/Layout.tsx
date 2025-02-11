import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import ExchangeSection from "./components/ExchangeSection";
import Header from "./components/Header";

const Layout = () => {
  // 예시: "/" 경로일 때만 사이드바를 보여주고, 그 외에는 숨깁니다.
  const location = useLocation();
  const showSidebar = location.pathname === "/";

  return (
    <div
      className={`grid-container ${showSidebar ? "has-sidebar" : "no-sidebar"}`}
    >
      <div className="header">
        <Header />
      </div>
      <div className="exchange-section">
        <ExchangeSection />
      </div>
      {showSidebar && <div className="sidebar"></div>}
      <div className="content">
        <Outlet />
      </div>
      <footer className="footer"></footer>
    </div>
  );
};

export default Layout;
