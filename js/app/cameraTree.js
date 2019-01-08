/*!
 * @Description 摄像机组织结构处理
 * @Author: jg
 * @Date: 2019-01-08 15:10:57
 * @LastEditors: jg
 * @LastEditTime: 2019-01-08 15:12:47
 */
'use strict';

var cameraTree = (function() {
  var selfObj = {

  };

  /**
   * @description 加载组织信息到页面中
   * @method loadDepartment
   * @param { String } domId 容器id
   * @return { Null }
   * @author jg
   * @Date 2019-01-08 15:14:50
   * @LastEditors: jg
   * @LastEditTime: Do not edit
   */
  var loadDepartment = function(domId) {
    try {
      var result = dahua.selfObj.ocxObj.DPSDK_LoadDGroupInfo();
      if(result === 0) {
        var xmlDoc = dahua.selfObj.ocxObj.DPSDK_GetDGroupStr();
        if(xmlDoc) {
          $('#' + domId).val(xmlDoc);
        }else {
          $('#' + domId).val(加载失败);
        }
      }
    }catch (e) {

    }
  };

  return {
    selfObj: selfObj,
    loadDepartment: loadDepartment
  };
}());