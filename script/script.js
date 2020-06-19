'use strict';

const allBooks = document.querySelectorAll('.books'),
  book = document.querySelectorAll('.book'),
  body = document.getElementsByTagName('body'),
  bookTitle = document.getElementsByTagName('h2'),
  advertising = document.querySelector('.adv'),
  list = document.getElementsByTagName('ul'),
  listItems2 = list[0].getElementsByTagName('li'),
  listItems5 = list[5].getElementsByTagName('li'),
  listItems6 = list[2].getElementsByTagName('li'),
  newListItem = document.createElement('li');

allBooks[0].prepend(book[1]);
allBooks[0].append(book[2]);
book[3].before(book[4]);

body[0].style.backgroundImage = "url('image/you-dont-know-js.jpg')";

bookTitle[2].textContent = "Книга 3. this и Прототипы Объектов";
bookTitle[2].style.color = "darkkhaki";

advertising.remove();

listItems2[1].after(listItems2[3]);
listItems2[2].after(listItems2[6]);
listItems2[3].after(listItems2[8]);
listItems2[10].before(listItems2[5]);

listItems5[1].after(listItems5[9]);
listItems5[2].after(listItems5[4]);
listItems5[5].after(listItems5[4]);
listItems5[9].before(listItems5[6]);

newListItem.textContent = "Глава 8: За пределами ES6";
list[5].append(newListItem); 
list[5].append(listItems6[9])
