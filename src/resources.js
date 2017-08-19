const debug = process.env.NODE_ENV === 'development' ? true : false;
// 测试环境地址
if (debug) {
    var host = 'http://120.77.72.16:8080/api';
    //   var host = 'http://192.168.1.102:8080/api';
} else {
    //正式环境地址
    var host = 'http://120.77.72.16:8080/api';
}
console.warn('当前resource: ', host);

let resources = {
    universityId: sessionStorage.getItem('universityId') || 0,
    token: sessionStorage.getItem('token') || '',
    host: host,
    // graphQL查询Api
    graphQlApi: `${host}\/graphql`,
    // 创建一个跑步运动项目
    runningSports() {
        return `${host}\/runningSports`
    },
    // 更新项目启用状态
    runningSportsEnable(id) {
        return `${host}\/runningSports\/${id}\/updateEnable`
    },
    // 更新项目指标 
    runningSportsUpdate(id) {
        return `${host}\/runningSports\/${id}`
    },
    // TermSportsTask(学期运动任务)相关接口
    termSportsTasks(id) {
        return `${host}\/termSportsTasks\/${id}`
    },
    // 定点室外运动点相关接口
    fixLocationOutdoorSportPoints(id) {
        return typeof (id) == 'undefined' ? `${host}\/fixLocationOutdoorSportPoints` : `${host}\/fixLocationOutdoorSportPoints\/${id}`;
    },
    // 定点区域运动相关接口
    areaSports(id) {
        return typeof (id) == 'undefined' ? `${host}\/areaSports\/` : `${host}\/areaSports\/${id}`;
    },
    requestLogin() { 
        return `${host}/tokens`
    },
    // 获取android版本信息列表
    versions(id) {
        return typeof (id) == 'undefined' ? `${host}/versions` : `${host}/versions\/${id}`;
    }
};

export default resources;