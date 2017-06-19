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
import AllScore from './views/course/AllScore.vue'
import AllData from './views/course/AllData.vue'

// 未达标运动审批
import Approval from './views/sport/Approval.vue'
import ApprovalDetail from './views/sport/ApprovalDetail.vue'

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
            { path: '/teacherdetail/:id', component: TeacherDetail, name: '教师详情' }
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
            { path: '/data/:class_id', component: Data, name: '班级体测成绩' },
            { path: '/studentdetail/:student_id', component: StudentDetail, name: '学生信息详情' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-book',
        leaf: true,//只有一个节点
        children: [
            { path: '/courses', component: Courses, name: '学科管理' },
            { path: '/setting', component: Setting, name: '设置学期运动次数' },
            { path: '/settarget/:sport_id', component: SetTarget, name: '设置运动指标' },
            { path: '/allscore', component: AllScore, name: '查看体育成绩' },
            { path: '/alldata', component: AllData, name: '查看体测数据' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-edit',
        leaf: true,//只有一个节点
        children: [
            { path: '/approval', component: Approval, name: '未达标运动审批' },
            { path: '/approvaldetail/:class_id', component: ApprovalDetail, name: '未达标运动明细' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;