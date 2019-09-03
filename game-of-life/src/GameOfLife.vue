<template>
  <div>
    <div>
      Board size: {{ size }} * {{ size }}
      <button @click="decrease">-1</button>
      <button @click="increase">+1</button>
    </div>
    <board
      class="col-xs-9 board"
      :width="size"
      :height="size"
      :alives="alives"
      @cell-click="updateCell"
    />
    <div>
      <button @click="start">Toggle life</button>
      <button @click="stop">Stop life.</button>
      <button @click="next">Step forward</button>
      <button @click="clear">Clear board</button>
    </div>
    <div>
      <label for="lifeCycleDuration">Life cycle duration</label>
      <input
        v-model="clock.speed"
        type="range"
        id="lifeCycleDuration"
        min="100"
        max="5000"
        step="100"
      />
      {{ clock.speed / 1000 + 'sec' }}
    </div>
    <div>
      Cycle #{{ lifeCycle }}
    </div>
  </div>
</template>

<script>
import Board from './components/Board'

export default {
  name: 'GameOfLife',
  components: { 'board': Board },
  data () {
    return {
      alives: [],
      size: 15,
      clock: {
        interval: null,
        speed: 700
      },
      lifeCycle: 0
    }
  },
  created: function () {
    this.updateGrid()
  },
  methods: {
    place: function (row, column) {
      if (!this.isAlive(row, column)) {
        this.alives[row].push(column)
      }
    },
    clear: function () {
      this.stop()
      this.updateGrid(true)
    },
    increase: function () {
      this.size++
      this.updateGrid()
    },
    decrease: function () {
      if (this.size > 1) {
        this.size--
        this.updateGrid()
      }
    },
    isAlive: function (row, column) {
      return !!this.alives[row] && this.alives[row].indexOf(column) >= 0
    },
    willBeAlive: function (row, column) {
      const count = this.getAliveNeighboursCount(row, column)
      if (this.isAlive(row, column)) {
        return (count === 2 || count === 3)
      } else {
        return count === 3
      }
    },
    getAliveNeighboursCount: function (row, column) {
      let count = 0
      for (let x = row - 1; x <= row + 1; x++) {
        for (let y = column - 1; y <= column + 1; y++) {
          if (this.isAlive(x, y)) {
            count++
          }
        }
      }
      if (this.isAlive(row, column)) {
        count--
      }
      return count
    },
    updateGrid: function (erase = false) {
      const tmp = []
      const size = this.size
      for (let i = 0; i < size; i++) {
        if (!erase && i < this.alives.length) {
          tmp[i] = this.alives[i].filter(value => value < size)
        } else {
          tmp[i] = []
        }
      }
      this.alives = tmp
    },
    updateCell: function (row, column) {
      const index = this.alives[row].indexOf(column)
      if (index >= 0) {
        this.alives[row].splice(index, 1)
      } else {
        this.alives[row].push(column)
      }
    },
    next: function () {
      const nextGeneration = []
      for (let x = 0; x < this.size; x++) {
        nextGeneration[x] = []
        for (let y = 0; y < this.size; y++) {
          if (this.willBeAlive(x, y)) {
            nextGeneration[x].push(y)
          }
        }
      }

      if (this.arraysEqual(this.alives, nextGeneration)) {
        this.stop(false)
      } else {
        this.alives = nextGeneration
        this.lifeCycle++
      }
    },
    start: function () {
      this.stop()
      this.clock.interval = setInterval(this.next, this.clock.speed)
    },
    stop: function (resetCount = true) {
      clearInterval(this.clock.interval)
      if (resetCount) {
        this.lifeCycle = 0
      }
    },
    arraysEqual: function (a, b) {
      if (a === b) {
        return true
      }
      if ((a === null || b === null) || (a.length !== b.length)) {
        return false
      }

      for (let i = 0; i < a.length; ++i) {
        if (a[i] instanceof Array && b[i] instanceof Array) {
          if (!this.arraysEqual(a[i], b[i])) {
            return false
          }
        } else if (a[i] !== b[i]) {
          return false
        }
      }
      return true
    }
  }
}
</script>
