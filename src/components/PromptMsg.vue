<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-body">
            <p>Are you sure you want to delete <span> {{book.title}} </span> from your shelf ?</p>
            <div class="modal-footer">
              <button class="delete-btn" @click="deleteBook()">Yes</button>
              <button @click="$emit('close')">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>


<script>
import { GET_SELECTED_BOOK, DELETE_BOOK } from "../store/store";
import EventBusService, { CLOSE_MODAL } from "../service/EventBusService";
export default {
  data() {
    return {
      book: null
    };
  },
  created() {
    this.book = { ...this.currBook };
  },
  methods: {
    deleteBook() {
      this.$emit("close");
      let deletedBook = this.book;
      this.$store.commit({ type: DELETE_BOOK, deletedBook });
      EventBusService.$emit(CLOSE_MODAL);
    }
  },
  computed: {
    currBook() {
      return this.$store.getters[GET_SELECTED_BOOK];
    }
  }
};
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 300;
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
  width: 400px;
  z-index: 5;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease-in-out;
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  font-weight: 700;
}

p span {
  color: coral;
  font-size: 1.2em;
}

.modal-body {
  margin-top:50px;  
  display: flex;
  flex-flow: column;
  padding: 5px 10px;
}
.modal-body input {
  padding: 5px 10px;
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


.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>