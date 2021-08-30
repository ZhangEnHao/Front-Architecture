/*!
 * mDriver JavaScript Library v1.2.1
 * https://mDriver.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://mDriver.org/license
 *
 * Date: 2021-04-16T17:24Z
 */
( function( global, factory ) {

	"use strict";
	
	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get mDriver.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var mDriver = require("mDriver")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "mDriver requires a window with a document" );
				}
				return factory( w , undefined);
			};
	} else {
		factory( global , undefined);
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

    // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
    // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
    // arguments.callee.caller (trac-13335). But as of mDriver 3.0 (2016), strict mode should be common
    // enough that all such attempts are guarded in a try block.
    "use strict";
    //单例模式
    var __instance__ = null;
    //配置项
    var __modules__ = {};

    var
        version = "1.2.1",

        // Define a local copy of mDriver
        mDriver = function( metaData, config ) {
            // The mDriver object is actually just the init constructor 'enhanced'
            // Need init if mDriver is called (just allow error to be thrown if not included)
            return mDriver.fn.init( metaData, config );
        };
     mDriver.fn = mDriver.prototype = {

        version: version,
    
        constructor: mDriver,

        load : function(metaData){//完成拆包分解并且实现渲染管理的
            this.fetch(metaData);
            this.refhresh(metaData);
        },
        fetch : function(metaData){//拆包
            for(var __module__ in metaData){
                __modules__[__module__].lock = !!(__modules__[__module__] && (__modules__[__module__].model =  metaData[__module__]));
            }
        },
        refhresh : function(metaData){//渲染
            for(var __module__ in __modules__){
                __modules__[__module__].lock = (__modules__[__module__].lock && __modules__[__module__].render?.());
            }
        }
    }
    var init = mDriver.fn.init = function( metaData, config ) {
        //初始化工作开始
        if(__instance__){
            throw new Error("单例模式不允许被多次实例化！");
        }
        __instance__ = this;
        __modules__ = config || __modules__;
        //...
        //初始化工作结束
        this.load(metaData);
    }
    //共享原型
    init.prototype = mDriver.fn;
    
    // Expose mDriver and $ identifiers, even in AMD
    // (#7102#comment:10, https://github.com/mDriver/mDriver/pull/557)
    // and CommonJS for browser emulators (#13566)
    if ( !noGlobal ) {
        window.ModuleDriver = window.$m = mDriver;
    }

    return mDriver;
} );
