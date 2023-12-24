import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  CanAccess,
} from "@refinedev/core";
import { useTable, List, TagField, EmailField } from "@refinedev/antd";
import { Table, Space } from "antd";

export const UserList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <CanAccess
      resource="users"
      action="list"
      fallback={<h1>You're not authorized to access this resource</h1>}
    >
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title={translate("users.fields.id")} />
          <Table.Column
            dataIndex="name"
            title={translate("users.fields.name")}
          />
          <Table.Column
            dataIndex={["email"]}
            title={translate("users.fields.email")}
            render={(value: any) => <EmailField value={value} />}
          />
          <Table.Column
            dataIndex="password_hashed"
            title={translate("users.fields.password_hashed")}
          />
          <Table.Column
            dataIndex="role"
            title={translate("users.fields.role")}
          />
        </Table>
      </List>
    </CanAccess>
  );
};
