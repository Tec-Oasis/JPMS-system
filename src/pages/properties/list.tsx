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
  EditButton,
  ShowButton,
  DeleteButton,
  UrlField,
  TagField,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const PropertyList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { tableProps } = useTable({
    syncWithLocation: true,
    pagination: {
        pageSize: 10,
    }
  });

  const { data: propertyData, isLoading: propertyIsLoading } = useMany({
    resource: "properties",
    ids: tableProps?.dataSource?.map((item) => item?.property_id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex={["property_id"]}
          title={translate("properties.fields.property_id")}
        />
        <Table.Column
          dataIndex="name"
          title={translate("properties.fields.name")}
        />
        <Table.Column
          dataIndex="total_rooms"
          title={translate("properties.fields.total_rooms")}
        />
        <Table.Column
          dataIndex="property_type"
          title={translate("properties.fields.property_type")}
        />
        <Table.Column
          dataIndex="coordinate_x"
          title={translate("properties.fields.coordinate_x")}
        />
        <Table.Column
          dataIndex="coordinate_y"
          title={translate("properties.fields.coordinate_y")}
        />
        <Table.Column
          dataIndex={["img"]}
          title={translate("properties.fields.img")}
          render={(value: any) => <UrlField value={value} />}
        />
        <Table.Column
          dataIndex={["description"]}
          title={translate("properties.fields.description")}
          // render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          dataIndex="rent"
          title={translate("properties.fields.rent")}
        />
        <Table.Column
          dataIndex="location"
          title={translate("properties.fields.location")}
        />
        <Table.Column
          dataIndex="amenities"
          title={translate("properties.fields.amenities")}
          render={(value: any[]) => (
            <>
              {value?.map((item) => (
                <TagField value={item} key={item} />
              ))}
            </>
          )}
        />
        <Table.Column
          title={translate("table.actions")}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
