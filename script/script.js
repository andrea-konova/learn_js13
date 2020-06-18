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
  incomePeriodValue = document.getElementsByClassName('income_period-value'),
  targetMonthValue = document.getElementsByClassName('target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('[class="income-title"]'),
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelector('[class="expenses-title"]'),
  expensesAmount = document.querySelector('.expenses-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select');

let expensesItems = document.querySelectorAll('.expenses-items');


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
  period: 12,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function() {

    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено!');
      return;
    }

    appData.budget = +salaryAmount.value;

    appData.getExpenses();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.showResult();
  },
  showResult: function() {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
  },
  addExpensesBlock: function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExpenses);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      plusExpenses.style.display = 'none'; 
    }
  },
  getExpenses: function() {
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    })
  },
  getAddExpenses: function() {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  asking: function() {

    if (confirm('Есть ли у вас дополнительный источник заработка?')) {
      let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
      
      let costIncome;
      do {
        costIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
      }
      while(!isNumber(costIncome)) 
      
      appData.income[itemIncome] = +costIncome;
    }

    const addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, аренда');
      appData.addExpenses = addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm('Есть ли у вас депозит в банке?');

  },
  // возвращает сумму всех обязательных расходов за месяц
  getExpensesMonth: function() {
    let sum = 0;

    for (let nameExpenses in appData.expenses) {

      sum += appData.expenses[nameExpenses];
    }

    appData.expensesMonth = +sum;
  },
  // Возвращает накопления за месяц (Доходы минус расходы)
  getBudget: function() {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  // Подсчитывает за какой период будет достигнута цель
  getTargetMonth: function() {
    return Math.ceil(appData.mission / appData.budgetMonth)
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
  calcSaveMoney: function() {
    return appData.budgetMonth * appData.period;
  }
};

start.addEventListener('click', appData.start);

plusExpenses.addEventListener('click', appData.addExpensesBlock);

// console.log(appData);

// console.log('Расходы за месяц: ' + appData.expensesMonth);

// if (appData.getTargetMonth() < 0){
//   console.log('Цель не будет достигнута');
// } else {
//   console.log('Цель будет достигнута за: ' 
// + appData.getTargetMonth());
// }

// appData.getStatusIncome();

// for (let key in appData) {
//   console.log(`Наша программа включает в себя данные:  ${key} ${appData[key]}`);
// }

appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSaveMoney());

let str = appData.addExpenses.map(i => i[0].toUpperCase() + i.substring(1)).join(', ');

// console.log(String(str));