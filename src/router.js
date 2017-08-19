import VueRouter from 'vue-router'
import Vue from 'vue'
import { Loading, Message } from 'element-ui'

Vue.use(VueRouter)

import HomePage from './views/HomePage.vue'

import Login from './views/Login.vue'
import Password from './views/Password.vue'
import ResetPassword from './views/Resetpass.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

// 教师管理
import Teachers from './views/teacher/Teachers.vue'
import TeachersCreate from './views/teacher/Create.vue'
import TeacherDetail from './views/teacher/TeacherDetail.vue'

// 学生管理
import Students from './views/student/Students.vue'
import StudentsCreate from './views/student/Create.vue'
import ClassDetail from './views/student/ClassDetail.vue'
import StudentDetail from './views/student/StudentDetail.vue'
import Score from './views/student/Score.vue'
import Data from './views/student/Data.vue'

// 学科管理
import Courses from './views/course/Courses.vue'
import Setting from './views/course/Setting.vue'
import SetTarget from './views/course/SetTarget.vue'
import CreateRunningSport from './views/course/CreateRunningSport.vue'
import OutdoorTarget from './views/course/OutdoorTarget.vue'
import Area from './views/course/Area.vue'
import AllScore from './views/course/AllScore.vue'
import AllData from './views/course/AllData.vue'

// 运动记录
import Record from './views/record/Record.vue'

// 未达标运动审批
import Approval from './views/sport/Approval.vue'
import ApprovalDetail from './views/sport/ApprovalDetail.vue'

// 版本管理
import Version from './views/version/Version.vue'
import VersionEdit from './views/version/VersionEdit.vue'

let routes = [
    {
        path: '/home',
        component: HomePage,
        name: '',
        hidden: true
    },
    {
        path: '/',
        redirect: { path: '/login' },
        hidden: true
    },
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/password',
        component: Password,
        name: '',
        hidden: true
    },
    {
        path: '/resetpass',
        component: ResetPassword,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-user',
        leaf: true,//只有一个节点
        children: [
            {
                path: '/teachers',
                component: Teachers,
                meta: {
                    requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
                },
                name: '教师管理'
            },
            { 
                path: '/addteacher', 
                component: TeachersCreate, 
                meta: { requireAuth: true },
                name: '批量创建教师账号' 
            },
            { 
                path: '/teacherdetail/:id', 
                component: TeacherDetail, 
                meta: { requireAuth: true },
                name: '教师详情' 
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-users',
        leaf: true,//只有一个节点
        children: [
            { path: '/students', component: Students, meta: { requireAuth: true }, name: '学生管理' },
            { path: '/addstudent', component: StudentsCreate, meta: { requireAuth: true }, name: '批量创建学生账号' },
            { path: '/classdetail/:class_id', component: ClassDetail, meta: { requireAuth: true }, name: '班级详情' },
            { path: '/score/:class_id', component: Score, meta: { requireAuth: true }, name: '班级体育成绩' },
            { path: '/data/:class_id', component: Data, meta: { requireAuth: true }, name: '班级体测成绩' },
            { path: '/studentdetail/:id/:class_id', component: StudentDetail, meta: { requireAuth: true }, name: '学生信息详情' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-book',
        leaf: true,//只有一个节点
        children: [
            { path: '/courses', component: Courses, meta: { requireAuth: true }, name: '学科管理' },
            { path: '/setting', component: Setting, meta: { requireAuth: true }, name: '设置学期运动次数' },
            { path: '/CreateRunningSport', component: CreateRunningSport, meta: { requireAuth: true }, name: '创建跑步运动' },
            { path: '/settarget/:sport_id', component: SetTarget, meta: { requireAuth: true }, name: '设置运动指标' },
            { path: '/outdoortarget/:sport_id', component: OutdoorTarget, meta: { requireAuth: true }, name: '设置运动指标 ' },
            { path: '/area/:sport_id', component: Area, meta: { requireAuth: true }, name: '新增锻炼区域' },
            { path: '/area/:sport_id/:area_id', component: Area, meta: { requireAuth: true }, name: '编辑锻炼区域' },
            { path: '/allscore', component: AllScore, meta: { requireAuth: true }, name: '查看体育成绩' },
            { path: '/alldata', component: AllData, meta: { requireAuth: true }, name: '查看体测数据' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-edit',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/approval', component: Approval, name: '未达标运动审批' },
    //         { path: '/approvaldetail/:class_id', component: ApprovalDetail, name: '未达标运动明细' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-edit',
        leaf: true,//只有一个节点
        children: [
            { path: '/record', component: Record, meta: { requireAuth: true }, name: '运动记录' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-mobile-phone',
        leaf: true,//只有一个节点
        children: [
            { path: '/version', component: Version, meta: { requireAuth: true }, name: '版本发布管理' },
            { path: '/version/:platform/:type', component: VersionEdit, meta: { requireAuth: true }, name: '版本编辑' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

const router = new VueRouter({
    routes
})

//  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
        if (sessionStorage.getItem('token')) {// 判断是否登录
            next()
        } else {// 没登录则跳转到登录界面
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})
export default router;