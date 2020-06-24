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

const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 1500000,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  incomeMonth: 0,
  expensesMonth: 0,
  checkParams: function() {
    if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    } else if (salaryAmount.value === '') {
      start.setAttribute('disabled', 'true');
    }
  },
  start: function() {
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
  },
  showResult: function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;

    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();

    incomePeriodValue.value = this.calcPeriod();
    const _this = this;
    periodSelect.addEventListener('input', function() {
      incomePeriodValue.value = _this.calcPeriod();
    })

  },
  addExpensesBlock: function() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusExpenses.style.display = 'none'; 
    }
  },
  addIncomeBlock: function() {
    const cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, plusIncome);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
      plusIncome.style.display = 'none'; 
    }
  },
  getExpenses: function() {
    const _this = this;
    expensesItems.forEach(function(item) {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        _this.expenses[itemExpenses] = +cashExpenses;
      }
    })
  },
  getIncome: function() {
    const _this = this;
    incomeItems.forEach(function(item) {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        _this.income[itemIncome] = +cashIncome;
        _this.incomeMonth += +cashIncome;
      }
    })
  },
  getAddExpenses: function() {
    const addExpenses = additionalExpensesItem.value.split(',');
    const _this = this;
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    })
  },
  getAddIncome: function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    })
  },
  // возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function() {

    for (let nameExpenses in this.expenses) {

      this.expensesMonth += this.expenses[nameExpenses];
    }
  },
  // Возвращает накопления за месяц (Доходы минус расходы)
  getBudget: function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  // Подсчитывает за какой период будет достигнута цель
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  },
  getStatusIncome: function() {
    if (this.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      console.log('У вас средний уровень дохода');
    } else if (this.budgetDay >= 0 && this.budgetDay < 600) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      console.log('Что то пошло не так');
    } 
  },
  getInfoDeposit: function() {
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
  },
  calcPeriod: function() {
    return this.budgetMonth * periodSelect.value;
  },
  reset: function() {
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
  }
};

salaryAmount.addEventListener('input', appData.checkParams.bind(appData))

start.addEventListener('click', appData.start.bind(appData));

cancel.addEventListener('click', appData.reset.bind(appData));


plusExpenses.addEventListener('click', appData.addExpensesBlock.bind(appData));
plusIncome.addEventListener('click', appData.addIncomeBlock.bind(appData));
periodSelect.addEventListener('input', function() {
  periodAmount.textContent = periodSelect.value;
});
