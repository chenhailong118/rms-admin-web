<template> 
  <div class="app-container">
    <div>
      <el-card shadow="never" body-style="padding: 0px" type="flex" align="center">
        <el-card shadow="never" body-style="padding: 5px" style="float:left;width: 10%;height: 135px">
          <img :src="staticServer + actor.actordir + '/' + actor.head" style="width: 125px;height: 125px">
        </el-card>
        <el-card shadow="never" body-style="padding: 10px" style="float:left;width: 90%;height: 135px;font-size: small">
          <div style="width: 49%;float:left;margin: 5px" type="flex" align="left">
            <span class="details-left">姓&#12288;&#12288;名：<span style="font-weight:bold"> {{actor.name}}</span></span></span>
            <span class="details-right">别&#12288;&#12288;名：<span style="font-weight:bold"> {{actor.aliase}}</span></span>
            <span class="details-left">性&#12288;&#12288;别：<span style="font-weight:bold"> {{actor.sex | formatSex}}</span></span>
            <span class="details-right">国&#12288;&#12288;籍：<span style="font-weight:bold"> {{actor.country | formatCountry}}</span></span>
            <span class="details-left">出生日期：<span style="font-weight:bold"> {{actor.birthdate | formatDateTime}}</span></span>
            <span class="details-right">出道日期：<span style="font-weight:bold"> {{actor.debutdate | formatDateTime}}</span></span>
            <span class="details-left">身&#12288;&#12288;高：<span style="font-weight:bold"> {{actor.height}} CM</span></span>
            <span class="details-right">体&#12288;&#12288;重：<span style="font-weight:bold"> {{actor.weight}} KG</span></span>
            <span class="details-left">3C&#12288;&#12288;&#12288;：<span style="font-weight:bold"> {{actor.threecircles}}</span></span>
            <span class="details-right">作品数量：<span style="font-weight:bold"> {{worksCount}} 件</span></span>
            <span class="details-left">CPU&#12288;&#12288;：<span style="font-weight:bold"> {{actor.cup}}</span></span>
            <span class="details-right">评价等级：<span style="font-weight:bold"> {{actor.star}}</span><i class="el-icon-star-off"></i></span>
          </div>
          <div style="width: 50%;height: 100%;float:left;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 8;overflow: hidden;" type="flex" align="left">
            <span>简介：<span style="font-weight:bold;"> {{actor.describe}}</span></span>
          </div>
        </el-card>
      </el-card>
    </div>
    <div>
      <el-tabs v-model="label" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="综合展示" name="all">
          <el-card shadow="never" body-style="padding: 10px">
            <div type="flex" align="center" style="font-size: small">
              <div style="margin-top: 5px">
                <span>关键词&#12288;：</span>
                <el-input class="resource-search" size="small" placeholder="请输入关键词" prefix-icon="el-icon-s-custom" v-model="listQuery.keyWord">
                </el-input>
                <span>&#12288;主&#12288;&#12288;题：</span>
                <el-select class="resource-search" style="width: 115px" v-model="listQuery.theme" size="small" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
                  <el-option
                    v-for="item in themes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span>&#12288;发行日期：</span>
                <el-date-picker class="resource-search" size="small" v-model="listQuery.issuingdateFrom" type="date" placeholder="起始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
                <span>-</span>
                <el-date-picker class="resource-search" size="small" v-model="listQuery.issuingdateTo" type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
                <span>&#12288;播放时长：</span>
                <el-input class="resource-search" size="small" placeholder="起始时长" prefix-icon="el-icon-lollipop" v-model="listQuery.durationFrom">
                </el-input>
                <span>-</span>
                <el-input class="resource-search" size="small" placeholder="结束时长" prefix-icon="el-icon-lollipop" v-model="listQuery.durationTo">
                </el-input>
              </div>
              <div style="margin-top: 5px">
                <span>编&#12288;&#12288;号：</span>
                <el-input class="resource-search" size="small" placeholder="请输入编号" prefix-icon="el-icon-s-custom" v-model="listQuery.designation">
                </el-input>
                <span>&#12288;水&#12288;&#12288;印：</span>
                <el-select class="resource-search" style="width: 115px" v-model="listQuery.mark" size="small" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
                  <el-option
                    v-for="item in marks"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span>&#12288;评&#12288;&#12288;分：</span>
                <el-input class="resource-search" size="small" placeholder="起始分数" prefix-icon="el-icon-lollipop" v-model="listQuery.scoreFrom">
                </el-input>
                <span>-</span>
                <el-input class="resource-search" size="small" placeholder="结束分数" prefix-icon="el-icon-lollipop" v-model="listQuery.scoreTo">
                </el-input>
                <span>&#12288;文件大小：</span>
                <el-input class="resource-search" size="small" placeholder="起始大小" prefix-icon="el-icon-lollipop" v-model="listQuery.sizeFrom">
                </el-input>
                <span>-</span>
                <el-input class="resource-search" size="small" placeholder="结束大小" prefix-icon="el-icon-lollipop" v-model="listQuery.sizeTo">
                </el-input>
              </div>
              <div type="flex" align="center" style="margin-top: 5px">
                <i class="el-icon-search"></i>
                <el-button type="primary" @click="handleSearchList()" size="small">
                  查询搜索
                </el-button>
                <span>&#12288;&#12288;</span>
                <el-button @click="handleResetSearch()" size="small">
                  重置
                </el-button>
                <el-button style="float:right;margin-right: 50px" @click="handleAdd()" size="small">
                  添加
                </el-button>
              </div>
            </div>
          </el-card>
          <el-card shadow="never" body-style="padding: 10px" >
            <div class="grid" id="grid" v-loading="listLoading">
              <el-card class="card" v-for="resourceInfo in resourceLists" :key="resourceInfo.id" body-style="padding:0px;">
                <img :src="staticServer + resourceInfo.resourcedir + '/image/' + resourceInfo.poster" @click="toResourceDatails(resourceInfo.id,resourceInfo.type)">
                <div>
<!--                  <span style="float:left;width: 120px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{resourceInfo.designation}}</span>-->
<!--                  <span style="float:right;margin-right: 2px">{{resourceInfo.score}}<i class="el-icon-star-on"></i></span>-->
                  <span style="float:left;width: 70px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{resourceInfo.designation}}</span>
                  <el-button size="medium" type="danger" icon="el-icon-delete" circle style="float:right;height: auto;width: auto;padding: 0;margin-right: 5px" @click="handleDelete(resourceInfo.id)"></el-button>
                  <el-button size="medium" type="primary" icon="el-icon-edit" circle style="float:right;height: auto;width: auto;padding: 0;margin-right: 2px" @click="handleUpdate(resourceInfo)"></el-button>
                  <span style="float:right;margin-right: 2px">{{resourceInfo.score}}<i class="el-icon-star-on"></i></span>
                </div>

                <div style="padding-top:5px;width: 100%;height: 100%;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;" type="flex" align="left">
                  <span>{{resourceInfo.title}}</span></span>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="视频展示" name="video">
          <el-card shadow="never" body-style="padding: 10px">
            <div type="flex" align="center" style="font-size: small">
              <div style="margin-top: 5px">
                <span>关键词&#12288;：</span>
                <el-input class="resource-search" size="small" placeholder="请输入关键词" prefix-icon="el-icon-s-custom" v-model="listQuery.keyWord">
                </el-input>
                <span>&#12288;主&#12288;&#12288;题：</span>
                <el-select class="resource-search" style="width: 115px" v-model="listQuery.theme" size="small" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
                  <el-option
                    v-for="item in themes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span>&#12288;发行日期：</span>
                <el-date-picker class="resource-search" size="small" v-model="listQuery.issuingdateFrom" type="date" placeholder="起始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
                <span>-</span>
                <el-date-picker class="resource-search" size="small" v-model="listQuery.issuingdateTo" type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
                <span>&#12288;播放时长：</span>
                <el-input class="resource-search" size="small" placeholder="起始时长" prefix-icon="el-icon-lollipop" v-model="listQuery.durationFrom">
                </el-input>
                <span>-</span>
                <el-input class="resource-search" size="small" placeholder="结束时长" prefix-icon="el-icon-lollipop" v-model="listQuery.durationTo">
                </el-input>
              </div>
              <div style="margin-top: 5px">
                <span>编&#12288;&#12288;号：</span>
                <el-input class="resource-search" size="small" placeholder="请输入编号" prefix-icon="el-icon-s-custom" v-model="listQuery.designation">
                </el-input>
                <span>&#12288;水&#12288;&#12288;印：</span>
                <el-select class="resource-search" style="width: 115px" v-model="listQuery.mark" size="small" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
                  <el-option
                    v-for="item in marks"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span>&#12288;评&#12288;&#12288;分：</span>
                <el-input class="resource-search" size="small" placeholder="起始分数" prefix-icon="el-icon-lollipop" v-model="listQuery.scoreFrom">
                </el-input>
                <span>-</span>
                <el-input class="resource-search" size="small" placeholder="结束分数" prefix-icon="el-icon-lollipop" v-model="listQuery.scoreTo">
                </el-input>
                <span>&#12288;文件大小：</span>
                <el-input class="resource-search" size="small" placeholder="起始大小" prefix-icon="el-icon-lollipop" v-model="listQuery.sizeFrom">
                </el-input>
                <span>-</span>
                <el-input class="resource-search" size="small" placeholder="结束大小" prefix-icon="el-icon-lollipop" v-model="listQuery.sizeTo">
                </el-input>
              </div>
              <div type="flex" align="center" style="margin-top: 5px">
                <i class="el-icon-search"></i>
                <el-button type="primary" @click="handleSearchList()" size="small">
                  查询搜索
                </el-button>
                <span>&#12288;&#12288;</span>
                <el-button @click="handleResetSearch()" size="small">
                  重置
                </el-button>
                <el-button style="float:right;margin-right: 50px" @click="handleAdd()" size="small">
                  添加
                </el-button>
              </div>
            </div>
          </el-card>
          <el-card shadow="never" body-style="padding: 10px" >
            <div class="grid" id="grid" v-loading="listLoading">
              <el-card class="card" v-for="resourceInfo in resourceLists" :key="resourceInfo.id" body-style="padding:0px;">
                <img :src="staticServer + resourceInfo.resourcedir + '/image/' + resourceInfo.poster" @click="toResourceDatails(resourceInfo.id,resourceInfo.type)">
                <div>
                  <span style="float:left;width: 120px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{resourceInfo.designation}}</span>
                  <span style="float:right;margin-right: 2px">{{resourceInfo.score}}<i class="el-icon-star-on"></i></span>
                </div>
                <div style="padding-top:5px;width: 100%;height: 100%;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;" type="flex" align="left">
                  <span>{{resourceInfo.title}}</span></span>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="图片展示" name="image">
          <el-card shadow="never" body-style="padding: 10px">
            <div type="flex" align="center" style="font-size: small">
              <div style="margin-top: 5px">
                <span>关键词&#12288;：</span>
                <el-input class="resource-search" size="small" placeholder="请输入关键词" prefix-icon="el-icon-s-custom" v-model="listQuery.keyWord">
                </el-input>
                <span>&#12288;主&#12288;&#12288;题：</span>
                <el-select class="resource-search" style="width: 115px" v-model="listQuery.theme" size="small" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
                  <el-option
                    v-for="item in themes"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span>&#12288;发行日期：</span>
                <el-date-picker class="resource-search" size="small" v-model="listQuery.issuingdateFrom" type="date" placeholder="起始日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
                <span>-</span>
                <el-date-picker class="resource-search" size="small" v-model="listQuery.issuingdateTo" type="date" placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd">
                </el-date-picker>
                <span>&#12288;播放时长：</span>
                <el-input class="resource-search" size="small" placeholder="起始时长" prefix-icon="el-icon-lollipop" v-model="listQuery.durationFrom">
                </el-input>
                <span>-</span>
                <el-input class="resource-search" size="small" placeholder="结束时长" prefix-icon="el-icon-lollipop" v-model="listQuery.durationTo">
                </el-input>
              </div>
              <div style="margin-top: 5px">
                <span>编&#12288;&#12288;号：</span>
                <el-input class="resource-search" size="small" placeholder="请输入编号" prefix-icon="el-icon-s-custom" v-model="listQuery.designation">
                </el-input>
                <span>&#12288;水&#12288;&#12288;印：</span>
                <el-select class="resource-search" style="width: 115px" v-model="listQuery.mark" size="small" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
                  <el-option
                    v-for="item in marks"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span>&#12288;评&#12288;&#12288;分：</span>
                <el-input class="resource-search" size="small" placeholder="起始分数" prefix-icon="el-icon-lollipop" v-model="listQuery.scoreFrom">
                </el-input>
                <span>-</span>
                <el-input class="resource-search" size="small" placeholder="结束分数" prefix-icon="el-icon-lollipop" v-model="listQuery.scoreTo">
                </el-input>
                <span>&#12288;文件大小：</span>
                <el-input class="resource-search" size="small" placeholder="起始大小" prefix-icon="el-icon-lollipop" v-model="listQuery.sizeFrom">
                </el-input>
                <span>-</span>
                <el-input class="resource-search" size="small" placeholder="结束大小" prefix-icon="el-icon-lollipop" v-model="listQuery.sizeTo">
                </el-input>
              </div>
              <div type="flex" align="center" style="margin-top: 5px">
                <i class="el-icon-search"></i>
                <el-button type="primary" @click="handleSearchList()" size="small">
                  查询搜索
                </el-button>
                <span>&#12288;&#12288;</span>
                <el-button @click="handleResetSearch()" size="small">
                  重置
                </el-button>
                <el-button style="float:right;margin-right: 50px" @click="handleAdd()" size="small">
                  添加
                </el-button>
              </div>
            </div>
          </el-card>
          <el-card shadow="never" body-style="padding: 10px" >
            <div class="grid" id="grid" v-loading="listLoading">
              <el-card class="card" v-for="resourceInfo in resourceLists" :key="resourceInfo.id" body-style="padding:0px;">
                <img :src="staticServer + resourceInfo.resourcedir + '/image/' + resourceInfo.poster" @click="toResourceDatails(resourceInfo.id,resourceInfo.type)">
                <div>
                  <span style="float:left;width: 120px;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 1;overflow: hidden;">{{resourceInfo.designation}}</span>
                  <span style="float:right;margin-right: 2px">{{resourceInfo.score}}<i class="el-icon-star-on"></i></span>
                </div>
                <div style="padding-top:5px;width: 100%;height: 100%;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;" type="flex" align="left">
                  <span>{{resourceInfo.title}}</span></span>
                </div>
              </el-card>
            </div>
          </el-card>
        </el-tab-pane>
      </el-tabs>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.pageNum"
                       layout="total, sizes,prev, pager, next,jumper" :page-size="listQuery.pageSize" :page-sizes="[14, 28, 42, 56, 70]" :total="total">
        </el-pagination>
      </div>
      <el-dialog
        title="编辑资源"
        :visible.sync="dialogVisible"
        width="60%">
        <el-form :model="resource"
                 ref="resourceForm"
                 label-width="150px" size="small">
          <el-form-item label="标题：">
            <el-input v-model="resource.title" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="编号：" :inline="true">
            <el-input v-model="resource.designation" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="发行日期：">
            <el-date-picker type="date" placeholder="选择日期" v-model="resource.issuingdate" style="width: 80%;" format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="播放时长：">
            <el-input v-model="resource.duration" style="width: 80%"></el-input><span> 分钟</span>
          </el-form-item>
          <el-form-item label="导演：">
            <el-input v-model="resource.director" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="演员：">
            <el-select size="small" v-model="resource.actors" multiple filterable clearable placeholder="请选择">
              <el-option
                v-for="item in actorList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="制造商：">
            <el-input v-model="resource.manufacturer" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="发型商：">
            <el-input v-model="resource.publisher" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="得分：">
            <el-input v-model="resource.score" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="资源大小：">
            <el-input v-model="resource.size" style="width: 80%"></el-input><span> Gb</span>
          </el-form-item>
          <el-form-item label="资源类型：">
            <el-select size="small" v-model="resource.type" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
              <el-option
                v-for="item in types"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="resource.type === 0" label="视频文件格式：">
            <el-select size="small" v-model="resource.videotype" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
              <el-option
                v-for="item in videotypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="resource.type === 0" label="视频名称：">
            <el-input v-model="resource.videoname" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item v-if="resource.type === 0" label="预览视频名称：">
            <el-input v-model="resource.samplevideo" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="海报名称：">
            <el-input v-model="resource.poster" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="海报名称二：">
            <el-input v-model="resource.posterFull" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="主题分类：">
            <el-select size="small" v-model="resource.theme" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
              <el-option
                v-for="item in themes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有无水印">
            <el-select size="small" v-model="resource.mark" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
              <el-option
                v-for="item in marks"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="文件存储相对路径：">
            <el-input v-model="resource.resourcedir" style="width: 80%"></el-input>
          </el-form-item>
          <el-form-item label="国籍：">
            <el-select size="small" v-model="resource.country" clearable placeholder="请选择" prefix-icon="el-icon-location-information">
              <el-option
                v-for="item in countrys"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker type="date" placeholder="选择日期" v-model="resource.cteateTime" style="width: 80%;" format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="更新时间：">
            <el-date-picker type="date" placeholder="选择日期" v-model="resource.modifyTime" style="width: 80%;" format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="资源启用状态" prop="status">
            <el-radio-group v-model="resource.status" size="medium">
              <el-radio border :label="0">禁用</el-radio>
              <el-radio border :label="1">启用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 10}" v-model="resource.describe" style="width: 80%;height: 300px;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible =false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {getActors} from '@/api/actor';
  import {formatDate} from '@/utils/date';
  import {getDictInfoByName} from '@/api/dictinfo';
  import {getResources,deleteResource,updateResource} from '@/api/viresource';

  const defaultListQuery = {
    actorId: null,
    pageNum: 1,
    pageSize: 70,
    keyWord: null,
    type: null,
    theme: null,
    designation: null,
    issuingdateFrom: null,
    issuingdateTo: null,
    durationFrom: null,
    durationTo: null,
    country: null,
    scoreFrom: null,
    scoreTo: null,
    sizeFrom: null,
    sizeTo: null
  };
  const defaultResource = {
    id: null,
    title: null,
    designation: null,
    issuingdate: null,
    duration: null,
    director: null,
    manufacturer: null,
    publisher: null,
    score: null,
    type: 0,
    size: null,
    videotype: null,
    videoname: null,
    samplevideo: null,
    poster: 'poster.jpg',
    posterFull: 'poster-full.jpg',
    theme: null,
    mark: null,
    describe: null,
    // resourcedir: '/superstar/',
    resourcedir: '/resource2/H动漫/',
    country: null,
    status: 1,
    cteateTime: null,
    modifyTime: null,
    actors: null,
  };

  let that;
  export default {
    name: "actorDetails",

    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        id: this.$route.query.id,
        resourceLists:[],
        worksCount: '',
        actor: {},
        staticServer: process.env.STATIC_SERVER,
        sexs: null,
        countrys: null,
        marks: null,
        themes: null,
        videotypes: null,
        types: [{id: 0, name: '视频'},{id: 1, name: '图片'}],
        total: 0,
        totalPage: 0,
        label: 'all',
        resource: Object.assign({}, defaultResource),
        dialogVisible: false,
        actorList: null,
      }
    },
    beforeCreate: function () {
      that = this;
    },
    created() {
      this.init();
      this.getActor();
      this.getResources();
    },
    methods: {
      init() {
        getDictInfoByName('水印').then(response => {
          if (response.code == 200) {
            this.marks = response.data;
          }
        });
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
        getDictInfoByName('主题分类').then(response => {
          if (response.code == 200) {
            this.themes = response.data;
          }
        });
        getDictInfoByName('视频文件格式').then(response => {
          if (response.code == 200) {
            this.videotypes = response.data;
          }
        });
        getActors().then(response => {
          if (response.code == 200) {
            this.actorList = response.data.list;
          }
        });
      },
      getActor() {
        this.listLoading = true;
        let params = {id: this.id}
        getActors(params).then(response => {
          this.listLoading = false;
          if (response.code == 200) {
            let data = response.data;
            this.actor = data.list[0];
          }
        })
      },
      getResources(){
        this.listLoading = true;
        this.listQuery.actorId = this.id;
        getResources(this.listQuery).then(response => {
          this.listLoading = false;
          if (response.code == 200) {
            let data = response.data;
            this.resourceLists = data.list;
            this.totalPage = data.pages;
            this.currentPage = data.pageNum;
            this.total = data.total;
          }
        }).catch(() => {
          this.listLoading = false;
          this.$message({
            type: 'error',
            message: '获资源频列表失败'
          });
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getResources();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getResources();
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getResources();
      },
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleClick(tab, event) {
        console.log(tab);
        console.log(event);
        if (this.label == 'all') {
          this.listQuery.type = null;
        }else if(this.label == 'video'){
          this.listQuery.type = 0;
        }else if(this.label == 'image'){
          this.listQuery.type = 1;
        }
        this.getResources();
      },
      toResourceDatails(id){
        // this.$router.push('/superstar/resourceDetails?id=' + id);
        let resourceDetails = this.$router.resolve('/superstar/resourceDetails?id=' + id);
        window.open(resourceDetails.href, '_blank');
      },
      handleDelete(id) {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteResource(id).then(response => {
            this.$message({
              message: '删除成功！',
              type: 'success'
            });
            this.getResources();
          })
        })
      },
      handleUpdate(resourceInfo) {
        this.dialogVisible = true;
        this.isEdit = true;
        this.resource = Object.assign({},resourceInfo);
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            updateResource(this.resource.id,this.resource).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
              this.init();
              this.getResources();
            })
          }
        });
      },
    },
    filters: {
      formatDateTime(time) {
        if (time == null || time === '') {
          return null;
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd')
      },
      formatSex(sex){
        if (sex == null || sex === '') {
          return '未知';
        }
        let sexName = that.sexs.filter(x=>x.id == sex);
        if(sexName == null || sexName === ''){
          return '未知';
        }
        return sexName[0].name
      },
      formatCountry(country){
        if (country == null || country === '') {
          return null;
        }
        let countryName = that.countrys.filter(x=>x.id == country);
        if(countryName == null || countryName === ''){
          return null;
        }
        return countryName[0].name
      },
    },
  }
</script>
<style scoped>
  .details-left{
    float:left;width: 40%;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    padding: 2px;
  }
  .details-right{
    float:right;width: 60%;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
    padding: 2px;;
  }

  .resource-search{
    width: 125px;
  }
  #grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 160px);
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
    width: 160px;
    height: 240px;
    transition: all 0.1s ease;
    position: relative;
    z-index: 1;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    overflow: hidden;
    cursor: pointer;
    padding: 0px;
    margin: 0px;
    font-weight:bold;
  }

  #grid .card img {
    width: 150px;
    height: 180px;
    border-radius: 10px;
    -o-object-fit: cover;
    object-fit: cover;
    filter: grayscale(0.1);
    transition: all 0.3s ease;
  }
</style>
