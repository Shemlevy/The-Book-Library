<template>
  <div id="app">
      <div class="container">
        <div class="header">
          <word-changer></word-changer>
          <manu-bar></manu-bar>
        </div>
      <div class="divider"></div>
      <transition name="fade" mode="in-out" >
        <router-view/>
      </transition>
      <footer-bar></footer-bar>
    </div>
  </div>
</template>

<script>
import { LOAD_BOOKS,LOAD_USER_BOOKS } from "./store/store";
import FooterBar from "./components/FooterBar";
import WordChanger from "./components/WordChanger";
import ManuBar from "./components/ManuBar";

export default {
  name: "App",
  created() {
    this.$store.dispatch({ type: LOAD_BOOKS });
    this.$store.dispatch({ type: LOAD_USER_BOOKS });
  },
  components: {
    FooterBar,
    WordChanger,
    ManuBar
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
button {
  margin: 5px;
  padding: 4px 6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: #0ddf99;
  color: white;
  transition: all 0.3s ease-in-out;
  height: 25px;
  width: 70px;
}
textarea{
  resize: none;
}

button:hover {
  background-color: rgba(255, 139, 7, 0.747);
}
.container {
  display: flex;
  flex-flow: row wrap;
}
.header {
  display: flex;
  background-color: rgb(55, 143, 102);
  justify-content: center;
  width: 100vw;
}
.divider {
  width: 100vw;
  height: 5vw;
  background-color: rgb(55, 143, 102);
  clip-path: polygon(0 0, 0 100%, 100% 0);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.md-field.md-theme-default>.md-icon:after{
  background-color: rgba(255, 255, 255, 0);
}

</style>




