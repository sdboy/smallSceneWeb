'use strict';

var hikPlayBack = (function() {
  var selfObj = function() {

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
    setCallbacks: setCallbacks,

  };
}());