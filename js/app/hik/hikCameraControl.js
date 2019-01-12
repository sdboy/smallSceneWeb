'use strict';

var hikCameraControl = (function() {
  var selfOjb = {

  };

  var uninit = function() {
    oWebControl.JS_RequestInterface({
      funcName: "uninit"
    }).then(function (oData) {
      showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
  };

  var destroyWnd = function() {
    uninit();
    oWebControl.JS_RequestInterface({
      funcName: "destroyWnd"
    }).then(function (oData) {
      showCBInfo(JSON.stringify(oData));
    });
    if (bIE) {
      if (oWebControl != null) {
        oWebControl.JS_Disconnect().then(function () {
            console.log("JS_Disconnect");
        }, function () {});
      }
    } else{
      if (oWebControl != null) {
        oWebControl.JS_DestroyWnd().then(function () {
          console.log("JS_DestroyWnd");
        }, function () {});
        oWebControl.JS_StopService("window").then(function () {
          oWebControl.JS_Disconnect().then(function () {
            console.log("JS_Disconnect");
          }, function () {});
        });
      }
    }
  };

  var setWndCover = function() {
    var iWidth = $(window).width();
    var iHeight = $(window).height();
    var oDivRect = $("#playWnd").get(0).getBoundingClientRect();

    var iCoverLeft = (oDivRect.left < 0) ? Math.abs(oDivRect.left): 0;
    var iCoverTop = (oDivRect.top < 0) ? Math.abs(oDivRect.top): 0;
    var iCoverRight = (oDivRect.right - iWidth > 0) ? Math.round(oDivRect.right - iWidth) : 0;
    var iCoverBottom = (oDivRect.bottom - iHeight > 0) ? Math.round(oDivRect.bottom - iHeight) : 0;

    iCoverLeft = (iCoverLeft > 600) ? 600 : iCoverLeft;
    iCoverTop = (iCoverTop > 400) ? 400 : iCoverTop;
    iCoverRight = (iCoverRight > 600) ? 600 : iCoverRight;
    iCoverBottom = (iCoverBottom > 400) ? 400 : iCoverBottom;

    if (iLastCoverLeft != iCoverLeft) {
      console.log("iCoverLeft: " + iCoverLeft);
      iLastCoverLeft = iCoverLeft;
      oWebControl.JS_SetWndCover("left", iCoverLeft);
    }
    if (iLastCoverTop != iCoverTop) {
      console.log("iCoverTop: " + iCoverTop);
      iLastCoverTop = iCoverTop;
      oWebControl.JS_SetWndCover("top", iCoverTop);
    }
    if (iLastCoverRight != iCoverRight) {
      console.log("iCoverRight: " + iCoverRight);
      iLastCoverRight = iCoverRight;
      oWebControl.JS_SetWndCover("right", iCoverRight);
    }
    if (iLastCoverBottom != iCoverBottom) {
      console.log("iCoverBottom: " + iCoverBottom);
      iLastCoverBottom = iCoverBottom;
      oWebControl.JS_SetWndCover("bottom", iCoverBottom);
    }
  };

  var getPubKey = function() {
    oWebControl.JS_RequestInterface({
      funcName: "getRSAPubKey",
      argument: JSON.stringify({
        keyLength: 1024
      })
    }).then(function (oData) {
      console.log(oData)
      if (oData.responseMsg.data) {
        pubKey = oData.responseMsg.data
        callback()
      }
    });
  };

  var setEncrypt = function() {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pubKey);
    return encrypt.encrypt(value);
  };

  return {
    uninit: uninit,
    destroyWnd: destroyWnd,
    setWndCover: setWndCover,
    getPubKey: getPubKey,
    setEncrypt: setEncrypt
  };
}());