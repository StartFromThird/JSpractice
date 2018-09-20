/*
* 有关 工作&休息 时间间隔 的设置和保存
*
*/
var defaultSettingObj = {
    workTime: 25,
    breakTime: 5,
}
var startBtn = $('.startButton');

// 存储设置时间 到 sessionStorage
var saveSettingObj = function(settingObj){
    var t = JSON.stringify(settingObj);  
    sessionStorage.setItem("setting", t);  
}

// 获取 sessionStorage中 设置时间       

var getSettingObj = function(){
    var t = sessionStorage.getItem("setting");
    var settingObj = {}; 
 
    if(!t){
        // 第一次无原始设置时
        settingObj = copyObj(defaultSettingObj)
    }else{
        settingObj = JSON.parse(t);
        var w = parseInt(settingObj.workTime);
        var b = parseInt(settingObj.breakTime);
            // console.log("w",w,"b",b,b!==0)
            // console.log(settingObj)
        if(w!==0){
            settingObj.workTime = w || defaultSettingObj.workTime;
        }
        if(b!==0){
            settingObj.breakTime = b || defaultSettingObj.breakTime;
        }
    }
    
    return settingObj
}

// 加载页面时，显示上一次设置
var showLatestSetting = function(){
    var latestSettingObj = getSettingObj();
    $('#setWorkTime').value = latestSettingObj.workTime;
    $('#setBreakTime').value = latestSettingObj.breakTime;
}

// 检查输入 时间参数 是否符合要求
// 【还没写】
var checkInputNum = function(obj){
    // 点击开始时判断
    // 输入是 整数字 1-60之间
    // 输入错误 红字提示 -- 摇晃
    // 返回输入是否正确判断
    return true;
}





