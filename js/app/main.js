'use strict';

$(document).ready(function() {
  $('#loadDepartment').off().on('click', function() {
    cameraTree.loadDepartment('xmlContent');
  });
  $('#analysisDepartment').off().on('click', function() {
    var xmlStr = $('#xmlContent').val();
    xmlStr = xmlStr.replace(/[\t\n]/g, '');
    var xmlDoc = cameraTree.analysisDepartment(xmlStr);
    cameraTree.syncDepartment(xmlDoc);
  });
});