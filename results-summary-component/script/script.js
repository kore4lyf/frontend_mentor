// Json file path
const path = './data.json'

// Fetch JSON 
// getSummaryItems return a JSON data 
// path is the address of the json file 


// async function getSummaryItems(path) {
//   const res = await fetch(path)
//   let data = await res.json()
//   console.log(data)
//   return data
// }

function createSummaryItems (path) {
  (function() {
    fetch(path)
      .then((res) => res.json())
        .then(data => createSummaryItems(data))
          .catch((err) => console.log(err))
  })()

  function createSummaryItems(summaryItems) {
    console.log(JSON.stringify(summaryItems))
    
    // Create document fragment 
    const docFrag = document.createDocumentFragment()
    
    const summaryItemsContainer = document.getElementById('summary-items-container') 
    let innerContainer = document.createElement('div')
    innerContainer.classList.add('grid-flow')
      
      
    summaryItems.forEach((item, index) => { 
      let itemBody = document.createElement('div') 
      itemBody.setAttribute("data-accent-type", ++index)
      itemBody.classList.add('summary-item')
      
      // Add summary item category/name
      let categoryParag = document.createElement('p')
      categoryParag.classList.add('summary-category')
      categoryParag.innerText = item.category
      // Add Icon
      let categoryIcon = document.createElement('img')
      categoryIcon.classList.add('icon')
      categoryIcon.src = item.icon
      categoryIcon.alt = `${item.category}'s symbol`
      
      // Add Icon to category paragraph
      categoryParag.prepend(categoryIcon);
      
      
      // Add score details
      let scoreParag = document.createElement('p')
      scoreParag.classList.add('summary-item-percentage')
      scoreParag.innerText = ' / 100'
      let scoreValue = document.createElement('span')
      scoreValue.classList.add('summary-item-score')
      scoreValue.innerText = item.score
      scoreParag.prepend(scoreValue)
      
      itemBody.append(categoryParag, scoreParag)
      innerContainer.append(itemBody)
      console.log(item)
    })
      docFrag.append(innerContainer)
      summaryItemsContainer.append(docFrag)
  } 
}

createSummaryItems(path)







// document.body.prepend(div)



