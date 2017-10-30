'use strict';

var bizHrs = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];

var AllStores = [];
var allCookies = [];
var grandTotal = 0;

function headerCreator() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Location';
  trEl.appendChild(thEl);
  for (var i = 0; i < bizHrs.length; i++) {
    thEl = document.createElement('th');
    thEl.textContent = bizHrs[i];
    trEl.appendChild(thEl);
    data.appendChild(trEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = 'Daily';
  trEl.appendChild(thEl);
  data.appendChild(trEl);
}

function footerCreator(){
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Hourly';
  trEl.appendChild(thEl);
  data.appendChild(trEl);

  hourlyTotals();
  grandTotal = 0;
  for (var i = 0; i < bizHrs.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = allCookies[i];
    grandTotal += allCookies[i];
    trEl.appendChild(thEl);
    data.appendChild(trEl);
  }
  thEl = document.createElement('th');
  thEl.textContent = grandTotal;
  trEl.appendChild(thEl);
  data.appendChild(trEl);
}

function rowCreator() {
  for(var j in AllStores){
    AllStores[j].render();
  }
}

var data = document.getElementById('stores');
function Store(name, custMin, custMax, hrlyCookies){
  this.name = name;
  this.custMin = custMin;
  this.custMax = custMax;
  this.hrlyCookies = hrlyCookies;
  this.perHr = [];
  this.perHrCookies = [];
  this.perDay = 0;
  this.hrlySales();
  AllStores.push(this);
};

Store.prototype.hrlyCust = function(){
  var randNum1 = Math.floor(Math.random() * (this.custMax - this.custMin + 1) + this.custMin);
  this.perHr.push(randNum1);
  return randNum1;
};

Store.prototype.hrlySales = function(){
  for (var i = 0; i < bizHrs.length; i++){
    var randNum2 = Math.floor(this.hrlyCust() * this.hrlyCookies);
    this.perHrCookies.push(randNum2);
    this.perDay += randNum2;
  }
};

function hourlyTotals(){
  for (var i = 0; i < bizHrs.length; i++){
    var storeTotal = 0;
    for (var j = 0; j < AllStores.length; j++){
      storeTotal = storeTotal + AllStores[j].perHrCookies[i];
    }
    allCookies.push(storeTotal);
  }
};

Store.prototype.render = function() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);
  for (var i = 0; i < bizHrs.length; i++) {
    tdEl = document.createElement('td');
    tdEl.textContent = this.perHrCookies[i];
    trEl.appendChild(tdEl);
    data.appendChild(trEl);
  }
  var thEl = document.createElement('th');
  thEl.textContent = this.perDay;
  trEl.appendChild(thEl);
  data.appendChild(trEl);
};

new Store('1st and Pike', 23, 65, 6.3);
new Store('Seatac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

headerCreator();
rowCreator();
footerCreator();