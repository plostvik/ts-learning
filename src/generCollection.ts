// class CollectionString {
//     private _things:string[] = [];
//     add(something: string) {
//       this._things.push(something);
//     }
//     get(index: number): string {
//       return this._things[index];
//     }
// }
// let Stringss = new CollectionString();
// Stringss.add("hello");
// Stringss.add("world");

// class CollectionNumber {
//     private _things:number[] = [];
//     add(something: number) {
//       this._things.push(something);
//     }
//     get(index: number): number {
//       return this._things[index];
//     }
// }
// let Numberss = new CollectionNumber();
// Numberss.add(1);
// Numberss.add(2);
// Numberss.add("hjkl");

//! плохой пример
// class Collection {
//     private _things:any[] = [];
//     add(something: any) {
//       this._things.push(something);
//     }
//     get(index: number): any {
//       return this._things[index];
//     }
// }
// let Stringss = new Collection();
// Stringss.add(1);
// Stringss.add("hello");
// Stringss.add("world");

// class Collection<T> {
//     private _things:T[];
//     constructor() {
//       this._things = [];
//     }
//     add(something: T): void {
//       this._things.push(something);
//     }
//     get(index: number): T {
//       return this._things[index];
//     }
// }
// let Stringss = new Collection<String>();
// Stringss.add(1);
// Stringss.add("hello");
// Stringss.add("world");

// let Numberss = new Collection<number>();
// Numberss.add(1);
// Numberss.add(2);
// Stringss.add("hello");
// Stringss.add("world");

// interface T1 {
//     length: number;
// }

// class NewCollection<T extends T1> {
//     private _things:T[];
//     constructor() {
//       this._things = [];
//     }
//     add(something: T): void {
//       this._things.push(something);
//     }
//     get(index: number): T {
//       return this._things[index];
//     }
// }

// let newCollection = new NewCollection<number[]>();

// console.log("str:", Stringss.get(0));
// console.log("length:", Stringss.get(0).length);
// console.log("substr:", Stringss.get(0).substr(0,1));

// console.log("num:", Numberss.get(0));

class BeeKeeper {
  hasMask: boolean;
}

class ZooKeeper {
  nametag: string;
}
class Animal {
  a: number = 0;
  numLegs: number;
}

class Bee extends Animal {
  constructor(arg: number) {
    super();
  }
  a: number = 1;
  keeper: BeeKeeper;
}

class Lion extends Animal {
  constructor(arg: number) {
    super();
  }
  a: number = 2;
  keeper: ZooKeeper;
}

function createInstance<A>(c: new (arg1: number) => A, arg1: number): A {
  if (arg1 < 0) {
    throw new Error();
  }
  return new c(arg1);
}

let lion = createInstance(Bee, -1);
let bee = new Bee(1);
console.log(lion);

export {};
