// @flow

import React, { useCallback, useState } from "react";
import { getAccountBridge } from "@ledgerhq/live-common/lib/bridge";
import { StellarMemoType } from "@ledgerhq/live-common/lib/families/stellar/types";
import Input from "~/renderer/components/Input";
import invariant from "invariant";

const MemoValueField = ({ onChange, account, transaction, status }: Props) => {
  invariant(transaction.family === "stellar", "MemoTypeField: stellar family expected");

  const bridge = getAccountBridge(account);

  const onMemoValueChange = useCallback(
    memoValue => {
      onChange(bridge.updateTransaction(transaction, { memoValue }));
    },
    [onChange, transaction, bridge, account],
  );

  const { memo: memoError } = status.errors;
  const { memo: memoWarning } = status.warnings;

  return (
    <Input
      warning={memoWarning}
      error={memoError}
      value={transaction.memoValue}
      onChange={onMemoValueChange}
    />
  );
};

export default MemoValueField;
