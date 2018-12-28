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
    var ocxObj = dahua.initOcx('dahuaOcx', {'width': '100%', 'height': '80%'});
    selfObj.gWndId = ocxObj.DPSDK_CreateSmartWnd(0, 0, 100, 100);
    ocxObj.DPSDK_SetWndCount(selfObj.gWndId, 4);  
    ocxObj.DPSDK_SetSelWnd(selfObj.gWndId, 0);
    dahua.on('OnWndLBtnClick', getWndNum);
  };

  var getWndNum = function(nWndId, nWndNo, xPos, yPos) {
    alert('主：' + nWndId + ' 选中：' + nWndNo);

  };

  return {
    loadOcx: loadOcx
  };
}());