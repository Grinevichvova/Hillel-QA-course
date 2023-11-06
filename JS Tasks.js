//**********************************************************************************

// ; Написати функцію, яка прийме рядок, що містить літери, цілі невід'ємні числа та інші символи. Потрібно всі числа, які зустрічаються в рядку, помістити в окремий масив. Функція має повертати цей масив. Наприклад, якщо даний рядок "data 48 call 9 read13 blank0a", то в масиві мають бути числа 48, 9, 13 и 0.
// ; Обмеження - не використовувати регулярні вирази
// ; Приклад юніт-тесту для перевірки let a = "00asdf0123 d6 lkj006m90" -> [0,0,0,123, 6, 0, 0, 6, 90]

let str1 = "data 48 call 9 read13 blank0a";
let str2 = "00asdf0123 d6 lkj006m90";
let str3 = "nu017 mbe120zNaN 0909 undefined 88";
let str4 = "10e10z0 NaN 909 e007 0";

function findN(data) {
    let arr = [];
    data = data.replaceAll(" ", "a");
    let num = "";  
    for (let i = 0; i < data.length; i++) {
        if (Number(data[i]) === 0) {
            arr.push(Number(data[i]))
        } else if (Number(data[i]) > 0) {
            for (let j = i; !isNaN(data[j]); j++) {
                num += data[j];
                i = j;
            }
            arr.push(Number(num));
            num = "";
        } 
    }
    return arr;
}
console.log(findN(str1));
console.log(findN(str2));
console.log(findN(str3));
console.log(findN(str4));

//**********************************************************************************

// ; Написати функцію, яка прийме квадратне рівняння у вигляді рядка "ax^2+bx+c=0", де а, в, с - будь-які реальні числа, відмінні від нуля. Функція має повернути:
// ; Масив рішень [x1, x2], якщо рівняння має 2 корені
// ; Одне рішення x, якщо рішення лише одне
// ; 'No solutions', якщо рівняння не має рішень.
// ; Обмеження - не використовувати регулярні вирази

"ax^2+bx+c=0" 
let k = "-x^2-9=0"             // No sqrt
let kv = "1.8x^2=0"            // 0
let kva = "0.5x^2+8x=0"        // 0; -16
let kvad = "x^2+7x-8=0"        // 1; -8
let kvadr = "2x^2-x-3=0"       // 1.5; -1
let kvadra = "x^2+4x+7=0"      // No Solution
let kvadrat = "16x^2-8x+1=0"   // 0,25
let kvadratn = "x^2-9x+20=0"   // 5; 4
let kvadratne = "3x^2+x+2=0"   // No Solution

function OMG (data) {
    data = data.replaceAll("-x", "-1x").replaceAll("+x", "+1x")
    if (parseFloat(data) !== 0) {
        let arr = data.split("x");
        if (isNaN(parseFloat(data))) {
            arr[0] = 1;
        }
            let a = Number(arr[0]); 
            let b = parseFloat(arr[1].slice(2)); 
            let c = parseFloat(arr[2]); 

        if (isNaN(b) || isNaN(c)) {
            if (isNaN(b) && isNaN(c)) {
                return ("Nepovne, x = 0");
            } else if (!isNaN(Number(arr[1].slice(2)))) {
                let x6 = 0;
                let x7 = -b / a;
                return ("Nepovne " + [x6, x7]);
            } else {
                c = b;
                if ((-c / a) > 0) {
                    let x4 = Math.sqrt(-c / a);
                    let x5 = - Math.sqrt(-c / a);
                    return ("Nepovne " + [x4, x5]);
                } else {
                    return ("Nepovne, No.sqrt");
                }
            }
        }
        
        let D = (b * b) - (4 * a * c);
        
        if (D > 0) {
            let x1 = (-b + Math.sqrt(D)) / (2 * a);
            let x2 = (-b - Math.sqrt(D)) / (2 * a);
            return ([x1, x2]);
        } else if (D == 0) {
            let x3 = (-b / (2 * a));
            return (x3);
        } else /* (D < 0) */ {
            return ("No solutions");
        }
    } else {
        return ("Ne kvadratne!");
    }
    
}
console.log(OMG(k))
console.log(OMG(kv))
console.log(OMG(kva))
console.log(OMG(kvad))
console.log(OMG(kvadr))
console.log(OMG(kvadra))
console.log(OMG(kvadrat))
console.log(OMG(kvadratn))
console.log(OMG(kvadratne))

//**********************************************************************************

// Solve the following task using JS:
// Create a function that takes a string, finds the first non-repeating character in it, and returns its index. Is the non-repeating character does not exist, return -1
// Important! Use String methods to solve the task. Do NOT use nested loops, regular expressions and method map()

let string = "csdgtrqwec23dqser";

function UniqSymbol(s) {
    for(let i=0;i<s.length;i++) {
         let ch=s[i]
         if(s.indexOf(ch) == i && s.indexOf(ch,i+1) == -1) {
            return i
         }
    }
        return -1
};

function UniqSymbol(s) {
    for(let i of s) {
        if(s.indexOf(i) === s.lastIndexOf(i)) {
            return s.indexOf(i);
        }
    }
    return -1;
};

function lonelySymbol(str) {
    for(let i = 0; i < str.length; i++) {
         let s = str[i]
         if(str.indexOf(s) === i && !str.slice(i+1).includes(s)) {
            return i
         }
    }
    return -1
};
console.log(lonelySymbol(string))

//**********************************************************************************

// Написати функцію, яка прийме рядок, що містить римське число. Функція має повертати десяткове число.

let str1 = "XIX"
let str2 = "DLV"
let str3 = "MDXLVII"
let str4 = "MMXXIII"
let str5 = "MMCMXCIX"

function rome(data) {
    let newData = 0;
    for (let i in data) {
        let char = data[i];
        if (char === "I") {
            newData += 1;
        } else if (char === "V") {
            newData += 5;
        } else if (char === "X") {
            newData += 10;
        } else if (char === "L") {
            newData += 50;
        } else if (char === "C") {
            newData += 100;
        } else if (char === "D") {
            newData += 500;
        } else if (char === "M") {
            newData += 1000;
        }
        if (i > 0) {
            if ((char === "M" || char === "D") && data[i - 1] === "C") {
                newData -= 200;
            } else if ((char === "C" || char === "L") && data[i - 1] === "X") {
                newData -= 20;
            } else if ((char === "X" || char === "V") && data[i - 1] === "I") {
                newData -= 2;
            }
        }
    } return (newData);
} 
console.log(rome(str5))

//**********************************************************************************

// Написати функцію, яка прийме рядок, що містить дату у вигляді "12.09.2000" та поверне дату у зворотньому порядку з розділенням "-" між числами.

function reverse (data) {return data.split(".").reverse().join("-")};
console.log(reverse("12.09.2000"))

//**********************************************************************************

// Написати функцію, що перетворить масив рандомних чисел на масив чисел без дублікатів
// [1,2,3,2,3] -> [1,2,3]
// [4,4,4,4,4] -> [4]
// Обмеження - не використовувати перетворення в сет(множину) та регулярні вирази

let arr = [1, 1, 2, 33, 2, 3, 33, 43, 33, 5, 5, 2];
let arr2 = [1, 1, 3, 3, 3, 4, 2, 3, 4, 4, 2, 1, 2, 3, 5, 6, 6, 4, 5, 7, 33, 3, 3, 2, 2, 2, 3];

function reload(data){
    if (Array.isArray(data)) {
        let noDublicat = []
        for (let element of data) {
            if (!noDublicat.includes(element)) {
                noDublicat.push(element)
            }
        } return (noDublicat);
    } else {
        return ("is NOT Array")
    }
} 
console.log(reload(arr))

function reload (data) {
    for(let i = 0; i < data.length; i++) {
        for(let j = i + 1; j < data.length; j++) {
            if (data[i] === data[j]) {
                data.splice(j, 1)
                j--;
            }
        } 
    } return (data)
}
console.log(reload(arr2))

//**********************************************************************************

// Написати функцію, що поверне індекс першого неповторюваного у рядку символу, якщо такого немає - то поверне "-1"

let str1 = "ABBA"
let str2 = "ABBC"
let str3 = "AB BA"
let str4 = "DSdsADvAvxS"

function ynik(data) {
  for (let a of data) {
    let counter = 0;
    for (let b of data) {
      if (a === b) {
        counter++;
      }
    }
    if (counter === 1) {
      return (data.indexOf(a));
    }
  }
  return (-1);
}
console.log(ynik(str1));
console.log(ynik(str2));
console.log(ynik(str3));
console.log(ynik(str4));

//**********************************************************************************