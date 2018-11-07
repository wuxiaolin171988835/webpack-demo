<template>
  <section class="real-app">
    <input type="text" 
    class="add-input"
    autofocus="autofocus"
    placeholder="接下去要做什么？"
    @keyup.enter="addTodo">
    <item
     v-for="todo in filteredTodos" 
     :key="todo.id" 
     :todo="todo"
     @del="deleteTodo">
    </item>
    <tabs
     :filter="filter" 
     :todos="todos"
     @toggle="toggleFilter"
     ></tabs>
  </section>
</template>
<script>
import Item from "./item.vue";
import Tabs from "./tabs.vue";
let id = 0;
export default {
  data() {
    return {
      todos: [],
      filter: "all"
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === "all") {
        return this.todos;
      }
      const completed = this.filter === "completed";
      return this.todos.filter(todo => completed == todo.completed);
    }
  },
  components: {
    Item,
    Tabs
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      });
      e.target.value = "";
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(item => item.id === id), 1);
    },
    toggleFilter(state) {
      this.filter = state;
    }
  }
};
</script>
<style lang="less" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
  .add-input {
    position: relative;
    z-index: 1;
    width: 100%;
    font-size: 24px;
    line-height: 1.4em;
    outline: none;
    box-sizing: border-box;
    font-smoothing: antialiased;
    padding: 16px 16px 16px 60px;
    border: none;
    box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0);
  }
}
</style>


