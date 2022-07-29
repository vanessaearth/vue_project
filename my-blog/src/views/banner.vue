<template>
  <div class="slide-box">
    <ul class="slide-img" :style="containerStyle">
      <li>
          <img :src="slides[slides.length-1].src" alt="" width="100%">
      </li>
      <li v-for="(items,index) in slides" v-bind:key="index">
          <img :src="items.src" alt="" width="100%">
      </li>
      <li>
          <img :src="slides[0].src" alt="" width="100%">
      </li>
    </ul>
    <h3>{{slides[nowIndex].title}}</h3>
    <ul class="slide-pages">
      <li v-for="(items,index) in slides" v-bind:key="index" @click="jump(index+1)" :class="(currentIndex-1)==index ?'on':''" >
        <a >{{index+1}}</a>
      </li>
    </ul>
    <a href="javascript:;" id="prev" class="arrow" @click="move(imgWidth, 1, speed)">&lt;</a>
    <a href="javascript:;" id="next" class="arrow" @click="move(imgWidth, -1, speed)">&gt;</a>
  </div>
</template>

<script>
export default {
  name: 'banner',

  data () {
    return {
      slides: [
        {
          src: require('@/assets/img/slides/1.jpg'),
          title: '第1张图'
        }, {
          src: require('@/assets/img/slides/2.jpg'),
          title: '第2张图'
        }, {
          src: require('@/assets/img/slides/3.jpg'),
          title: '第3张图'
        }, {
          src: require('@/assets/img/slides/4.jpg'),
          title: '第4张图'
        }, {
          src: require('@/assets/img/slides/5.jpg'),
          title: '第5张图'
        }, {
          src: require('@/assets/img/slides/6.jpg'),
          title: '第6张图'
        }, {
          src: require('@/assets/img/slides/7.jpg'),
          title: '第7张图'
        }, {
          src: require('@/assets/img/slides/8.jpg'),
          title: '第8张图'
        }, {
          src: require('@/assets/img/slides/9.jpg'),
          title: '第9张图'
        }, {
          src: require('@/assets/img/slides/10.jpg'),
          title: '第10张图'
        }
      ],
      nowIndex: 0,
      imgWidth: 853,
      currentIndex: 1,
      distance: -853,
      transitionEnd: true,
      speed: 20
    }
  },
  mounted () {
    console.log('slider show ...')
    console.log(this.slides)
    this.init()
  },
  computed: {
    containerStyle () {
      return {
        transform: `translate3d(${this.distance}px, 0, 0)`
      }
    }
  },
  methods: {
    init () {
      this.play()
      window.onfocus = function () { this.stop() }.bind(this)
      window.onblur = function () { this.play() }.bind(this)
    },
    move (offset, direction, speed) {
      console.log(this.currentIndex)
      console.log(speed)
      if (!this.transitionEnd) return
      this.transitionEnd = false
      direction === -1 ? this.currentIndex += offset / this.imgWidth : this.currentIndex -= offset / this.imgWidth
      if (this.currentIndex > this.slides.length) this.currentIndex = 1
      if (this.currentIndex < 1) this.currentIndex = this.slides.length

      const destination = this.distance + offset * direction
      this.animate(destination, direction, speed)
    },
    animate (des, direc, speed) {
      if (this.temp) {
        window.clearInterval(this.temp)
        this.temp = null
      }
      this.temp = window.setInterval(() => {
        if ((direc === -1 && des < this.distance) || (direc === 1 && des > this.distance)) {
          this.distance += speed * direc
        } else {
          this.transitionEnd = true
          window.clearInterval(this.temp)
          this.distance = des
          if (des < -this.slides.length * this.imgWidth) this.distance = -this.imgWidth
          if (des > -this.imgWidth) this.distance = -this.slides.length * this.imgWidth
        }
      }, 20)
    },
    jump (index) {
      const direction = index - this.currentIndex >= 0 ? -1 : 1
      const offset = Math.abs(index - this.currentIndex) * this.imgWidth
      const jumpSpeed = Math.abs(index - this.currentIndex) === 0 ? this.speed : Math.abs(index - this.currentIndex) * this.speed
      this.move(offset, direction, jumpSpeed)
    },
    play () {
      if (this.timer) {
        window.clearInterval(this.timer)
        this.timer = null
      }
      this.timer = window.setInterval(() => {
        this.move(this.imgWidth, -1, this.speed)
      }, 3000)
    },
    stop () {
      window.clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style scoped lang='scss'>

  .slide-box {
    position: relative;
    width: 853px;
    height: 640px;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: 0 3px 3px #000;
  }
  .slide-img{
    position: absolute;
    z-index: 1;
    width: 500000px;
  }
  .slide-img li img{
    float: left;
     width: 853px;
    height: 640px;
  }
  .slide-pages {
    position: absolute;
    left: 50%;
    bottom: 0;
    margin-left: -150px;
    z-index: 2;
    width: 300px;
    display: flex;;
    text-align: center;
  }

  .slide-pages li {
    flex:1;
    padding: 5px;
    cursor: pointer;
    a{
      color: #fff;
    }
  }

  .slide-pages .on {
    background: rgba(167, 167, 167,.5);
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform:translateX(-50%);
    z-index: 2;
    display: none;
    width: 40px;
    height: 40px;
    font-size: 36px;
    font-weight: bold;
    line-height: 39px;
    text-align: center;
    color: #fff;
    background-color: RGBA(0, 0, 0, .3);
    cursor: pointer;
  }

  .arrow:hover {
    background-color: RGBA(0, 0, 0, .7);
  }

  .slide-box:hover .arrow {
    display: block;
  }

  #prev{
    left: 20px;
  }

  #next{
    right: 20px;
  }
</style>
