import React, { Component } from "react";
import { Button } from "antd";
const Childcom = (props) => {
  console.log(props)
  return(
    <div>
      {props.data.userId}
      <Button>跳转到员工页面</Button>
    </div>
  );
};

export default Childcom;
