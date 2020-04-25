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
        <div class="task-form__options">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </div>
      </div>
    </div>

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

    <div class="task-control" v-if="tasks.length > 1">
      <button class="task-control__prev-btn task-control--btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
      <button class="task-control__next-btn task-control--btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { db } from "../main";

import TaskItem from "../components/TaskItem";
export default {
  components: { TaskItem },
  data() {
    return {
      tasks: [],
      text: "",
      done: false,
      date: "",
      error: false
    };
  },
  firestore() {
    return {
      tasks: db.collection("taskList").orderBy("date")
    };
  },
  methods: {
    addTask() {
      if (this.text !== "") {
        this.$store.dispatch("addTask", this.text);
        this.text = "";
      } else {
        this.error = true;
      }
    },

    clearTitle() {
      this.text = "";
    }
  },
  mounted() {
    // console.log(db);
  },
  watch: {
    text() {
      if (this.text !== "") {
        this.error = true;
      }
      this.error = false;
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
  .task-list {
    &__item {
      background-color: #fff;
      border-radius: 3px;
      box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      width: 100%;
      min-height: 50px;
      padding: 3px 45px 3px 15px;
      position: relative;
      text-decoration: none;
      z-index: 0;
      &:hover {
        background-color: rgba(176, 203, 247, 0.2);
        .task-list__item__edit {
          display: block;
          svg:hover {
            fill: #000;
          }
        }
      }
      &__edit {
        display: none;
        position: absolute;
        right: 15px;
        width: 20px;
        height: 20px;
        cursor: pointer;
        svg {
          fill: #ccc;
        }
      }

      &__menu {
        left: 110%;
        position: absolute;
        top: 0;
        width: 240px;
        z-index: 0;
        transform: translateX(-20px);
        transition: opacity 85ms ease-in, transform 85ms ease-in;
        &-item {
          background: rgba(0, 0, 0, 0.6);
          border-radius: 3px;
          clear: both;
          color: #e6e6e6;
          display: block;
          float: left;
          margin-bottom: 4px;
          padding: 6px 12px 6px 8px;
          text-decoration: none;
          transition: transform 85ms ease-in;
          &:hover {
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            transform: translateX(5px);
            cursor: pointer;
          }
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
</style>
