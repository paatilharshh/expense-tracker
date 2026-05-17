//Summary card element access
const totalAmt = document.getElementById("total-amount");
const personalTotal = document.getElementById("personal-total");
const businessTotal = document.getElementById("business-total");

//Form element access
const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmt = document.getElementById("expense-amount");
const expenseDate = document.getElementById("expense-date");
const expenseType = document.getElementById("expense-type");

//Expense list element access
const expenseList = document.getElementById("expense-list");

//To store expenses
let expenses = [];

//Event listener after form submission
expenseForm.addEventListener("submit", function(event){
    event.preventDefault();
    
    const name = expenseName.value;
    const amount = parseFloat(expenseAmt.value);
    const date = expenseDate.value;
    const type = expenseType.value;

    //Expense object
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        date: date,
        type: type
    }

    //Pushing expense object in the array
    expenses.push(expense);
    
    //Rendering expense list
    renderExpenses();

    //Clearing inputs
    expenseName.value = "";
    expenseAmt.value = "";
    expenseDate.value = "";
    expenseType.selectedIndex = 0;
});

//Render the expense list
function renderExpenses(){


    expenseList.innerHTML = "";

    //Adding expense lists
    expenses.forEach((expense) => {

        const li = document.createElement("li");

        li.textContent = `${expense.name}, ${expense.type}, ${expense.date}, ₹${expense.amount.toFixed(2)}`;

        expenseList.appendChild(li);
    })
}

//Update the summary card
function updateSummary(){
    
}