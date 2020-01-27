// @flow
import getAppAndVersion from "./getAppAndVersion";
import firmwarePrepare from "./firmwarePrepare";
import firmwareMain from "./firmwareMain";
import firmwareRepair from "./firmwareRepair";
import flushDevice from "./flushDevice";
import getAddress from "./getAddress";
import getDeviceInfo from "./getDeviceInfo";
import getLatestFirmwareForDevice from "./getLatestFirmwareForDevice";
import libcoreGetVersion from "./libcoreGetVersion";
import libcoreReset from "./libcoreReset";
import listenDevices from "./listenDevices";
import listApps from "./listApps";
import ping from "./ping";
import connectManager from "./connectManager";
import testApdu from "./testApdu";
import testCrash from "./testCrash";
import testInterval from "./testInterval";
import appOpExec from "./appOpExec";
import { commands as bridgeProxyCommands } from "~/renderer/bridge/proxy-commands";

export const commandsById = {
  appOpExec,
  ...bridgeProxyCommands,
  getAppAndVersion,
  firmwarePrepare,
  firmwareMain,
  firmwareRepair,
  flushDevice,
  getAddress,
  getDeviceInfo,
  getLatestFirmwareForDevice,
  libcoreGetVersion,
  libcoreReset,
  listenDevices,
  connectManager,
  listApps,
  ping,
  testApdu,
  testCrash,
  testInterval,
};

export type Commands = typeof commandsById;
export type CommandFn<Id: $Keys<Commands>> = $ElementType<Commands, Id>;
