<template>
  <div class="book-list-body">
    <div class="list-container" v-if="books[0]">
      <div class="book" v-for="(book, i) in books" :key="i">
        <img @click="editBook(i)" id="book-img" :src="book.img"/>
        <div class="details">
          <h1 class="book-title" >{{book.title}}</h1>
          <h3>{{book.authors}}</h3>
          <h5>{{bookDate(book.date)}}</h5> 
        </div>
        <div>
          <button @click="editBook(i)">Edit</button>
        </div>
      </div> 
      <book-edit :userBook="userBook" :newBook="newBook"  v-if="showModal" @close="showModal = false"></book-edit>
    </div>
    <div  class="no-match" v-else>There no books yet...why not create one?</div>
  </div>
</template>

<script>
import { GET_USER_BOOKS, SET_SELECTED_BOOK } from "../store/store";
import BookEdit from "./BookEdit";
import EventBusService, { CLOSE_MODAL } from "../service/EventBusService";

export default {
  data() {
    return {
      showModal: false,
      userBook: true,
      newBook: false
    };
  },
  created() {
    EventBusService.$on(CLOSE_MODAL, () => {
      this.showModal = false;
    });
  },
  methods: {
    editBook(i) {
      this.showModal = true;
      this.$store.commit({ type: SET_SELECTED_BOOK, book: this.books[i] });
    },
    bookDate(book) {
      let date = new Date(book);
      return date.toLocaleDateString();
    }
  },
  computed: {
    books() {
      return this.$store.getters[GET_USER_BOOKS];
    }
  },
  components: {
    BookEdit
  }
};
</script>

<style scoped>

</style>
