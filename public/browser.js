function itemTemplate(item){ 
  return `<li class="list-group-item list-group-item-action d-flex align-items-center justify-content-between">
    <span class="item-text">${item.text}</span>
    <div>
      <button data-id="${item._id}" class="edit-me btn btn-secondary btn-sm mr-1">Edit</button>
      <button data-id="${item._id}" class="delete-me btn btn-danger btn-sm">Delete</button>
    </div>
  </li>`
}

// Initial Page Load Render
let listItemsHTML = items.map((item) =>{
  return itemTemplate(item)
}).join('')
document.querySelector('#item-list').insertAdjacentHTML("beforeend", listItemsHTML)


// Create feature
const createField = document.querySelector('#create-field')
document.querySelector('#create-form').addEventListener("submit", (e)=> {
  e.preventDefault()
  axios
      .post('/create-item', {text: createField.value})
      .then((response)=> {
        // Create new item
        document.querySelector('#item-list').insertAdjacentHTML("beforeend", itemTemplate(response.data))
        createField.value = ''
        createField.focus()
      })
      .catch(()=>{
        console.log("error")
      })
})

document.addEventListener('click', (e) => {
  // Delete feature 
  if (e.target.classList.contains('delete-me')) {
    if(confirm("Do you really want to delete this item?")) {
      axios
      .post('/delete-item', {id: e.target.getAttribute('data-id')})
      .then(()=> {
        e.target.parentElement.parentElement.remove()
      })
      .catch(()=>{
        console.log("error")
      })
    }
  }
  // Update/Edit feature
  if (e.target.classList.contains('edit-me')) {
    let userInput = prompt("Enter new text: ", e.target.parentElement.parentElement.querySelector('.item-text').innerHTML)
    if (userInput) {
      axios
      .post('/update-item', {text: userInput, id: e.target.getAttribute('data-id')})
      .then(()=> {
        e.target.parentElement.parentElement.querySelector('.item-text').innerHTML = userInput
      })
      .catch(()=>{
        console.log("error")
      })
    }
  }
})