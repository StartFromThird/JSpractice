"use strict";
var Components;
(function (Components) {
    var Body = /** @class */ (function () {
        function Body() {
            var ele = document.createElement("div");
            ele.innerHTML = "components / body";
            document.body.appendChild(ele);
        }
        return Body;
    }());
    Components.Body = Body;
    // 子命名空间
    var SubComponents;
    (function (SubComponents) {
        var sub = /** @class */ (function () {
            function sub() {
                console.log("子命名空间");
            }
            return sub;
        }());
        SubComponents.sub = sub;
    })(SubComponents = Components.SubComponents || (Components.SubComponents = {}));
})(Components || (Components = {}));
// 依赖声明 (功能上可以不写)
/// <reference path='./components.ts' />
var Home;
(function (Home) {
    var Header = /** @class */ (function () {
        function Header() {
            var ele = document.createElement("div");
            ele.innerHTML = "head";
            document.body.appendChild(ele);
        }
        return Header;
    }());
    var Page = /** @class */ (function () {
        function Page() {
            this.user = {
                name: "Alex"
            };
            new Header();
            // 命名空间引用
            new Components.Body();
            // 命名空间
            new Components.SubComponents.sub();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
