<template>
  <div class="col-xs-9 board">
    <div v-for="(j, row) in height" :key="j">
      <cell
        v-for="(k, column) in width"
        :key="k"
        :state="alives[row].indexOf(column) >= 0"
        @click.native="$emit('cell-click', row, column)"
      />
    </div>
  </div>
</template>

<script>
import Cell from './Cell'

export default {
  name: 'board',
  props: ['height', 'width', 'alives'],
  components: { 'cell': Cell }
}
</script>
