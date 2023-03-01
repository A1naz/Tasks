const operationsModule = {
  addition(a, b) {
    let minus = '';
    let arrA = a;
    let arrB = b;
    if (arrA.includes('-') && arrB.includes('-')) {
      minus = '-';
      a = a.replace('-', '');
      b = b.replace('-', '');
    } else if (arrA.includes('-') && !arrB.includes('-')) {
      return this.subtraction(b, a.replace('-', ''));
    } else if (!arrA.includes('-') && arrB.includes('-')) {
      return this.subtraction(a, b.replace('-', ''));
    }

    arrA = a.length >= b.length ? a.split('').reverse() : b.split('').reverse();
    arrB = b.length <= a.length ? b.split('').reverse() : a.split('').reverse();

    let result = [];
    arrA.forEach((el, i) => {
      if (arrB[i] !== undefined) {
        result[i] = +arrA[i] + +arrB[i];
      } else result[i] = +arrA[i];
    });
    result.forEach((el, i) => {
      if (el > 9) {
        result[i] = el - 10;
        result[i + 1] = result[i + 1] + 1;
      }
    });
    return minus + result.reverse().join('');
  },

  subtraction(a, b) {
    let minus = '';
    if (a.includes('-') && !b.includes('-')) {
      return this.addition(a, '-' + b);
    } else if (a.includes('-') && b.includes('-')) {
      return this.addition(a, b.replace('-', ''));
    } else if (!a.includes('-') && b.includes('-')) {
      return this.addition(a, b.replace('-', ''));
    }
    let arrA =
      a.length > b.length ? a.split('').reverse() : b.split('').reverse();
    let arrB =
      b.length < a.length ? b.split('').reverse() : a.split('').reverse();
    if (a.length < b.length) {
      minus = '-';
    }
    if (a.length == b.length) {
      for (let i = 0; i < a.length; i++) {
        if (+a[i] < +b[i]) {
          arrA = b.split('').reverse();
          arrB = a.split('').reverse();
          minus = '-';
          break;
        } else if (+a[i] > +b[i]) {
          arrA = a.split('').reverse();
          arrB = b.split('').reverse();
        }
      }
    }
    let result = [];
    arrA.forEach((el, i) => {
      if (arrB[i] !== undefined) {
        result[i] = +el - +arrB[i];
        if (result[i] < 0) {
          result[i] += 10;
          arrA[i + 1] = +arrA[i + 1] - 1;
        }
      } else if (el < 0 && a[i + 1] !== undefined) {
        arrA[i + 1] = +arrA[i + 1] - 1;
        result[i] = el + 10;
      } else if (el >= 0 && a[i + 1] === undefined) {
        result[i] = el;
      } else if (a[i + 1] !== undefined) {
        result[i] = el;
      }
    });
    result = result.reverse().join('').replace(/\b0+/g, '');
    return result == '' ? '0' : minus + result;
  },

  multiplication(a, b) {
    minus =
      a.includes('-') && !b.includes('-')
        ? '-'
        : !a.includes('-') && b.includes('-')
        ? '-'
        : '';

    a = a.replace('-', '');
    b = b.replace('-', '');
    let arrA =
      a.length >= b.length ? a.split('').reverse() : b.split('').reverse();
    let arrB =
      b.length <= a.length ? b.split('').reverse() : a.split('').reverse();
    let result = [];
    let flag = 1;
    for (let i = 0; i < arrA.length; i++) {
      for (let j = 0; j < arrB.length; j++) {
        let mult = arrA[i] * arrB[j];
        result[i + j] = result[i + j] ? result[i + j] + mult : mult;
      }
    }

    result.forEach((el, i) => {
      let ost = el % 10;
      let des = Math.floor(el / 10);
      result[i] = ost;
      if (result[i + 1]) {
        result[i + 1] += des;
      } else if (des != 0) {
        result[i + 1] = des;
      }
    });
    result = result.reverse().join('');
    if (result[0] == '0') {
      return '0';
    } else {
      return minus + result;
    }
  },

  division(a, b) {
    minus =
      a.includes('-') && !b.includes('-')
        ? '-'
        : !a.includes('-') && b.includes('-')
        ? '-'
        : '';

    a = a.replace('-', '');
    b = b.replace('-', '');
    if (b[0] == '0' || (b[0] == '-' && b[1] == '0')) {
      return Infinity;
    }
    if (b > a) {
      return '0';
    }
    if (a.length === b.length) {
      for (let i = 0; i < a.length - 1; i++) {
        if (a[i] < b[i]) {
          return '0';
          break;
        }
        if (a[i] > b[i]) {
          break;
        }
      }
    }

    let del = '';
    let slog = 0;
    let ost = a[slog] - '0';

    while (ost < b) {
      ost = ost * 10 + a[slog + 1].charCodeAt(0) - '0'.charCodeAt(0);
      slog += 1;
    }
    slog += 1;

    while (a.length > slog) {
      del += String.fromCharCode(Math.floor(ost / b) + '0'.charCodeAt(0));
      ost = (ost % b) * 10 + a[slog].charCodeAt(0) - '0'.charCodeAt(0);
      slog += 1;
    }

    del += String.fromCharCode(Math.floor(ost / b) + '0'.charCodeAt(0));
    if (del.length == 0) return '0';
    return minus + del;
  },
};

console.log(
  operationsModule.addition(
    '3443343545454354656456456546456456452299',
    '-34433435454543546564564565464564564522991'
  ),
  operationsModule.subtraction(
    '-3443343545454354656456456546456456452299',
    '3443343545454354656456456546456456452299'
  ),
  operationsModule.multiplication(
    '3443343545454354656456456546456456452299',
    '-3443343545454354656456456546456456452299'
  ),
  operationsModule.division(
    '-9934433218923639480971348078473841371804332123232323123231',
    '-9472988438487428748924489289489443433213123232312233'
  )
);

module.exports = operationsModule;
//921
//23
