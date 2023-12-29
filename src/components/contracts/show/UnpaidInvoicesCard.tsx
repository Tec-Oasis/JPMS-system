import React, { useContext } from "react";
import { Card, Flex, Statistic, Divider } from "antd";
import { useTranslate } from "@refinedev/core";
import { ColorModeContext } from "../../../contexts/color-mode";

export const UnpaidInvoicesCard: React.FC = () => {
  const translate = useTranslate();
  const { mode } = useContext(ColorModeContext);

  const title1 = translate("contracts.unpaidInvoicesCard.title");
  const title2 = translate("contracts.unpaidInvoicesCard.remaining");
  const currency = translate("contracts.invoicesCountCard.currency");

  return (
    <Card
      bordered
      style={{
        height: "100%",
        margin: "10px",
        background: mode === 'dark' ? "#943126" : "#FDEDEC",
        border: "0.5px dashed",
        borderColor: mode === 'dark' ? "#E74C3C" : "#F5B7B1",
      }}
    >
      <Statistic title={title1} value={`1 ${translate("contracts.unpaidInvoicesCard.invoice")}`}/>
      <Divider />
      <Statistic title={title2} value={`${currency} 4300`} />
    </Card>
  );
};
