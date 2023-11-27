


// Plan Notifier 
const closePlanNotifier = () => {
  const planNotifier =  getElement('.plan-notifier')
    
  planNotifier.classList.add('fade-off')
  setTimeout(
    () => planNotifier.style.display = "none",
    300
  )
}


// Setup Guide 
const toggleSetupSteps = () => {
  const setupSteps = getElement('.setup')
  const chevronUp = getElement('.chevron-up')
  const chevronDown = getElement('.chevron-down')

  setupSteps.classList.toggle('open')
  chevronUp.classList.toggle('hide')
  chevronDown.classList.toggle('hide')
}


// Accordion 
const toggleAccordion = e => {
  const openedAccordion = getElement('.setup-step.open')
  const selectedAccordion = e.target.closest('.setup-step')


  if (selectedAccordion.classList.contains("open")) {
    // Toggle selected accordion
    return e.target.closest('.setup-step.open').classList.toggle('open')
  }

  // Close opened accordion
  if (openedAccordion) openedAccordion.classList.remove('open')

  // Open selected accordion
  selectedAccordion.classList.add('open')
}






// Helpers
var getElement = (selector) => document.querySelector(selector)


