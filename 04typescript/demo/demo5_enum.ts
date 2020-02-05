// 枚举
enum Status50 {
  A,
  B,
  C = 5,
  D
}
console.log(Status50.A, Status50[0]);
console.log(Status50.C, Status50[5], Status50.D);
