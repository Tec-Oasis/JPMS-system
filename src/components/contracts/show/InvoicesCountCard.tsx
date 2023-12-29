import React, { useContext } from "react";
import { Card, Statistic } from "antd";
import { useTranslate } from "@refinedev/core";
import { ColorModeContext } from "../../../contexts/color-mode";

export const InvoicesCountCard: React.FC = () => {
  const translate = useTranslate();

  const title = translate("contracts.invoicesCountCard.title");
  const currency = translate("contracts.invoicesCountCard.currency");
  const { mode } = useContext(ColorModeContext);

  // get i18nextLng from localStorage
  const lang = localStorage.getItem("i18nextLng");

  return (
    <Card
      style={{
        height: "100%",
        margin: "10px",
        background: mode === "dark" ? "#196F3D" : "#EAFAF1",
        border: "0.5px dashed",
        borderColor: mode === "dark" ? "#27AE60" : "#ABEBC6",
      }}
    >
      {lang === "en" && (
        <Statistic
          title={
            <>
              <b>12</b> {title}
            </>
          }
          value={`${currency} 139,700`}
        />
      )}

      {lang === "ar" && (
        <Statistic
          title={
            <>
              {title} <b>12</b>
            </>
          }
          value={`${currency} 139,700`}
        />
      )}
    </Card>
  );
};
