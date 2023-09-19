
// Store 
let state = {
 activeRating: null,
 rating: null
}


/*
 * setState: Adds data to state 
 * obj: represents an element that is merged with state
*/
const setState = obj => state = Object.assign(state, obj)




/*
 * getElem: return an element in the dom
 * @selector: a css selector or a name that can be used to identify an element in the DOM
*/
const getElem = selector =>  document.querySelector(selector)



/*
 * setRating: Stores and visually update new rating
 * @e: A javeScript event object
*/
const setRating = e => {
  const prevActiveRating = state.activeRating
  const newRating = e.target
  const rating = newRating.innerText
  
  console.log(newRating)
  if (state.activeRating) {
    removeActiveState(state.activeRating)
    addActiveState(newRating)
    setState({activeRating: newRating})
    setState({rating: rating})
  } else {
    addActiveState(newRating)
    setState({activeRating: newRating})
    setState({rating: rating})
  }
}



/*
 * removeActiveState: Visually update active rating by 
 * removing the classes that are used to identify an 
 * active rating
 * @e: A javeScript event object
*/
const removeActiveState = elem => {
  elem.classList.remove("bg-medgray")
  elem.classList.remove("text-white")
} 


/*
 * addActiveState: Visually update active rating by 
 * adding the classes that are used to identify an 
 * active rating
 * @e: A javeScript event object
*/
const addActiveState = elem => {
  elem.classList.add("bg-medgray")
  elem.classList.add("text-white")
}



const submit = () => {
  const rating = state.rating

  if(rating) {
    getElem("#rating").classList.add("hidden")
    getElem("#thank-you").classList.remove("hidden")
  }
}
