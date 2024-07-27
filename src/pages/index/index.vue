<template>
  <div class="page-turntable">
    <div class="zp-box">
      <div class="turntable" :style="rotateStyle">
        <div
          class="bck-box"
          :style="`transform: rotate(${-90 + 180 / list.length}deg)`"
        >
          <div
            class="bck"
            v-for="(i, index) in list"
            :key="index"
            :style="`transform: rotate(${
              (-index * 360) / list.length
            }deg) skew(${-90 + 360 / list.length}deg);`"
          ></div>
        </div>
        <div
          class="jiang"
          :style="`transform: rotate(${
            (-index * 360) / list.length
          }deg) translateY(-120px);`"
          v-for="(i, index) in list"
          :key="index"
        >
          <div
            class="title"
            :style="{ width: (3.14 * this.radio) / list.length + 'px' }"
          >
            {{ i.title }}
          </div>
          <!-- <div class="img"></div> -->
        </div>
      </div>
      <div class="start-btn" @click="run">开始</div>
    </div>
    <nut-space>
      <nut-tag type="warning"> 家常菜 </nut-tag>
      <nut-tag type="danger"> 早餐 </nut-tag>
      <nut-tag type="primary"> 出去吃 </nut-tag>
      <nut-tag type="success"> 点外卖 </nut-tag>
    </nut-space>
    <div>
      <nut-tag type="default" @click="editMenu"> 编辑菜单 </nut-tag>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import router from "@/router/fn";
import { getMenulist } from "@/service/turntable";
export default {
  computed: {
    animationClass() {
      return "ani" + this.winner;
    },
    rotateStyle() {
      const { config } = this;
      return `
        -webkit-transition: transform ${config.duration}ms ${config.mode};
        transition: transform ${config.duration}ms ${config.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
            transform: rotate(${this.rotateAngle}deg);`;
    },
    turnStyle() {
      let { list, winner } = this;
      return this.tableClass
        ? {
            transform: `rotate(calc(5 * 360deg + 360deg / ${list.length} * ${winner}))`,
          }
        : ``;
    },
  },
  data() {
    return {
      winner: 2, //指定获奖下标 specified为true时生效
      specified: false, //是否指定获奖结果，false时为随机
      loading: false, //抽奖执行状态，防止用户多次点击
      panziElement: null,
      tableClass: "",
      isrun: false,
      radio: 160,
      rotateAngle: 0, // 旋转角度
      config: {
        duration: 5000, // 总旋转时间 ms级
        circle: 8, // 旋转圈数
        // ease-in-out：（加速然后减速），ease-in-out 函数等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)
        mode: "cubic-bezier(0.42, 0.35, 0.6, 1.0)", // 由快到慢 惯性效果都省了
        // mode: "ease-in-out", // 由快到慢 惯性效果都省了
      },
      cricleAdd: 1, // 第几次抽奖
      drawIndex: 0, // 中奖索引 转盘图片排序 指针右手开始 0-...
    };
  },
  setup() {
    const list = getMenulist() || [];
    const editMenu = () => {
      router.push({ name: "menu-list" });
    };
    return { editMenu, list };
  },
  methods: {
    async run() {
      if (this.isrun) return;
      this.isrun = true;
      this.drawIndex = this.random(0, this.list.length - 1);
      this.rotateAngle =
        this.config.circle * 360 * this.cricleAdd +
        (this.drawIndex * 360) / this.list.length;
      console.log("rotateAngle: ", this.rotateAngle, this.drawIndex);

      this.cricleAdd++;
      setTimeout(() => {
        console.log(`恭喜你获得了`, this.list[this.drawIndex], this.drawIndex);
        this.isrun = false;
      }, this.config.duration);
    },
    //随机一个整数的方法
    random(min, max) {
      return parseInt(Math.random() * (max - min + 1) + min);
    },
  },
};
</script>
<style lang="scss">
$tableSize: 320px; //转盘尺寸
$btnSize: 60px; //抽奖按钮尺寸
$time: 3s; //转动多少秒后停下的时间
.page-turntable {
  padding: 30px 16px;
  .zp-box {
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: $tableSize;
    height: $tableSize;
    margin: 80px auto 20px;
    /* 抽奖按钮 */
    .start-btn {
      display: inline-block;
      background: #f53737;
      position: relative;
      z-index: 2;
      cursor: pointer;
      width: $btnSize;
      height: $btnSize;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 20px;
      font-weight: bold;
      box-sizing: border-box;
      position: relative;
      z-index: 2;
      &::before {
        content: "";
        width: 0;
        height: 0;
        border: 20px solid transparent;
        border-top: 30px solid transparent;
        border-bottom: 30px solid #f53737;
        position: absolute;
        top: -52px;
        z-index: -1;
      }
    }
    /* 盘子样式 */
    .turntable {
      overflow: hidden;
      border-radius: 50%;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 10px solid #f74e4e;
      box-sizing: border-box;
      transition: transform 3s;
      /* 每个奖项的样式 */
      .jiang {
        position: absolute;
        .title {
          font-weight: bold;
          font-size: 16px;
          line-height: 1.2;
          color: #3b3b3b;
          text-align: center;
        }
        .img {
          margin: 0.5rem auto;
          width: 20px;
          height: 20px;
          line-height: 20px;
          border: 2px dashed #f87373;
          overflow: hidden;
          color: white;
          img {
            height: 100%;
          }
        }
      }
    }
    .bck-box {
      overflow: hidden;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      // background: blue;
      border-radius: 50%;

      /* 转盘扇形背景 */
      .bck {
        box-sizing: border-box;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 1;
        top: -50%;
        left: 50%;
        transform-origin: 0% 100%;
        // transform:skew(30deg);
      }
      /* 转盘背景色 */
      .bck:nth-child(2n) {
        background: #fffcb9;
      }
      .bck:nth-child(2n + 1) {
        background: #f8a281;
        box-shadow: 0 0 5px red;
      }
    }
  }
}
</style>
