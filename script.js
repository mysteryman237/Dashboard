//query the Dom and pick all global elements
const dashBMenuIcon = document.getElementById("dashboard-brand");
const sideBar = document.getElementById("side-bar");
const sideBCloseIcon = document.getElementById("side-icon");
const overlay = document.querySelector(".overlay");
const mainDasboard = document.querySelector("main");
const navBar = document.querySelector("nav");
const deleteModal = document.querySelector(".delete-modal");
const orderId = document.querySelector(".modal-ordernumber");
const tbody = document.querySelector(".table-body");

//Add event to the activity section to see all activities
const activityBtn = document.querySelector(".viewAll-btn");
const activityContainer = document.querySelector(".activity-group");
activityBtn.addEventListener("click", () => {
  activityContainer.classList.toggle("full-activity");
  activityBtn.textContent = activityContainer.classList.contains(
    "full-activity",
  )
    ? "Show Less"
    : "View All";
});
//store state variables for the dashboard
const state = {
  sideBarOpen: false,
  deleteModalOpen: false,
};
// we create a state that stores all orders
const allOrder = {
  orders: [
    {
      orderId: 9674,
      customerId: 1,
      customerName: "Peter",
      cost: 30,
      amount: 50,
      status: "Pending",
    },
    {
      orderId: 1322,
      customerId: 2,
      customerName: "James",
      cost: 10,
      amount: 15,
      status: "Delivered",
    },
    {
      orderId: 1323,
      customerId: 2,
      customerName: "James",
      cost: 10,
      amount: 15,
      status: "Delivered",
    },
    {
      orderId: 2457,
      customerId: 4,
      customerName: "John",
      cost: 4,
      amount: 10,
      status: "Pending",
    },
    {
      orderId: 9345,
      customerId: 5,
      customerName: "Andrew",
      cost: 27,
      amount: 40,
      status: "Cancelled",
    },
  ],
  selectedOrderId: "",
};
// this class carries all methodes that update our application state variables
class StateControll {
  openSideBar() {
    state.sideBarOpen = true;
    renderUI();
  }
  closeSideBar() {
    state.sideBarOpen = false;
    renderUI();
  }
  openDeleteModal() {
    state.deleteModalOpen = true;
    renderUI();
  }
  closeDeleteModal() {
    state.deleteModalOpen = false;
    renderUI();
  }
}
const stateSwitch = new StateControll();
// We create functions that touch the DOM and change classes to componenets accroding to state
function displaySideBar() {
  state.sideBarOpen
    ? sideBar.classList.add("showAside")
    : sideBar.classList.remove("showAside");
}
function displayOverlay() {
  if (state.deleteModalOpen || state.sideBarOpen)
    overlay.classList.add("showOverlay");
  else overlay.classList.remove("showOverlay");
}
function hideMain() {
  if (state.sideBarOpen) {
    mainDasboard.classList.add("hide");
    navBar.classList.add("hide");
  } else {
    mainDasboard.classList.remove("hide");
    navBar.classList.remove("hide");
  }
}
function displayDeleteModal() {
  state.deleteModalOpen
    ? deleteModal.classList.add("showModal")
    : deleteModal.classList.remove("showModal");
}
// This is a general UI render function that runs ever time any of application state is updated
function renderUI() {
  displaySideBar();
  displayOverlay();
  hideMain();
  displayDeleteModal();
}
// Now we add Event listeneners to triger user actions
dashBMenuIcon.addEventListener("click", () => {
  stateSwitch.openSideBar();
});
sideBCloseIcon.addEventListener("click", () => {
  stateSwitch.closeSideBar();
});
overlay.addEventListener("click", () => {
  stateSwitch.closeSideBar();
});
//Now we come to the section that handles rerender when state changes
//first we handle the delete functionality of the table
//we add event listener to the table body and use event deligation to listen to clicks
tbody.addEventListener("click", (event) => {
  if (event.target.closest(".table-deletebtn")) {
    allOrder.selectedOrderId = Number(event.target.closest("tr").id);
    stateSwitch.openDeleteModal();
    orderId.textContent = allOrder.selectedOrderId;
  }
});
//We now put event listen to the deleteModal buttons
const confirmDeleteBtn = document.querySelector(".confirm-delete");
const cancelDeleteBtn = document.querySelector(".cancel-btn");
cancelDeleteBtn.addEventListener("click", () => {
  stateSwitch.closeDeleteModal();
});
confirmDeleteBtn.addEventListener("click", () => {
  stateSwitch.closeDeleteModal();
  refreshDashBoard()
});
//Now we want to render data to the table dynamically
//First we create a function that returns a string of HTML
function renderTr(data) {
  return `
 <tr id="${data.orderId}">
  <td class="order-id">${"#" + data.orderId}</td>
  <td class="customer-name">${data.customerName}</td>
  <td class="amount">${"$" + data.amount}</td>
  <td class="status">${data.status}</td>
  <td class="delete-cell">
  <button class="table-deletebtn"><i class="fa-regular fa-trash-can"></i></button>
   </td>
   </tr>
   `;
}
//This are the functions that renders initail data upon when the app starts
function renderTable() {
  const html = allOrder.orders.map((oder) => renderTr(oder)).join("");
  tbody.innerHTML = html;
}
const revenueDisplay = document.getElementById("display-revenue");
const customersDisplay = document.getElementById("display-customers");
const profitDisplay = document.getElementById("display-profit");
const ordersDisplay = document.getElementById("display-orders");
const dataState = {
  revenue: 0,
  customers: 0,
  orders: 0,
  profit: 0,
};
//This function does all the calculation for our dashBoard
function calculateData() {
  dataState.revenue = 0;
  dataState.customers = 0;
  dataState.orders = 0;
  dataState.profit = 0;
  allOrder.orders.forEach((order) => {
    dataState.orders++;
    if (order.status === "Delivered") {
      dataState.revenue += order.amount;
      dataState.profit += order.amount - order.cost;
    }
  });
  dataState.customers = new Set(
    allOrder.orders.map((order) => order.customerId),
  ).size;
}
//This is the tiny system that handle card render only
function renderCards() {
  revenueDisplay.textContent = "$" + dataState.revenue;
  customersDisplay.textContent = dataState.customers;
  profitDisplay.textContent = "$" + dataState.profit;
  ordersDisplay.textContent = dataState.orders;
}
function deleteOrder() {
  allOrder.orders = allOrder.orders.filter(
    (order) => order.orderId != allOrder.selectedOrderId,
  );
}
function renderDashBoard() {
  calculateData();
  renderTable();
  renderCards();
}

renderDashBoard();

function refreshDashBoard(){
  deleteOrder()
  renderDashBoard()
}
