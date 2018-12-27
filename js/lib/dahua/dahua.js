/*
 * @Description: 
 * @Author: jg
 * @Date: 2018-12-27 14:55:56
 * @LastEditors: jg
 * @LastEditTime: 2018-12-27 18:00:03
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
    selfObj.ocxObj = document.createElement('object');
    selfObj.ocxObj.classsid = 'CLSID:D3E383B6-765D-448D-9476-DFD8B499926D';
    selfObj.ocxObj.events = 'true';
    selfObj.ocxObj.width = this.option.width || '100%';
    selfObj.ocxObj.height = this.option.height || '100%';
    selfObj.ocxObj.id = this.option.id || 'DPSDK_OCX';
    try{
      document.getElementById(domId).appendChild(selfObj.ocxObj);
    }catch(e){
      alert("请利用容器DIV创建地图");
    }
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

  return {
    selfObj: selfObj,
    initOcx: initOcx,
    login: login,
    logout: logout
  };
}());