let state = {
  isAlertsDisplayed : false,
  isStoreMenuDisplayed : false,
  timeoutId : null
}



// Store Menu 
const toggleStoreMenu = (forceHide = false) => {
  const storeBtn = getElement('.store-btn')
  const storeMenu = getElement('.store-menu')

  // Prevent button from malfunctioning when double clicked
  clearTimeout(state.timeoutId)
  
  if(!state.isStoreMenuDisplayed) {
    let menuItems = getChildren(storeMenu)('[role="menuitem"]')
    storeMenu.ariaExpanded = "true";

    // focus on first menu item
    menuItems.item(0).focus();

    storeMenu.addEventListener('keyup', (e) => handleMenuEscapeKeypress(e, closeStoreMenu));
    

    menuItems.forEach(
      (menuItem, menuItemIndex) =>  {
      menuItem.addEventListener('keyup', (e) => {
        handleMenuItemArrowKeyPress(e, menuItemIndex);
      })
    })

    // display
    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      storeMenu.style.display = 'flex'
      state = { ...state, isStoreMenuDisplayed: true}
      },
      300)
    }
      
  }
  else {
    storeMenu.ariaExpanded = "false";
    storeBtn.focus();

    // hide
    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      storeMenu.style.display = 'none'
      state = { ...state, isStoreMenuDisplayed: false}
      },
      300)
    }
  }

  // Toggle elements state
  storeBtn.classList.toggle('active')
  storeMenu.classList.toggle('fade-off')




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
    alerts.ariaExpanded = 'true';

    // focus on first menu item
    menuItems.item(0).focus();

    alerts.addEventListener('keyup', (e) => handleMenuEscapeKeypress(e, closeAlerts));

    menuItems.forEach(
      (menuItem, menuItemIndex) =>  {
      menuItem.addEventListener('keyup', (e) => {
        handleMenuItemArrowKeyPress(e, menuItemIndex);
      })
    })


    // display
    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      alerts.style.display = 'block'
      state = { ...state, isAlertsDisplayed: true}
      },
      300)
    }
      
  }
  else {
    alerts.ariaExpanded = 'false';

    // hide
    state = { ...state, 
      timeoutId: setTimeout(
      () => {
      alerts.style.display = 'none'
      state = { ...state, isAlertsDisplayed: false}
      },
      300)
    }

  }


  // Toggle elements state
  notification.classList.toggle('active')
  alerts.classList.toggle('fade-off')
  
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
  
  alerts.ariaExpanded = 'false';
  if (esc) {
    notification.focus();
  }

}



const closeStoreMenu = () => {
  const storeBtn = getElement('.store-btn')
  const storeMenu = getElement('.store-menu')

  storeBtn.classList.remove('active')
  storeMenu.classList.add('fade-off')
  storeMenu.style.display = 'none'

  storeMenu.ariaExpanded = "false";
  storeBtn.focus();
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

var getChild = (outterElement) => 
  (seletor) => outterElement.querySelector(selector)

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
      allMenuItems.item(0).focus();
      return
    }

    nextMenuItem.focus();
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




