class SVGElement {
  constructor(tag, attributes = {}) {
    this.svgNamespace = 'http://www.w3.org/2000/svg'
    this.tag = tag
    this.attributes = attributes
  }

  setAttributes(attributes) {
    this.attributes = attributes
    return this
  }

  setClass(className) {
    this.attributes.class = [className]
    return this
  }

  addClass(className) {
    if (className) {
      this.attributes.class = [...this.attributes.class, ...className].join(' ')
    }
    return this
  }

  generate() {
    const element = document.createElementNS(this.svgNamespace, this.tag)
    if (Object.keys(this.attributes).length) {
      Object.entries(this.attributes)
        .forEach(([key, value]) => element.setAttribute(key, value))
    }
    return element
  }
}

class SVG extends SVGElement {
  constructor(viewBox) {
    super('svg', { viewBox })
  }
}

class Line extends SVGElement {
  constructor(attributes = {}) {
    super('path', attributes)
    this.scale = 1
  }

  setScale(scale) {
    this.scale = scale
    this.attributes['stroke-width'] = (this.attributes['stroke-width'] || 1) * this.scale / 4
    return this
  }

  setPoints([origin, ...positions]) {
    const offset = (x) => x * this.scale + this.scale / 2
    this.attributes['d'] = 'M' + origin.map(offset).join(',')
    this.attributes['d'] += positions
      .reduce((acc, [x, y]) => acc + ' ' + offset(x) + ',' + offset(y), ' L')
    return this
  }
}

class SVGPolygonalElement extends SVGElement {
  constructor(tag, width, height, attributes = {}) {
    super(tag, attributes)
    this.width = width
    this.height = height
    this.attributes.width = width
    this.attributes.height = width
  }

  setPosition(x, y) {
    this.attributes.x = x * this.width
    this.attributes.y = y * this.height
    return this
  }
}

class Square extends SVGPolygonalElement {
  constructor(width, attributes = {}) {
    super('rect', width, width, attributes)
  }
}
