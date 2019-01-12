'use strict';

var oWebControl = null;
var bIE = null;

$(document).ready(function() {
  bIE = (!!window.ActiveXObject || 'ActiveXObject' in window);
  $(window).unload(hikCameraControl.destroyWnd);
  $(window).resize(function () {
    if (oWebControl) {
      oWebControl.JS_Resize(600, 400);
      setWndCover();
    }
  });
  $(window).scroll(function () {
    if (oWebControl) {
      oWebControl.JS_Resize(600, 400);
      setWndCover();
    }
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