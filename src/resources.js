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
    universityId: 1,
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
    runningSportsUpdateIndex(id) {
        return `${host}\/runningSports\/${id}\/updateIndex`
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
    }
};

export default resources;