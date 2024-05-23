// 数据类型判断
export const typeJudgment = (data) => {
    let toString = Object.prototype.toString;

    let dataType =
        data instanceof Element
            ? "element" //  统一 DOM 节点类型输出
            : toString
                  .call(data)
                  .replace(/\[object\s(.+)]/, "$1")
                  .toLowerCase();

    return dataType;
};

// 是否是某数据类型
export const dataType = (function (value) {
    let typeJson = {
        isNumber: "Number",
        isBoolean: "Boolean",
        isString: "String",
        isNull: "Null",
        isUndefinde: "Undefined",
        isSymbol: "Symbol",
        isPlainObject: "Object",
        isArray: "Array",
        isRegExp: "RegExp",
        isDate: "Date",
        isFunction: "Function",
        isWindow: "Window",
        isSet: "Set",
        isWeakSet: "WeakSet",
        isMap: "Map",
        isWeakMap: "WeakMap",
        isPromise: "Promise", // Object.prototype.toString.call(new Promise(function(){})) => "[object Promise]"
    };

    let dataType = {};

    for (let key in typeJson) {
        if (!typeJson.hasOwnProperty(key)) break;

        dataType[key] = (function () {
            let reg = new RegExp("\\[obgect " + typeJson[key] + "\\");
            return function anonymous(value) {
                return reg.test(toString.call(value));
            };
        })();
    }

    return dataType;
})();
