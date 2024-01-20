import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  CanAccess,
  useCustom,
  useApiUrl,
} from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  UrlField,
  TagField,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const PropertyList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const apiUrl = useApiUrl();

  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
  const role = userData.role;

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "";
        if (role === "manager") {
          url = `${apiUrl}/properties`;
        } else if (role === "caretaker") {
          url = `${apiUrl}/caretaker_properties/${userData.id}/properties`;
        }
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl, role, userData.id]);

  return (
    <CanAccess
      resource="properties"
      action="list"
      fallback={<h1>You're not authorized to see this page</h1>}
    >
      <List>
        <Table {...tableProps} dataSource={data} rowKey="id">
          <Table.Column
            dataIndex="id"
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
          {/* <Table.Column
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
          */}
          <Table.Column
            dataIndex={["description"]}
            title={translate("properties.fields.description")}
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
              </Space>
            )}
          />
        </Table>
      </List>
    </CanAccess>
  );
};
