//query the Dom and pick all global elements
const dashBMenuIcon = document.getElementById("dashboard-brand");
const sideBar = document.getElementById("side-bar");
const sideBCloseIcon = document.getElementById("side-icon");
const overlay = document.querySelector(".overlay");
const mainDasboard = document.querySelector("main");
const navBar = document.querySelector("nav");
const deleteModal = document.querySelector(".delete-modal");
const orderId = document.querySelector(".modal-ordernumber");

//store state variables for the dashboard
const state = {
  sideBarOpen: false,
  deleteModalOpen: false,
};
// we create a state that stores all orders
const allOrder = {
  orders: [
    {id: 9674, customerName: 'Peter', amount: 50, status: 'Pending'},
    {id: 1322, customerName: 'James', amount: 15, status: 'Delivered'},
    {id: 2457, customerName: 'John', amount: 10, status: 'Pending'},
    {id: 9345, customerName: 'Andrew', amount: 40, status: 'Cancelled'}
  ],
  selectedOrderId: ""
}
// Controller class that contains all methods to only update state variables of the dashboard
class Controller {
  openSideBar() {
    state.sideBarOpen = true;
    renderUl();
  }
  closeSideBar() {
    state.sideBarOpen = false;
    renderUl();
  }
  onOverLayClick() {
    state.sideBarOpen = false;
    renderUl();
  }
  openDeleteModal() {
    state.deleteModalOpen = true;
    renderUl();
  }
  closeDeleteModal() {
    state.deleteModalOpen = false;
    renderUl();
  }
}
const control = new Controller();

// Create render functions for every UI that changes state, this is the place we change our css classes
function renderSideBar() {
  state.sideBarOpen
    ? sideBar.classList.add("showAside")
    : sideBar.classList.remove("showAside");
}
function renderOverLay() {
  if (state.deleteModalOpen || state.sideBarOpen)
    overlay.classList.add("showOverlay");
  else overlay.classList.remove("showOverlay");
}
function renderDeleteModal() {
  state.deleteModalOpen
    ? deleteModal.classList.add("showModal")
    : deleteModal.classList.remove("showModal");
     orderId.textContent = state.selectedOrderId
}
function renderMain() {
  state.sideBarOpen
    ? mainDasboard.classList.add("hide")
    : mainDasboard.classList.remove("hide");
}
function renderNav() {
  state.sideBarOpen
    ? navBar.classList.add("hide")
    : navBar.classList.remove("hide");
}
// This is the main render function that calls all the sub-render functions 
function renderUl() {
  renderSideBar();
  renderOverLay();
  renderDeleteModal();
  renderMain();
  renderNav();
}
dashBMenuIcon.addEventListener("click", () => {
  control.openSideBar();
});
sideBCloseIcon.addEventListener("click", () => {
  control.closeSideBar();
});
overlay.addEventListener("click", () => {
  control.onOverLayClick();
});
//We want to make the dashBoard dynamic by making it render through data
//We create method that render tr dynamically
function renderTr(data){
 return `
 <tr data-id="${data.id}">
  <td class="order-id">${"#" + data.id}</td>
  <td class="customer-name">${data.customerName}</td>
  <td class="amount">${"$" + data.amount}</td>
  <td class="status">${data.status}</td>
  <td class="delete-cell">
  <button class="table-deletebtn"><i class="fa-regular fa-trash-can"></i></button>
   </td>
   </tr>
   `
}
// map table row to all orders and append to body at the end
function renderData(){
 const html = allOrder.orders.map(order => renderTr(order)).join("")
  document.querySelector('.table-body').innerHTML = html
}
renderData()
//Get all the delete buttons on the table and add event listeners to them
const deleteCellBtn = document.querySelector(".table-body");
const confirmDeleteBtn = document.querySelector(".confirm-delete");
const cancelDeleteBtn = document.querySelector(".cancel-btn");

// we add event listener to our tbody then use event delegation to get the clicked element
// then update the application state and displace the delete modal
deleteCellBtn.addEventListener("click", (event) => {
    if(event.target.closest('.table-deletebtn')){
      let clickedOrder = event.target.closest('tr')
      allOrder.selectedOrderId = Number(clickedOrder.dataset.id)
      control.openDeleteModal();
    }
  });
  // We put event listener to the delete modal button then filter our state and rerender our data
confirmDeleteBtn.addEventListener("click", () => {
allOrder.orders = allOrder.orders.filter(order => order.id !== allOrder.selectedOrderId)
  renderData();
   control.closeDeleteModal();
});
cancelDeleteBtn.addEventListener("click", () => {
  control.closeDeleteModal();
});