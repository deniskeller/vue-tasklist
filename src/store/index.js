import Vue from 'vue';
import Vuex from 'vuex';
import {
  db
} from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {

  },
  mutations: {

  },
  actions: {


    addTask(ctx, text) {
      const date = new Date();
      const task = {
        text,
        done: false,
        date
      }

      db.collection("taskList")
        .add(task)
        .then(function (docRef) {
          task.id = docRef.id;
          ctx.commit('addTask', task)
        })
    },

    deleteTask(ctx, id) {
      db.collection("taskList").doc(id).delete()
        .then(function () {
          ctx.commit('deleteTask', id)
        }).catch(function (error) {
          console.error("Error removing document: ", error);
        });
    },

    doneTask(ctx, task) {
      db.collection("taskList")
        .doc(task.id)
        .update({
          done: !task.done
        }).then(function () {
          ctx.commit('doneTask', task.done)
          this.task.done = !this.task.done;
        })
    }

  },
  modules: {}
})