<template>
  <div class="todo-page">
    <h2 class="todo-title">{{ newTodoTitle }}</h2>
    <div v-show="errorMessage" class="error-message">Поле не может быть пустым</div>
    <textarea v-model="newTodoTitle" class="task_input" rows="5" placeholder="Введите задачу"></textarea>
    <div class="buttons">
      <button @click="editTodo" class="button" :disabled="false">Изменить</button>
      <router-link to="/" class="button">Назад</router-link>
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
    todo() {
      return this.$store.getters.editedTodo(this.todoId);
    }
  },
  methods: {
    editTodo() {
      if (this.newTodoTitle.trim()) {
        this.todo.title = this.newTodoTitle.trim();
        this.$store.dispatch("editTodo", this.todo);
        this.$router.go(-1);
      } else {
        this.errorMessage = true;
      }
    }
  },
  mounted() {
    this.newTodoTitle = this.todo.title;
  },
  watch: {
    todo() {
      this.newTodoTitle = this.todo.title;
    }
  }
};
</script>

<style scoped>
.todo-page {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.todo-title {
  color: #35495e;
}

.buttons {
  width: 100%;
}

.task_input {
  margin: 25px 0 15px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  resize: none;
  box-sizing: border-box;
  border: 3px solid #41b883;
  font-size: 20px;
  color: #35495e;
}

.task_input::placeholder {
  font-size: 20px;
}

.task_input:focus {
  outline: none;
}

.button:disabled:hover {
  background-color: #ccc;
  box-shadow: none;
  color: #fff;
}

.error-message {
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #eb6059;
  color: #fff;
  padding: 10px;
}
</style>