import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory, Redirect } from "react-router-dom";
import { Layout, Menu, Row, message, Button, Badge } from "antd";

import {
  SolutionOutlined,
  TeamOutlined,
  PlaySquareOutlined,
  LogoutOutlined,
  SettingFilled,
  BarChartOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.scss";
import logo from "../../assets/img/diskover-1.png";

import ComingSoon from "./comingSoon";

import Labels from "./labels";

import InfoUsers from "./infoUsers/";

import IngresosTotal from "./total";
import PaymentRequests from "./paymentRequests";
import BetterIncome from "./betterIncome";
import DiskoverComission from "./diskovercomission";
import CSV from "./csv";

import Administrator from "./administrator";

import ReleasesInfoPage from "./releasesInfo";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser, fetchMe } from "../../redux/user/actions";

import { getNotifications } from "../../redux/payments/actions";
import { is } from "immer/dist/internal";
import UsersRequests from "./usersRequests";
import Options from "./options";

const { Header, Sider, Content } = Layout;

function Dashboard() {
  const { SubMenu } = Menu;

  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = () => {
    console.log("loggout called");
    history.push("/login");
    message.success("Te has desconectado exitosamente");
  };

  const { user, checked, userInfo } = useSelector((state: any) => state.user);

  console.log("userInfo", userInfo);

  const [unseenRequests, setUnseenRequests] = useState({
    paymentRequestNotification: 0,
    verifyUserNotification: 0,
  });

  const { notifications } = useSelector((state: any) => state.payment_requests);

  useEffect(() => {
    dispatch(
      getNotifications("", () => {
        console.log(notifications);
        setUnseenRequests(notifications);
      })
    );
  }, []);

  useEffect(() => {
    setUnseenRequests(notifications);
  }, []);

  const logout = () => {
    dispatch(logoutUser(onLogout));
  };

  const admin = () => {
    if (user?.superAdmin) {
      return (
        <Menu.Item key='administrator' icon={<SettingFilled />}>
          <Link to='/administrator'>Administradores</Link>
        </Menu.Item>
      );
    } else {
      return null;
    }
  };

  const ingresos = () => {
    if (user?.paymentsAccess) {
      return (
        <SubMenu key='ingresos' title='Ingresos' icon={<BarChartOutlined />}>
          <Menu.Item key='3'>
            <Link to='/ingresos/revenue'>Total</Link>
          </Menu.Item>
          {/* <Menu.Item key="1">
          <Link to="/ingresos/total">Total</Link>
        </Menu.Item> */}
          <Menu.Item key='2'>
            <Badge
              count={unseenRequests?.paymentRequestNotification}
              offset={[2, -2]}
            >
              <Link to='/ingresos/requests'>Solicitudes de pago</Link>
            </Badge>
          </Menu.Item>
          <Menu.Item key='4'>
            <Link to='/ingresos/best_sales'>Mejores Ingresos</Link>
          </Menu.Item>
          <Menu.Item key='5'>
            <Link to='/ingresos/load-csv'> CSV </Link>
          </Menu.Item>
        </SubMenu>
      );
    } else {
      return null;
    }
  };

  const usersReleasesAndLabels = () => {
    if (user?.labelsAccess) {
      return (
        <>
          <SubMenu key='users' title='Usuarios' icon={<TeamOutlined />}>
            <Menu.Item key='comments' icon={<TeamOutlined />}>
              <Badge
                count={unseenRequests?.verifyUserNotification}
                offset={[2, -2]}
              >
                <Link to='/users/info'>Usuarios</Link>
              </Badge>
            </Menu.Item>

            <Menu.Item key='applications' icon={<FileAddOutlined />}>
              <Badge
                count={unseenRequests?.verifyUserNotification}
                offset={[2, -2]}
              >
                <Link to='/users/requests'>Solicitudes</Link>
              </Badge>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key='users2' icon={<SolutionOutlined />}>
            <Link to='/users/validation'>Labels</Link>
          </Menu.Item>

          <Menu.Item
            key='releases'
            title='Releases'
            icon={<PlaySquareOutlined />}
          >
            <Link to='/releases'>Releases</Link>
          </Menu.Item>
        </>
      );
    } else {
      return null;
    }
  };

  const usersRoute = () => {
    if (user?.labelsAccess) {
      return (
        <>
          <Route path='/users/info' component={InfoUsers} />
          <Route path='/users/requests' component={UsersRequests} />
          <Route path='/users/validation' component={Labels} />
          <Route path='/releases' component={ReleasesInfoPage} />
        </>
      );
    } else {
      return <></>;
    }
  };

  const ingresosRoute = () => {
    if (user?.paymentsAccess) {
      return (
        <>
          <Route path='/ingresos/revenue' component={DiskoverComission} />
          <Route path='/ingresos/total' component={IngresosTotal} />
          <Route path='/ingresos/requests' component={PaymentRequests} />

          <Route path='/ingresos/best_sales' component={BetterIncome} />
          <Route path='/ingresos/load-csv' component={CSV} />
        </>
      );
    }
    return null;
  };

  const adminRoute = () => {
    if (true) {
      return <Route path='/administrator' component={Administrator} />;
    } else {
      return null;
    }
  };

  const optionsRoute = () => {
    if (true) {
      return <Route path='/options' component={Options} />;
    } else {
      return null;
    }
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <Row justify='end'>
          <img src={logo} alt='Logo' className={styles.logo} />
          <div className={styles.grid_container}>
            <div className={styles.grid_item}>{userInfo?.email}</div>
            <div className={styles.grid_item}>
              <Button
                style={{
                  color: "#0a00ec",
                  border: "1px solid #0a00ec",
                  borderRadius: "4px",
                  backgroundColor: "transparent",
                }}
                onClick={logout}
              >
                <span className={styles.icon}>
                  <LogoutOutlined />
                </span>
                Cerrar sesión
              </Button>
            </div>
          </div>
        </Row>
      </Header>
      <Layout>
        <Sider breakpoint='lg' width='250px'>
          <Menu
            theme='light'
            mode='inline'
            defaultSelectedKeys={[window.location.pathname.replace("/", "")]}
          >
            {usersReleasesAndLabels()}
            {ingresos()}
            {admin()}
            <Menu.Item key='options' icon={<SettingFilled />}>
              <Link to='/options'>Opciones</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content className={styles.content}>
          <Switch>
            <>
              {ingresosRoute()}
              {usersRoute()}
              {adminRoute()}
              {optionsRoute()}
            </>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
