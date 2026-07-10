// destructuring examples

var product = {
  name: "mobile",
  price: 12000
}

// old way
const getProductInfoES5 = (product) => {
  console.log(`The price of the ${product.name} is INR ${product.price}`);
}
getProductInfoES5(product);

// using destructuring
const getProductInfoES6 = ({ name, price }, { color }) => {
  console.log(`The price of the ${color} ${name} is INR ${price}`);
}
getProductInfoES6(product, { color: "red" });


// arrays
const names = ['Amit', 'Pankaj', 'Kunal', 'Dhruv', 'Manaswi'];

// arrays old way
// const name1 = names[0]
// const name2 = names[1]
// const name3 = names[2]
// const length = names.length;
// console.log(name1, name2, name3, length);

// array destructuring
const [name1, name2, name3, ...rest] = names;
const { length } = names;
console.log(name1, name2, name3, rest, length);


// destructuring array and objects together
const companies = [
  {
    name: 'Google',
    location: 'Pune'
  },
  {
    name: 'Facebook',
    location: 'Thane'
  },
  {
    name: 'Microsoft',
    location: 'Mumbai'
  },
]

// old way
// var location = companies[0].location;
// console.log(location)

// using destructuring
const [{ location }] = companies;
console.log(location);


const Google = {
  locations: ['Pune', 'Mumbai', 'Thane']
}

// old way
// var location1 = Google.locations[0];
// console.log(location1); 

// using destructuring
const { locations: [location1] } = Google;
console.log(location1);


// converting an array to object
const points = [
  [1, 2], [5, 7], [9, 1], [0, 4]
]

const pointsObject = points.map(([x, y]) => {
  return { x, y };
});

console.log(pointsObject);


// nested destructuring

const obj1 = { x: 5, y: { z: 6 } };

const resObj = { ...obj1 }

resObj.x = 6;
resObj.y.z = 7;

console.log(obj1, resObj);
console.log(obj1.y === resObj.y);

// https://medium.com/@pyrolistical/destructuring-nested-objects-9dabdd01a3b8