import request from '../utils/request';

function getListGroupTeam(data){
  return  request("post",'user/listGroupTeam.do',data);
}

export {
  getListGroupTeam
}

