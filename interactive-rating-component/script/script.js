
// Store 
let state = {
 activeRating: "",
 rating: ""
}

/*
 * setState: Re
 * @selector: a css selector or a name that can be used to identify an element in the DOM
*/
const setState = obj => state = Object.assign(state, obj)



// Helpers 

/*
 * getElem: return an element in the dom
 * @selector: a css selector or a name that can be used to identify an element in the DOM
*/
const getElem = selector =>  document.querySelector(selector)



const setRating = (e) => {
  const prevActiveRating = state.activeRating
  const newRating = e.target
  const empty = null || undefined || ""
  
  console.log(newRating)
  if (state.activeRating 
	&& state.activeRating != empty ) {
    removeActiveState(state.activeRating)
    addActiveState(newRating)
    setState({activeRating: newRating})
  } else {
    addActiveState(newRating)
    setState({activeRating: newRating})
  }
}



const removeActiveState = (elem) => {
  elem.classList.remove("bg-medgray")
  elem.classList.remove("text-white")
} 

const addActiveState = (elem) => {
  elem.classList.add("bg-medgray")
  elem.classList.add("text-white")
}


