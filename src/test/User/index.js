import React, { Component, useState, useRef, useEffect } from "react";
import { Space, Table, Tag } from "antd";
import { getListGroupTeam, getTeamList } from "../../api/index";
import Childcom from '../Users'

const User = () => {
  const [isAxios, setAxios] = useState(false);
  const [useList, setUserList] = useState([]);
  const [teamList, setTeamList] = useState([]);
  const [paramsData, setParams] = useState({
    userId: 289,
    page: 1,
    rows: 10,
    superGroupId: 0,
    groupId: 1,
    deviceToken: "html5",
    deviceType: "html5",
  });
  const getList = () => {
    getTList();
    // getListGroupTeam(paramsData).then((res) => {
    //   setUserList(res.info);
    // });
  };
  const getTList = ()=>{
    getTeamList(paramsData).then(res =>{
      console.log(res.info)
      res.info.map((item,index) =>{
        return item.key = index
      })
      setTeamList(res.info)
    })
  }
  useEffect(() => {
    let ignore = false;
    async function startFetching() {
      const json = await getListGroupTeam(paramsData);
      console.log(json.info);
      // 这里执行是异步的，所以第一次执行到此处的时候组件已经被卸载了
      // 此时的 ignore 已经被 return 里面的方法置为 true 了
      // 所以这里第一次执行的时候不执行 setTodos(json)
      // setTodos 其实是在第二次执行的时候才触发
      if (!ignore) {
        setUserList(json.info);
      }
    }
    startFetching();
    return () => {
      ignore = true;
    };
  }, [paramsData]);
  const teamColumns = [{
    title: 'teamname',
    dataIndex: 'teamName',
    key: 'teamName'
  }];
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={getList}>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div>
      <Childcom data={paramsData} />
      <Table columns={columns} dataSource={data} />
      <Table columns={teamColumns} dataSource={teamList} />
    </div>
  );
};

export default User;
