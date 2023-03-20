import React, { Component, useState, useRef, useEffect } from "react";
import { Button, Input, DatePicker, Select } from "antd";
import "./index.css";

const Home = () => {
  const selectArr = [
    {
      value: "public",
      label: "普通",
    },
    {
      value: "middle",
      label: "重要",
    },
    {
      value: "important",
      label: "非常重要",
    },
    // {
    //   value: "disabled",
    //   label: "Disabled",
    //   disabled: true,
    // },
  ];
  const [searchVal, setSearchVal] = useState("");
  const [editValue, setEditValue] = useState("");
  const [selectValue, handleChange] = useState("");
  const [dateValue, dateChange] = useState("");
  const [lists, setList] = useState([]);
  const onSearch = (value) => {
    setSearchVal(value);
  };
  const onEditChange = (value) => {
    setEditValue(value);
  };
  const addSomeThing = () => {
    if (searchVal.trim() !== "") {
      setList([
        ...lists,
        {
          is: false,
          do: searchVal,
          time: dateValue,
          eval: selectValue,
          isEdit: false,
        },
      ]);
    }
    setSearchVal("");
    console.log(lists);
  };
  const onDateChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    dateChange(dateString);
  };
  const listChange = (index, arr) => {
    const newList = [...lists];
    arr.map((item) => {
      return (newList[index][item.key] = item.value);
    });
    setList([...newList]);
  };
  const onEdit = (index, arr, value) => {
    setEditValue(value);
    listChange(index, arr);
  };
  const onDel = (index) => {
    const newList = [...lists];
    newList.splice(index, 1);
    setList(newList);
  };
  return (
    <div id="todo">
      <div className="search">
        <Input
          style={{ width: "300px" }}
          placeholder="请输入待做事项"
          value={searchVal}
          onChange={(e) => onSearch(e.target.value)}
          onPressEnter={(e) => addSomeThing()}
        ></Input>
        <DatePicker
          placeholder="选择时间"
          showTime
          onChange={onDateChange}
        />
        <Select
          defaultValue="public"
          style={{
            width: 120,
          }}
          onChange={handleChange}
          options={selectArr}
        />
        <Button onClick={addSomeThing}>添加</Button>
      </div>
      <div>
        <ul className="todoList">
          {lists.map((item, index) => (
            <li className="todoItem" key={index}>
              <input
                type="checkbox"
                checked={item.is ? true : false}
                onChange={() =>
                  listChange(index, [{ key: "is", value: !item.is }])
                }
              />
              {item.isEdit ? (
                <div>
                  <Input
                    style={{ width: "300px", marginRight: "10px" }}
                    value={editValue}
                    onChange={(e) => onEditChange(e.target.value)}
                  ></Input>
                  <Button
                    onClick={() =>
                      listChange(index, [
                        { key: "do", value: editValue },
                        { key: "isEdit", value: false },
                      ])
                    }
                  >
                    保存
                  </Button>
                  <Button
                    onClick={() =>
                      listChange(index, [{ key: "isEdit", value: false }])
                    }
                  >
                    取消
                  </Button>
                </div>
              ) : (
                <div className={item.is ? "done" : ""}>
                  {item.do}
                  {item.is ? (
                    ""
                  ) : (
                    <div>
                      <Button
                        className="changeBtn"
                        onClick={() =>
                          onEdit(
                            index,
                            [{ key: "isEdit", value: !item.is }],
                            item.do
                          )
                        }
                      >
                        修改
                      </Button>
                      <Button
                        className="changeBtn"
                        onClick={() => onDel(index)}
                      >
                        删除
                      </Button>
                    </div>
                  )}
                  <div>{item.time}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
