import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useMany,
} from "@refinedev/core";
import { useTable, List, ShowButton, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";

export const InvoiceList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: tenantData, isLoading: tenantIsLoading } = useMany({
    resource: "tenants",
    ids: tableProps?.dataSource?.map((item) => item?.tenant_id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: contractData, isLoading: contractIsLoading } = useMany({
    resource: "contracts",
    ids: tableProps?.dataSource?.map((item) => item?.contract_id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
      <Table.Column dataIndex="id" title={translate("invoices.fields.id")} />
        <Table.Column
          dataIndex={["invoice_date"]}
          title={translate("invoices.fields.invoice_date")}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["amount"]}
          title={translate("invoices.fields.amount")}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["amount_paid"]}
          title={translate("invoices.fields.amount_paid")}
          render={(value: any) => <DateField value={value} />}
        />
        {/* <Table.Column
          dataIndex="notes"
          title={translate("invoices.fields.notes")}
        /> */}
        <Table.Column
          dataIndex={["tenant_id"]}
          title={translate("invoices.fields.tenant_id")}
        />
        <Table.Column
          dataIndex={["contract_id"]}
          title={translate("invoices.fields.contract_id")}
        />
        
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
