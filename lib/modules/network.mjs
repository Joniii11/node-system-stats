import mod from "./network.js";

export default mod;
export const getDownloadSpeed = mod.getDownloadSpeed;
export const getNetworkInterfaces = mod.getNetworkInterfaces;
export const getNetworkStats = mod.getNetworkStats;
export const getPrimaryInterface = mod.getPrimaryInterface;
export const getPrimaryIpAddress = mod.getPrimaryIpAddress;
export const getTotalBytesReceived = mod.getTotalBytesReceived;
export const getTotalBytesSent = mod.getTotalBytesSent;
export const getUploadSpeed = mod.getUploadSpeed;
export const isNetworkConnected = mod.isNetworkConnected;
export const startNetworkMonitoring = mod.startNetworkMonitoring;
export const stopNetworkMonitoring = mod.stopNetworkMonitoring;
