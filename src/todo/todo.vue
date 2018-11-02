<template>
  <section class="real-app">
    <input type="text" 
    class="add-input"
    autofocus="autofocus"
    placeholder="接下去要做什么？"
    @keyup.enter="addTodo">
  </section>
</template>
<script>
export default {
  methods: {
    addTodo() {}
  }
};
</script>
<style lang="less" scoped>
</style>


