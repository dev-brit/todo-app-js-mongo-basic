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