import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  ImageField,
  EmailField,
  UrlField,
  TextField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const TenantShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{translate("tenants.fields.ic_no")}</Title>
      <NumberField value={record?.ic_no ?? ""} />
      <Title level={5}>{translate("tenants.fields.id")}</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>{translate("tenants.fields.email")}</Title>
      <EmailField value={record?.email} />
      <Title level={5}>{translate("tenants.fields.phone_number")}</Title>
      <NumberField value={record?.phone_number ?? ""} />
      <Title level={5}>{translate("tenants.fields.picture")}</Title>
      <ImageField style={{ maxWidth: 200 }} value={record?.picture} />
      {/* <UrlField value={record?.picture} /> */}
      <Title level={5}>{translate("tenants.fields.name")}</Title>
      <TextField value={record?.name} />
    </Show>
  );
};
