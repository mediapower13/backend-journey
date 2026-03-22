const greet = () => "Hello";
const double = n => n * 2;
const add = (a, b) => a + b;
const makeUser = (id, name) => ({ id, name });
const sumAll = (...nums) => nums.reduce((acc, n) => acc + n, 0);

function multiplyTraditional(a, b) {
  return a * b;
}

const multiplyArrow = (a, b) => a * b;

function getDiscountTraditional(price, percent = 0) {
  return price - price * (percent / 100);
}

const getDiscountArrow = (price, percent = 0) => price - price * (percent / 100);

const orders = [
  { id: 1, amount: 120 },
  { id: 2, amount: 80 },
  { id: 3, amount: 200 }
];

const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);
const highValueOrders = orders.filter(order => order.amount >= 100);
const orderIds = orders.map(order => order.id);

const userService = {
  prefix: "USR",
  buildIdTraditional: function (num) {
    return `${this.prefix}-${num}`;
  },
  buildIdArrow: num => `${this?.prefix}-${num}`
};

function Session(user) {
  this.user = user;
  this.logs = [];
  this.startTraditional = function () {
    setTimeout(function () {
      console.log("traditional timeout this.user:", this?.user);
    }, 0);
  };

  this.startArrow = function () {
    setTimeout(() => {
      this.logs.push(`started for ${this.user}`);
      console.log("arrow timeout this.user:", this.user);
    }, 0);
  };
}

const session = new Session("alice");

console.log("greet:", greet());
console.log("double:", double(9));
console.log("add:", add(4, 6));
console.log("makeUser:", makeUser(7, "Mina"));
console.log("sumAll:", sumAll(1, 2, 3, 4, 5));

console.log("multiplyTraditional:", multiplyTraditional(3, 5));
console.log("multiplyArrow:", multiplyArrow(3, 5));
console.log("getDiscountTraditional:", getDiscountTraditional(1000, 10));
console.log("getDiscountArrow:", getDiscountArrow(1000, 10));

console.log("totalRevenue:", totalRevenue);
console.log("highValueOrders:", highValueOrders);
console.log("orderIds:", orderIds);

console.log("buildIdTraditional:", userService.buildIdTraditional(10));
console.log("buildIdArrow:", userService.buildIdArrow(10));

session.startTraditional();
session.startArrow();

setTimeout(() => {
  console.log("session logs:", session.logs);
}, 20);
