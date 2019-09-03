class Grid {
  constructor(container, width = 100, height = 100, unit = 10) {
    if (width % unit | height % unit) {
      throw 'Width and height must be divisable by the unit'
    }
    this.container = container
    this.figure = undefined
    this.width = width
    this.height = height
    this.unit = unit
    this.map = []
    this.tileTypes = [
      [TileType.fromName('ground'), 50],
      [TileType.fromName('forest'), 40],
      [TileType.fromName('mountain'), 8],
      [TileType.fromName('river'), 2],
    ]
    this.tileShape = new Square(
      Math.min(this.width, this.height) / this.unit,
      { stroke: '#000', fill: '#fff', style: 'stroke-opacity: 0.2' }
    )

    this.callback = this.rollTileType
  }

  getTile(x, y) {
    return this.map[(x % this.unit) + (y * this.unit)]
  }

  getNeighbors([x, y], withDiagonal = false) {
    const neighbors = []
    if (x < this.unit - 1) { neighbors.push(this.getTile(x + 1, y)) }
    if (y < this.unit - 1)  { neighbors.push(this.getTile(x, y + 1)) }
    if (x > 0) { neighbors.push(this.getTile(x - 1, y)) }
    if (y > 0) { neighbors.push(this.getTile(x, y - 1)) }
    return neighbors
  }

  getRandomTileType() {
    const makeSum = array => array.reduce((a, [k, v]) => a + v, 0)
    const random = Math.ceil(Math.random() * makeSum(this.tileTypes))
    return this.tileTypes
      .map(([k, v], i, array) => [k, v + makeSum(array.slice(0, i))])
      .find(([k, v]) => random <= v)[0]
  }

  setTileTypes(types) {
    this.tileTypes = types.map(([type, probability]) => [TileType.fromName(type), probability])
    return this
  }

  setMap(map) {
    this.erase()
    this.map = []
    map.forEach(tile => this.map.push(Tile.fromArray(tile)))
    return this
  }

  mount() {
    this.map = []
    for (let y = 0; y < this.unit; y++) {
      for (let x = 0; x < this.unit ; x++) {
        this.map.push(new Tile(x, y, this.getRandomTileType()))
      }
    }
    return this
  }

  drawTile(tile) {
    const element = this.tileShape
      .setPosition(tile.x, tile.y)
      .setClass(tile.type.name)
      .addClass(tile.states)
      .generate()
    tile.bind(element)
    tile.element.onclick = () => this.callback(tile)
    return element
  }

  drawLine(positions) {
    if (this.figure) {
      const unit = Math.min(this.width, this.height) / this.unit
      const line = new Line({ stroke: '#000', fill: 'none'})
        .setScale(unit)
        .setPoints(positions)
        .generate()
      this.figure.appendChild(line)
    }
  }

  draw() {
    this.erase()
    const figure = new SVG(`0 0 ${this.width} ${this.height}`).generate()
    if (this.map.length || this.mount()) {
      this.map.forEach(tile => figure.appendChild(this.drawTile(tile)))
    }
    this.container.appendChild(figure)
    this.figure = figure
    return this
  }

  rollTileType(tile) {
    const types = this.tileTypes.map(type => type[0])
    const nextType = () => {
      const index = types.findIndex(type => tile.type.name === type.name)
      return types[(index + 1) % types.length]
    }
    tile.type = nextType()
    this.drawTile(tile)
  }

  erase() {
    this.container.childNodes.forEach(child => this.container.removeChild(child))
  }

  toArray() {
    return this.map.map(tile => tile.toArray())
  }
}