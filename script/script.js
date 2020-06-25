'use strict';

const start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  plusIncome = document.getElementsByTagName('button')[0],
  plusExpenses = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('[class="income-title"]'),
  expensesTitle = document.querySelector('[class="expenses-title"]'),
  expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  incomeAmount = document.querySelector('.income-amount');

let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeItems = document.querySelectorAll('.income-items');

// Проверяет значение на число
const isNumber = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const AppData = function() {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.incomeMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.checkParams = function() {
  if (salaryAmount.value !== '') {
    start.removeAttribute('disabled');
  } else if (salaryAmount.value === '') {
    start.setAttribute('disabled', 'true');
  }
};

AppData.prototype.start = function() {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.incomeMonth = 0;
  this.expensesMonth = 0;

  this.budget = +salaryAmount.value;

  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExpenses();
  this.getAddIncome();

  this.getBudget();
  this.showResult();

  let allInput = document.querySelectorAll('.data input[type = text]');
  allInput.forEach(function(item) {
    item.setAttribute('disabled', 'true');
  });

  start.style.display = "none";
  cancel.style.display = "block";

  plusIncome.setAttribute('disabled', 'true');
  plusExpenses.setAttribute('disabled', 'true');
};

AppData.prototype.showResult = function() {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;

  additionalExpensesValue.value = this.addExpenses.join(', ');
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = this.getTargetMonth();

  incomePeriodValue.value = appData.calcPeriod();
  periodSelect.addEventListener('input', function() {
    incomePeriodValue.value = this.calcPeriod();
  }, this)

};

AppData.prototype.addExpensesBlock = function() {
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
  expensesItems = document.querySelectorAll('.expenses-items');
  if (expensesItems.length === 3) {
    plusExpenses.style.display = 'none'; 
  }
};

AppData.prototype.addIncomeBlock = function() {
  const cloneIncomeItems = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
  incomeItems = document.querySelectorAll('.income-items');
  if (incomeItems.length === 3) {
    plusIncome.style.display = 'none'; 
  }
};

AppData.prototype.getExpenses = function() {
  expensesItems.forEach(function(item) {
    const itemExpenses = item.querySelector('.expenses-title').value;
    const cashExpenses = item.querySelector('.expenses-amount').value;
    if (itemExpenses !== '' && cashExpenses !== '') {
      this.expenses[itemExpenses] = +cashExpenses;
    }
  }, this)
};

AppData.prototype.getIncome = function() {
  incomeItems.forEach(function(item) {
    const itemIncome = item.querySelector('.income-title').value;
    const cashIncome = item.querySelector('.income-amount').value;
    if (itemIncome !== '' && cashIncome !== '') {
      this.income[itemIncome] = +cashIncome;
      this.incomeMonth += +cashIncome;
    }
  }, this)
};

AppData.prototype.getAddExpenses = function() {
  const addExpenses = additionalExpensesItem.value.split(',');
  addExpenses.forEach(function(item) {
    item = item.trim();
    if (item !== '') {
      this.addExpenses.push(item);
    }
  }, this)
};

AppData.prototype.getAddIncome = function() {
  additionalIncomeItem.forEach(function(item) {
    const itemValue = item.value.trim();
    if (itemValue !== '') {
      this.addIncome.push(itemValue);
    }
  }, this)
};
// возвращает сумму всех обязательных расходов за месяц
AppData.prototype.getExpensesMonth = function() {

  for (let nameExpenses in this.expenses) {

    this.expensesMonth += this.expenses[nameExpenses];
  }
};
// Возвращает накопления за месяц (Доходы минус расходы)
AppData.prototype.getBudget = function() {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.floor(this.budgetMonth / 30);
};
// Подсчитывает за какой период будет достигнута цель
AppData.prototype.getTargetMonth = function() {
  return Math.ceil(targetAmount.value / this.budgetMonth)
};

AppData.prototype.getStatusIncome = function() {
  if (this.budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
  } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
  } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
    console.log('К сожалению у вас уровень дохода ниже среднего');
  } else if (this.budgetDay < 0) {
    console.log('Что то пошло не так');
  } 
};

AppData.prototype.getInfoDeposit = function() {
  if (this.deposit) {
    do {
      this.percentDeposit = prompt('Какой годовой процент', '10');
    }
    while(!isNumber(this.percentDeposit)) 

    do {
      this.moneyDeposit = prompt('Какая сумма заложена?', '10000');
    }
    while(!isNumber(this.moneyDeposit)) 
    
  }
};

AppData.prototype.calcPeriod = function() {
  return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function() {
  this.income = {};
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.mission = 1500000;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.incomeMonth = 0;
  this.expensesMonth = 0;
  
  const dataInputAll = document.querySelectorAll('.data input[type = text]'),
    resultInputAll = document.querySelectorAll('.result input[type = text]');

  dataInputAll.forEach(function(item) {
    item.value = '';
    item.removeAttribute('disabled');

    periodSelect.value = '1';
    periodAmount.textContent = periodSelect.value;
  });

  resultInputAll.forEach(function(item) {
    item.value = '';
  });

  for (let i = 1; i < expensesItems.length; i++) {
    expensesItems[i].parentNode.removeChild(expensesItems[i]);
    plusExpenses.style.display = 'block'; 
  }

  for (let i = 1; i < incomeItems.length; i++) {
    incomeItems[i].parentNode.removeChild(incomeItems[i]);
    plusIncome.style.display = 'block'; 
  }

  start.style.display = "block";
  cancel.style.display = "none";
  plusIncome.removeAttribute('disabled');
  plusExpenses.removeAttribute('disabled');
};

AppData.prototype.eventsListeners = function() {
  salaryAmount.addEventListener('input', this.checkParams.bind(this))
  start.addEventListener('click', this.start.bind(this));
  cancel.addEventListener('click', this.reset.bind(this));
  plusExpenses.addEventListener('click', this.addExpensesBlock.bind(this));
  plusIncome.addEventListener('click', this.addIncomeBlock.bind(this));
  periodSelect.addEventListener('input', function() {
    periodAmount.textContent = periodSelect.value;
  });
};

const appData = new AppData();
appData.eventsListeners();

console.log(appData);




