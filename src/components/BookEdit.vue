<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="book-footer">
            <img id="book-img" :src="book.img">
            <div class="details">
              <input :class="{'error-input':!this.errors.title}" placeholder="How do you call it?" type="text" v-model="book.title">
              <transition name="fade" mode="in-out" >
                <div>
                  <span class="error" v-if="!this.errors.duplicateTitle">This title has been used</span>  
                  <span class="error" v-if="!this.errors.title">Give it a title.</span>
                  <span class="spacer" v-if="this.errors.duplicateTitle && this.errors.title"></span>   
                </div>
                             
              </transition>
              <input :class="{'error-input':!this.errors.authors}"  placeholder="Who wrote it?" type="text" v-model="book.authors">
              <transition name="fade" mode="in-out" >
                <span class="error" v-if="!this.errors.authors">The authors is required.</span>
                <span class="spacer" v-else></span>
              </transition>
              <md-datepicker class="date-picker" v-model="book.date" :md-open-on-focus="false"/>
            </div>
            <button class="modal-default-button" @click="$emit('close')">Close</button>
          </div>
          <div class="modal-body">
            <textarea placeholder="Let's scribble a few words about this book" class="description" v-model="book.description"></textarea>
            <div class="modal-footer">
              <button class="modal-default-button" @click="saveBook">Save</button>
              <button v-if="userBook" class="delete-btn" @click="prompt = !prompt">Delete</button>
              <prompt-msg  v-if="prompt" @close="prompt = false"></prompt-msg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import { GET_SELECTED_BOOK, UPDATE_BOOKS, DELETE_BOOK  ,GET_USER_BOOKS} from "../store/store";
import PromptMsg from "./PromptMsg";

export default {
  props: ["userBook", "newBook"],
  data() {
    return {
      books: null,
      book: null,
      prompt: false,
      errors: {
        title: true,
        authors: true,
        duplicateTitle: true
      }
    };
  },
  created() {
    if (this.newBook) {
      this.book = {
        _id: Date.now(),
        description: "",
        authors: "",
        title: "",
        date: new Date(),
        img: "static/bookcover.jpg"
      };
    } else {
      this.book = { ...this.currBook };
    }
    this.books = this.$store.getters[GET_USER_BOOKS];
  },
  methods: {
    saveBook() {
      this.checkError()
      let check = this.isValidate()
      if (check) {
        this.$router.push("/userBooks");
        this.$emit("close");
        let newBook = this.book;
        this.$store.commit({ type: UPDATE_BOOKS, newBook });
      }
    },
    isValidate(){
      let isValide = this.errors.title && this.errors.authors && this.errors.duplicateTitle
     return (this.errors.title && this.errors.authors && this.errors.duplicateTitle)
    },
    checkError() {
      for (const key in this.book) {
        switch (key) {
          case 'title':
          this.errors.title = !(this.book[key] === '')
          this.errors.duplicateTitle = !this.checkRpt(this.book)
            break;
          case 'authors':
          this.errors.authors = !(this.book[key] === '')
            break;
        }
      }
    },
    checkRpt(checkedBook){
      if (!this.books) return
      let idx = this.books.findIndex(book => book.title === checkedBook.title);
      if (idx >=0 ) {
       return (this.books[idx]._id === checkedBook._id) ? false : true
      }else{
        return false
      }
  }
  },
  computed: {
    currBook() {
      return this.$store.getters[GET_SELECTED_BOOK];
    }
  },
  components: {
    PromptMsg
  }
};
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(134, 132, 132, 0.87);
  display: table;
  transition: opacity 0.3s ease-in-out;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  z-index: 5;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease-in-out;
  font-family: Helvetica, Arial, sans-serif;
}
.book-footer {
  display: flex;
}
.book-img {
  width: 128px;
  height: 198px;
}

.book div {
  padding: 5px 10px;
}

input {
  font-size: 1em;
  padding: 5px 10px;
  margin: 2px;
  border: 1px solid black;
  border-radius: 8px;
}
.error-input{
  animation-name: shake;
  animation-duration: 0.2s;
  border: 1px solid red;
}

.description {
  font-size: 1em;
  padding: 5px 10px;
  margin: 2px;
  border: 1px solid black;
  border-radius: 8px;
  color: #363232;
  padding: 10px;
  margin: 10px;
  height: 200px;
  text-overflow: ellipsis;
  overflow: scroll;
  font-family: Helvetica, Arial, sans-serif;
}
.details {
  display: flex;
  flex-flow: column;
}
.modal-body {
  display: flex;
  flex-flow: column;
  padding: 5px 10px;
}
.modal-body input {
  padding: 5px 10px;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-footer {
  align-self: center;
  margin-top: 30px;
}

.delete-btn {
  background-color: rgb(192, 0, 0);
}
.delete-btn:hover {
  background-color: rgb(169, 255, 112);
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.error {
  font-size: 0.9em;
  padding-left: 5px;
  font-weight: 600;
  color: rgb(230, 4, 4);
  animation-name: shake;
  animation-duration: 0.2s;
}

.spacer {
  margin: 10px;
}

.no-match {
  margin-top: 20px;
  text-align: center;
  line-height: 1;
  font-size: 2em;
  font-weight: 700;
  color: white;
  background-color: rgb(253, 67, 92);
  padding: 20px;
}

@keyframes shake {
  from,
  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    -webkit-transform: translate3d(-10px, 0, 0);
    transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    -webkit-transform: translate3d(10px, 0, 0);
    transform: translate3d(10px, 0, 0);
  }
}

.shake {
  animation-name: shake;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>