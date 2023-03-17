import request from "../utils/request";

function getTeamList(params) {
  return request("get", "user/getListTeam.do", params);
}
function getListGroupTeam(data) {
  return request("post", "user/listGroupTeam.do", data);
}

export { getListGroupTeam, getTeamList };
