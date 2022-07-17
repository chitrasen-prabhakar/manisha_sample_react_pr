import { Layout } from 'antd';
import React from 'react';
import ActiveLink from "src/components/layouts/ActiveLink";

const { Header, Footer, Sider, Content } = Layout;

export default function FrontLayout({ children }) {
  return (
    <Layout className="full-height ant-layout">
      <Header>
        <div className="logo" >
        <ActiveLink href="/" activeClassName="">
            <a>
              <img src="/images/HorizontalLogo.png" height="35" />
            </a>
          </ActiveLink>
        </div>
      </Header>
      <Content className="page-container">{children}</Content>
      <Footer>
      </Footer>
    </Layout>
  );
}
