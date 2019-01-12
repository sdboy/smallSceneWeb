'use strict';

var hikPlayReal = (function() {
  var selfObj = {

  };

  var setCallbacks = function() {
    oWebControl.JS_SetWindowControlCallback({
      cbIntegrationCallBack: cbIntegrationCallBack
    });
  };

  var cbIntegrationCallBack = function() {
    hikCommon.showCBInfo(JSON.stringify(oData.responseMsg));
  };
  
  return {
    setCallbacks: setCallbacks,
    cbIntegrationCallBack: cbIntegrationCallBack
  };
}());