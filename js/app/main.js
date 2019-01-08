'use strict';

$(document).ready(function() {
  $('#loadDepartment').off().on('click', function() {
    cameraTree.loadDepartment('xmlContent')
  });
});