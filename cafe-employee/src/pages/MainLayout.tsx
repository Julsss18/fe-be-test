import { useNavigate } from "react-router-dom";
import { Flex, Layout, Menu, MenuProps } from "antd";

import { Outlet } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";

import { setLocationAction } from "../redux/slice";

import { useSelector, useDispatch } from "react-redux";
import { CafeEmployeeState } from "../redux/types";

const { Header, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "/",
    label: "Cafe Page",
  },
  {
    key: "/employee",
    label: "Employee Page",
  },
];

const flexStyle: React.CSSProperties = {
  overflow: "hidden",
  width: "100vw",
  height: "100vh",
  backgroundColor: "white",
};

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  maxWidth: "100%",
};

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  overflow: "hidden",
  display: "flex",
};

const MainLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentRoute = useSelector((state: CafeEmployeeState) => state.loc);

  const handleNavigate = (info: MenuInfo) => {
    dispatch(setLocationAction(info.key));
    navigate(info.key);
  };

  return (
    <>
      <Flex gap="middle" wrap style={flexStyle}>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <Menu
              onClick={handleNavigate}
              items={items}
              theme="dark"
              selectedKeys={[currentRoute]}
              style={{ backgroundColor: "transparent" }}
              mode="horizontal"
            />
          </Header>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Flex>
    </>
  );
};

export default MainLayout;
