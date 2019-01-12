/*!
 * @Description: 
 * @Author: jg
 * @Date: 2018-12-27 14:54:58
 * @LastEditors: jg
 * @LastEditTime: 2018-12-27 18:09:56
 */
'use strict';
var init = (function() {
  var selfObj = {
    'gWndId': null,
  };

  var loadOcx = function() {
    var ocxObj = dahua.initOcx('dahuaOcx', {'width': '25%', 'height': '100%'});
    dahua.login(config.camera.ip, config.camera.port, config.camera.username, 
      config.camera.password);
    selfObj.gWndId = ocxObj.DPSDK_CreateSmartWnd(0, 0, 100, 100);
    ocxObj.DPSDK_SetWndCount(selfObj.gWndId, 4);  
    ocxObj.DPSDK_SetSelWnd(selfObj.gWndId, 0);
    dahua.on('OnWndLBtnClick', getWndNum);
  };

  var getWndNum = function(nWndId, nWndNo, xPos, yPos) {
    alert('主：' + nWndId + ' 选中：' + nWndNo);

  };

  var initHikWnd = function() {
    oWebControl = new WebControl({
      szPluginContainer: "playWnd",
      iServicePortStart: 15900,
      iServicePortEnd: 15909,
      cbConnectSuccess: function () {
        setCallbacks();
        oWebControl.JS_StartService("window", {
          dllPath: "./VideoPluginConnect.dll"
          //dllPath: "./DllForTest-Win32.dll"
        }).then(function () {
          oWebControl.JS_CreateWnd("playWnd", 600, 400).then(function () {
            console.log("JS_CreateWnd success");
          });
        }, function () {
        
        });
      },
      cbConnectError: function () {
        console.log("cbConnectError");
        oWebControl = null;
        $("#playWnd").html("插件未启动，正在尝试启动，请稍候...");
        WebControl.JS_WakeUp("VideoWebPlugin://");
        initCount ++;
        if (initCount < 3) {
          setTimeout(function () {
            initPlugin();
          }, 3000)
        } else {
          $("#playWnd").html("插件启动失败，请检查插件是否安装！");
        }
      },
      cbConnectClose: function () {
        console.log("cbConnectClose");
        oWebControl = null;
      }
    });
  };

  return {
    loadOcx: loadOcx,
    initHik: initHik,
    initHikWnd: initHikWnd
  };
}());