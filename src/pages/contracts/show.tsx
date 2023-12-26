import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
  useOne,
} from "@refinedev/core";
import {
  Show,
  DateField,
  NumberField,
  TagField,
  TextField,
  BooleanField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ContractShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: propertyData, isLoading: propertyIsLoading } = useOne({
    resource: "properties",
    id: record?.property_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: tenantData, isLoading: tenantIsLoading } = useOne({
    resource: "tenants",
    id: record?.tenant_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{translate("contracts.fields.contract_start")}</Title>
      <DateField value={record?.contract_start} />
      <Title level={5}>{translate("contracts.fields.contract_end")}</Title>
      <DateField value={record?.contract_end} />
      <Title level={5}>{translate("contracts.fields.rent")}</Title>
      <NumberField value={record?.rent ?? ""} />
      <Title level={5}>{translate("contracts.fields.notes")}</Title>
      <TextField value={record?.notes} />
      <Title level={5}>{translate("contracts.fields.active")}</Title>
      <BooleanField value={record?.active} />
      <Title level={5}>{translate("contracts.fields.property_id")}</Title>
      {propertyIsLoading ? <>Loading...</> : <>{propertyData?.data?.id}</>}
      <Title level={5}>{translate("contracts.fields.tenant_id")}</Title>
      {tenantIsLoading ? <>Loading...</> : <>{tenantData?.data?.id}</>}
      <Title level={5}>{translate("contracts.fields.id")}</Title>
      <NumberField value={record?.id ?? ""} />
    </Show>
  );
};
