    const form = document.getElementById('expense-form');
    const nameInput = document.getElementById('name');
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const filterSelect = document.getElementById('filter');
    const expenseList = document.getElementById('expense-list');
    const totalEl = document.getElementById('total');
    const errorMsg = document.getElementById('error-msg');
    let expenses = [];

    form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value;

    if (!name || isNaN(amount) || amount <= 0) {
        errorMsg.textContent = 'Enter a valid expense name and positive amount.';
        return;
    }
    errorMsg.textContent = '';
    expenses.push({ id: Date.now(), name, amount, category });
    form.reset();
    renderExpenses();
    });

    filterSelect.addEventListener('change', renderExpenses);

    function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    renderExpenses();
    }

    function renderExpenses() {
    const filter = filterSelect.value;
    const filtered = filter === 'All' ? expenses : expenses.filter(exp => exp.category === filter);
    expenseList.innerHTML = '';
    let total = 0;

    filtered.forEach(exp => {
        total += exp.amount;
        const li = document.createElement('li');
        li.innerHTML = `<span><strong>${exp.name}</strong> <span class="badge">${exp.category}</span></span>
                        <span>${exp.amount.toFixed(2)} <button class="del-btn" onclick="deleteExpense(${exp.id})">Delete</button></span>`;
        expenseList.appendChild(li);
    });
    totalEl.textContent = total.toFixed(2);
    }