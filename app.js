const codeCardTemplate = document.querySelector("[data-code-template")
const codeCardContainer = document.querySelector("[data-code-template")

const searchInput = document.querySelector("[data-search]")

searchInput.addEventListener("input", e =>{
    const value = e.target.value
    console.log(value)
})

fetch('codes.json')
    .then(res => res.json())
    .then(data => {
        codes = data.map( code => {
            const card = codeCardTemplate.content.cloneNode(true).children[0]
            const codename = card.querySelector("[data-code-name]")
            const description = card.querySelector("[data-description]")
            codename.textContent = code.code
            description.textContent = code.description
            codeCardContainer.append(card)
        })
    })
