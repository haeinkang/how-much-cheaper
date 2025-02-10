import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  // 예시: "/" 경로일 때만 사이드바를 보여주고, 그 외에는 숨깁니다.
  const location = useLocation();
  const showSidebar = location.pathname === "/";

  return (
    <div
      className={`grid-container ${showSidebar ? "has-sidebar" : "no-sidebar"}`}
    >
      <div className="header">header</div>
      <div className="exchange-info">exchange-info</div>
      {showSidebar && <div className="sidebar">sidebar</div>}
      <div className="content">
        <Outlet />
      </div>
      <footer className="footer">footer</footer>
    </div>
  );
};

export default Layout;
