let state = {
  isAlertsDisplayed : false,
  isStoreMenuDisplayed : false,
  timeoutId : null,
  completedSteps: 0,
  totalSteps: 5
}

const screenReaderSay = (text) => {
  const activeVoice = getElement('.setup-step-status')
  setTimeout(
    () => activeVoice.ariaLabel = text,
    0
  ) 
}

const queueCall = (fn, seconds = 0) => setTimeout(() => {
    fn()
  }
  , seconds * 1000)

const evaluateProgress = () => {
  const progress = getElement('progress')
  const progressCount = getElement('.progress-count')
  const completedSteps = state.completedSteps
  const totalSteps = state.totalSteps

  let score = (completedSteps / totalSteps) * 100
  score = Math.floor(score)

  progress.value = `${score}` 
  progress.textContent = `${score}%`
  progressCount.textContent = state.completedSteps

}


// Step-checker 
const check = (e) => {
  const hide = 'hide'
  const stepChecker = e.currentTarget
  const dashCircle = getChild(stepChecker)('.dash-circle'); 
  const spinner = getChild(stepChecker)('.spinner'); 
  const checkMark = getChild(stepChecker)('.check-mark'); 

  const stepName = getChild(stepChecker.parentElement)('.accordion').textContent

  dashCircle.classList.add(hide)
  spinner.classList.remove(hide)
  
  setTimeout(
    () => {
      spinner.classList.add(hide)
      checkMark.classList.remove(hide)
    }, 
    500
  )

  screenReaderSay(`Successfully marked ${stepName} as complete`)
  
  queueCall( 
    () => stepChecker.ariaLabel = `Mark ${stepName} as not complete`, 
    1
  )
}

const uncheck = (e) => {
  const hide = 'hide'
  const stepChecker = e.currentTarget
  const dashCircle = getChild(stepChecker)('.dash-circle'); 
  const spinner = getChild(stepChecker)('.spinner'); 
  const checkMark = getChild(stepChecker)('.check-mark'); 
  

  const stepName = getChild(stepChecker.parentElement)('.accordion').textContent
  
  checkMark.classList.add(hide)
  spinner.classList.remove(hide)

  setTimeout(
    () => {
      spinner.classList.add(hide)
      dashCircle.classList.remove(hide)
    }, 
    500
  )

  screenReaderSay(`Successfully marked ${stepName} as not complete`)

  queueCall( 
    () => stepChecker.ariaLabel = `Mark ${stepName} as complete`, 
    1
  )
}

const handleStepCheck = (e) =>  {
  const stepChecker = e.currentTarget
  const isChecked = stepChecker.classList.contains('checked')


  if(isChecked) {
    uncheck(e)
    stepChecker.classList.remove('checked')

    state = { ...state, 
      completedSteps: state.completedSteps - 1 }

  }
  else {
    check(e)
    stepChecker.classList.add('checked')

    state = { ...state, 
      completedSteps: state.completedSteps + 1 }

  }

  // Reflect Number of Completed setup guide steps
  queueCall(evaluateProgress)
}





// Store Menu 
const toggleStoreMenu = (forceHide = false) => {
  const storeBtn = getElement('.store-btn')
  const storeMenu = getElement('.store-menu')

  // Prevent button from malfunctioning when double clicked
  clearTimeout(state.timeoutId)
  
  if(state.isStoreMenuDisplayed) {
    let menuItems = getChildren(storeMenu)('[role="menuitem"]')
    storeMenu.ariaExpanded = "true"

    storeMenu.addEventListener('keyup', (e) => handleMenuEscapeKeypress(e, closeStoreMenu))
    
    
    if (menuItems.item(0)) {
      // focus on first menu item

      queueCall(menuItems.item(0).focus, 0.3)

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
    () => {
      planNotifier.style.display = 'none'
      screenReaderSay(`Select a plan notification closed.`)
    },
    300
  )

}





// Setup Guide 
const toggleSetupSteps = () => {
  const setup = getElement('.setup')
  const setupSteps = getElement('.setup-steps')
  const chevronUp = getElement('.chevron-up')
  const chevronDown = getElement('.chevron-down')

  const setupGuideCtrl = getElement('.setup-guide-ctrl')
  const isOpened = setupGuideCtrl.ariaExpanded === 'true' 

  if(isOpened) {
    setupGuideCtrl.ariaExpanded = 'false'
    setup.ariaHidden = 'true'
    screenReaderSay('Setup guide collapsed')

    setTimeout( 
      () => setupSteps.style.display = 'none', 
      500
    )
  }
  else {
    setupGuideCtrl.ariaExpanded = 'true'
    setup.ariaHidden = 'false'
    setupSteps.style.display = 'flex', 
    screenReaderSay('Setup guide collapsed')
  }

  setup.classList.toggle('open')
  chevronUp.classList.toggle('hide')
  chevronDown.classList.toggle('hide')
  
  
}





// Accordion 
const toggleAccordion = e => {
  const accordionBtn = e.currentTarget
  const openedAccordion = getElement('.setup-step.open')
  const selectedAccordion = e.target.closest('.setup-step')
  let selectedAccordionContent = getChild(selectedAccordion)('.setup-step-content')

  // Prevent button from malfunctioning when double clicked
  clearTimeout(state.timeoutId)

  // Toggle selected accordion
  if (selectedAccordion.classList.contains('open')){
    accordionBtn.ariaExpanded = 'false'
    selectedAccordionContent.ariaHidden = 'true'
    selectedAccordion.classList.remove('open')

    state = { ...state, 
      timeoutId: setTimeout(
      () => {
        //selectedAccordionContent.style.display = 'none'
      },
      300)
    }

    return 
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
    accordionBtn.ariaExpanded = 'false'
    openedAccordionContent.ariaHidden = 'true'
  }

  // Open selected accordion
  selectedAccordion.classList.add('open')
  selectedAccordionContent.style.display = 'flex'
  accordionBtn.ariaExpanded = 'true'
  selectedAccordionContent.ariaHidden = 'false'
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
  
})
