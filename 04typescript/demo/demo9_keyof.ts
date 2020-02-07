// keyof
interface Person9 {
  name: string;
  age: number;
  bloodType: string;
}
class Patient9 {
  constructor(public info: Person9) {}
  getInfo<T extends keyof Person9>(key: T): Person9[T] {
    return this.info[key];
  }
}
const p9 = new Patient9({
  name: "ZZZ",
  age: 88,
  bloodType: "O"
});
console.log(p9.getInfo("name"));
