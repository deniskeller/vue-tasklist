import Vue from "vue";
import Vuex from "vuex";
import {
  db
} from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
  },
  getters: {
    tasks(state) {
      return function (pageNumber) {
        let tasks = state.tasks.slice(0),
          index = 1,
          startIndex = pageNumber * 10,
          endIndex = startIndex + 10;

        tasks.forEach((task) => {
          task.key = index;
          index++;
        });

        tasks = tasks.slice(startIndex, endIndex);
        return tasks;
      };
    },

    editedTask(state) {
      return function (id) {
        let tasks = state.tasks;
        return Object.assign({}, tasks[id - 1]);
      };
    },
  },
  mutations: {
    getTasks(state, tasks) {
      state.tasks = tasks;
    },
    addTask(state, task) {
      state.tasks.push(task);
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => {
        if (task.id !== id) {
          return task;
        }
      });

    },

    doneTask(state) {
      state.done = !state.done;
    },

    editTask(state, newTodo) {
      state.tasks.forEach((task) => {
        if (task.id === newTodo.id) {
          task.text = newTodo.text;
        }
      });
    },
  },
  actions: {
    getTasks(ctx, tasks) {
      ctx.commit("getTasks", tasks);
    },

    addTask(ctx, text) {
      const id =
        Math.random()
        .toString(36)
        .substr(2, 9) + Date.now();

      const date = new Date();
      const task = {
        text,
        done: false,
        date,
        id,
      };
      db.collection("taskList")
        .doc(id)
        .set(task)
        .then(function () {
          ctx.commit("addTask", task);
        });
    },

    deleteTask(ctx, id) {
      db.collection("taskList")
        .doc(id)
        .delete()
        .then(function () {
          ctx.commit("deleteTask", id);
        });
    },

    doneTask(ctx, task) {
      db.collection("taskList")
        .doc(task.id)
        .update({
          done: !task.done,
        })
        .then(function () {
          ctx.commit("doneTask", task);
          this.task.done = !this.task.done;
        });
    },

    editTask(ctx, task) {
      db.collection("taskList")
        .doc(task.id)
        .update(task)
        .then(function () {
          ctx.commit("editTask", task);
        });
    },
  },
  modules: {},
});