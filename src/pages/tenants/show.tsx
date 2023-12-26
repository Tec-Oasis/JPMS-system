import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
  useOne,
} from "@refinedev/core";
import { Show, NumberField, DateField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const TenantShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: customerData, isLoading: customerIsLoading } = useOne({
    resource: "customers",
    id: record?.customer_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{translate("tenants.fields.ic_no")}</Title>
      <NumberField value={record?.ic_no ?? ""} />
      <Title level={5}>{translate("tenants.fields.date_settle_in")}</Title>
      <DateField value={record?.date_settle_in} />
      <Title level={5}>{translate("tenants.fields.id")}</Title>
      <NumberField value={record?.id ?? ""} />
      <Title level={5}>{translate("tenants.fields.customer_id")}</Title>
      {customerIsLoading ? <>Loading...</> : <>{customerData?.data?.id}</>}
    </Show>
  );
};
