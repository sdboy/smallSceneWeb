/*!
 * @Description: 摄像机操作
 * @Author: jg
 * @Date: 2018-12-28 09:54:59
 * @LastEditors: jg
 * @LastEditTime: 2018-12-28 09:55:04
 */
'use strict';

var cameraControl = (function() {
  var selfObj = {
    
  };

  /**
   * @description 根据窗口号播放视频
   * @method previewByWndNo
   * @param { String } nWndNo 窗口序号，从0开始
   * @param { String } szCameraId 通道ID
   * @param { String } nStreamType 码流类型1：主码流，2：辅码流
   * @param { String } nMediaType 媒体类型1：视频，2：音频，3：视频+音频
   * @param { String } nTransType 传输类型0：UDP协议，1：TCP协议
   * @return { Null } 
   * @author jg
   * @Date 2018-12-28 10:05:35
   * @LastEditors: jg
   * @LastEditTime: Do not edit
   */
  var previewByWndNo = function(nWndNo, szCameraId, nStreamType, 
    nMediaType, nTransType) {
    try {
      var result = dahua.selfObj.ocxObj.DPSDK_DirectRealplayByWndNo(
        init.selfObj.gWndId, nWndNo, szCameraId, nStreamType, 
        nMediaType, nTransType);
      return result;
    } catch (error) {
      return -1;
    }
    
  };

  /**
   * @description 根据当前选中的窗口播放视频
   * @method previewBySelWnd
   * @param { String } nWndNo 当前选中的窗口号
   * @param { String } szCameraId 通道ID
   * @param { String } nStreamType 码流类型1：主码流，2：辅码流
   * @param { String } nMediaType 媒体类型1：视频，2：音频，3：视频+音频
   * @param { String } nTransType 传输类型0：UDP协议，1：TCP协议
   * @return { Null } 
   * @author jg
   * @Date 2018-12-28 10:04:20
   * @LastEditors: jg
   * @LastEditTime: Do not edit
   */
  var previewBySelWnd = function(szCameraId, nStreamType, 
    nMediaType, nTransType) {
    try {
      var nWndNo = dahua.selfObj.ocxObj.DPSDK_GetSelWnd(init.selfObj.gWndId);
      var nWnd = obj.DPSDK_GetWndVideoHandle(init.selfObj.gWndId, nWndNo);
      var nResult = obj.DPSDK_DirectRealplayByHWND(nWnd, szCameraId, 
        nStreamType, nMediaType, nTransType);
      return nResult;
    } catch (error) {
      return -1;
    }
  };

  return {
    previewByWndNo: previewByWndNo,
    previewBySelWnd: previewBySelWnd
  };
}());