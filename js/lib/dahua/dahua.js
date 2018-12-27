/*
 * @Description: 
 * @Author: jg
 * @Date: 2018-12-27 14:55:56
 * @LastEditors: jg
 * @LastEditTime: 2018-12-27 20:00:12
 */

'use strict';

var dahua = (function() {
  var selfObj = {
    'ocxObj': null,
    'logStatus': false
  };
  
  /**
   * @description 初始化视频控件
   * @method initOcx
   * @param { String } domId 容器domid
   * @param { Object } option 参数集合width是宽度，height是高度，id是domid
   * @return 控件对象
   * @author jg
   * @Date 2018-12-27 17:09:51
   * @LastEditors jg
   * @LastEditTime: Do not edit
   */
  var initOcx = function(domId, option) {
    this.option = option;
    var ocx = document.createElement('object');
    ocx.classid = 'CLSID:D3E383B6-765D-448D-9476-DFD8B499926D';
    ocx.events = 'true';
    ocx.width = this.option.width || '100%';
    ocx.height = this.option.height || '100%';
    ocx.id = this.option.id || 'DPSDK_OCX';
    ocx.codebase = "DpsdkOcx.cab#version=1.0.0.0";
    try{
      document.getElementById(domId).appendChild(ocx);
    }catch(e){
      alert("请利用容器DIV创建地图");
    }
    selfObj.ocxObj = ocx;
    return selfObj.ocxObj;
  };

  /**
   * @description 登录平台
   * @method login
   * @param { String } szServerIp 服务器ip
   * @param { String } nPort 端口
   * @param { String } szUsername 用户名
   * @param { String } szPassword 密码
   * @return { Number } 结果代码
   * @author jg
   * @Date 2018-12-27 17:42:35
   * @LastEditors jg
   * @LastEditTime Do not edit
   */
  var login = function(szServerIp, nPort, szUsername, szPassword) {
    try {
      var result = selfObj.ocxObj.
        DPSDK_Login(szServerIp, nPort, szUsername, szPassword);
      if(result === 0) {
        selfObj.logStatus = true;
        return 0;
      }else {
        return selfObj.ocxObj.DPSDK_GetLastError();
      }
    }catch(error) {
      return -1;
    }
  };

  /**
   * @description 登出平台
   * @method logout
   * @return 结果代码
   * @author jg
   * @Date 2018-12-27 17:55:39
   * @LastEditors jg
   * @LastEditTime Do not edit
   */
  var logout = function() {
    try {
      var result = selfObj.ocxObj.DPSDK_Logout();
      if(result === 0) {
        selfObj.logStatus = false;
          return 0;
      }else {
        return selfObj.ocxObj.DPSDK_GetLastError();
      }
    } catch (error) {
      return -1;
    }
  };

  /**
   * @description 添加事件
   * @method on
   * @param { String } 事件名
   * @param { Object } 函数对象
   * @return { Null }
   * @author jg
   * @Date 2018-12-27 19:57:53
   * @LastEditors: jg
   * @LastEditTime: Do not edit
   */
  var on = function(event, func) {
    if(selfObj.ocxObj.attachEvent){
      selfObj.ocxObj.attachEvent(event, func);
    }else if(selfObj.ocxObj.addEventListener){
      selfObj.ocxObj.addEventListener(event, func, false);
    }else{
      alert("failed to attach event");
    }
  };

  /**
   * @description 删除事件
   * @method off
   * @param { String } 事件名
   * @param { Object } 函数对象
   * @return { Null }
   * @author jg
   * @Date 2018-12-27 19:59:30
   * @LastEditors: jg
   * @LastEditTime: Do not edit
   */
  var off = function(event, func) {
    if(selfObj.ocxObj.detachEvent){
      selfObj.ocxObj.detachEvent(event, func);
    }else if(selfObj.ocxObj.removeEventListener){
      selfObj.ocxObj.removeEventListener(event, func, false);
    }else{
      alert("failed to remove event");
    }
  };

  return {
    selfObj: selfObj,
    initOcx: initOcx,
    login: login,
    logout: logout,
    on: on,
    off: off
  };
}());