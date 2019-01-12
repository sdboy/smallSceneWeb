/*!
 * @Description: 海康共享函数
 * @Author: jg
 * @Date: 2019-01-11 17:58:19
 * @LastEditors: jg
 * @LastEditTime: 2019-01-12 16:17:41
 */
'use strict';

var hikCommon = (function() {
  var selfObj = {
    'pubKey': ''
  };

  var getPubKey = function(callback) {
    oWebControl.JS_RequestInterface({
      funcName: "getRSAPubKey",
      argument: JSON.stringify({
        keyLength: 1024
      })
    }).then(function (oData) {
      console.log(oData)
      if (oData.responseMsg.data) {
        selfObj.pubKey = oData.responseMsg.data
        callback();
      }
    });
  };

  var setEncrypt = function(value) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(selfObj.pubKey);
    return encrypt.encrypt(value);
  };

  var showCBInfo = function(szInfo, type) {
    if (type === 'error') {
      szInfo = "<div style='color: red;'>" + dateUtil.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo + "</div>";
    } else {
      szInfo = "<div>" + dateUtil.dateFormat(new Date(), "yyyy-MM-dd hh:mm:ss") + " " + szInfo + "</div>";
    }
    $("#cbInfo").html(szInfo + $("#cbInfo").html());
  };

  var setCallbacks = function() {
    oWebControl.JS_SetWindowControlCallback({
      cbIntegrationCallBack: cbIntegrationCallBack
    });
  };

  var cbIntegrationCallBack = function(oData) {
    showCBInfo(JSON.stringify(oData.responseMsg));
  };

  return {
    getPubKey: getPubKey,
    setEncrypt: setEncrypt,
    showCBInfo: showCBInfo,
    setCallbacks: setCallbacks,
    cbIntegrationCallBack: cbIntegrationCallBack
  };
}());