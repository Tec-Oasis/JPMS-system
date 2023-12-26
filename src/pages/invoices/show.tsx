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
  TagField,
  TextField,
  NumberField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const InvoiceShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: tenantData, isLoading: tenantIsLoading } = useOne({
    resource: "tenants",
    id: record?.tenant_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: contractData, isLoading: contractIsLoading } = useOne({
    resource: "contracts",
    id: record?.contract_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>{translate("invoices.fields.invoice_date")}</Title>
      <DateField value={record?.invoice_date} />
      <Title level={5}>{translate("invoices.fields.amount")}</Title>
      <DateField value={record?.amount} />
      <Title level={5}>{translate("invoices.fields.amount_paid")}</Title>
      <DateField value={record?.amount_paid} />
      <Title level={5}>{translate("invoices.fields.notes")}</Title>
      <TextField value={record?.notes} />
      <Title level={5}>{translate("invoices.fields.tenant_id")}</Title>
      {tenantIsLoading ? <>Loading...</> : <>{tenantData?.data?.id}</>}
      <Title level={5}>{translate("invoices.fields.contract_id")}</Title>
      {contractIsLoading ? <>Loading...</> : <>{contractData?.data?.id}</>}
      <Title level={5}>{translate("invoices.fields.id")}</Title>
      <NumberField value={record?.id ?? ""} />
    </Show>
  );
};
