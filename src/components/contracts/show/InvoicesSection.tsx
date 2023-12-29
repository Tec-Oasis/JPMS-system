/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  useList,
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
} from "@refinedev/core";
import { useTable, List, ShowButton, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";

export const InvoicesSection: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: invoicesData, isLoading: invoicesDataIsLoading } = useList({
    resource: "invoices",
  });

  // get the contract id from the url
  const pageurl = window.location.href.split("?")[0]; // get rid of the query params
  const contractId = pageurl.split("/").pop(); // get the last part of the url

  // if contract_id === contractId(from the url) then show the invoice
  const filteredInvoicesData = invoicesData?.data?.filter(
    // filter the invoices data
    (item) => item.contract_id === parseInt(contractId || "") // if the invoice contract_id === contractId(from the url)
  );

  return (
    <div style={{ marginTop: "2rem" }}>
      <List title="Related Invoices" breadcrumb={""}>
        { invoicesDataIsLoading && <p>Loading...</p>}
        <Table {...tableProps} dataSource={filteredInvoicesData} rowKey="id">
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
          <Table.Column
            dataIndex="notes"
            title={translate("invoices.fields.notes")}
          />
          <Table.Column
            dataIndex={["tenant_id"]}
            title={translate("invoices.fields.tenant_id")}
          />
          <Table.Column
            dataIndex={["contract_id"]}
            title={translate("invoices.fields.contract_id")}
          />
          <Table.Column
            dataIndex="id"
            title={translate("invoices.fields.id")}
          />
          <Table.Column
            title={translate("table.actions")}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <ShowButton size="middle" resource="invoices" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </div>
  );
};
