var getPersonName = function (per) {
    console.log(per.name);
};
var Andy = {
    name: "Andy",
    age: 22,
    say: function () {
        return "nice day";
    },
    eat: "rice"
};
getPersonName(Andy);
// 变量赋值可以多属性，直接传强校验多属性报错 除非设置propName
getPersonName({
    name: "Andy",
    age: 22,
    say: function () {
        return "nice day";
    },
    eat: "rice"
});
// 类应用接口
var User1 = /** @class */ (function () {
    function User1() {
        this.name = "Ann";
        this.age = 122;
    }
    User1.prototype.say = function () {
        return "hi";
    };
    return User1;
}());
var getTeacherName = function (per) {
    console.log(per.name);
};
var Andy1 = {
    name: "Andy",
    age: 22,
    say: function () {
        return "nice day";
    },
    teach: function () {
        return "Math";
    }
};
getTeacherName(Andy1);
var sayHi = function (w) {
    return "say: Hi! " + w;
};
console.log("sayHi :", sayHi("Blue bird"));
