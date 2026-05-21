// === STEP 1: Connect to the HTML ===
// Grab every element we'll need to read from or update.
// We do this once at the top so we're not searching the DOM repeatedly.
const totalAmt = document.getElementById("total-amount");
const personalTotal = document.getElementById("personal-total");
const businessTotal = document.getElementById("business-total");

const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmt = document.getElementById("expense-amount");
const expenseDate = document.getElementById("expense-date");
const expenseType = document.getElementById("expense-type");

const expenseList = document.getElementById("expense-list");

// === STEP 2: Load existing data ===
// Ask the browser if the user has been here before.
// If yes, restore their expenses. If no, start with an empty slate.
let expenses = loadFromLocalStorage() || [];

// === STEP 3: Wait for the user to add an expense ===
expenseForm.addEventListener("submit", function(event){
    event.preventDefault();
    
    // Read what the user typed
    const name = expenseName.value;
    const amount = parseFloat(expenseAmt.value);
    const date = expenseDate.value;
    const type = expenseType.value;

    // Reject bad input before it enters the system
    if(name.trim() === ""){
        alert("Expense name must not be empty.");
        return;
    }

    if(isNaN(amount) || amount <= 0){
        alert("Enter a valid amount");
        return;
    }

    // Package the input into a structured object and add it to our list
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        date: date,
        type: type
    }
    expenses.push(expense);

    // Save → Render → Summarise (always in this order)
    saveToLocalStorage();
    renderExpenses();
    updateSummary();

    // Reset the form for the next entry
    expenseName.value = "";
    expenseAmt.value = "";
    expenseDate.value = "";
    expenseType.selectedIndex = 0;
});

// === STEP 4: Paint the expense list on screen ===
// Wipe the current list and redraw everything from the array.
// Each item gets a delete button stamped with its unique ID.
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

// === STEP 5: Calculate and display totals ===
// Walk through every expense once and tally total, personal, and business.
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

// === STEP 6: Remove an expense ===
// Keep every expense except the one that was deleted, then sync everything.
function deleteExpense(id){

    expenses = expenses.filter(expense => expense.id !== id);

    saveToLocalStorage();
    renderExpenses();
    updateSummary();
   
}

// === STEP 7: Remember and recall data ===
// Convert the array to a string for storage, and back to an array when loading.
function saveToLocalStorage(){
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function loadFromLocalStorage(){
    const data = localStorage.getItem("expenses");
    return data ? JSON.parse(data) : []; // Explicitly returns the data
}

// === STEP 8: Paint the screen on first load ===
// If the user has saved data, show it immediately when the page opens.
renderExpenses();
updateSummary();

