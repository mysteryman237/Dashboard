
const dashBMenuIcon = document.getElementById('dashboard-brand');
const sideBar = document.getElementById('side-bar')
const sideBCloseIcon = document.getElementById('side-icon')
const overlay = document.querySelector('.overlay')
const mainDasboard = document.querySelector('main')
const navBar = document.querySelector('nav')

const state = {
   sideBarOpen : false,
   deleteModalOpen : false,
   overLayOpen : false,
   SelectedOrderId : null,
   mainState : false
}
class Controllers{

   openSideBar(){
       state.sideBarOpen = true
       state.overLayOpen = true
       state.mainState = false
       state.sideBarOpen && sideBar.classList.add('showAside')
      state.overLayOpen && overlay.classList.add('showOverlay')
      !state.mainState && navBar.classList.add('hide')
      !state.mainState && mainDasboard.classList.add('hide')
   }
   closeSideBar(){
      state.sideBarOpen = false
      state.overLayOpen = false
      state.mainState = true
    !state.sideBarOpen &&  sideBar.classList.remove('showAside')
    !state.overLayOpen && overlay.classList.remove('showOverlay')
    state.mainState && mainDasboard.classList.remove('hide')
    state.mainState && navBar.classList.remove('hide')
   }
}
const control = new Controllers()

dashBMenuIcon.addEventListener('click', () => {
   control.openSideBar()
})
sideBCloseIcon.addEventListener('click', () => {
   control.closeSideBar()
   
})