'use strict';

var oWebControl = null;
var bIE = null;

$(document).ready(function() {

  var endTime = dateUtil.dateFormat(new Date(), "yyyy-MM-dd 23:59:59");
  var startTime = dateUtil.dateFormat(new Date(), "yyyy-MM-dd 00:00:00");
  $("#startTimeStamp").val(startTime);
  $("#endTimeStamp").val(endTime);

  bIE = (!!window.ActiveXObject || 'ActiveXObject' in window);
  $(window).unload(hikCameraControl.destroyWnd);
  $(window).resize(function () {
    if (oWebControl) {
      oWebControl.JS_Resize(600, 400);
      hikCameraControl.setWndCover();
    }
  });
  $(window).scroll(function () {
    if (oWebControl) {
      oWebControl.JS_Resize(600, 400);
      hikCameraControl.setWndCover();
    }
  });
  $("#init").click(function () {
    hikCommon.getPubKey(init.initHik);
  });

  $("#uninit").click(hikCameraControl.uninit);

  $("#startPlayback").click(hikCameraControl.startPlayBack);

  $("#stopAllPlayback").click(hikCameraControl.stopPlayBack);

  $("#clear").click(function() {
    $("#cbInfo").html('');
  });

  $('#loadDepartment').off().on('click', function() {
    cameraTree.loadDepartment('xmlContent');
  });
  $('#analysisDepartment').off().on('click', function() {
    var xmlStr = $('#xmlContent').val();
    xmlStr = xmlStr.replace(/[\t\n]/g, '');
    var xmlDoc = cameraTree.analysisDepartment(xmlStr);
    cameraTree.syncDepartment($('#dahuaCameraList'), xmlDoc);
  });
});