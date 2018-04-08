<template>
  <div id="app">
      <div class="container">
        <div class="header">
          <word-changer></word-changer>
          <manu-bar></manu-bar>
          <color-change></color-change>
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
import ColorChange from './components/ColorChange'

export default {
  name: "App",
  created() {
    this.$store.dispatch({ type: LOAD_BOOKS });
    this.$store.dispatch({ type: LOAD_USER_BOOKS });
  },
  components: {
    FooterBar,
    WordChanger,
    ManuBar,
    ColorChange
  }
};
</script>

<style>

</style>




