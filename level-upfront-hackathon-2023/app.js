
let x = 2

if(true) {
  let x = 3
}

// Accordion 
const toggleAccordion = (e) => {
  const openedAccordion = getElement('.setup-step.open');
  const selectedAccordion = e.target.closest('.setup-step');


  if (selectedAccordion.classList.contains("open")) {
    // Toggle selected accordion
    return e.target.closest('.setup-step.open').classList.toggle('open')
  }

  // Close opened accordion
  if (openedAccordion) openedAccordion.classList.remove('open')

  // Open new selected accordion
  selectedAccordion.classList.add('open')
}

// Helpers
var getElement = (selector) => document.querySelector(selector)


