const textController = {
  upperCase(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  },

  deleteExtraSpaces(str) {
    str = str
      .trim()
      .replace(/\s*([,.!?:;]+)(?!\s*$)\s*/g, '$1 ')
      .replace(/\s+/g, ' ');
    if (str.slice(-2, -1) == ' ') {
      str = str.slice(0, -2) + str.slice(-1);
    }
    return str;
  },

  wordsCount(str) {
    str = this.deleteExtraSpaces(str);
    console.log(str);
    return str.split(' ').length;
  },

  uniclaWords(str) {
    let arr = str
      .toLowerCase()
      .trim()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ' ')
      .replace(/\s+/g, ' ')
      .split(' ');
    let obj = {};
    let lastSym = '';
    let preLastSym = '';
    let result = 'Столько раз встречаются следующие слова:';
    arr.forEach((el) => {
      !obj.hasOwnProperty(el) ? (obj[el] = 1) : (obj[el] += 1);
    });
    Object.keys(obj).forEach((key) => {
      result = `${result} \n ${key}: ${obj[key]}`;
      lastSym = obj[key].toString()[obj[key].toString().length - 1];
      preLastSym =
        obj[key].toString()[obj[key].toString().length - 2] +
        obj[key].toString()[obj[key].toString().length - 1];
      if (
        (lastSym === '2' && preLastSym != '12') ||
        (lastSym === '3' && preLastSym != '13') ||
        (lastSym === '4' && preLastSym != '14')
      ) {
        result += ' раза';
      } else result += ' раз';
      if (key === Object.keys(obj).pop()) {
        result += '.';
      } else result += ',';
    });
    return result;
  },
};

console.log(textController.upperCase('WORDS WITH CAPS')); // 1.1

console.log(
  textController.deleteExtraSpaces(
    'Вот пример строки,в которой     используются знаки препинания.После знаков должны стоять пробелы , а перед знаками их быть не должно .    Если есть лишние подряд идущие пробелы, они должны быть устранены.'
  )
); // 1. 2
console.log(
  textController.wordsCount(
    '  Вот пример строки,в которой     используются знаки препинания        .После знаков должны стоять пробелы , а перед знаками их быть не должно     .'
  )
); // 1.3
console.log(
  textController.uniclaWords(
    'Вот вот пример  пример пример пример строки со      словами, вот вот  вот вот вот Вот вот вот  вот вот  вот вот которой есть слова и слова'
  )
); // 1.4

module.exports = textController;
