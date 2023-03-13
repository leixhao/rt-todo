import React, { Component, useState, useRef, useEffect } from 'react';
import { Button, Input, Checkbox } from 'antd';
import './index.css'

const Home = () => {
  const [searchVal, setSearchVal] = useState('');
  const [lists, setList] = useState([]);
  const [count, setCount] = useState(0);
  const onSearch = (value) => {
    setSearchVal(value);
  };
  const addSomeThing = () => {
    if (searchVal.trim() !== "") {
      setList([...lists, { is: false, do: searchVal, isEdit: false }])
    }
    setSearchVal('');
    console.log(lists)
  }
  const doSomeThing = (index) => {
    console.log(222)
    const newList = [...lists];
    newList[index].is = true;
    setList([...newList]);
  }
  const onCheckChange = (index) => {
    console.log(333)
    const newList = [...lists];
    newList[index].is = !newList[index].is;
    setList([...newList]);
  }
  const listChange = (index, key, val, v) => {
    const newList = [...lists];
    if (v) {
      newList[index][key] = !newList[index][key];
    } else {
      newList[index][key] = val
    }
    setList([...newList]);
  }
  const onEdit = (index) => {
    listChange(index, 'isEdit', '', true)
  }
  return (
    <div id='todo'>
      <div className='search'>
        <Input placeholder="请输入待做事项" value={searchVal} onChange={(e) => onSearch(e.target.value)} onPressEnter={(e) => addSomeThing()}></Input>
        <Button onClick={addSomeThing}>搜索</Button>
      </div>
      <div>
        <ul className='todoList'>
          {lists.map((item, index) => (
            <li className='todoItem' key={index} onClick={() => doSomeThing(index)}>
              {item.isEdit ? (<div>{item.is + item.do}<Button onClick={() => onEdit(index)}>保存</Button><Button onClick={() => onEdit(index)}>取消</Button></div>) : (
                <div>{item.is + item.do}<Button onClick={() => onEdit(index)}>修改</Button></div>)}
              <Checkbox checked={item.is ? true : false} onChange={() => onCheckChange(index)}></Checkbox>
            </li>
            // <li className={item.is ? 'todoItem endTodo' : 'todoItem'} key={index}>{item.is}{item.do}
            //   <div className='endAnimal' onClick={doSomeThing(index)}>
            //     <svg width="400" height="400">
            //       <circle fill="none" stroke="#68E534" stroke-width="20" cx="200" cy="200" r="190" className="circle" stroke-linecap="round" transform="rotate(-90 200 200) " />
            //       <polyline fill="none" stroke="#68E534" stroke-width="24" points="88,214 173,284 304,138" stroke-linecap="round" stroke-linejoin="round" className="tick" />
            //     </svg>
            //   </div>
            // </li>
          )
          )}
        </ul>
      </div>
    </div >
  );
}

export default Home;
