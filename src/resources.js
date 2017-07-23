const debug = process.env.NODE_ENV === 'development' ? true : false;
// 测试环境地址
if (debug) {
  var host = 'http://120.77.72.16:8080/api';
} else {
  //正式环境地址
  var host = 'http://www.baidu.com/';
}
console.warn('当前resource: ', host);

let resources = {
    host: host,
    // graphQL查询Api
    graphQlApi: `${host}\/graphql`,
    // 更新项目启用状态
    runningProjectsEnable(id){
        return `${host}\/runningProjects\/${id}\/updateEnable`
    },
    // 更新项目指标
    runningProjectsUpdateIndex(id){
        return `${host}\/runningProjects\/${id}\/updateIndex`
    },
    // TermSportsTask(学期运动任务)相关接口
    termSportsTasks(id){
        return `${host}\/termSportsTasks\/${id}`
    },
    // 定点室外运动点相关接口
    fixLocationOutdoorSportPoints(id){
        return `${host}\/fixLocationOutdoorSportPoints\/${id}`;
    }
};

export default resources;