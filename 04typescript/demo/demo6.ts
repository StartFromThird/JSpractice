// 泛型
// 函数
function join60<T>(f: T, s: T) {
  return `${f}${s}`;
}
console.log("<T>", join60<number>(1, 6), join60<string>(`11`, `ab`));
// 不同参数 不同类型
function join61<T, P>(f: T, s: P) {
  return `${f}${s}`;
}
console.log("<T, P>", join61<number, string>(1, "aaa"));
// 不同参数 不同类型
function join62<T>(f: T): T {
  return f;
}
console.log("<T>():T", join62<number>(1));
