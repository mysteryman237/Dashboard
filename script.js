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
  selectedOrderId: "",
};
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
//Get all the delete buttons on the table and add event listeners to them
const deleteCellBtn = document.querySelectorAll(".delete-cell");
const confirmDeleteBtn = document.querySelector(".confirm-delete");
const cancelDeleteBtn = document.querySelector(".cancel-btn");

deleteCellBtn.forEach((cell) => {
  cell.addEventListener("click", () => {
    state.selectedOrderId = cell.parentNode.firstElementChild.textContent;
    control.openDeleteModal();
  });
});
confirmDeleteBtn.addEventListener("click", () => {
   const allOrderIds = document.querySelectorAll('.order-id');
   const tdToDelete = Array.from(allOrderIds).find(td =>
    td.textContent === state.selectedOrderId
   )
   if(tdToDelete)
    tdToDelete.parentNode.remove()
  control.closeDeleteModal();
});
cancelDeleteBtn.addEventListener("click", () => {
  control.closeDeleteModal();
});
