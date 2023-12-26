import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
} from "@refinedev/core";
import {
  useTable,
  List,
  ShowButton,
  TagField,
  EmailField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const CustomerList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["email"]}
          title={translate("customers.fields.email")}
          render={(value: any) => <EmailField value={value} />}
        />
        <Table.Column
          dataIndex="phone_country_code"
          title={translate("customers.fields.phone_country_code")}
        />
        <Table.Column
          dataIndex="phone_number"
          title={translate("customers.fields.phone_number")}
        />
        <Table.Column
          dataIndex="fname"
          title={translate("customers.fields.fname")}
        />
        <Table.Column
          dataIndex="lname"
          title={translate("customers.fields.lname")}
        />
        <Table.Column dataIndex="id" title={translate("customers.fields.id")} />
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
