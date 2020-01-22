// @flow
import React from "react";
import { Trans, withTranslation } from "react-i18next";
import MemoTypeField from "./MemoTypeField";
import MemoValueField from "./MemoValueField";
import Box from "~/renderer/components/Box";
import Label from "~/renderer/components/Label";
import Text from "~/renderer/components/Text";

const Root = (props: *) => (
  <Box flow={1}>
    <Box>
      <Label>
        <span>
          <Trans i18nKey="send.steps.details.stellarMemo" />
        </span>
      </Label>
    </Box>
    <Box horizontal grow alignItems="center" justifyContent="space-between">
      <MemoTypeField {...props} />
      {props.transaction.memoType && props.transaction.memoType !== "NO_MEMO" && (
        <Box ml={20} grow={1}>
          <MemoValueField {...props} />
        </Box>
      )}
    </Box>
    <Box>
      <Text ff="Inter|Regular" color="palette.text.shade80" fontSize={4}>
        <Trans i18nKey="send.steps.warning.stellar.memo" />
      </Text>
    </Box>
  </Box>
);

export default {
  component: withTranslation()(Root),
  fields: ["memoType", "memoValue"],
};
