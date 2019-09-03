const listen = () => {
  const regexInput = document.getElementById('regex')
  const textContainer = document.getElementById('text')
  const flagsInput = document.getElementById('flags')
  const clone = (node) => {
    const output = document.getElementById('output')
    if (!output) {
      const newNode = node.cloneNode(true)
      newNode.id = 'output'
      node.after(newNode)
      return newNode
    }
    return output
  }
  const outputContainer = clone(textContainer)
  textContainer.style.display = 'none'

  const applyRegex = () => {
    flagsInput.value = [...new Set(flagsInput.value.replace(/[^gimsuy]+/, ''))].join('')
    const regex = new RegExp(regexInput.value, flagsInput.value)
    const text = '' + textContainer.innerText
    outputContainer.innerHTML = text.replace(
      regex,
      (match) => '<span class=\'valid\'>' + match + '</span>'
    );
  }
  applyRegex()
  regexInput.oninput = flagsInput.oninput = applyRegex
}
window.onload = listen
