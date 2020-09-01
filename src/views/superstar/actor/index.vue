<template> 
  <div class="app-container">
    <el-card shadow="never" body-style="padding: 10px">
      <div type="flex" align="center" style="font-size: small">
        <div style="margin-top: 5px">
          <span>姓&#12288;&#12288;名：</span>
          <el-input class="actor-search" size="small" placeholder="请输入姓名" prefix-icon="el-icon-s-custom" v-model="listQuery.name">
          </el-input>
          <span>&#12288;&#12288;性&#12288;&#12288;别：</span>
          <el-select class="actor-search" size="small" v-model="listQuery.sex" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
            <el-option
              v-for="item in sexs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span>&#12288;&#12288;&#12288;评价等级：</span>
          <el-input class="actor-search" size="small" placeholder="起始等级" prefix-icon="el-icon-star-off" v-model="listQuery.starFrom">
          </el-input>
          <span>-</span>
          <el-input class="actor-search" size="small" placeholder="结束等级" prefix-icon="el-icon-star-off" v-model="listQuery.starTo">
          </el-input>
          <span>&#12288;&#12288;&#12288;出生日期：</span>
          <el-date-picker class="actor-search" size="small" v-model="listQuery.birthDateFrom" type="date" placeholder="起始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
          <span>-</span>
          <el-date-picker class="actor-search" size="small" v-model="listQuery.birthDateTo" type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div style="margin-top: 5px">
          <span>国&#12288;&#12288;籍：</span>
          <el-input class="actor-search" size="small" placeholder="请输入国籍" prefix-icon="el-icon-location-information" v-model="listQuery.country">
          </el-input>
          <span>&#12288;&#12288;排序方式：</span>
          <el-select class="actor-search" size="small" v-model="listQuery.orderStr" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
            <el-option
              v-for="item in orders"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span>&#12288;&#12288;&#12288;C&#12288;P&#12288;U：</span>
          <el-input class="actor-search" size="small" placeholder="起始CPU" prefix-icon="el-icon-lollipop" v-model="listQuery.cupFrom">
          </el-input>
          <span>-</span>
          <el-input class="actor-search" size="small" placeholder="结束CPU" prefix-icon="el-icon-lollipop" v-model="listQuery.cupTo">
          </el-input>
          <span>&#12288;&#12288;&#12288;出道日期：</span>
          <el-date-picker class="actor-search" size="small" v-model="listQuery.debutDateFrom" type="date" placeholder="起始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
          <span>-</span>
          <el-date-picker class="actor-search" size="small" v-model="listQuery.debutDateTo" type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
          </el-date-picker>
        </div>
        <div type="flex" align="center" style="margin-top: 5px">
          <i class="el-icon-search"></i>
          <el-button type="primary" @click="handleSearchList()" size="small">
            查询搜索
          </el-button>
          <span>&#12288;&#12288;&#12288;</span>
          <el-button @click="handleResetSearch()" size="small">
            重置
          </el-button>
          <el-button style="float:right;margin-right: 15px" @click="handleAdd()" size="small">
            添加
          </el-button>
        </div>
      </div>
    </el-card>
    <el-card body-style="padding: 3px;">
      <div class="grid" id="grid" v-loading="listLoading">
        <el-card class="card" v-for="actor in actorLists" :key="actor.id" body-style="padding:0px;">
          <img :src="staticServer + actor.actordir + '/' + actor.head" @click="toActorDatails(actor.id)">
          <div>
            <span style="font-weight:bold;float:left;width: 64px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{actor.name}}</span>
            <el-button size="medium" type="danger" icon="el-icon-delete" circle style="float:right;height: auto;width: auto;padding: 0;margin-right: 5px" @click="handleDelete(actor.id)"></el-button>
            <el-button size="medium" type="primary" icon="el-icon-edit" circle style="float:right;height: auto;width: auto;padding: 0;margin-right: 2px" @click="handleUpdate(actor)"></el-button>
            <span style="font-weight:bold;float:right;margin-right: 0px">{{actor.star}}<i class="el-icon-star-on"></i></span>
          </div>
        </el-card>
      </div>
    </el-card>
    <div class="pagination-container" style="margin-right: 20px">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
           layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[24, 48, 72]" :total="total">
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit?'编辑演员':'添加演员'"
      :visible.sync="dialogVisible"
      width="60%">
      <el-form :model="actor"
               ref="actorForm"
               label-width="150px" size="small">
        <el-form-item label="姓名：">
          <el-input v-model="actor.name" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="别名：" :inline="true">
          <el-input v-model="actor.aliase" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-select size="small" v-model="actor.sex" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
            <el-option
              v-for="item in sexs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国家:">
          <el-select size="small" v-model="actor.country" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
            <el-option
              v-for="item in countrys"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期：">
          <el-date-picker type="date" placeholder="选择日期" v-model="actor.birthdate" style="width: 80%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="出道日期：">
          <el-date-picker type="date" placeholder="选择日期" v-model="actor.debutdate" style="width: 80%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="身高：">
          <el-input v-model="actor.height" style="width: 80%"></el-input><span> CM</span>
        </el-form-item>
        <el-form-item label="体重：">
          <el-input v-model="actor.weight" style="width: 80%"></el-input><span> KG</span>
        </el-form-item>
        <el-form-item label="CPU:">
          <el-select size="small" v-model="actor.cup" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
            <el-option
              v-for="item in CPUS"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="3C：">
          <el-input v-model="actor.threecircles" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="头像名称：">
          <el-input v-model="actor.head" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="文件存储相对路径：">
          <el-input v-model="actor.actordir" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item label="星级：">
          <el-input v-model="actor.star" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item v-if="isEdit" label="创建时间：">
          <el-date-picker type="date" placeholder="选择日期" v-model="actor.createTime" style="width: 80%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item v-if="isEdit"  label="更新时间：">
          <el-date-picker type="date" placeholder="选择日期" v-model="actor.modifyTime" style="width: 80%;" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="用户启用状态" prop="status">
          <el-radio-group v-model="actor.status" size="medium">
            <el-radio border :label="0">禁用</el-radio>
            <el-radio border :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" v-model="actor.describe" style="width: 80%;height: 300px;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {createActor, deleteActor, updateActor, getActors} from '@/api/actor';
  import {getDictInfoByName} from '@/api/dictinfo';

  const defaultActor = {
    id: null,
    name: null,
    aliase: null,
    sex: null,
    country: null,
    birthdate: null,
    debutdate: null,
    height: null,
    weight: null,
    cup: null,
    threecircles: null,
    head: null,
    actordir: null,
    star: null,
    describe: null,
    status: null,
    createTime: null,
    modifyTime: null,
  };
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 24,
    name: null,
    sex: null,
    country: null,
    birthDateFrom: null,
    birthDateTo: null,
    debutDateFrom: null,
    debutDateTo: null,
    starFrom: null,
    starTo: null,
    cupFrom: null,
    cupTo: null,
    orderStr: "star desc"
  };

  export default {
    name: "index",

    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        actor: Object.assign({}, defaultActor),
        sexs: null,
        countrys: null,
        CPUS: null,
        dialogVisible: false,
        isEdit: false,
        orders: [
          {value: "height desc", label: "身高"},
          {value: "weight desc", label: "体重"},
          {value: "cup desc", label: "CPU"},
          {value: "star desc", label: "评价等级"},
          {value: "birthdate desc", label: "出生日期"},
          {value: "debutdate desc", label: "出道日期"},
          {value: "create_time desc", label: "创建时间"},
          {value: "modify_time desc", label: "修改时间"},
        ],
        listLoading: false,
        actorLists: null,
        total: 0,
        totalPage: 0,
        staticServer: process.env.STATIC_SERVER,
      }
    },
    created() {
      this.init();
      this.getActors();
    },
    methods: {
      init(){
        getDictInfoByName('性别').then(response => {
          if (response.code == 200) {
            this.sexs = response.data;
          }
        });
        getDictInfoByName('国籍').then(response => {
          if (response.code == 200) {
            this.countrys = response.data;
          }
        });
        getDictInfoByName('CPU').then(response => {
          if (response.code == 200) {
            this.CPUS = response.data;
          }
        });
      },
      getActors(){
        this.listLoading = true;
        getActors(this.listQuery).then(response => {
          this.listLoading = false;
          if (response.code == 200) {
            let data = response.data;
            this.actorLists = data.list;
            this.totalPage = data.pages;
            this.currentPage = data.pageNum;
            this.total = data.total;
          }
        })
      },
      handleAdd() {
        this.dialogVisible = true;
        this.isEdit = false;
        this.actor = Object.assign({},defaultActor);
      },
      handleUpdate(actor) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.actor = Object.assign({},actor);
      },
      handleDelete(id) {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteActor(id).then(response => {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.getActors();
          })
        })
      },
      handleDialogConfirm(){
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateActor(this.actor.id,this.actor).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getActors();
            })
          } else {
            createActor(this.actor).then(response => {
              this.$message({
                message: '添加成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.getActors();
            })
          }
        })
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getActors();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getActors();
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getActors();
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      toActorDatails(id){
        this.$router.push('/superstar/actorDetails?id=' + id);
      },
    }
  }
</script>
<style scoped>
  .actor-search{
    width: 140px;
  }
  #grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 1300px;
    margin-top: 10px;
    font-size: small;
  }
  #grid .card {
    background-color: #ffffff;
    width: 150px;
    height: 150px;
    transition: all 0.1s ease;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0);
    overflow: hidden;
    cursor: pointer;
  }

  #grid .card img {
    width: 130px;
    height: 130px;
    margin-right: 10px;
    margin-left: 10px;
    border-radius: 10px;
    -o-object-fit: cover;
    object-fit: cover;
    filter: grayscale(0.1);
    transition: all 0.3s ease;
  }
</style>
