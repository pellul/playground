import Vue from 'vue'
import GameOfLife from './GameOfLife'

new Vue({
  el: '#app',
  components: { 'game-of-life': GameOfLife },
  template: '<game-of-life/>'
})
