import React from "react";
import { Card, Alert } from "antd";

import { useTranslate } from "@refinedev/core"

export const ContractStatus: React.FC = () => {

  const translate = useTranslate();

  const msgActive = translate("contracts.status.active");
  // const msgInactive = translate("contracts.status.inactive");

  return (
    <Alert style={{margin: "10px", width:"100%"}} message={msgActive} type="success" showIcon />
    // <Alert style={{margin: "10px", width:"100%"}} message={msgInactive} type="error" showIcon />

  );
};
