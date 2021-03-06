// @flow
import React, { memo, useCallback, useMemo } from "react";
import styled from "styled-components";
import { Trans } from "react-i18next";

import type { App } from "@ledgerhq/live-common/lib/types/manager";
import type { Action } from "@ledgerhq/live-common/lib/apps/types";

import manager from "@ledgerhq/live-common/lib/manager";

import ConfirmModal from "~/renderer/modals/ConfirmModal/index";
import LinkIcon from "~/renderer/icons/LinkIcon";

const IconsSection = styled.div`
  padding-top: ${p => p.theme.space[5]}px;
  height: ${p => p.theme.space[7]}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;
  margin: ${p => p.theme.space[2]}px 0px;
`;

const Separator = styled.div`
  margin: 0 ${p => p.theme.space[1]}px;
  width: ${p => p.theme.space[4]}px;
  height: 0px;
  border-bottom: 2px dashed ${p => p.theme.colors.palette.action.hover};
`;

const LinkIconWrapper = styled.div`
  padding: ${p => p.theme.space[1]}px;
  box-sizeing: content-box;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: ${p => p.theme.colors.palette.primary.main};
  background-color: ${p => p.theme.colors.palette.action.hover};
`;

type Props = {
  app?: App,
  appList: App[],
  dispatch: Action => void,
  onClose: () => void,
};

const AppDepsInstallModal = ({ app, appList, dispatch, onClose }: Props) => {
  const name = useMemo(() => app && app.name, [app]);
  const dependencies = useMemo(() => app && app.dependencies, [app]);

  const onConfirm = useCallback(() => {
    if (name) dispatch({ type: "install", name });
    onClose();
  }, [dispatch, name, onClose]);

  const dependentApp = useMemo(
    () => dependencies && appList.find(a => dependencies.includes(a.name)),
    [appList, dependencies],
  );

  /** if no app with dependencies was triggered to be installed we dont show anything */
  if (!app || !dependentApp) return null;

  return (
    <ConfirmModal
      analyticsName="ManagerConfirmationDeps"
      isOpened={!!app}
      onReject={onClose}
      onClose={onClose}
      onConfirm={onConfirm}
      centered
      title={
        <IconsSection>
          <img alt="" src={manager.getIconUrl(app.icon)} width={40} height={40} />
          <Separator />
          <LinkIconWrapper>
            <LinkIcon size={20} />
          </LinkIconWrapper>
          <Separator />
          {<img alt="" src={manager.getIconUrl(dependentApp.icon)} width={40} height={40} />}
        </IconsSection>
      }
      subTitle={
        <Trans
          i18nKey="manager.apps.dependencyInstall.title"
          values={{ dependency: dependentApp.name }}
        />
      }
      desc={
        <Trans
          i18nKey="manager.apps.dependencyInstall.description"
          values={{ app: name, dependency: dependentApp.name }}
        />
      }
      confirmText={<Trans i18nKey="manager.apps.dependencyInstall.confirm" />}
    ></ConfirmModal>
  );
};

export default memo<Props>(AppDepsInstallModal);
