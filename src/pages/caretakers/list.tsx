import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useMany,
  CanAccess,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  TagField,
  EmailField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const CaretakersList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: propertyData, isLoading: propertyIsLoading } = useMany({
    resource: "properties",
    ids: [].concat(
      ...(tableProps?.dataSource?.map((item) => item?.property_ids) ?? [])
    ),
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <CanAccess resource="caretaker_properties" action="list" fallback={<h1>You're not authorized to access this resource</h1>}>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column
            dataIndex="id"
            title={translate("caretaker_properties.fields.id")}
          />
          <Table.Column
            dataIndex="name"
            title={translate("caretaker_properties.fields.name")}
          />
          <Table.Column
            dataIndex={["email"]}
            title={translate("caretaker_properties.fields.email")}
            render={(value: any) => <EmailField value={value} />}
          />
          <Table.Column
            dataIndex="property_ids"
            title={translate("caretaker_properties.fields.property_ids")}
            render={(value: any[]) =>
              propertyIsLoading ? (
                <>Loading...</>
              ) : (
                <>
                  {value?.map((item, index) => (
                    <TagField key={index} value={item} />
                  ))}
                </>
              )
            }
          />
          <Table.Column
            title={translate("table.actions")}
            dataIndex="actions"
            render={(_, record: BaseRecord) => (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
                <ShowButton hideText size="small" recordItemId={record.id} />
              </Space>
            )}
          />
        </Table>
      </List>
    </CanAccess>
  );
};
