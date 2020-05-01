<template>
  <div class="task-list__item" :class="{'active': is_active}">
    <span :class="{'task-list__item--done': done}">{{ num }}) {{ newTitle }}</span>

    <div class="task-list__item__edit" @click="showMenu()">
      <svg
        class="edit"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>

    <div class="task-list__item__menu" id="menu" v-if="visible">
      <div class="task-list__item__menu-item" @click="doneTask(task)">{{ doneText }}</div>
      <div class="task-list__item__menu-item" @click="editTask(task)">Редактировать</div>
      <div class="task-list__item__menu-item" @click="deleteTask(task.id)">Удалить</div>
    </div>
  </div>
</template>

<script>
// import { db } from "../main";
export default {
  props: {
    task: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false
    };
  },

  methods: {
    showMenu() {
      this.visible = !this.visible;
      document.addEventListener("click", this.close);
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.visible = false;
        document.removeEventListener("click", this.close);
      }
    },

    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
      this.visible = false;
    },
    doneTask(task) {
      this.$store.dispatch("doneTask", task);
      this.task.done = !this.task.done;
      // this.visible = false;
    },
    editTask(task) {
      this.$router.push({ name: "TaskEdit", params: { key: task.key, task } });
      // this.$store.commit("editTask", this.task.id);
    }
  },
  computed: {
    num() {
      let num = this.task.key;
      return num;
    },
    newTitle() {
      let newTitle = this.task.text;
      if (this.task.text.length > 30) {
        return (newTitle = this.task.text.slice(0, 30) + "...");
      }
      return newTitle;
    },
    done() {
      let done = this.task.done;
      return done;
    },
    doneText() {
      if (this.done) {
        return "Не выполнено";
      }
      return "Выполнено";
    },
    is_active() {
      if (this.visible) {
        return true;
      }
      return false;
    }
  },
  watch: {}
};
</script>

<style scoped lang="scss">
.task-list__item {
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
    right: -20px;
    position: absolute;
    top: 55px;
    width: auto;
    z-index: 1000;
    transform: translateX(-20px);
    transition: opacity 85ms ease-in, transform 85ms ease-in;
    &-item {
      background: rgba(0, 0, 0, 0.6);
      border-radius: 3px;
      clear: both;
      color: #e6e6e6;
      display: block;
      width: auto;
      float: right;
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
.active {
  background-color: rgba(176, 203, 247, 0.2) !important;
  .task-list__item__edit {
    display: block;
    svg {
      fill: #000;
    }
  }
}
.task-list__item--done {
  text-decoration: line-through;
}
</style>
