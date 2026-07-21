
const dashBMenuIcon = document.getElementById('dashboard-brand');
const sideBar = document.getElementById('side-bar')
const sideBCloseIcon = document.getElementById('side-icon')
const overlay = document.querySelector('.overlay')
const mainDasboard = document.querySelector('main')
const navBar = document.querySelector('nav')

dashBMenuIcon.addEventListener('click', () => {
   isClosed()
})
sideBCloseIcon.addEventListener('click', () => {
    isOpen()
})
overlay.addEventListener('click', () => {
   isOpen()
})
// This function opens the sidebar and displays the overlay
function isClosed(){
 sideBar.classList.add('showAside')
 overlay.classList.add('showOverlay')
 mainDasboard.classList.add('hide')
 navBar.classList.add('hide')
}
// This function closes the sidebar and hides the overlay
function isOpen(){
 sideBar.classList.remove('showAside')
 overlay.classList.remove('showOverlay')
 mainDasboard.classList.remove('hide')
 navBar.classList.remove('hide')
}
//add event listener to the activity button to show full activity
const btn = document.querySelector('.btn')
const container = document.querySelector('.activity-group')
btn.addEventListener('click', () => {
   container.classList.toggle('full-activity')
   container.classList.contains('full-activity')? btn.textContent = "Show Less" : btn.textContent = "View All"
      
})
const statusCells = document.querySelectorAll('.status')
statusCells.forEach(status => {
   if(status.textContent === "Pending") status.style.color = 'gold'
   if(status.textContent === "Delivered") status.style.color = 'green'
   if(status.textContent === "Cancelled") status.style.color = 'red'
})