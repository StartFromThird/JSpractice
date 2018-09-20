
var $ = function(selector){
    return document.querySelector(selector);
}

var find = function(element, selector) {
    return element.querySelector(selector);
}

// 参考 ———— https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML
var appendHtml = function(element, html){
    element.insertAdjacentHTML("beforeend", html);
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback);
}

// 保证数字是两位数，不足加0，且转为字符串
var doubleDigitStr = function(i){
    if(i < 10){
        return '0' + i;
    }else{
        return '' + i;
    }
}

// 复制 对象o 的 key value
// 对象o没有value为数组
var copyObj = function(o){
    var x;
    var r = {};
    for (x in o) {
        r[x] = o[x];
    }
    return r;
}


/*
* 以下部分是该项目专用
*
*/
// 三个页面滑动动画 i -- 1 设置页面，2 计时页面，3 结束页面
// 【动画效果没做】
var changeBoard = function(i){
    var mainContainer = $(".mainContainer");
    // mainContainer.classList.add(animation);
    // bindEvent(mainContainer, 'animationend', function(){
    //     mainContainer.classList.remove(animation);
    // });
    var t = `top: -${(i - 1) * 30}vw`;
    // var t = `top: -${(i - 1) * 6}rem`;
    mainContainer.style.cssText = t;
}

var main = $("#main");
var leftTimeBox = $(".leftTimeBox");
var processCurve = $("#processCurve");

// 第二个界面的暂停计时按钮
var timer = $(".mainboard.timer");
var timerMask = $(".timerMask");

// 动态加的找不到！
// var giveUpButton = find(".mainboard.timer", ".giveUpButton");
// console.log(giveUpButton)

// 第三个界面的两个按钮
var btnList = document.querySelectorAll(".mainboard.finishWork > div")
var breakBtn = btnList[0];
var noBreakBtn = btnList[1];



