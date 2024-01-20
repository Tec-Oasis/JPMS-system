import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
} from "@refinedev/core";
import { useTable, List, ShowButton, DateField } from "@refinedev/antd";
import { Table, Space } from "antd";

export const TenantList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  // const { data: customerData, isLoading: customerIsLoading } = useMany({
  //   resource: "customers",
  //   dataProviderName: "resys",
  //   ids: tableProps?.dataSource?.map((item) => item?.customer_id) ?? [],
  //   queryOptions: {
  //     enabled: !!tableProps?.dataSource,
  //   },
  // });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={translate("tenants.fields.id")} />
        <Table.Column dataIndex="name" title={translate("tenants.fields.name")} />
        <Table.Column
          dataIndex="phone_number"
          title={translate("tenants.fields.phone_number")}
        />
        <Table.Column
          dataIndex="email"
          title={translate("tenants.fields.email")}
        />

        <Table.Column
          dataIndex="ic_no"
          title={translate("tenants.fields.ic_no")}
        />
        {/* <Table.Column
          dataIndex={["date_settle_in"]}
          title={translate("tenants.fields.date_settle_in")}
          render={(value: any) => <DateField value={value} />}
        /> */}

        <Table.Column
          dataIndex={["customer_id"]}
          title={translate("tenants.fields.customer_id")}
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
