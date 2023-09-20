
// Store 
let state = {
 activeRating: null,
 ratingValue: null,
 notified: false
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
  const ratingValue = newRating.innerText
  
  if (state.activeRating) {
    removeActiveState(state.activeRating)
    addActiveState(newRating)
    setState({activeRating: newRating})
    try {
      setState({ratingValue: parseInt(ratingValue)})
    } catch (err) {
      console.log(err.message)
    }
  } else {
    addActiveState(newRating)
    setState({activeRating: newRating})
    try {
      setState({ratingValue: parseInt(ratingValue)})
    } catch (err) {
      console.log(err.message)
    }
  }
}



const ratingValueValidity = () => {
  const ratingValue = state.ratingValue

  if(!ratingValue) {
    showNotify("Kindly, select a rating value from the buttons 1 to 5.")
    return false
  }

  if(isNaN(ratingValue)) {
    showNotify("Rating value must be a number")
    return false
  }

  if(ratingValue > 5 || ratingValue < 0) {
    showNotify("Rating value must be between the range of 1 to 5")
    return false
  }

  return true

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
  const ratingValueIsValid = ratingValueValidity()

  if(ratingValueIsValid) {
    getElem("#survey").classList.add("hidden")
    getElem("#thank-you").classList.remove("hidden")
    getElem("#rating").innerText = state.ratingValue
  }
}





const showNotify = (msg) => {
  getElem("#notify-msg").innerText = msg
  getElem("#notify").classList.remove("opacity-0")
  getElem("#notify").classList.add("opacity-100")
  getElem("#notify").classList.remove("-translate-y-36")
  getElem("#notify").classList.add("tanslate-y-2")

  // Hide notify after 3 secounds
  setTimeout(() => {
    hideNotify()
  }, 3000);
}


const hideNotify = () => {
  getElem("#notify").classList.remove("opacity-100")
  getElem("#notify").classList.remove("tanslate-y-2")
  getElem("#notify").classList.add("opacity-0")

  setTimeout(() => {
    getElem("#notify").classList.add("-translate-y-36")
  }, 100);
}

