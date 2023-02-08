const codeCardTemplate = document.querySelector("[data-code-template]")
const codeCardContainer = document.querySelector("[data-code-cards-container]")
var tbodyRef = document.getElementById('code_table').getElementsByTagName('tbody')[0];
const searchInput = document.querySelector("[data-search]")

let codes = []

searchInput.addEventListener("input", e => {
  const codelength = codes.length;
  var invisiblecount = 0;
  const value = e.target.value.toLowerCase()
  codes.forEach(code => {
    const isVisible = code.Code.toLowerCase().includes(value)
    code.element.classList.toggle("hide", !isVisible)
    if (!isVisible) {
      invisiblecount++;
    }
  })

  if (invisiblecount == codelength){
    document.getElementById("error_message").style.display = "block";
  } else {
    document.getElementById("error_message").style.display = "none";
  }
})

fetch("https://izaactay.github.io/codes.json")
  .then(res => res.json())
  .then(data => {
    codes = data.map(code => {
      const card = codeCardTemplate.content.cloneNode(true).children[0]
      //const header = card.querySelector("[data-header]")
      //const body = card.querySelector("[data-body]")
      //header.textContent = code.Code
      //body.textContent = code.Description

      //codeCardContainer.append(card)
      var newRow = tbodyRef.insertRow();
      var codeCell = newRow.insertCell();
      var descriptionCell = newRow.insertCell();
      var notesCell = newRow.insertCell();
      codeCell.appendChild(document.createTextNode(code.Code));
      descriptionCell.appendChild(document.createTextNode(code.Description));
      notesCell.appendChild(document.createTextNode(code.Notes));

      return { Code: code.Code, Description: code.Description, Notes: code.Notes, element: newRow }
      
    })
  })