<template>
    <div class="main-container transition-color">
        <ul class="manu">
            <router-link tag="li" to="/">Home</router-link>
            <router-link tag="li" to="/userBooks">My Books</router-link>
            <li  @click="showModal = !showModal">Get New Book</li>
            <transition name="fade" mode="in-out" >
              <book-edit :newBook="newBook"  v-if="this.showModal" @close="showModal = false"></book-edit>
            </transition>
        </ul>
        <input class="transition-color" type="text" v-if="!(this.$route.name === 'UserBooks')"  v-model="input" @keyup="searchBooks()" placeholder="Search for Books">
        <div class="spacer" v-else></div>      
    </div>
</template>

<script>
import { SEARCH_BOOKS } from "../store/store";
import BookEdit from "./BookEdit";
export default {
  data() {
    return {
      input: null,
      active: true,
      showModal: false,
      newBook: true
    };
  },
  methods: {
    searchBooks() {
      this.$store.dispatch({ type: SEARCH_BOOKS, value: this.input });
    }
  },
  components: {
    BookEdit
  }
};
</script>

<style scoped>
.main-container {
  background-color: var(--header-color);
  display: flex;
  flex-flow: column;
  align-items: flex-end;
}
.manu {
  margin: 2vw 10% 0 0;
  display: flex;
  flex-flow: column;
}
li {
  height: 8vw;
  width: 28vw;
  margin-top: -0.5vw;
  padding: 5px 8px;
  line-height: 7vw;
  font-size: 3.5vw;
  font-weight: 900;
  text-align: center;
  list-style-type: none;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  background-color: var(--nav-color);
  clip-path: polygon(100% 0, 100% 53%, 100% 90%, 0 100%, 0 10%);
}
li:hover {
  background-color: var(--nav-hover-color);
  color: rgb(255, 255, 255);
}
input {
  width: 28vw;
  padding: 5px 8px;
  border-radius: 8px;
  font-size: 1.5em;
  border: 1px solid ghostwhite;
  outline: none;
  border: none;
  background-color: var(--nav-color);
  margin: 1.5vw 10%;
}

.spacer {
  width: 28vw;
  height: 23px;
  padding: 5px 8px;
  border-radius: 8px;
  line-height: 1em;
  outline: none;
  margin: 1.5vw 10%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 880px) {
  input {
    font-size: 0.7em;
  }
}
</style>
