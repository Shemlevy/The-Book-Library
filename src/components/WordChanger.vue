<template>
  <div class="main-container">
    <div class="wrapper">
      <h1 class="text">
        <div class="line">
          <p>Books</p>
          <p>Review</p>
          <p>Favorites</p>
        </div>
        <div class="line">
          <p>Review</p>
          <p>Favorites</p>
          <p>Books</p>
        </div>
        <div class="line">
          <p>Favorites</p>
          <p>Books</p>
          <p>Review</p>
        </div>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style scoped>
.main-container {
  max-width: 50vw;
  background-color: rgb(55, 143, 102);
}
.wrapper {
  margin: 12vw 0 5vw 12vw;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.text {
  margin: 0;
  font-size: 5vw;
  text-align: left;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
}
.text .line {
  overflow: hidden;
  white-space: nowrap;
  height: 4vw;
  line-height: 0.9;
}
.text .line:first-child + .line {
  margin-left: 6.9vw;
}
.text .line:first-child + .line + .line {
  margin-left: 12.9vw;
}
.text .line > p {
  text-shadow: 2px 2px 2px white;
  margin: 0;
  height: 5.65vw;
  overflow: hidden;
  font-size: 1em;
  line-height: 0.9;
  white-space: nowrap;
  animation: moveWords 6s infinite ease;
}
.text .line:nth-child(odd) {
  -webkit-transform: skew(60deg, -30deg) scaleY(0.66667);
  transform: skew(60deg, -30deg) scaleY(0.66667);
}
.text .line:nth-child(even) {
  -webkit-transform: skew(0deg, -30deg) scaleY(1.33333);
  transform: skew(0deg, -30deg) scaleY(1.33333);
}

@keyframes moveWords {
  0% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
  50% {
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }
  100% {
    -webkit-transform: translateY(0%);
    transform: translateY(0%);
  }
}
</style>
