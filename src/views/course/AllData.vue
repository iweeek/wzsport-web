<template>
    <div class="page-container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/courses' }">学科管理</el-breadcrumb-item>
            <el-breadcrumb-item>查看体测数据</el-breadcrumb-item>
        </el-breadcrumb>
        <el-col :span="24">
            <el-form :inline="true" :model="dataFilters" class="data-filters">
                <el-form-item label="学院">
                    <el-select class="filter-college" v-model="filters.college" placeholder="学院">
                        <el-option label="计算机学院" value="计算机学院"></el-option>
                        <el-option label="美术学院" value="美术学院"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="专业">
                    <el-select class="filter-major" v-model="filters.major" placeholder="专业">
                        <el-option label="信息工程" value="信息工程"></el-option>
                        <el-option label="绘画" value="绘画"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="年级">
                    <el-select class="filter-grade" v-model="filters.grade" placeholder="年级">
                        <el-option label="2011" value="2011"></el-option>
                        <el-option label="2012" value="2012"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="班级">
                    <el-select class="filter-grade" v-model="filters.classes" placeholder="班级">
                        <el-option label="营销11班" value="营销11班"></el-option>
                        <el-option label="营销2班" value="营销2班"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-col>
        <div class="main-panel">
            <el-col class="table-panel panel">
                <el-col :span="24" class="title">
                    学生
                </el-col>
                <el-col :span="24">
                    <el-form :inline="true" :model="filters">
                        <el-form-item>
                            <el-input v-model="filters.name" placeholder="输入学生姓名"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="filters.studentNo" placeholder="输入学生学号"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select class="filter-sex" v-model="filters.sex" placeholder="性别">
                                <el-option label="男" value="boy"></el-option>
                                <el-option label="女" value="girl"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-select class="filter-sex" v-model="filters.term" placeholder="选择学期">
                                <el-option label="2016~2017第一学期" value="2016-1"></el-option>
                                <el-option label="2016~2017第二学期" value="2016-2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="getStuedents">筛选</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>

                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" label="姓名" width="180">
                    </el-table-column>
                    <el-table-column prop="studentNo" label="学号" width="180">
                    </el-table-column>
                    <el-table-column prop="height" label="身高(cm)">
                    </el-table-column>
                    <el-table-column prop="weight" label="体重(kg)" width="180">
                    </el-table-column>
                    <el-table-column prop="lungCapacity" label="肺活量(ml)" width="180">
                    </el-table-column>
                    <el-table-column prop="bmi" label="BIM指数" width="180">
                    </el-table-column>
                </el-table>

                <div class="page">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="3" layout="prev, pager, next, jumper"
                        :total="10">
                    </el-pagination>
                </div>
            </el-col>
        </div>
    </div>
</template>

<script>

    import gql from 'graphql-tag'
    // 获取体测数据
    const dataQuery = gql`
        query(
            $classId: Long
            $name: String
            $studentNo: String
            $isMan: Boolean
            $pageNumber: Int
            $pageSize: Int
        ){
            allData:searchStudents(
            classId: $classId
            name: $name
            studentNo: $studentNo
            isMan: $isMan
            pageNumber: $pageNumber
            pageSize: $pageSize
            ){
                pageNum
                pageSize
                data{
                    name
                    studentNo
                    fitnessCheckDatas{
                        termId
                        height
                        weight
                        lungCapacity
                        bmi
                    }
            }
            }
        }
    `;
    export default {
        data() {
            return {
                filters: {
                    name: '',
                    studentNo: '',
                    sex: '',
                    term: '',
                    classes: ''
                },
                dataFilters: {
                    college: '',
                    major: '',
                    grade: '',
                    classes: ''
                },
                total: 0,
                currentPage: 1,
                listLoading: false,
                tableData: []
            }
        },
        methods: {
            //获取列表
            getStuedents() {
                let params = {
                    page: this.page,
                    name: this.filters.name,
                    studentNo: this.filters.studentNo,
                    sex: this.filters.sex,
                    term: this.filters.term,
                };
                this.listLoading = true;
                console.log('发送获取学生信息请求');
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        apollo: {
            allData: {
                query: dataQuery,
                variables() {
                    return {
                        "pageSize": 10,
                        "pageNumber": 1
                    }
                },
                result(data) {
                    let _this = this;
                    _this.tableData = [];
                    data.data.allData.data.forEach(item => {
                        let listItem = {
                            studentNo: '',
                            name: '',
                            height: 0,
                            weight: 0,
                            lungCapacity: 0,
                            bmi: 0
                        };
                        listItem.name = item.name;
                        listItem.studentNo = item.studentNo;
                        listItem.height = item.fitnessCheckDatas[0].height;
                        listItem.weight = item.fitnessCheckDatas[0].weight;
                        listItem.lungCapacity = item.fitnessCheckDatas[0].lungCapacity;
                        listItem.bmi = item.fitnessCheckDatas[0].bmi;
                        _this.tableData.push(listItem);
                    });
                }
            }
        },
    }

</script>
<style lang="scss" scoped>
    .page-container {
        color: #666;
        .panel {
            border: 1px solid #d4d4d4;
            padding: 5px 15px 15px;
            border-radius: 4px;
            margin-bottom: 10px;
        }
        .data-filters{
            margin-top: 10px;
        }
        .title,
        .data-filters{
            line-height: 2.5;
            font-weight: bold;
            font-size: 14px;
        }
        .page {
            text-align: center;
            margin: 10px;
        }
    }
</style>