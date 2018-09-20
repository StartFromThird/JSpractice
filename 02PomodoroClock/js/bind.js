
var forBind = function(){
    // 开始按钮 绑定事件
    // 调用剩余时间及曲线函数
    bindEvent(startBtn, 'click', function(){
        var settingObj = {};
        // 获取页面 input 内容
        settingObj.workTime = $('#setWorkTime').value;
        settingObj.breakTime = $('#setBreakTime').value;
        // 检查页面 input 内容
        var r = checkInputNum(settingObj);
        if(r){
            // 存下当前 w/b 时间设置
            saveSettingObj(settingObj);
            // 滑动到计时页面
            changeBoard(2);
            // 开始计时
            startTimer("work");    
        }
    })
    
    // 点击休息按钮，进入休息倒计时
    bindEvent(breakBtn, 'click', function(){
        changeBoard(2);
        startTimer("break");
    })
    
    // 点击 不用休息按钮，跳回第一个界面
    bindEvent(noBreakBtn, 'click', function(){
        changeBoard(1);
    })
}