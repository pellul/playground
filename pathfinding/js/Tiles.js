class Drawable {
  bind(element) {
    if (this.element) {
      this.element.parentNode.replaceChild(element, this.element)
    }
    this.element = element
  }
}

// TILES

class Tile extends Drawable {
  constructor(x, y, type) {
    super()
    this.x = x
    this.y = y
    this.type = type
  }

  toArray() {
    return [this.x, this.y, this.type.toArray()]
  }

  static fromArray([x, y, type]) {
    return new Tile(x, y, TileType.fromArray(type))
  }
}

class TileType {
  constructor(name, cost, crossable = true) {
    this.name = name
    this.cost = cost
    this.crossable = crossable
  }

  toArray() {
    return [this.name, this.cost, this.crossable]
  }

  static fromArray(array) {
    return new TileType(...array)
  }

  static fromName(name) {
    switch (name) {
      case 'ground':
        return new GroundTileType()
      case 'forest':
        return new ForestTileType()
      case 'mountain':
        return new MountainTileType()
      case 'river':
        return new RiverTileType()
      default:
        return new GroundTileType()
    }
  }
}

class GroundTileType extends TileType {
  constructor() { super('ground', 1) }
}

class ForestTileType extends TileType {
  constructor() { super('forest', 2) }
}

class MountainTileType extends TileType {
  constructor() { super('mountain', 3) }
}

class RiverTileType extends TileType {
  constructor() { super('river', 1, false) }
}