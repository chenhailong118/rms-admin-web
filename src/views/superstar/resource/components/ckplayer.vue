<template>
  <div id="video"></div>
</template>

<script>
  export default {
    name: 'ckplayer',
    props: ['videoUrls','autoPlay','poster','loop'],
    data () {
      return {
        player: ''
      }
    },
    watch: {
      videoUrls: {
        handler(newVideoUrls, VideoUrls) {
          this.initVideo(newVideoUrls,this.autoPlay);
        },
        immediate: true
      }
    },
    mounted: function(){
      this.initVideo(this.videoUrls,this.autoPlay);
    },
    methods:{
      initVideo(videoUrls,autoPlay) {
        // 挂载完成后进行
        var videoObject = {
          container: '#video', //容器的ID或className
          variable: 'player', //播放函数名称
          autoplay: this.autoPlay,//自动播放
          loaded: 'loadedHandler', //当播放器加载后执行的函数
          loop: this.loop, //播放结束是否循环播放
          cktrack: '', //字幕文件
          poster: this.poster, //封面图片
          preview: { //预览图片
            file: ['', ''],
            scale: 2
          },
          config: '', //指定配置函数
          debug: true, //是否开启调试模式
          drag: 'start', //拖动的属性
          seek: 0, //默认跳转的时间
          // promptSpot: [ //提示点
          //   {
          //     words: '提示点文字01',
          //     time: 30
          //   },
          //   {
          //     words: '提示点文字02',
          //     time: 150
          //   }
          // ],
          video: this.videoUrls
        };
        // 定义一个对象
        var player = new ckplayer(videoObject);
        this.player = player;
      }
    }
  }
</script>
