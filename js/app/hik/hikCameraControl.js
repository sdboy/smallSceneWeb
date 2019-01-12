/*!
 * @Description 海康摄像机操作
 * @Author jg
 * @Date 2019-01-11 16:51:31
 * @LastEditors: jg
 * @LastEditTime: 2019-01-12 15:53:20
 */
'use strict';

var hikCameraControl = (function() {
  var selfOjb = {

  };

  var uninit = function() {
    oWebControl.JS_RequestInterface({
      funcName: "uninit"
    }).then(function (oData) {
      hikCommon.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
  };

  var destroyWnd = function() {
    uninit();
    oWebControl.JS_RequestInterface({
      funcName: "destroyWnd"
    }).then(function (oData) {
      hikCommon.showCBInfo(JSON.stringify(oData));
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

  var startPlayBack = function() {
    var cameraIndexCode  = $("#cameraIndexCode").val();
    var startTimeStamp = new Date($("#startTimeStamp").val().replace('-', '/')).getTime();
    var endTimeStamp = new Date($("#endTimeStamp").val().replace('-', '/')).getTime();
    var recordLocation = +$("#recordLocation").val();
    var transMode = +$("#transMode").val();
    var gpuMode = +$("#gpuMode").val();

    if (!cameraIndexCode) {
      hikCommon.showCBInfo("监控点编号不能为空！", 'error');
      return
    }

    if (Number.isNaN(+startTimeStamp) || Number.isNaN(+endTimeStamp)) {
      hikCommon.showCBInfo("时间格式有误！", 'error');
      return
    }

    oWebControl.JS_RequestInterface({
      funcName: "startPlayback",
      argument: JSON.stringify({
        cameraIndexCode: cameraIndexCode,
        startTimeStamp: Math.floor(startTimeStamp / 1000),
        endTimeStamp: Math.floor(endTimeStamp / 1000),
        recordLocation: recordLocation,
        transMode: transMode,
        gpuMode: gpuMode
      })
    }).then(function (oData) {
      hikCommon.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
  };

  var stopPlayBack = function() {
    oWebControl.JS_RequestInterface({
      funcName: "stopAllPlayback"
    }).then(function (oData) {
      hikCommon.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
  };

  var startPlayReal = function() {
    var cameraIndexCode  = $("#cameraIndexCode ").val();
    var streamMode = +$("#streamMode").val();
    var transMode = +$("#transMode").val();
    var gpuMode = +$("#gpuMode").val();

    if (!cameraIndexCode ) {
      hikCommon.showCBInfo("监控点编号不能为空！", 'error');
      return
    }

    oWebControl.JS_RequestInterface({
      funcName: "startPreview",
      argument: JSON.stringify({
        cameraIndexCode : cameraIndexCode ,
        streamMode: streamMode,
        transMode: transMode,
        gpuMode: gpuMode
      })
    }).then(function (oData) {
      hikCommon.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
  };

  var stopPlayReal = function() {
    oWebControl.JS_RequestInterface({
      funcName: "stopAllPreview"
    }).then(function (oData) {
      hikCommon.showCBInfo(JSON.stringify(oData ? oData.responseMsg : ''));
    });
  };

  return {
    uninit: uninit,
    destroyWnd: destroyWnd,
    setWndCover: setWndCover,
    startPlayBack: startPlayBack,
    stopPlayBack: stopPlayBack,
    startPlayReal: startPlayReal,
    stopPlayReal: stopPlayReal
  };
}());