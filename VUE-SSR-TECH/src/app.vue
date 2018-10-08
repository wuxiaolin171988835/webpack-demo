<template>
  <div>
    <span id="test">
      {{text}}
    </span>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        text: 'abc'
      }
    }
  }
</script>

<style>
#test{
  color: red;
}
</style>

