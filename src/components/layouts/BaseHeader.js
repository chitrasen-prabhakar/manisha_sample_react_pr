//lib imports
import { Layout, Menu } from "antd";

const { Header } = Layout;

const BaseHeader = () => {
  const logout = () => {
    if (typeof Storage !== "undefined") {
      localStorage.removeItem("ls.user");
    }
    window.location.href = window.location.origin;
  };
  return (
    <Header className="site-layout-background">
  
      <Menu theme="light" mode="horizontal">
        <Menu.Item key="1" onClick={logout}>
          Logout
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default BaseHeader;
