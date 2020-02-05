// 类型保护
// as
interface Bird {
  fly: Boolean;
  sing: () => {};
}
interface Dog {
  fly: Boolean;
  bark: () => {};
}
function trainAnimal(animal: Bird | Dog) {
  if (animal.fly) {
    (animal as Bird).sing();
  } else {
    (animal as Dog).bark();
  }
  (animal as Dog).bark();
}
// in
function trainAnimal1(animal: Bird | Dog) {
  if ("sing" in animal) {
    animal.sing();
  } else {
    animal.bark();
  }
}
// typeof
function add4(f: string | number, s: string | number) {
  if (typeof f === "string" || typeof s === "string") {
    return `${f}${s}`;
  }
  return f + s;
}
// instanceof --- class
class NumObj {
  constructor(public count: number) {
    this.count = count;
  }
}
function add41(f: object | NumObj, s: object | NumObj) {
  if (f instanceof NumObj && s instanceof NumObj) {
    return f.count + s.count;
  }
  return 0;
}
const numO1 = new NumObj(1);
const numO2 = new NumObj(2);
console.log(add41(numO1, numO2));
