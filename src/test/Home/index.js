import React, { Component, useState, useRef, useEffect } from "react";
import { Button, Input, DatePicker } from "antd";
import "./index.css";

const Home = () => {
  const [searchVal, setSearchVal] = useState("");
  const [editValue, setEditValue] = useState("");
  const [lists, setList] = useState([]);
  const [count, setCount] = useState(0);
  const onSearch = (value) => {
    setSearchVal(value);
  };
  const onEditChange = (value) => {
    setEditValue(value);
  };
  const addSomeThing = () => {
    if (searchVal.trim() !== "") {
      setList([...lists, { is: false, do: searchVal, isEdit: false }]);
    }
    setSearchVal("");
    console.log(lists);
  };
  const onDateChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onDateOk = (value) => {
    console.log("onOk: ", value);
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
  return (
    <div id="todo">
      <div className="search">
        <Input
          placeholder="请输入待做事项"
          value={searchVal}
          onChange={(e) => onSearch(e.target.value)}
          onPressEnter={(e) => addSomeThing()}
        ></Input>
        <DatePicker placeholder="选择时间" showTime onChange={onDateChange} onOk={onDateOk} />
        <Button onClick={addSomeThing}>添加</Button>
      </div>
      <div>
        <ul className="todoList">
          {lists.map((item, index) => (
            // <li className='todoItem' key={index} onClick={() => doSomeThing(index)}>
            <li className="todoItem" key={index}>
              <input
                type="checkbox"
                checked={item.is ? true : false}
                onChange={() =>  listChange(index, [{ key: "is", value: !item.is }])}
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
                  )}
                </div>
              )}
            </li>
            // <li className={item.is ? 'todoItem endTodo' : 'todoItem'} key={index}>{item.is}{item.do}
            //   <div className='endAnimal' onClick={doSomeThing(index)}>
            //     <svg width="400" height="400">
            //       <circle fill="none" stroke="#68E534" stroke-width="20" cx="200" cy="200" r="190" className="circle" stroke-linecap="round" transform="rotate(-90 200 200) " />
            //       <polyline fill="none" stroke="#68E534" stroke-width="24" points="88,214 173,284 304,138" stroke-linecap="round" stroke-linejoin="round" className="tick" />
            //     </svg>
            //   </div>
            // </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
