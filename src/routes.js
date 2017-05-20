import Login from './views/Login.vue'
import Password from './views/Password.vue'
import ResetPassword from './views/Resetpass.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Teachers from './views/teacher/Teachers.vue'
import TeachersCreate from './views/teacher/Create.vue'
import TeacherDetail from './views/teacher/TeacherDetail.vue'

import StudentsCreate from './views/student/Create.vue'
import ClassDetail from './views/student/ClassDetail.vue'
import Score from './views/student/Score.vue'
import Data from './views/student/Data.vue'

import Students from './views/student/Students.vue'
import Approval from './views/sport/Approval.vue'
import Courses from './views/course/Courses.vue'

let routes = [
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
            { path: '/teachers', component: Teachers, name: '教师管理' },
            { path: '/addteacher', component: TeachersCreate, name: '批量创建教师账号' },
            { path: '/teacherdetail/:work_id', component: TeacherDetail, name: '教师详情' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-users',
        leaf: true,//只有一个节点
        children: [
            { path: '/students', component: Students, name: '学生管理' },
            { path: '/addstudent', component: StudentsCreate, name: '批量创建学生账号' },
            { path: '/classdetail/:class_id', component: ClassDetail, name: '班级详情' },
            { path: '/score/:class_id', component: Score, name: '班级体育成绩' },
            { path: '/data/:class_id', component: Data, name: '班级体测成绩' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-book',
        leaf: true,//只有一个节点
        children: [
            { path: '/courses', component: Courses, name: '学科管理' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-edit',
        leaf: true,//只有一个节点
        children: [
            { path: '/approval', component: Approval, name: '未达标运动审批' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;