<template>
  <div class="task-edit">
    <div class="task-edit__text-overflow" :class="{'error': errorMessage}">
      <textarea
        v-model.trim="newTodoTitle"
        class="task-edit__text"
        placeholder="Enter a title for this card..."
      ></textarea>
    </div>

    <div class="task-edit__buttons">
      <button @click="editTodo" class="btn-save">Save</button>
      <router-link to="/" class="btn-back">Back</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoId: this.$route.params.key,
      errorMessage: false,
      buttonDisabled: false,
      newTodoTitle: ""
    };
  },
  computed: {
    task() {
      return this.$store.getters.editedTodo(this.todoId);
    }
  },
  methods: {
    editTodo() {
      if (this.newTodoTitle) {
        this.task.text = this.newTodoTitle;
        this.$store.dispatch("editTodo", this.task);
        this.$router.go(-1);
      } else {
        this.errorMessage = true;
      }
    }
  },
  mounted() {
    this.newTodoTitle = this.task.text;
  },
  watch: {
    task() {
      this.newTodoTitle = this.task.text;
    }
  }
};
</script>

<style lang="scss" scoped>
.task-edit {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background: #ebecf0;
  border-radius: 5px;
  margin-top: 50px;
  padding: 30px 13px 10px;
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
  .error {
    border: 1px solid red;
  }
  &__buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn-save {
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
    .btn-back {
      font-size: 20px;
      line-height: 24px;
      font-weight: 600;
      padding-left: 10px;
    }
  }
}
</style>