import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useMany,
} from "@refinedev/core";
import {
  useTable,
  List,
  ShowButton,
  DateField,
  BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ContractList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: propertyData, isLoading: propertyIsLoading } = useMany({
    resource: "properties",
    ids: tableProps?.dataSource?.map((item) => item?.property_id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: tenantData, isLoading: tenantIsLoading } = useMany({
    resource: "tenants",
    ids: tableProps?.dataSource?.map((item) => item?.tenant_id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["contract_start"]}
          title={translate("contracts.fields.contract_start")}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex={["contract_end"]}
          title={translate("contracts.fields.contract_end")}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="rent"
          title={translate("contracts.fields.rent")}
        />
        <Table.Column
          dataIndex="notes"
          title={translate("contracts.fields.notes")}
        />
        <Table.Column
          dataIndex={["active"]}
          title={translate("contracts.fields.active")}
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column
          dataIndex={["property_id"]}
          title={translate("contracts.fields.property_id")}
        />
        <Table.Column
          dataIndex={["tenant_id"]}
          title={translate("contracts.fields.tenant_id")}
        />
        <Table.Column dataIndex="id" title={translate("contracts.fields.id")} />
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
