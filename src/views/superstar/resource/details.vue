<template> 
  <div class="app-container">
    <div>
      <el-card shadow="never" body-style="padding: 0px" type="flex" align="center">
        <el-card shadow="never" body-style="padding: 5px" type="flex" align="left" style="float:right;width: 20%;">
          <img :src="staticServer + resource.resourcedir + '/image/' + resource.poster" style="width: 250px;height: 300px">
          <div style="font-weight:bold;font-size: small;margin-top: 5px;">
            <div>标&#12288;&#12288;题：{{resource.title}}</div>
            <div>编&#12288;&#12288;号：{{resource.designation}}</div>
            <div>发行日期：{{resource.issuingdate | formatDateTime}}</div>
            <div>播放时长：{{resource.duration}} 分钟</div>
            <div>导&#12288;&#12288;演：{{resource.director}}</div>
            <div>
              <span>演&#12288;&#12288;员：</span>
              <el-tag
                v-for="actor in actors"
                :key="actor.id"
                effect="light"
                size="mini"
                @click.native="toActorDetails(actor.id)">
                {{ actor.name}}
              </el-tag>
            </div>
            <div>制造商&#12288;：{{resource.manufacturer}}</div>
            <div>发型商&#12288;：{{resource.publisher}}</div>
            <div>得&#12288;&#12288;分：{{resource.score}}</div>
            <div>主题分类：{{resource.theme | formatTheme}}</div>
            <div>文件类型：{{resource.type | formatType}}</div>
            <div v-if="resource.type == 0 || resource === '0'">文件格式：{{resource.videotype | formatVideotype}}</div>
            <div>标&#12288;&#12288;记：{{resource.mark | formatMark}}</div>
            <div>国&#12288;&#12288;别：{{resource.country | formatCountry}}</div>
            <div>创建时间：{{resource.cteateTime | formatDateTime}}</div>
            <div>更新时间：{{resource.modifyTime | formatDateTime}}</div>
          </div>
        </el-card>
        <el-card type="flex" align="left">
          <div style="font-weight:bold;font-size: medium;margin-top: 5px;">简介：</div>
          <div style="font-size: medium;margin-top: 5px;"><span> {{resource.describe}}</span></div>
          <div>
            <div style="font-weight:bold;font-size: medium;margin-top: 30px;">标签</div>
            <div v-for="(parentTag,index) in allParentTag">
              <span>{{parentTag.name}}: </span>
              <el-tag
                v-for="tag in allocTag"
                v-if="tag.parentId == parentTag.id"
                :key="tag.id"
                type="'info'"
                effect="dark"
                @click.native="toResourceList(tag.id)">
                {{ tag.name }}
              </el-tag>
            </div>
            <el-button type="text" style="float:right;" @click="editTag()" >编辑标签</el-button>
          </div >
          <div v-if="resource.type === 0">
            <div style="font-weight:bold;font-size: medium;margin-top: 30px;">视频内容：</div>
            <video-player class="video-player vjs-custom-skin"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions">
            </video-player>
          </div>
          <div style="font-weight:bold;font-size: medium;margin-top: 30px;">图片内容：</div>
          <div class="demo-image__lazy">
            <img v-for="image in images" :src="staticServer + resource.resourcedir + '/image/' + image"></img>
          </div>
        </el-card>
      </el-card>
      <el-dialog title="" :visible.sync="dialogFormVisible" width="48%">
        <el-card class="form-container" shadow="never">
          <span>标签</span>
          <div v-for="(parentTag,index) in allParentTag" :class="index===0?'top-line':null" :key="'parentTag'+parentTag.id">
            <el-row class="table-layout" style="background: #F2F6FC;">
              <el-checkbox v-model="parentTag.checked"
                           :indeterminate="isIndeterminate(parentTag.id)"
                           @change="handleCheckAllChange(parentTag)">
                {{parentTag.name}}
              </el-checkbox>
            </el-row>
            <el-row class="table-layout">
              <el-col :span="8" v-for="subTag in getSubTagByParentId(parentTag.id)" :key="subTag.id" style="padding: 4px 0">
                <el-checkbox v-model="subTag.checked" @change="handleCheckChange(subTag)">
                  {{subTag.name}}
                </el-checkbox>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top: 20px" align="center">
            <el-button type="primary" @click="handleSave()">保存</el-button>
            <el-button @click="handleClear()">清空</el-button>
          </div>
        </el-card>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import {getResources, getActors, getImages, allocTag} from '@/api/viresource';
  import {formatDate} from '@/utils/date';
  import {getDictInfoByName} from '@/api/dictinfo';
  import {getTags, listTagByResourceId} from '@/api/tag';
  let that;
  export default {
    name: "resourceDetails",

    data() {
      return {
        id: this.$route.query.id,
        resource: {},
        actors: [],
        themes: null,
        marks: null,
        countrys: null,
        videotypes: null,
        staticServer: process.env.STATIC_SERVER,
        images: null,
        //播放器相关配置
        playerOptions: {
          //播放速度
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          //如果true,浏览器准备好时开始回放。
          autoplay: false,
          // 默认情况下将会消除任何音频。
          muted: false,
          // 导致视频一结束就重新开始。
          loop: false,
          // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          preload: 'auto',
          language: 'zh-CN',
          // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          aspectRatio: '16:9',
          // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          fluid: true,
          sources: [],
          //你的封面地址
          poster: '',
          //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          notSupportedMessage: '此视频暂无法播放，请稍后再试',
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            //全屏按钮
            fullscreenToggle: true
          }
        },
        dialogFormVisible: false,
        allTag: null,
        allParentTag: null,
        allocTag: null,
      }
    },
    beforeCreate: function () {
      that = this;
    },
    created() {
      this.init();
      this.getResource();
      this.getActors();
      this.getAllParentTags();
      this.getTagByResourceId();
    },
    methods: {
      init(){
        getDictInfoByName('主题分类').then(response => {
          if (response.code == 200) {
            this.themes = response.data;
          }
        });
        getDictInfoByName('水印').then(response => {
          if (response.code == 200) {
            this.marks = response.data;
          }
        });
        getDictInfoByName('国籍').then(response => {
          if (response.code == 200) {
            this.countrys = response.data;
          }
        });
        getDictInfoByName('视频文件格式').then(response => {
          if (response.code == 200) {
            this.videotypes = response.data;
          }
        });
      },
      getResource() {
        this.listLoading = true;
        let params = {id: this.id};
        getResources(params).then(response => {
          this.listLoading = false;
          if (response.code == 200) {
            let data = response.data;
            console.log(data.list[0])
            this.resource = data.list[0];
            this.playerOptions.poster = this.staticServer + data.list[0].resourcedir + '/image/' + data.list[0].posterFull;
            data.list[0].videoname.split(',').forEach((name, index) => {
              this.playerOptions.sources.push({
                type: "video/" + name.split('.')[1],
                src: this.staticServer + this.resource.resourcedir + '/' + name,
              })
            });
            let paramsImage = {dir: this.resource.resourcedir};
            getImages(paramsImage).then(response => {
              if (response.code == 200) {
                this.images = response.data;
              }
            });
          }
        });
      },
      getActors(){
        getActors(this.id).then(response => {
          this.actors = response.data;
        });
      },
      editTag(){
        this.dialogFormVisible = true;
        this.getAllTagList();
      },
      getAllTagList() {
        getTags().then(response => {
          this.allTag = response.data.list;
          for (let i = 0; i < this.allTag.length; i++) {
            this.allTag[i].checked = false;
          }
          this.allTag.forEach(item=>{
            item.checked = this.getResourceChecked(item.id,this.allocTag);
          });
          this.allParentTag.forEach(item=>{
            item.checked = this.isAllChecked(item.id);
          });
          this.$forceUpdate();
        });
      },
      getAllParentTags() {
        getTags({parentId: 0}).then(response => {
          this.allParentTag = response.data.list;
          for (let i = 0; i < this.allParentTag.length; i++) {
            this.allParentTag[i].checked = false;
          }
        });
      },
      getSubTagByParentId(parentId) {
        let subTags = [];
        if (this.allTag == null) return null;
        for (let i = 0; i < this.allTag.length; i++) {
          let subTag = this.allTag[i];
          if (subTag.parentId === parentId) {
            subTags.push(subTag);
          }
        }
        return subTags;
      },
      getTagByResourceId(){
        listTagByResourceId(this.id).then(response=>{
          this.allocTag = response.data;
        });
      },
      getResourceChecked(tagId,allocTag){
        if(allocTag==null||allocTag.length===0) return false;
        for(let i=0;i<allocTag.length;i++){
          if(allocTag[i].id===tagId){
            return true;
          }
        }
        return false;
      },
      isIndeterminate(parentId) {
        let subTags = this.getSubTagByParentId(parentId);
        if (subTags == null) return false;
        let checkedCount = 0;
        for (let i = 0; i < subTags.length; i++) {
          if (subTags[i].checked === true) {
            checkedCount++;
          }
        }
        return !(checkedCount === 0 || checkedCount === subTags.length);
      },
      toActorDetails(actorId){
        this.$router.push('/superstar/actorDetails?id=' + actorId);
      },
      isAllChecked(parentId) {
        let subTags = this.getSubTagByParentId(parentId);
        if (subTags == null) return false;
        let checkedCount = 0;
        for (let i = 0; i < subTags.length; i++) {
          if (subTags[i].checked === true) {
            checkedCount++;
          }
        }
        if(checkedCount===0){
          return false;
        }
        return checkedCount === subTags.length;
      },
      handleSave() {
        this.$confirm('是否分配资源？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let checkedTagIds = new Set();
          if (this.allTag != null && this.allTag.length > 0) {
            this.allTag.forEach(item => {
              if (item.checked) {
                checkedTagIds.add(item.id);
              }
            });
          }
          let params = new URLSearchParams();
          params.append("resourceId", this.id);
          params.append("tagIds", Array.from(checkedTagIds));
          allocTag(params).then(response => {
            this.$message({
              message: '分配成功',
              type: 'success',
              duration: 1000
            });
            this.dialogFormVisible = false;
            this.getTagByResourceId();
          })
        })
      },
      handleClear() {
        this.allParentTag.forEach(item => {
          item.checked = false;
        });
        this.allTag.forEach(item => {
          item.checked = false;
        });
        this.$forceUpdate();
      },
      handleCheckAllChange(cate) {
        let subTags = this.getSubTagByParentId(cate.id);
        for (let i = 0; i < subTags.length; i++) {
          subTags[i].checked = cate.checked;
        }
        this.$forceUpdate();
      },
      handleCheckChange(resource) {
        this.allParentTag.forEach(item=>{
          if(item.id===resource.parentId){
            item.checked = this.isAllChecked(resource.parentId);
          }
        });
        this.$forceUpdate();
      },
      toResourceList(tagId){
        this.$router.push('/superstar/resources?tagId=' + tagId);
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
      formatTheme(theme){
        if (theme == null || theme === '') {
          return null;
        }
        let themeName = that.themes.filter(x=>x.id == theme);
        if(themeName == null || themeName === ''){
          return null;
        }
        return themeName[0].name
      },
      formatMark(mark){
        if (mark == null || mark === '') {
          return null;
        }
        let markName = that.marks.filter(x=>x.id == mark);
        if(markName == null || markName === ''){
          return null;
        }
        return markName[0].name
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
      formatType(type){
        if (type == 0 || type === '0') {
          return '视频';
        }
        if (type == 1 || type === '1') {
          return '图片';
        }
        return null
      },
      formatVideotype(videotype){
        if (videotype == null || videotype === '') {
          return null;
        }
        let videotypeName = that.videotypes.filter(x=>x.id == videotype);
        if(videotypeName == null || videotypeName === ''){
          return null;
        }
        return videotypeName[0].name
      }

    },
  }
</script>
<style scoped>
  .table-layout {
    padding: 20px;
    border-left: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
  }

  .top-line {
    border-top: 1px solid #DCDFE6;
  }
</style>
