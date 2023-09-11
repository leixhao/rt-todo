import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LayoutBox from "../components/Layout/index";
import Users from "../test/User/index";
// lazy的返回值就是一个react组件
// const Users = lazy(() => import("../test/User/index.js"));
const Home = lazy(() => import("../test/Home/index.js"));
const About = lazy(() => import("../test/About.js"));
const Router = (props) => {
  return (
    <BrowserRouter>
      <Suspense>
        <LayoutBox>
          <Routes>
            {/* <Route path="*" element={<Navigate to="/" />} />
          <Route path="/" element={<Navigate to="/home" />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* {routerArr.map((menu) => {
              console.log(123);
              return (
                <Route
                  path={menu.path}
                  key={menu.key}
                  name={menu.name}
                  element={props =>{
                    return <menu.ele {...props} />
                  }}
                ></Route>
              );
            })} */}
          </Routes>
        </LayoutBox>
      </Suspense>
    </BrowserRouter>
  );
};
export default Router;
