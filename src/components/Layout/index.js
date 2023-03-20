import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Button } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Link,
  Redirect,
  useNavigate,
  useHistory,
  useLocation,
} from "react-router-dom";
import React from "react";
import "./index.css";
import Home from "../../test/Home/index";
// import Home from '../../test/Home';
import About from "../../test/About";
// import Users from "../../test/Users";
import Users from "../../test/User/index";
const { Header, Content, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const routerArr = [
  { path: "/home", name: "todo", key: "home" },
  { path: "/about", name: "关于", key: "about" },
  { path: "/users", name: "用户", key: "users" },
];
const count = "3434";
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);
const items3 = routerArr.map((item) => {
  return {
    key: item.key,
    label: item.name,
    path: item.path,
  };
});
const LayoutBox = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log(e);
    navigate(e.key);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items3}
          onClick={onClick}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["home"]}
            defaultOpenKeys={["home"]}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            items={items3}
            onClick={onClick}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/users" element={<Users />} />
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default LayoutBox;
