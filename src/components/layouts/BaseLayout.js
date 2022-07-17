//lib imports
import { Layout } from "antd";

//component imports
import BaseSidebar from "./BaseSidebar";
import BaseHeader from "./BaseHeader";

const { Content } = Layout;

export default function BaseLayout({ children }) {
  return (
    <Layout className="full-height ant-layout ant-layout-has-sider ">
      <BaseSidebar />
      <Layout className="site-layout">
        <BaseHeader />
        <Content className="page-container">{children}</Content>
      </Layout>
    </Layout>
  );
}
