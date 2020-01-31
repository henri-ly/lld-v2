// @flow

/* eslint-disable no-unused-expressions */

import { createGlobalStyle } from "styled-components";

import { rgba } from "./helpers";
import { radii } from "./theme";
import reset from "./reset";

export const GlobalStyle = createGlobalStyle`
  body, #preload {
    background-color: ${p => p.theme.colors.palette.background.default} !important;
  }

  ${reset};

  .tippy-content {
    padding: 0 !important;
  }

  .tippy-tooltip.ledger-theme {
    background-color: ${p => p.theme.colors.palette.text.shade100};
    color: ${p => p.theme.colors.palette.background.default};
    border-radius: ${radii[1]}px;
  }

  .tippy-tooltip.ledger-theme .tippy-svg-arrow {
    fill: ${p => p.theme.colors.palette.text.shade100};
  }

  .tippy-popper.ledger-theme .tippy-roundarrow {
    fill: ${p => p.theme.colors.palette.text.shade100};
  }

  .select__control:hover, .select__control-is-focused {
    border-color: ${p => p.theme.colors.palette.divider};
  }

  .select__single-value {
    color: inherit !important;
    right: 0;
    left: 15px;
  }

  .select__placeholder {
    color ${p => p.theme.colors.palette.divider} !important;
  }

  ::selection {
    background: ${p => rgba(p.theme.colors.wallet, 0.1)};
  }


  --track-color: rgba(0,0,0,0);

  ::-webkit-scrollbar              { 
    width: 12px;
    height: 12px;
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-button       { 
    opacity: 0;
  }
  ::-webkit-scrollbar-track        { 
    background-color: rgba(0,0,0,0);
  }
  ::-webkit-scrollbar-thumb        {
    box-shadow: inset 0 0 0 12px var(--track-color);
    border: 2px solid rgba(0,0,0,0);
    border-radius: 12px;
  }
  ::-webkit-scrollbar-corner { 
    opacity: 0;
  }
`;
