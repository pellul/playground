<template>
  <div class="cell" :class="{'alive' : state}"></div>
</template>

<script>
export default {
  name: 'cell',
  props: ['state']
}
</script>

<style scoped>
  .cell {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    transition: background-color .1s;
  }
  .cell.alive {
    background-color: cornflowerblue;
  }
</style>
