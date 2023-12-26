import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  TagField,
  EmailField,
  NumberField,
  TextField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const CustomerShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{translate("customers.fields.email")}</Title>
      <EmailField value={record?.email} />
      <Title level={5}>
        {translate("customers.fields.phone_country_code")}
      </Title>
      <NumberField value={record?.phone_country_code ?? ""} />
      <Title level={5}>{translate("customers.fields.phone_number")}</Title>
      <NumberField value={record?.phone_number ?? ""} />
      <Title level={5}>{translate("customers.fields.fname")}</Title>
      <TextField value={record?.fname} />
      <Title level={5}>{translate("customers.fields.lname")}</Title>
      <TextField value={record?.lname} />
      <Title level={5}>{translate("customers.fields.id")}</Title>
      <NumberField value={record?.id ?? ""} />
    </Show>
  );
};
