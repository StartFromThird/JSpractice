// 倒计时界面
var startTimer = function(state){
    // 获取 倒计时 时间间隔，
    // switch(state){
    //     case "work":
    //     var timeGap = getSettingObj().workTime;
    //     break;
    //     case "break":
    //     var timeGap = getSettingObj().restTime;
    //     break;
    //     // default:
    // }
    var timeGap = getSettingObj()[`${state}Time`];
    // console.log(timeGap);
    
    // 计时开始时间，计时结束时间 不限制是work状态
    var workBeginTime, workEndTime;
    // 在这计算开始结束时间, 可能会使得第一秒显示时间非常短
    // var workBeginTime = new Date();
    // workBeginTime = Math.ceil((workBeginTime.getTime()) / 1000) * 1000;
    // var workEndTime = workBeginTime + 1000 * 60 * timeGap;

    // 标记第一秒
    var isFirst = 1;

    // 计算剩余秒数
    var leftTime = function(){
        var now = new Date();
        var leftSeconds = (workEndTime - now.getTime()) / 1000;
        return leftSeconds;
    }
    
    // 显示 剩余时间数字 22:56
    var showLeftTime = function(leftS){
        // 传入时间 和 此时再取时间 相差只有一两毫秒, 可忽略, 故直接传入
        // var now = new Date();
        // var leftTime = (workEndTime - now.getTime()) / 1000;
        // var leftS = leftTime();
        // console.log("t",leftS);
        // 60.31 -- 01:00
        // 123.31 -- 02:03
        var leftMin = doubleDigitStr(Math.floor(leftS / 60));
        var leftSec = doubleDigitStr(Math.floor(leftS % 60));
        var leftTimeHtml = leftMin + ':' + leftSec;
        leftTimeBox.innerHTML = leftTimeHtml;
        // console.log("c",leftTimeHtml);
        
    }
    // setInterval(showLeftTime,200);
    
    // 剩余时间弧线
    var showProcessCurve = function(leftS){
        var leftS = Math.floor(leftS);
        var leftPrecent = leftS / (timeGap * 60);
        // console.log("S1", leftS, leftPrecent);

        // canvas画弧线
        var ctx = processCurve.getContext("2d");
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        var r = width/2;
        var ox = width/2;
        var oy = height/2;
        var drawCurve = function(){
            ctx.save();
            ctx.translate(ox, oy);
            ctx.beginPath();
            ctx.strokeStyle = '#f00';
            ctx.lineWidth = 4;
            ctx.arc(0, 0, r , -0.5 * Math.PI, ((1 - leftPrecent) * 2 - 0.5) * Math.PI, false);
            ctx.stroke();  
            ctx.restore();   
        }
        var draw = function(){
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            drawCurve();
            ctx.restore();
        }
        draw();   
    }
    // showProcessCurve();

    // 定时刷新
    var intervalFF = setInterval(function(){ check() }, 500);
    var check = function(){
        // 判断是否是第一次执行
        // 若是第一次, 计算计时开始时间，计时结束时间
        if(isFirst == 1){
            workBeginTime = new Date();
            workBeginTime = Math.ceil((workBeginTime.getTime()) / 1000) * 1000;
            workEndTime = workBeginTime + 1000 * 60 * timeGap;
            isFirst++;
        }

        // 剩余时间判断是否继续        
        var leftS = leftTime();
        if(leftS > 0){
            // 显示剩余时间数字 22:56 & 曲线
            showLeftTime(leftS);
            showProcessCurve(leftS);
        }else{
            // 倒计时结束后, 停止显示计时, 清除计时器
            // 工作结束滑动到 界面三
            // 休息结束滑动到 界面一
            showLeftTime(0);
            clearInterval(intervalFF);

            if($(".giveUpButton")){            
                var del = $(".giveUpButton");
                timerMask.removeChild(del); 
            }

            switch(state){
                case "work":
                changeBoard(3);
                break;
                case "break":
                changeBoard(1);
                break;
            }
        }              
    }

    // 点击timerMask 弹出中途放弃按钮 
    timerMask.onclick = function(){
        // console.log("toggle", Boolean($(".giveUpButton")));
        // 取消 放弃按钮
        if($(".giveUpButton")){            
            var del = $(".giveUpButton");
            timerMask.removeChild(del);    
        }else{
            // 显示 放弃按钮
            // console.log("button show")
            var timeGap = getSettingObj()[`${state}Time`];

            var timeGap = getSettingObj()[`${state}Time`];
            
            var html = '<div class="giveUpButton">放弃？ (ಥ _ ಥ) </div>'; 
            appendHtml(timerMask, html);

            // 放弃按钮添加事件
            var clickGiveUpButton = function(){
                // console.log("real giveUp");
                clearInterval(intervalFF);
                changeBoard(1);
                // 显示时间，曲线归零
                showLeftTime(0);
                showProcessCurve(0);
            }
            $(".giveUpButton").addEventListener('click', clickGiveUpButton, false);
        }  
    }
    // 中途放弃按钮绑定 不能这么写
    // 每次调用startTimer, timerMask都多加一个 addEventListener 事件，
    // 导致 第N次 点击timerMask时，相当于 连续点击N次 timerMask
    // timerMask.addEventListener('click', function(){
    //     console.log("toggle", Boolean($(".giveUpButton")));
    //     // 取消 放弃按钮
    //     if($(".giveUpButton")){    
    //         console.log("button hide");        
    //         var del = $(".giveUpButton");
    //         timerMask.removeChild(del);    
    //     }else{
    //         // 显示 放弃按钮
    //         console.log("button show");
    //         timerMask.insertAdjacentHTML("beforeend", '<div class="giveUpButton">放弃？ (ಥ _ ಥ) </div>');
    //         console.log("button append",timerMask);
    //         // 放弃按钮添加事件
    //         $(".giveUpButton").addEventListener('click', function(event){
    //             console.log("bb real giveUp");
    //             clearInterval(intervalFF);
    //             changeBoard(1);
    //             // 显示时间，曲线归零
    //             showLeftTime(0);
    //             showProcessCurve(0);
    //             // 事件冒泡可以删除 放弃按钮 ，不用单独写了
    //             event.stopPropagation();
    //             timerMask.removeChild($(".giveUpButton"));   
                
    //         });
    //     }          
    // })
};


