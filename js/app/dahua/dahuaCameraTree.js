/*!
 * @Description 摄像机组织结构处理
 * @Author: jg
 * @Date: 2019-01-08 15:10:57
 * @LastEditors: jg
 * @LastEditTime: 2019-01-08 15:12:47
 */
'use strict';

var dahuaCameraTree = (function() {
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
  var syncDepartment = function(domNode, xmlDoc) {
    var department = null;
    var device = null;
    if(xmlDoc) {
      var element = xmlDoc.getElementsByTagName("Organization")[0];
      if(element.hasChildNodes()) {
        var childNode = element.childNodes;
        for(var i = 0; i < childNode.length; i++) {
          if(childNode[i].nodeName === 'Department') {
            department = childNode[i];
          }else if(childNode[i].nodeName === 'Devices') {
            device = childNode[i];
          }
        }
        generatePage(domNode, department, device, 1);
      }
    }
  };

  var generatePage = function(domNode, department, device, level) {
    var nextLevel = level + 1;
    // todo 在此节点下挂设备
    if(department) {
      var coding = department.getAttribute('coding');
      var name =  department.getAttribute('name');
      var tree = '<ul class="ui-tree-ul"> ' + 
        '<li class="camera_node camera_node_level_' + level + '" id="cameraNodeLevel_' + coding + '" data-indexCode="' + coding + '" data-isparent="true"> ' + 
        '<span class="ui-left-box"> ' + 
        '<i class="ui-tree-btn-bottom ui-tree-btn-right expand_button dahuaCamera close" data-load="false"></i> ' + 
        '</span>' + 
        '<span class="ui-right-box"> ' + 
        '<i class="j-father-node icon-eye-close"></i> ' +
        '</span> ' + 
        '<a class="ui-middle-box camera_icon_name camera_name_level_' + level + '"> ' + 
        '<span class="camera_icon icon_open"></span> ' + 
        '<span class="camera_name" title="' + name + '" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + name + '</span> ' + 
        '</a> ' + 
        '<ul class="ui-tree-ul camera_node_childs camera_node_childs_level_' + nextLevel + '" style="display: none" data-level="' + nextLevel + '"> ' + 
        '</ul> ' + 
        '</li> ' + 
        '</ul>';
      $(domNode).append(tree);
      
      if(department.hasChildNodes()) {
        var childNode = department.childNodes;
        for(var i = 0; i < childNode.length; i++) {
          if(childNode[i].nodeName === 'Device') {
            
          }else if(childNode[i].nodeName === 'Department') {

          }
        }
      }else {

      }
      // 如果设备存在，判断此节点是否有设备
      if(device) {

      }


    }

  };

  return {
    selfObj: selfObj,
    loadDepartment: loadDepartment,
    analysisDepartment: analysisDepartment,
    syncDepartment: syncDepartment,
    generatePage: generatePage
  };
}());