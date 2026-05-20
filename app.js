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
    //Update the summary section
    updateSummary();

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
        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.dataset.id = expense.id;

        deletebtn.addEventListener("click", () => {
            deleteExpense(Number(deletebtn.dataset.id))
        });

        li.textContent = `${expense.name}, ${expense.type}, ${expense.date}, ₹${expense.amount.toFixed(2)}`;
        li.appendChild(deletebtn);

        expenseList.appendChild(li);

    }) 
}

//Update the summary card
function updateSummary(){
    
    // const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    // const personalSpent = expenses.filter(expense => expense.type === "Personal").reduce((acc, curr) => acc + curr.amount, 0);
    // const businessSpent = expenses.filter(expense => expense.type === "Business").reduce((acc, curr) => acc + curr.amount, 0);

    //Calculate all totals in single pass
    const totals = expenses.reduce((acc, curr) => {

        acc.total += curr.amount;
        if(curr.type === "Personal") acc.personal += curr.amount;
        if(curr.type === "Business") acc.business += curr.amount;
        
        return acc;
    }, {total: 0, personal: 0, business: 0});

    //Access the heading from each summary heading
    const totalSpentHeading = totalAmt.querySelector("h2");
    const personalSpentHeading = personalTotal.querySelector("h2");
    const businessSpentHeading = businessTotal.querySelector("h2");

    //Upadating values in summary section
    totalSpentHeading.textContent = `₹${totals.total.toFixed(2)}`;
    personalSpentHeading.textContent = `₹${totals.personal.toFixed(2)}`;
    businessSpentHeading.textContent = `₹${totals.business.toFixed(2)}`;

}

//Delete expense 
function deleteExpense(id){

    //Reassign expenses in expense array
    expenses = expenses.filter(expense => expense.id !== id);

    //Rnder new list
    renderExpenses();
    //Update summary card
    updateSummary();
}


