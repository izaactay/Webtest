const codeCardTemplate = document.querySelector("[data-code-template]")
const codeCardContainer = document.querySelector("[data-code-cards-container]")
const searchInput = document.querySelector("[data-search]")

let codes = []

searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  codes.forEach(code => {
    const isVisible = code.Code.toLowerCase().includes(value)
    code.element.classList.toggle("hide", !isVisible)
  })
})

fetch("https://izaactay.github.io/codes.json")
  .then(res => res.json())
  .then(data => {
    codes = data.map(code => {
      const card = codeCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      header.textContent = code.Code
      body.textContent = code.Description
      codeCardContainer.append(card)
      return { Code: code.Code, Description: code.Description, element: card }
      
    })
  })
