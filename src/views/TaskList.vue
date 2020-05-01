<template>
  <div class="task-content">
    <div class="task-header">
      <div class="task-header__title">Задачи</div>
      <div class="task-header__options">
        <span>&bull;&bull;&bull;</span>
      </div>
    </div>

    <div class="task-form">
      <div class="task-form__text-overflow" :class="{'error': error}">
        <textarea
          v-model.trim="text"
          @keyup.enter="addTask"
          type="text"
          placeholder="Enter a title for this card..."
          class="task-form__text"
        />
      </div>
      <div class="task-form__actions">
        <button @click="addTask" class="task-form__add">Add card</button>
        <div class="task-form__delete" @click="clearTitle">
          <span></span>
        </div>
        <div class="task-form__options" @click="sortTask">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </div>
      </div>
    </div>

    <Loader v-if="loading" />

    <div class="task-list" v-if="tasks.length">
      <TaskItem
        v-for="(task, index) in tasks"
        :key="task.key"
        :text="task.text"
        :index="index"
        :task="task"
      />
    </div>

    <div class="task-empty" v-else>У вас пока нет задач</div>

    <div class="task-control" v-if="showPagination">
      <router-link
        :class="{'disable': prevDisable}"
        :to="'/page/' + (pageNumber-1)"
        class="task-control__prev-btn task-control--btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </router-link>
      <router-link
        :class="{'disable': nextDisable}"
        :to="'/page/'+ (pageNumber+1)"
        class="task-control__next-btn task-control--btn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
// import { db } from "../main";

import TaskItem from "../components/TaskItem";
import Loader from "../components/Loader";
export default {
  components: { TaskItem, Loader },
  data() {
    return {
      text: "",
      date: "",
      error: false,
      loading: true
    };
  },
  // firestore() {
  //   return {
  //     tasks: db.collection("taskList").orderBy("date")
  //   };
  // },
  computed: {
    tasks() {
      const pageNumber = +this.$route.params.pageNumber;
      const tasks = this.$store.getters.tasks(pageNumber - 1);
      return tasks;
    },
    pageNumber() {
      const page = +this.$route.params.pageNumber;
      return page;
    },
    showPagination() {
      let taskLength = this.$store.state.tasks.length;
      if (taskLength > 10) {
        return true;
      }
      return false;
    },
    prevDisable() {
      if (this.pageNumber <= 1) {
        return true;
      }
      return false;
    },
    nextDisable() {
      let taskLength = this.$store.state.tasks.length;
      if (taskLength <= this.pageNumber * 10) {
        return true;
      }
      return false;
    }
  },
  methods: {
    addTask() {
      if (this.text !== "") {
        this.$store.dispatch("addTask", this.text);
        this.text = "";
        if (this.page !== 1) this.$router.push("/page/1");
      } else {
        this.error = true;
      }
    },

    clearTitle() {
      this.text = "";
    },
    sortTask() {
      this.$store.state.tasks.reverse();
    }
  },
  mounted() {
    let pageNumber = +this.$route.params.pageNumber;
    if (this.tasks.length > 0) {
      this.loading = false;
    }
    if (pageNumber < 0) {
      this.$router.push("/page/1");
    }
  },
  watch: {
    text() {
      if (this.text !== "") {
        this.error = true;
      }
      this.error = false;
    },
    tasks() {
      let pageNumber = +this.$route.params.pageNumber;
      let arrLength = Math.ceil(this.$store.state.tasks.length / 10);

      if (this.tasks.length > 0) {
        this.loading = false;
      } else if (this.tasks.length === 0 && pageNumber !== 1) {
        this.$router.push("/page/" + arrLength);
      } else if (this.tasks.length === 0) {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.task-content {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background: #ebecf0;
  border-radius: 5px;
  margin-top: 50px;
  padding: 30px 13px 10px;

  .task-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 0 0 auto;
    margin-bottom: 15px;
    position: relative;
    min-height: 20px;
    &__title {
      font-size: 20px;
      line-height: 24px;
      font-weight: 600;
      padding-left: 10px;
    }
    &__options {
      cursor: pointer;
      position: absolute;
      right: 5px;
      height: 30px;
      width: 30px;
      padding: 6px;
      border-radius: 3px;
      &:hover {
        background-color: rgba(9, 30, 66, 0.08);
      }
      span {
        position: absolute;
        font-size: 16px;
      }
    }
  }
  .task-form {
    margin-bottom: 20px;
    &__text-overflow {
      overflow: hidden;
      padding: 6px 8px 2px;
      position: relative;
      z-index: 10;
      background: #fff;
      margin-bottom: 15px;
      border-radius: 5px;
    }
    &__text {
      display: block;
      font-size: 16px;
      line-height: 20px;
      color: #172b4d;
      background: #fff;
      width: 100%;
      height: auto;
      max-height: 162px;
      min-height: 70px;
      overflow-y: auto;
      padding: 0;
      border: none;
      box-shadow: none;
      overflow: hidden;
      overflow-wrap: break-word;
      resize: none;
    }
    &__text::placeholder {
      font-size: 16px;
    }
    &__actions {
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
    }
    &__add {
      background-color: #5aac44;
      box-shadow: none;
      border: none;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      font-weight: 600;
      line-height: 20px;
      margin-right: 15px;
      padding: 12px 15px;
      text-align: center;
      border-radius: 3px;
      &:hover {
        background-color: #61bd4f;
      }
    }
    &__options {
      position: absolute;
      right: 5px;
      cursor: pointer;
      height: 30px;
      width: 30px;
      padding: 6px;
      border-radius: 3px;
      &:hover {
        background-color: rgba(9, 30, 66, 0.08);
      }
      span {
        position: absolute;
        font-size: 16px;
      }
    }
    &__delete {
      line-height: 32px;
      width: 25px;
      height: 25px;
      position: relative;
      cursor: pointer;
      &:hover > span,
      &:hover > span:before {
        background: #000;
      }
      span {
        display: block;
        width: 100%;
        height: 3px;
        background: #6b778c;
        position: absolute;
        top: calc(50% - 1px);
        transform: rotateZ(45deg);
        &:before {
          content: "";
          display: block;
          width: 100%;
          height: 3px;
          background: #6b778c;
          position: absolute;
          transform: rotateZ(90deg);
        }
      }
    }
  }

  .task-empty {
    text-align: center;
  }
  .task-control {
    &--btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 30px;
      width: 30px;
      border-radius: 3px;
      &:hover {
        background-color: rgba(9, 30, 66, 0.08);
      }
    }
    &__prev-btn {
      margin-right: 5px;
    }
  }
}
.error {
  border: 1px solid red;
}
.disable {
  pointer-events: none;
}
</style>
