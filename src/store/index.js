import Vue from 'vue';
import Vuex from 'vuex';
import {
  db
} from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    taskList: []
  },
  getters: {

  },
  mutations: {
    
  },
  actions: {

    addTask(ctx, title) {
      const date = new Date();
      const task = {
        title,
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

  },
  modules: {}
})