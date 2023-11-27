
// Store Menu 
const toggleStoreMenu = (forceHide = false) => {
  const storeBtn = getElement('.store-btn')
  const storeMenu = getElement('.store-menu')
  const isStoreMenuDisplayed = storeMenu.style.display

  if(forceHide) { 
    storeBtn.classList.remove('active')
    storeMenu.classList.add('fade-off')

    // hide
    setTimeout(
      () => storeMenu.style.display = 'none',
      300
    )
  }
  else {
    storeBtn.classList.toggle('active')
    storeMenu.classList.toggle('fade-off')
    
    if(isStoreMenuDisplayed === 'none' 
      || isStoreMenuDisplayed === '') {
      // display
      setTimeout(
        () => storeMenu.style.display = 'block',
        300
      )
    }
    else {
      // hide
      setTimeout(
        () => storeMenu.style.display = 'none',
        300
      )
    }
  }

}




// Notification / Alerts 
const toggleAlerts = (forceHide = false) => {
  const alerts = getElement('.alerts')
  const notification = getElement('.notification')
  const isAlertsDisplayed = alerts.style.display 

  if(forceHide) { 
    notification.classList.remove('active')
    alerts.classList.add('fade-off')

    // hide
    setTimeout(
      () => alerts.style.display = 'none',
      300
    )
  }
  else {
    notification.classList.toggle('active')
    alerts.classList.toggle('fade-off')
    
    if(isAlertsDisplayed === 'none' 
      || isAlertsDisplayed === '') {
      // display
      setTimeout(
        () => alerts.style.display = 'block',
        300
      )
    }
    else {
      // hide
      setTimeout(
        () => alerts.style.display = 'none',
        300
      )
    }
  }
}


const hideAlerts = () => {
  const alerts = getElement('.alerts')
}



// Plan Notifier 
const closePlanNotifier = () => {
  const planNotifier =  getElement('.plan-notifier')

  planNotifier.classList.add('fade-off')
  setTimeout(
    () => planNotifier.style.display = 'none',
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


  // Toggle selected accordion
  if (selectedAccordion.classList.contains('open'))
    return e.target.closest('.setup-step.open').classList.toggle('open')
  

  // Close opened accordion
  if (openedAccordion) 
    openedAccordion.classList.remove('open')

  // Open selected accordion
  selectedAccordion.classList.add('open')
}






// Helpers
var getElement = (selector) => document.querySelector(selector)


