const listen = () => {
  const makeSquare = (value) => {
    const newDiv = document.createElement('div')
    newDiv.style.width = value + 'px'
    newDiv.style.height = value + 'px'
    return newDiv
  }

  const getDeepest = node => node.children[0] ? getDeepest(node.children[0]) : node

  const reversedFibonacciGenerator = function* (start, rate = 1.61803398875) {
    while (start / rate >= 5) {
      yield start /= rate
    }
  }

  const board = document.getElementById('board')
  const fibonacciGenerator = reversedFibonacciGenerator(parseInt(board.style.width))
  document.getElementById('next').onclick = element => {
    const next = fibonacciGenerator.next()
    if (!next.done) {
      const newDiv = makeSquare(next.value)
      getDeepest(board).append(newDiv)
    } else {
      element.target.disabled = true
    }
  }
}
window.onload = listen