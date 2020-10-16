<template> 
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="">
            <el-input v-model="listQuery.username" class="input-width" placeholder="用户名/昵称" clearable></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="listQuery.methodName" class="input-width" placeholder="接口方法名" clearable></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-select class="actor-search" size="small" v-model="listQuery.httpMethod" clearable placeholder="HTTP方法" prefix-icon="el-icon-location-information">
              <el-option
                v-for="method in methods"
                :key="method"
                :label="method"
                :value="method">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="listQuery.returnCode" class="input-width" placeholder="返回码" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>日志列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="logTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="ID" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="用户名" width="100" align="center">
          <template slot-scope="scope">{{scope.row.username}}</template>
        </el-table-column>
        <el-table-column label="昵称" width="100" align="center">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column label="用户IP" width="120" align="center">
          <template slot-scope="scope">{{scope.row.remoteIp}}</template>
        </el-table-column>
        <el-table-column label="调用时间" width="155" align="center">
          <template slot-scope="scope">{{scope.row.startTime | formatDateTime}}</template>
        </el-table-column>
        <el-table-column label="耗时：/ms" width="68" align="center">
          <template slot-scope="scope">{{scope.row.spendTime}}</template>
        </el-table-column>
        <el-table-column label="调用方法名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.methodName}}</template>
        </el-table-column>
        <el-table-column label="接口描述" width="210" align="center">
          <template slot-scope="scope">{{scope.row.description}}</template>
        </el-table-column>
        <el-table-column label="METHOD" width="85" align="center">
          <template slot-scope="scope">{{scope.row.httpMethod}}</template>
        </el-table-column>
        <el-table-column label="返回码" width="70" align="center">
          <template slot-scope="scope">{{scope.row.returnCode}}</template>
        </el-table-column>
        <el-table-column label="返回消息" width="120" align="center">
          <template slot-scope="scope">{{scope.row.returnMsg}}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="showDetails(scope.row.id)">
              查看详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,15,45]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :title="'日志详情'" :visible.sync="dialogVisible" width="60%">
      <div style="font-weight:bold;font-size: small;margin-top: 5px;">
        <div>&#12288;&#12288;&#12288;ID：{{log.id}}</div>
        <div>用户名称：{{log.username}}</div>
        <div>用户昵称：{{log.nickname}}</div>
        <div>调用时间：{{log.startTime | formatDateTime}}</div>
        <div>耗&#12288;&#12288;时：{{log.spendTime}} ms</div>
        <div>操作描述：{{log.description}}</div>
        <div>请求类型：{{log.httpMethod}}</div>
        <div>类&#12288;&#12288;名：{{log.clazzName}}</div>
        <div>&#12288;方法名：{{log.methodName}}</div>
        <div>&#12288;根路径：{{log.basePath}}</div>
        <div>&#12288;&#12288;URI ：{{log.uri}}</div>
        <div>&#12288;&#12288;URL：{{log.url}}</div>
        <div>远程用户：{{log.remoteUser}}</div>
        <div>远程 I P ：{{log.remoteIp}}</div>
        <div>远程端口：{{log.remotePort}}</div>
        <div>远程地址：{{log.remoteAddr}}</div>
        <div>请求参数：{{log.parameter}}</div>
        <div>&#12288;返回码：{{log.returnCode}}</div>
        <div>返回消息：{{log.returnMsg}}</div>
        <div>返回数据：{{log.returnData}}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {getLogs, getLogById} from '@/api/log';
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 45,
    username: null,
    httpMethod: null,
    methodName: null,
    returnCode: null,
  };
  const defaultLog = {
    id: null,
    username: null,
    nickname: null,
    startTime: null,
    spendTime: null,
    description: null,
    basePath: null,
    uri: null,
    url: null,
    httpMethod: null,
    remoteUser: null,
    remoteIp: null,
    remoteAddr: null,
    parameter: null,
    returnCode: null,
    returnMsg: null,
    returnData: null,
    clazzName: null,
    methodName: null,
  };
  export default {
    name: 'userList',
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: false,
        dialogVisible: false,
        log: Object.assign({}, defaultLog),
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
      }
    },
    created() {
      this.getList();
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return null;
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
    },
    methods: {
      getList() {
        this.listLoading = true;
        getLogs(this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      showDetails(logId){
        getLogById(logId).then(response => {
          this.log = response.data;
          this.dialogVisible = true;
        });
      }
    }
  }
</script>
<style>
</style>
