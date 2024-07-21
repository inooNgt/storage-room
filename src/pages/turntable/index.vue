<template>
  <div class="overall">
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
          }deg) translateY(-100px);`"
          v-for="(i, index) in list"
          :key="index"
        >
          <span class="title">{{ i.title }}</span>
          <div class="img">
            <!-- <img src="@/assets/img/bck.jpg" alt /> -->
            img{{ index }}
          </div>
        </div>
      </div>
      <div class="start-btn" @click="run">抽奖</div>
    </div>
  </div>
</template>

<script>
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
      list: [
        {
          title: "可乐鸡翅",
        },
        {
          title: "红烧肉",
        },
        {
          title: "糖醋排骨",
        },
        {
          title: "西红柿炒鸡蛋",
        },
        {
          title: "红烧肉",
        },
        {
          title: "咸鱼烧茄子",
        },
        {
          title: "香煎茄子",
        },
        {
          title: "清蒸鲈鱼",
        },
      ],
    };
  },
  mounted() {
    //通过获取奖品个数，来改变css样式中每个奖品动画的旋转角度
    // var(--nums) 实现css动画根据奖品个数，动态改变
    // let root = document.querySelector(":root");
    // root.style.setProperty("--nums", this.list.length);
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
    //开始抽奖
    start() {
      if (!this.loading) {
        this.tableClass = "";
        if (this.specified) {
          //此处可指定后端返回的指定奖品
          // this.winner = this.winner
          this.winCallback();
        } else {
          this.winner = this.random(0, this.list.length - 1);
          this.winCallback();
        }
        this.loading = true;
      }
    },
    //中奖返回方法
    winCallback() {
      setTimeout(() => {
        /* 此处是为了解决当下次抽中的奖励与这次相同，动画不重新执行的 */
        /* 添加一个定时器，是为了解决动画属性的替换效果，实现动画的重新执行 */
        this.tableClass = this.animationClass;
        console.log("turnStyle", this.turnStyle);
      }, 0);
      // 因为动画时间为 3s ，所以这里3s后获取结果，其实结果早就定下了，只是何时显示，告诉用户
      setTimeout(() => {
        this.loading = false;
        console.log(`恭喜你获得了${this.winner}`);
      }, 3000);
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
.overall {
  .zp-box {
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: $tableSize;
    height: $tableSize;
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
          font-size: 18px;
          color: #3b3b3b;
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

    /* 下面的css样式为每个奖品的旋转动画，这里写了对应8个奖品的动画，如果想要更多的话，可以添加 */
    /* 例如： .wr8  @keyframes play8 */
    .wr0,
    .wr1,
    .wr2,
    .wr3,
    .wr4,
    .wr5,
    .wr6,
    .wr7 {
      animation-duration: $time;
      animation-timing-function: ease;
      animation-fill-mode: both;
      animation-iteration-count: 1;
    }
    // .wr0 {
    //   animation-name: play0;
    // }
    // .wr1 {
    //   animation-name: play1;
    // }
    // .wr2 {
    //   animation-name: play2;
    // }
    // .wr3 {
    //   animation-name: play3;
    // }
    // .wr4 {
    //   animation-name: play4;
    // }
    // .wr5 {
    //   animation-name: play5;
    // }
    // .wr6 {
    //   animation-name: play6;
    // }
    // .wr7 {
    //   animation-name: play7;
    // }
    @keyframes play0 {
      to {
        transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 0));
      }
    }
    @keyframes play1 {
      to {
        transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 1));
      }
    }
    @keyframes play2 {
      to {
        transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 2));
      }
    }
    @keyframes play3 {
      to {
        transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 3));
      }
    }
    @keyframes play4 {
      to {
        transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 4));
      }
    }
    @keyframes play5 {
      to {
        transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 5));
      }
    }
    @keyframes play6 {
      to {
        transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 6));
      }
    }
    @keyframes play7 {
      to {
        transform: rotate(calc(5 * 360deg + 360deg / var(--nums) * 7));
      }
    }
  }
}
</style>
