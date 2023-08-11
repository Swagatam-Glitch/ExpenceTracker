const expenseForm = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

// document.addEventListener("DOMContentLoaded", () => {
//   loadExpenses();
// });

expenseForm.addEventListener("submit", addExpense);

function addExpense(event) {
  event.preventDefault();

  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;

  if (!description || !amount) {
    return;
  }

  const expenseItem = document.createElement("div");
  expenseItem.classList.add("expense-item");

  const editButton = document.createElement("span");
  editButton.innerText = "Edit";
  editButton.classList.add("edit-btn");
  editButton.addEventListener("click", () => editExpense(expenseItem));

  const deleteButton = document.createElement("span");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.addEventListener("click", () => deleteExpense(expenseItem));

  expenseItem.innerHTML = `<span>${description}</span><span>${amount}</span>`;
  expenseItem.appendChild(editButton);
  expenseItem.appendChild(deleteButton);

  expenseList.appendChild(expenseItem);

  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";

  saveExpenseToLocalStorage(description, amount);
}

function editExpense(expenseItem) {
  const description = prompt("Edit Description:", expenseItem.children[0].innerText);
  const amount = prompt("Edit Amount:", expenseItem.children[1].innerText);

  if (!description || !amount) {
    return;
  }

  expenseItem.children[0].innerText = description;
  expenseItem.children[1].innerText = amount;

  const expenses = getExpensesFromLocalStorage();
  const index = Array.from(expenseList.children).indexOf(expenseItem);
  expenses[index] = { description, amount };
  saveExpensesToLocalStorage(expenses);
}
function editUserDetails(emailId,PhoneNumber, username,userID){
  document.getElementById('email').value=emailId;
  document.getElementById('username').value=username;
  document.getElementById('phonenumber').value=PhoneNumber;
  deleteUser(userId)
}
function deleteUser(userId){
  axios.delete(`https://crudcrud.com/api/e2f0eb45bc0f427883faf2ff7abf34d4/appmdata`).then((response)=>{
    removeUserFromScreen(userId)
  })
  .catch((err)=>{
    console.log(error)
  });
}

function deleteExpense(expenseItem) {
  if (confirm("Are you sure you want to delete this expense?")) {
    expenseItem.remove();

    const expenses = getExpensesFromLocalStorage();
    const index = Array.from(expenseList.children).indexOf(expenseItem);
    expenses.splice(index, 1);
    saveExpensesToLocalStorage(expenses);
  }
}

function saveExpenseToLocalStorage(description, amount) {

  
  const expenses = getExpensesFromLocalStorage();
  expenses.push({ description, amount });
  // saveExpensesToLocalStorage(expenses);
  axios.post("https://crudcrud.com/api/e2f0eb45bc0f427883faf2ff7abf34d4/appmdata",expenses)
  .then((response) => {
    console.log(response)
  })
  .catch((err)=> {
    console.log(err)
  })
}
function deletleUser(emailId)




// Task18//

document.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/fe1c7373376a43a1a2b97673da253bf1/appData")
  .then((response)=>{
    console.log(response)

    for (var i=0;i<response.data.length;i++){
      loadExpenses(response.data[i])
    }
  })
  .catch((error)=>{
    console.log(error)
  })
});

function loadExpenses(user){
  if(localStorage.getItem(user.email) !== null){
    removeUserFromScreen(user.email)
  }
  const childHTML = `<li id=${user._id}> ${user.name} - ${user.email}<button onclick=deletUser(`${user._id}`)>`}

// function getExpensesFromLocalStorage() {
//   const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
//   return expenses;
// }

// function saveExpensesToLocalStorage(expenses) {
//   localStorage.setItem("expenses", JSON.stringify(expenses));
// }



function loadExpenses() {
  const expenses = getExpensesFromLocalStorage();
  expenses.forEach((expense) => {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense-item");

    const editButton = document.createElement("span");
    editButton.innerText = "Edit";
    editButton.classList.add("edit-btn");
    editButton.addEventListener("click", () => editExpense(expenseItem));

    const deleteButton = document.createElement("span");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-btn");
    deleteButton.addEventListener("click", () => deleteExpense(expenseItem));

    expenseItem.innerHTML = `<span>${expense.description}</span><span>${expense.amount}</span>`;
    expenseItem.appendChild(editButton);
    expenseItem.appendChild(deleteButton);

    expenseList.appendChild(expenseItem);
  });
}
