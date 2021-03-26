//! 1.Partial - делает свойства опциональным. Записывается как генерик. Partial <T>.
//Например, у нас есть интерфейс:

interface T {
  color: "orange" | "tomato";
  show: boolean;
}

//Partial <T> сделает все поля в этом интерфейсе необязательными
const somethnig: Partial<T> = {
  color: "orange",
};

//! 2.Конструкция namespace представлена в виде объекта с ключевым словом
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }

  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;

  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }

  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}

// Some samples to try
let strings = ["Hello", "98052", "101"];
// Validators to use
let validators: { [s: string]: Validation.StringValidator } = {};
validators["ZIP code"] = new Validation.ZipCodeValidator();
validators["Letters only"] = new Validation.LettersOnlyValidator();

//если неймспейс находится в отдельном файле, то чтобы его импортировать нужно написать:
///<reference path="form-namespace.ts"/>
// Кроме того, чтобы это работало нужно сам класс или то, где мы будем использовать неймспейс обернуть в неймспейс с таким же названием

//7 infer
const person = { name: "Andrew", age: 30 };
type A<T> = T extends {
  [key: string]: infer U;
}
  ? U
  : never;
type B = typeof person;
type C = A<B>;

//9
function getProperty<ObjectType, KeyType extends keyof ObjectType>(
  obj: ObjectType,
  key: KeyType,
) {
  return obj[key];
}

//10
function add(x: string, y: string): string;
function add(x: number, y: number): number;
function add(x: any, y: any): any {
  return x + y;
}
let result1 = add(5, 4);
console.log(result1); // 9
let result2 = add("5", "4");
console.log(result2); // 54

const result = getProperty({ name: "Ostap", age: 30 }, "name");
// 13
// in
type Properties = "propA" | "propB";
type mappedType = {
  [P in Properties]: boolean;
};

//16 Вопрос №18 (5). Расскажите о том, когда в TypeScript используют ключевое слово declare.

// Ключевое слово declare используется в TypeScript для объявления переменных, источником которых может служить некий файл, не являющийся TypeScript-файлом.

// Например, представим, что у нас имеется библиотека, которая называется myLibrary. У неё нет файла с объявлениями типов TypeScript, у неё имеется лишь пространство имён myLibrary в глобальном пространстве имён. Если вы хотите использовать эту библиотеку в своём TS-коде, вы можете использовать следующую конструкцию:

// declare var myLibrary;

// TypeScript назначит переменной myLibrary тип any. Проблема тут заключается в том, что у вас не будет, во время разработки, интеллектуальных подсказок по этой библиотеке, хотя использовать её в своём коде вы сможете. В этой ситуации можно воспользоваться и другим подходом, ведущим к тому же результату. Речь идёт об использовании переменной типа any:

// var myLibrary: any;

// И в том и в другом случае при компиляции TS-кода в JavaScript, получится одно и то же, но вариант с использованием ключевого слова declare отличается лучшей читабельностью. Применение этого ключевого слова приводит к созданию так называемого внешнего объявления переменной (ambient declaration).

export {};
