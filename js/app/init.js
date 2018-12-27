/*!
 * @Description: 
 * @Author: jg
 * @Date: 2018-12-27 14:54:58
 * @LastEditors: jg
 * @LastEditTime: 2018-12-27 18:09:56
 */
'use strict';
var init = (function() {
  var loadOcx = function() {
    dahua.initOcx('dahuaOcx', {'width': '100%', 'height': '80%'});
  };

  return {
    loadOcx: loadOcx
  };
}());