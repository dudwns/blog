import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Layout, Menu } from "antd";

const { Header } = Layout;

function App() {
  const [time, setTime] = useState(new Date());

  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  return (
    <Layout className="layout">
      <h3>현재 시각 : {time.toLocaleTimeString()}</h3>
      <Router>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: 1,
                label: <Link to="/">HOME</Link>,
              },
              {
                key: 2,
                label: <Link to="/resume">이력서</Link>,
              },
              {
                key: 3,
                label: <Link to="/portfolio">포트폴리오</Link>,
              },
            ]}
          />
        </Header>
        <Layout.Content style={{ padding: "0 50px" }}>
          <Routes>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Layout.Content>
      </Router>
    </Layout>
  );
}

const Home = () => {
  return <>홈페이지</>;
};

const Resume = () => {
  return (
    <div>
      <h2>자기소개</h2>
      <h3>이름: 김영준(24)</h3>
      <h3>학력</h3>
      <>
        <li>명문고등학교</li>
        <li>동양미래대학교</li>
      </>
    </div>
  );
};

const Portfolio = () => {
  return <></>;
};

export default App;
