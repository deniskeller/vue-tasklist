import Vue from 'vue';
import Vuex from 'vuex';
import {
  db
} from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    sortedTask: false
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

        if (state.sortedTask === true) {
          tasks.reverse();
        }

        tasks = tasks.slice(startIndex, endIndex);
        return tasks;
      }
    },

    editedTodo(state) {
      return function (id) {
        let tasks = state.tasks;
        return Object.assign({}, tasks[id - 1]);
      };
    },


  },
  mutations: {
    getTasks(state, tasks) {
      state.tasks = tasks
    },
    addTask(state, task) {
      state.tasks = [...state.tasks, task]
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter((task) => {
        if (task.id !== id) {
          return task;
        }
      })
    },

    doneTask(state) {
      state.done = !state.done;
    },

    sortTask(state) {
      state.sortedTask = !state.sortedTask;
    },

    editTodo(state, newTodo) {
      state.tasks.forEach((task) => {
        if (task.id === newTodo.id) {
          task.text = newTodo.text;
        }
      });
    },

  },
  actions: {
    getTasks(ctx, tasks) {
      ctx.commit('getTasks', tasks)
    },

    addTask(ctx, text) {
      const date = new Date();
      const id = Math.random().toString(36).substr(2, 9) + Date.now();
      const task = {
        text,
        done: false,
        date,
        id
      }
      db.collection("taskList")
        .add(task)
        .then(function () {
          // task.id = this.id;
          ctx.commit('addTask', task)
        })
    },

    deleteTask(ctx, id) {
      db.collection("taskList").doc(id).delete()
        .then(function () {
          ctx.commit('deleteTask', id)
        })
    },

    doneTask(ctx, task) {
      db.collection("taskList")
        .doc(task.id)
        .update({
          done: !task.done,
        }).then(function () {
          ctx.commit('doneTask', task)
          this.task.done = !this.task.done;
        })
    },

    editTodo(ctx, task) {
      const id = task.id;
      delete task.id;
      db.collection("taskList")
        .doc(id)
        .update(task)
        .then(function () {
          task.id = id;
          ctx.commit("editTodo", task);
        });
    },

    sortTask(ctx) {
      ctx.commit("sortTask");
    },

  },
  modules: {}
})