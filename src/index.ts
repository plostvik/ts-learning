//**1.Partial - делает свойства опциональным. Записывается как генерик. Partial <T>.
//Например, у нас есть интерфейс:

interface T {
  color: "orange" | "tomato";
  show: boolean;
}

//Partial <T> сделает все поля в этом интерфейсе необязательными
const somethnig: Partial<T> = {
  color: "orange",
};

interface T1 {
  a: string;
}

interface T2 {
  b: string[];
}

//using in
function someFn(arg: T1 | T2) {
  if ("b" in arg) {
    console.log(arg.b);
  }
}

function someFn2(arg: T1 & T2) {
  console.log(arg.b);
}

function someFn3(arg: string & string[]) {
  arg.substring;
}

//**2.Конструкция namespace представлена в виде объекта с ключевым словом
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

//** 3 */
//переименование с помощью as
const one = 1;
const two = 2;
export { one as first, two };
import { two as twice } from "./";

//импорт всего в виде объекта
// import * as numbers from "./number.js"

//**4 Decorator
const enumerable = (value: boolean) => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    descriptor.enumerable = value;
  };
};

class User {
  constructor(public name: string, public age: number) {}

  @enumerable(false)
  public getPass(): string {
    return `${this.name}${this.age}`;
  }
}

//**7 infer
const person = { name: "Andrew", age: 30 };
type A<T> = T extends {
  [key: string]: infer U;
}
  ? U
  : never;
type B = typeof person;
type C = A<B>;

//** 8 */

interface IUser {
  name: string;
  age: number;
  getPass(): string;
}

class Ostap implements IUser {
  name: string = "Ostap";
  age: number = 30;
  getPass() {
    return "password";
  }
}

//**9
function getProperty<ObjectType, KeyType extends keyof ObjectType>(
  obj: ObjectType,
  key: KeyType,
) {
  return obj[key];
}

//**10

//чтобы избежать проблему, когда будут вызывать функцию add(1, "2");
function add(x: string, y: string): string;
function add(x: number, y: number): number;
function add(x: any, y: any): any {
  return x + y;
}
let result1 = add(5, 4);
console.log(result1); // 9
let result2 = add("5", "4");
console.log(result2); // 54

//** ================ 12 ================

interface RequestSettings {
  protocol: "http" | "https";
  host: string;
  path: string;
  query?: string;
  headers: { key: string; value: string }[];
}

class TypedBuilder<T> {
  constructor(private current = {}) {}
  prop<P extends keyof T, V extends T[P]>(key: P, value: V) {
    return new TypedBuilder<T>({ ...this.current, ...{ [key]: value } });
  }
  build() {
    return <T>this.current;
  }
}

class SimpleBuilder {
  private current: { [index: string]: any } = {};

  prop(key: string, value: any) {
    this.current[key] = value;
    return this;
  }

  build<R>() {
    return <R>this.current;
  }
}

// Usage

const settings1 = new SimpleBuilder()
  .prop("protocol", "http")
  .prop("host", "test.com")
  .prop("path", "/foo/bar")
  .prop("headers", [])
  .build<RequestSettings>();

const result = getProperty({ name: "Ostap", age: 30 }, "name");
//** ============= 13 Type Guards ================

//type of
function logError(error: string | Error): void {
  if (typeof error === "string") {
    console.log(error);
  } else console.log(error.message);
}

//instanceof
class Tesla {
  constructor(public maxSpeed: number) {}
}

class Shkoda {
  constructor(public maxSpeed: number) {}
}

function getCooliness(car: Tesla | Shkoda): void {
  if (car instanceof Tesla) {
    console.log("You're cool guy");
  } else {
    console.log("I need to dissapoint you");
  }
}
// in
type Properties = "propA" | "propB";
type mappedType = {
  [P in Properties]: boolean;
};

// function move(pet: Fish | Bird) {
//   if ("swim" in pet) {
//     return pet.swim();
//   }
//   return pet.fly();
// }

// is
function isString(test: any): test is string {
  return typeof test === "string";
}

function example(foo: any) {
  if (isString(foo)) {
    console.log("it is a string" + foo);
    console.log(foo.length); // string function
  }
}
example("hello world");

// function isFish(pet: Fish | Bird): pet is Fish {
//   return (pet as Fish).swim !== undefined;
// }

//**14 Conditional types

type NonNullable<T> = T extends null | undefined ? never : T;

//**16 Вопрос №18 (5). Расскажите о том, когда в TypeScript используют ключевое слово declare.

// Ключевое слово declare используется в TypeScript для объявления переменных, источником которых может служить некий файл, не являющийся TypeScript-файлом.

// Например, представим, что у нас имеется библиотека, которая называется myLibrary. У неё нет файла с объявлениями типов TypeScript, у неё имеется лишь пространство имён myLibrary в глобальном пространстве имён. Если вы хотите использовать эту библиотеку в своём TS-коде, вы можете использовать следующую конструкцию:

// declare var myLibrary;

// TypeScript назначит переменной myLibrary тип any. Проблема тут заключается в том, что у вас не будет, во время разработки, интеллектуальных подсказок по этой библиотеке, хотя использовать её в своём коде вы сможете. В этой ситуации можно воспользоваться и другим подходом, ведущим к тому же результату. Речь идёт об использовании переменной типа any:

// var myLibrary: any;

// И в том и в другом случае при компиляции TS-кода в JavaScript, получится одно и то же, но вариант с использованием ключевого слова declare отличается лучшей читабельностью. Применение этого ключевого слова приводит к созданию так называемого внешнего объявления переменной (ambient declaration).

export {};
