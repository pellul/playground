class Pathfinder {
  constructor(grid) {
    this.grid = grid
    this.options = {
      debug: false,
      drawPath: true,
      smartPath: true
    }
    this.clear()
    this.from([Math.floor(this.grid.unit / 4), Math.floor(this.grid.unit / 4)])
    this.to([Math.floor(this.grid.unit * 3 / 4), Math.floor(this.grid.unit * 3 / 4)])
  }

  clear() {
    this.path = []
    this.border = []
    this.visited = {}
  }


  from(position) {
    const from = new PathPoint(position)
    this.fromPoint = from
    this.clear()
    this.addBorder(from)
    if (this.options.drawPath) {
      const tile = this.grid.getTile(...position)
      this.addState(tile, 'from')
      this.grid.drawTile(tile)
    }
    return this
  }

  to(position) {
    this.destinationPoint = new PathPoint(position)
    if (this.options.drawPath) {
      const tile = this.grid.getTile(...position)
      this.addState(tile, 'to')
      this.grid.drawTile(tile)
    }
    return this
  }

  setDebug(debug = false) {
    this.options.debug = debug
    return this
  }

  addVisited(pathPoint) {
    this.visited[pathPoint.id] = pathPoint
  }

  addBorder(pathPoint) {
    this.addVisited(pathPoint)
    this.border.push(pathPoint.id)
    return this.border
  }

  isVisited({x, y}) {
    return Object.getOwnPropertySymbols(this.visited)
      .some(id => {
        const [visitedX, visitedY] = this.visited[id].value
        return x === visitedX && y === visitedY
      })
  }

  isDestination([x, y]) {
    const [startX, startY] = this.destinationPoint.value
    return startX === x && startY === y
  }

  addState(tile, state) {
    tile = this.removeState(tile, state)
    tile.states.push(state)
    return tile
  }

  removeState(tile, state) {
    tile.states = tile.states ? tile.states.filter(s => s !== state) : []
    return tile
  }

  pathTo(pathPoint) {
    const path = []
    let currentPoint = pathPoint
    while (currentPoint.from !== null) {
      path.unshift(currentPoint.value)
      currentPoint = this.visited[currentPoint.from]
    }
    path.unshift(currentPoint.value)
    this.grid.drawLine(path)
    this.path = path
    return path
  }

  draw() {
    Object.getOwnPropertySymbols(this.visited).forEach(id => {
      const current = this.visited[id]
      let tile = this.grid.getTile(...current.value)
      let states = tile.states || []
      tile = this.border.includes(id)
        ? this.addState(tile, 'border')
        : this.removeState(tile, 'border')
      if (tile.states.length !== states.length) {
        this.grid.drawTile(tile)
      }
    })
    return this
  }

  * run() {
    while (this.border.length) {
      const current = this.visited[this.border.shift()]
      if (this.isDestination(current.value)) {
        return this.pathTo(current)
      }

      let neighbors = this.grid.getNeighbors(current.value)
      if (this.options.smartPath) {
        if (current.from) {
          // Sort the neighbors so that it explores "sides" first
          const previous = this.visited[current.from].value
          let xChanged = previous[0] !== current.value[0]
          neighbors.sort((a, b) => xChanged ? a.x - b.x : a.y - b.y)
          neighbors.push(neighbors.shift())
        }
      }

      for (const border of neighbors) {
        if (!this.isVisited(border)) {
          const point = new PathPoint([border.x, border.y])
          point.setFrom(current.id)
          this.addBorder(point)
          if (this.options.debug) {
            this.draw()
            yield
          }
        }
      }
      yield current
    }
    return false
  }
}

// TODO: not exportable
class PathPoint {
  constructor(position) {
    this.id = Symbol()
    this.value = position
    this.from = null
  }

  setFrom(pathPointId) {
    this.from = pathPointId
    return this
  }
}