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
  // firestore() {
  //   return {
  //     tasks: db.collection("taskList").orderBy("date")
  //   };
  // },
  created() {
    db.collection("taskList")
      .orderBy("date")
      .get()
      .then(querySnapshot => {
        const tasks = querySnapshot.docs.map(doc => {
          return { ...doc.data(), id: doc.id };
        });
        this.$store.dispatch("getTasks", tasks);
      });
    // console.log(this.$store.state.tasks);
  }
};
</script>

<style lang="scss">
@import "scss/main.scss";
</style>
