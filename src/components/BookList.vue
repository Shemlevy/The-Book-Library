<template>
  <div class="book-list-body">
    <div class="list-container" v-if="books">
      <div class="book" v-for="(book, i) in books" :key="i">
        <img @click="editBook(i)" id="book-img" :src="book.img"/>
        <div class="details">
          <h1 class="book-title">{{book.title}}</h1>
          <h3>{{book.authors}}</h3>
          <h5>{{bookDate(book.date)}}</h5> 
        </div>
        <div>
          <button @click="editBook(i)">Edit</button>
        </div>
      </div> 
      <book-edit  v-if="showModal" @close="showModal = false"></book-edit>
    </div>
    <div class="no-match" v-else>No Match</div>
  </div>
</template>

<script>
import { GET_USER_BOOKS,GET_BOOKS, SET_SELECTED_BOOK } from "../store/store";
import BookEdit from "./BookEdit";
import EventBusService, { CLOSE_MODAL } from "../service/EventBusService";

export default {
  data() {
    return {
      props: ["userBook"],
      showModal: false,
      currBook: null,
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
      return this.$store.getters[GET_BOOKS];
    }
  },
  components: {
    BookEdit
  }
};
</script>

<style>

.book-list-body {
  display: flex;
  justify-content: center;
  width: 100vw;
}
.list-container {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  max-width: 1260px;
}
.book {
  display: flex;
  margin: 5px;
  box-shadow: 0px 0px 20px 0px #e1e1e1;
}
#book-img {
  width: 128px !important; 
  height: 198px !important;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  transform-origin: 0 50%;
  transform: rotateY(0);
  transition: all 0.45s ease;
}
.authors {
  text-transform: capitalize;
}
.details {
  width: 200px;
  height: 198px;
  padding: 5px 10px;
}
.book-title{
  line-height: 2;
  text-overflow: ellipsis;
  line-height: 1;
  max-height: 140px;
  overflow: hidden;
}
.book-img:hover {
  cursor: pointer;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25), 0 9px 20px 0 rgba(0, 0, 0, 0.45);
}
.book-img:hover {
  transform: rotateY(-25deg);
  box-shadow: 1px 1px 5px 5px rgba(0, 0, 0, 0.2);
}
.no-match{
  margin-top:20px;
  text-align: center;
  line-height: 1;
  font-size: 2em;
  font-weight: 700;
  color:white;
  background-color: rgb(253, 67, 92);
  padding:20px;
}
</style>
