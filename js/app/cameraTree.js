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

  /**
   * @description 解析组织树xml
   * @method analysisDepartment
   * @param { String } xmlStr 文本
   * @return { Object } xmlDoc对象
   * @author jg
   * @Date: 2019-01-08 17:14:15
   * @LastEditors: jg
   * @LastEditTime: Do not edit
   */
  var analysisDepartment = function(xmlStr) {
    var xmlDom = null;
    // 支持IE浏览器
    if(!window.DOMParser && window.ActiveXObject){
      var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 
        'MSXML.2.DOMDocument.3.0', 
        'Microsoft.XMLDOM'];
      for(var i = 0; i < xmlDomVersions.length; i++){
        try{
          xmlDom = new ActiveXObject(xmlDomVersions[i]);
          xmlDom.async = false;
          xmlDom.loadXML(xmlStr);
          break;
        }catch(e){

        }
      }
    }else if(window.DOMParser && document.implementation && 
      document.implementation.createDocument){
      try{
        var domParser = new  DOMParser();
        xmlDom = domParser.parseFromString(xmlStr, 'text/xml');
      }catch(e){

      }
    }
    return xmlDom;
  };

  /**
   * @description 将数据同步到数据库
   * @method syncDepartment
   * @param { String } xmlDoc xml对象
   * @return { Null } 
   * @author jg
   * @Date: 2019-01-08 18:14:59
   * @LastEditors: jg
   * @LastEditTime: Do not edit
   */
  var syncDepartment = function(xmlDoc) {
    if(xmlDoc) {
      var element = xmlDoc.getElementsByTagName("Organization");
    }
  };

  return {
    selfObj: selfObj,
    loadDepartment: loadDepartment,
    analysisDepartment: analysisDepartment,
    syncDepartment: syncDepartment
  };
}());