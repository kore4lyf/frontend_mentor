let state = {
  isAlertsDisplayed : false,
  isStoreMenuDisplayed : false,
  timeoutId : null
}


// Step-checker 

// const stepChecker = getElement('#step-checker');
// const dashCircle = getElement('#dash-circle'); 
// const spinner = getElement('#spinner'); 
// const checkMark = getElement('#check-mark'); 

const check = (e) => {
  const hide = 'hide'
  const stepChecker = e.currentTarget
  const dashCircle = getChild(stepChecker)('#dash-circle'); 
  const spinner = getChild(stepChecker)('#spinner'); 
  const checkMark = getChild(stepChecker)('#check-mark'); 


  const activeVoice = getElement('.setup-step-status')
  const stepName = getChild(stepChecker.parentElement)('.accordion').textContent
  

  dashCircle.classList.add(hide)
  spinner.classList.remove(hide)
  
  setTimeout(
    () => {
      activeVoice.ariaLabel = 'Loading..., please wait.'
      spinner.classList.add(hide)
      checkMark.classList.remove(hide)
    }, 
    500
  )

  activeVoice.ariaLabel = `Successfully marked ${stepName} as complete`
  stepChecker.ariaLabel = `Mark ${stepName} as not complete`
}

const uncheck = (e) => {
  const hide = 'hide'
  const stepChecker = e.currentTarget
  const dashCircle = getChild(stepChecker)('#dash-circle'); 
  const spinner = getChild(stepChecker)('#spinner'); 
  const checkMark = getChild(stepChecker)('#check-mark'); 
  

  const activeVoice = getElement('.setup-step-status')
  const stepName = getChild(stepChecker.parentElement)('.accordion').textContent
  

  checkMark.classList.add(hide)
  spinner.classList.remove(hide)
  
  setTimeout(
    () => {
      activeVoice.ariaLabel = 'Loading..., please wait.'
      spinner.classList.add(hide)
      dashCircle.classList.remove(hide)
    }, 
    500
  )

  activeVoice.ariaLabel = `Successfully marked ${stepName} as not complete`
  stepChecker.ariaLabel = `Mark ${stepName} as complete`
}

const handleStepCheck = (e) =>  {
  const stepChecker = e.currentTarget
  const isChecked = stepChecker.classList.contains('checked')


  if(isChecked) {
    uncheck(e)
    stepChecker.classList.remove('checked')
  }
  else {
    check(e)
    stepChecker.classList.add('checked')
  }

  console.log(stepChecker.ariaLabel)
}





// Store Menu 
const toggleStoreMenu = (forceHide = false) => {
  const storeBtn = getElement('.store-btn')
  const storeMenu = getElement('.store-menu')

  // Prevent button from malfunctioning when double clicked
  clearTimeout(state.timeoutId)
  
  if(!state.isStoreMenuDisplayed) {
    let menuItems = getChildren(storeMenu)('[role="menuitem"]')
    storeMenu.ariaExpanded = "true"

    storeMenu.addEventListener('keyup', (e) => handleMenuEscapeKeypress(e, closeStoreMenu))
    
    
    if (menuItems.item(0)) {
      // focus on first menu item
      menuItems.item(0).focus()

      menuItems.forEach(
        (menuItem, menuItemIndex) =>  {
        menuItem.addEventListener('keyup', (e) => {
          handleMenuItemArrowKeyPress(e, menuItemIndex)
        })
      })
    }

    // display
    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      storeMenu.style.display = 'flex'
      state = { ...state, isStoreMenuDisplayed: true}
      },
      300)
    }
      
    // Toggle elements state
    storeBtn.classList.add('active')
    storeMenu.classList.remove('fade-off')
  }
  else {
    storeMenu.ariaExpanded = "false"

    // hide
    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      storeMenu.style.display = 'none'
      state = { ...state, isStoreMenuDisplayed: false}
      },
      300)
    }
    // Toggle elements state
    storeBtn.classList.remove('active')
    storeMenu.classList.add('fade-off')
  }


  //Close active alerts 
  if(state.isAlertsDisplayed) {
    closeAlerts()
    state = { ...state, isAlertsDisplayed: false}
  }
  
}




// Notification / Alerts 
const toggleAlerts = (forceHide = false) => {
  const alerts = getElement('.alerts')
  const notification = getElement('.notification')


  // Prevent button from malfunctioning when double clicked
  clearTimeout(state.timeoutId)

  
  if(!state.isAlertsDisplayed) {
    let menuItems = getChildren(alerts)('[role="menuitem"]')
    alerts.ariaExpanded = 'true'

    getElement('.store-item').focus()
    alerts.addEventListener('keyup', (e) => handleMenuEscapeKeypress(e, closeAlerts))

    if(menuItems.item(0)) {
      // focus on first menu item
      menuItems.item(0).focus()

      menuItems.forEach(
        (menuItem, menuItemIndex) =>  {
        menuItem.addEventListener('keyup', (e) => {
          handleMenuItemArrowKeyPress(e, menuItemIndex)
        })
      })
    }


    // display
    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      alerts.style.display = 'block'
      state = { ...state, isAlertsDisplayed: true}
      },
      300)
    }
      
    notification.classList.add('active')
    alerts.classList.remove('fade-off')

  }
  else {
    alerts.ariaExpanded = 'false'

    // hide
    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      alerts.style.display = 'none'
      state = { ...state, isAlertsDisplayed: false}
      },
      300)
    }

    notification.classList.remove('active')
    alerts.classList.add('fade-off')

  }


  //Close active store menu 
  if(state.isStoreMenuDisplayed) {
    closeStoreMenu()
    state = { ...state, isStoreMenuDisplayed: false}
  }

}


const closeAlerts = (isEscKeyPress = false) => {
  const alerts = getElement('.alerts')
  const notification = getElement('.notification')

  notification.classList.remove('active')
  alerts.classList.add('fade-off')
  alerts.style.display = 'none'
  
  alerts.ariaExpanded = 'false'

  if (isEscKeyPress) 
    notification.focus()
}



const closeStoreMenu = (isEscKeyPress = false) => {
  const storeBtn = getElement('.store-btn')
  const storeMenu = getElement('.store-menu')

  storeBtn.classList.remove('active')
  storeMenu.classList.add('fade-off')
  storeMenu.style.display = 'none'

  storeMenu.ariaExpanded = "false"
  
  if (isEscKeyPress)
    storeBtn.focus()
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
  let selectedAccordionContent = getChild(selectedAccordion)('.setup-step-content')

  // Prevent button from malfunctioning when double clicked
  clearTimeout(state.timeoutId)

  // Toggle selected accordion
  if (selectedAccordion.classList.contains('open')){

    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      selectedAccordionContent.style.display = 'none'
      },
      300)
    }

    return selectedAccordion.classList.remove('open')
  }

  // Close opened accordion
  if (openedAccordion){ 
    let openedAccordionContent = getChild(openedAccordion)('.setup-step-content')
    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      openedAccordionContent.style.display = 'none'
      },
      300)
    }
    openedAccordion.classList.remove('open')
  }

  // Open selected accordion
  selectedAccordion.classList.add('open')
  selectedAccordionContent.style.display = 'flex'
}






// Helpers
var getElement = (selector) => document.querySelector(selector)

var getChild = (outterElement) => 
  (selector) => outterElement.querySelector(selector)

var getChildren = (outterElement) => 
  (selector) => outterElement.querySelectorAll(selector)

var handleMenuEscapeKeypress = (e, fn) => {
  if (e.key === "Escape") {
    fn(true)
  }
}

var handleMenuItemArrowKeyPress = (e, menuItemIndex) => {
  const isLastMenuItem = menuItemIndex === allMenuItems.length - 1
  const isFirstMenuItem = menuItemIndex === 0

  const nextMenuItem = allMenuItems.item(
    menuItemIndex + 1
  )
  const previousMenuItem = allMenuItems.item(
    menuItemIndex - 1
  )

  if ( e.key === "ArrowRight" 
      || e.key === "ArrowDown") {
    if (isLastMenuItem) {
      allMenuItems.item(0).focus()
      return
    }

    nextMenuItem.focus()
  }

  if (e.key === "ArrowUp" 
      || e.key === "ArrowLeft") {
    if (isFirstMenuItem) {
      allMenuItems.item(allMenuItems.length - 1).focus()
      return
    }

    previousMenuItem.focus()
  }
}



// Execute immediately after DOM is load
document.addEventListener('DOMContentLoaded',() => {
  // first accordion
   const firstAccordion = getElement('.accordion')
  firstAccordion.click()
  firstAccordion.click()
})
