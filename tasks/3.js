class Product {
  constructor(name, price, quantity, description) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
  }
}

function filter(arr, str) {
  let resArr = arr;
  this.filters = {
    contains: (prop, str) => {
      resArr = resArr.filter((el) => {
        return el[prop].toLowerCase().includes(str.toLowerCase()) ? el : null;
      });
    },
    starts: (prop, str) => {
      resArr = resArr.filter((el) => {
        return el[prop].toLowerCase().startsWith(str.toLowerCase()) ? el : null;
      });
    },
    ends: (prop, str) => {
      resArr = resArr.filter((el) => {
        return el[prop].toLowerCase().endsWith(str.toLowerCase()) ? el : null;
      });
    },
    comparison: (prop, signWithNum) => {
      if (
        signWithNum.includes('=') &&
        !signWithNum.includes('>') &&
        !signWithNum.includes('<')
      ) {
        resArr = resArr.filter((el) => {
          let num = Number(signWithNum.replace('=', ''));
          return el[prop] == num ? el : null;
        });
      } else {
        resArr = resArr.filter((el) => {
          return eval(el[prop].toString() + signWithNum) ? el : null;
        });
      }
    },
  };

  try {
    let tasks = str.split('&');
    tasks.forEach((el) => {
      let task = el.split('-');
      if (task.length > 2) {
        this.filters[task[1]](task[0], task[2]);
      } else {
        this.filters.comparison(task[0], task[1]);
      }
    });
  } catch (error) {
    return 'Введите корректную строку для фильтра' + '\n' + error.message;
  }

  return resArr;
}

const arr = [
  new Product('Shampoo', 23, 100, 'it,s so abc'),
  new Product('Carpet', 190, 40, 'such a good product'),
  new Product('FdMilk', 14, 5, 'very abc'),
  new Product('ToothPaste', 22, 60, 'so abc'),
  new Product('Phone', 600, 34, 'mobile s29'),
  new Product('Cookie', 13, 140, 'so abc'),
  new Product('ToothPicksfd', 2, 999, 'very bca and abc'),
  new Product('ToothTread', 7, 999, 'very clean'),
];

console.log(
  filter(
    arr,
    'name-contains-tooth&price->=2&quantity->=34&description-starts-very&name-contains-picks'
  ),
  filter(arr, 'name-starts-&quantity-=5'),
  filter(arr, 'name-contains-fd&price-<=14&quantity-<=999&description-ends-abc')
);

module.exports =  { filter }