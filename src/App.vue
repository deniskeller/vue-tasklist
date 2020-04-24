<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { db } from "./main";
export default {
  data() {
    return {
      // tasks: []
    };
  },
  firestore() {
    return {
      tasks: db.collection("taskList").orderBy("date")
    };
  }
};
</script>

<style lang="scss">
@import "scss/main.scss";
</style>
