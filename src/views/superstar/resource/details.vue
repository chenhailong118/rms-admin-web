<template> 
  <div class="app-container">
    <div>
      <el-card shadow="never" body-style="padding: 0px" type="flex" align="center">
        <el-card shadow="never" body-style="padding: 5px" type="flex" align="left" style="float:right;width: 20%;">
          <img :src="staticServer + resource.resourcedir + '/' + resource.poster" style="width: 250px;height: 300px">
          <div style="font-weight:bold;font-size: small;margin-top: 5px;">
            <div>标&#12288;&#12288;题：{{resource.title}}</div>
            <div>编&#12288;&#12288;号：{{resource.designation}}</div>
            <div>发行日期：{{resource.issuingdate | formatDateTime}}</div>
            <div>播放时长：{{resource.duration}} 分钟</div>
            <div>导&#12288;&#12288;演：{{resource.director}}</div>
            <div>制造商&#12288;：{{resource.manufacturer}}</div>
            <div>发型商&#12288;：{{resource.publisher}}</div>
            <div>得&#12288;&#12288;分：{{resource.score}}</div>
            <div>主题分类：{{resource.theme | formatTheme}}</div>
            <div>标&#12288;&#12288;记：{{resource.mark | formatMark}}</div>
            <div>国别：{{resource.country | formatCountry}}</div>
            <div>创建时间：{{resource.cteateTime | formatDateTime}}</div>
            <div>更新时间：{{resource.modifyTime | formatDateTime}}</div>
          </div>
        </el-card>
        <el-card type="flex" align="left">
          <div style="font-weight:bold;font-size: medium;margin-top: 5px;">简介：</div>
          <div style="font-size: medium;margin-top: 5px;"><span> {{resource.describe}}</span></div>

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
    </div>
  </div>
</template>
<script>
  import {getResources, getImages} from '@/api/viresource';
  import {formatDate} from '@/utils/date';
  import {getDictInfoByName} from '@/api/dictinfo';

  let that;
  export default {
    name: "resourceDetails",

    data() {
      return {
        id: this.$route.query.id,
        resource: {},
        themes: null,
        marks: null,
        countrys: null,
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
        }
      }
    },
    beforeCreate: function () {
      that = this;
    },
    created() {
      this.init();
      this.getResource();},
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
            this.playerOptions.poster = this.staticServer + data.list[0].resourcedir + '/' + data.list[0].posterFull;
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

    },
  }
</script>
<style scoped>

</style>
