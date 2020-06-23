'use strict';

const start = document.getElementById('start'),
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
  periodAmount = document.querySelector('.period-amount');

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
  start: function() {
    appData.income = {};
    appData.addIncome =[];
    appData.expenses = {};
    appData.addExpenses = [];
    appData.budgetDay = 0;
    appData.budgetMonth = 0;
    appData.incomeMonth = 0;
    appData.expensesMonth = 0;

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
  
    appData.getBudget();
    appData.showResult();
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;

    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();

    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('input', function() {
      incomePeriodValue.value = appData.calcPeriod();
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
    expensesItems.forEach(function(item) {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    })
  },
  getIncome: function() {
    incomeItems.forEach(function(item) {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = +cashIncome;
        appData.incomeMonth += +cashIncome;
      }
    })
  },
  getAddExpenses: function() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  getAddIncome: function() {
    additionalIncomeItem.forEach(function(item) {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    })
  },
  // возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function() {

    for (let nameExpenses in appData.expenses) {

      appData.expensesMonth += appData.expenses[nameExpenses];
    }
  },
  // Возвращает накопления за месяц (Доходы минус расходы)
  getBudget: function() {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  // Подсчитывает за какой период будет достигнута цель
  getTargetMonth: function() {
    return Math.ceil(targetAmount.value / appData.budgetMonth)
  },
  getStatusIncome: function() {
    if (appData.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay < 0) {
      console.log('Что то пошло не так');
    } 
  },
  getInfoDeposit: function() {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент', '10');
      }
      while(!isNumber(appData.percentDeposit)) 

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      }
      while(!isNumber(appData.moneyDeposit)) 
      
    }
  },
  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
  }
};

const checkParams = function() {
  if (salaryAmount.value !== '') {
    start.removeAttribute('disabled');
  } else if (salaryAmount.value === '') {
    start.setAttribute('disabled', 'disabled');
  }
};

salaryAmount.addEventListener('input', checkParams)

start.addEventListener('click', appData.start.bind(appData));

plusExpenses.addEventListener('click', appData.addExpensesBlock);
plusIncome.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function() {
  periodAmount.textContent = periodSelect.value;
});
