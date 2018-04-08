<template>
  <div class="palettes-container transition-color">
    <button @mouseover="colorsPalette[i].show = true" @mouseout="colorsPalette[i].show = false" class="btn-color" v-for="(palette,i) in colorsPalette" :key="i">
      <transition name="rise-in" mode="in-out" >
        <div v-if="palette.show" class="color-container" @click="changeColor(palette.color)">
          <div class="palette" v-for="(color, i) in palette.color" :key="i">
            <div class="color" :style="`background-color:${color};`"></div>
          </div>
        </div>
      </transition>
    </button>
    <p class="label transition-color">Change The Colors</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      title: ["change", "the", "color"],
      colorsPalette: {
        default: {
          color: [
            "rgb(55, 143, 102)",
            "rgb(251, 255, 37)",
            "black",
            "#0ddf99",
            "orange",
            "gainsboro",
            "rgb(97, 7, 89)"
          ],
          show: false
        },
        patTer: {
          color: [
            "rgb(253,152,153)",
            "rgb(248,209,172)",
            "black",
            "rgb(248,209,172)",
            "rgb(158,195,190)",
            "#d4fff6",
            "rgb(113,137,147)"
          ],
          show: false
        },
        beacDay: {
          color: [
            "rgb(217,165,81)",
            "rgb(233,229,218)",
            "black",
            "rgb(11,18,51)",
            "rgb(125,143,197)",
            "#0fffcd",
            "rgb(139,72,30)"
          ],
          show: false
        }
      },
      cssVars: [
        "--header-color",
        "--nav-color",
        "--nav-hover-color",
        "--btn-color",
        "--btn-hover-color",
        "--footer-color",
        "--logo-color"
      ]
    };
  },
  created() {
    console.log(this.colorsPalette);
  },
  methods: {
    changeColor(palette) {
      let html = document.getElementsByTagName("html")[0];
      this.cssVars.forEach((e, i) => {
        html.style.setProperty(e, palette[i]);
      });
    }
  },
  computed: {}
};
</script>

<style scoped>
.color,
.btn-color {
  margin: 0.5vw;
  border-radius: 50%;
  height: 3.5vw;
  width: 3.5vw;
}
.btn-color {
  background-color: var(--btn-color);
}
.palettes-container {
  display: flex;
  flex-flow: column;
  background-color: var(--header-color);
  z-index: 100;
  margin: 1vw 0 0 0;
}
.color-container {
  display: flex;
  flex-flow: row-reverse;
  align-items: center;
}

.label {
  font-weight: 900;
  transform: rotate(90);
  writing-mode: tb;
  margin-left: 1.4vw;
  margin-top: 0.5vw;
  width: 0;
  font-size: 2vw;
  color: rgba(255, 255, 255, 0.87);
  transform: rotate(-180deg);
}
.label:hover {
  cursor: default;
}




.palette {
  background-color: #fff;
  margin-top: -0.8vw;
}
.palette:first-child {
  margin-right: 3.5vw;
  border-top-right-radius: 10px;
}
.palette:last-child {
  border-bottom-left-radius: 10px;
}
.rise-in-enter-active,
.rise-in-leave-active {
  transition: opacity 0.6s;
}
.rise-in-enter,
.rise-in-leave-to {
  opacity: 0;
}

@media (max-width: 1500px) {
  .palette-container {
    margin: 1vw 1% 0 0;
  }
}
@media (max-width: 700px) {
  p {
    margin-left: -0.2vw;
  }
}
</style>
