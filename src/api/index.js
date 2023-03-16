import request from '../utils/request';

function getArticleList(){
  return  request("get",'/article/home/index');
}

export {
   getArticleList
}

