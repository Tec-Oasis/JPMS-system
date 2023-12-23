import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useMany,
  CanAccess,
} from "@refinedev/core";
import { useTable, List, TagField } from "@refinedev/antd";
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

  const { data: caretakerData, isLoading: caretakerIsLoading } = useMany({
    resource: "users",
    ids: [].concat(
      ...(tableProps?.dataSource?.map((item) => item?.name) ?? [])
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
            dataIndex="caretaker_id"
            title={translate("caretaker_properties.fields.caretaker_id")}
          />

          {/* <Table.Column
          dataIndex="name"
          title={translate("caretaker_properties.fields.name")}
          render={(name: string) => (
            <>
              {caretakerIsLoading ? (
                <>Loading...</>
              ) : (
                <>
                  {
                    caretakerData?.data?.find(
                      (item) => item.id === tableProps?.dataSource?.caretaker_id
                    )?.name
                  }
                </>
              )}
            </>
          )}
        /> */}
          <Table.Column
            dataIndex="name"
            title={translate("caretaker_properties.fields.name")}
            render={(name: string, record: any) => (
              <>
                {caretakerIsLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    {
                      caretakerData?.data?.find(
                        (item) => item.id === record.caretaker_id
                      )?.name
                    }
                  </>
                )}
              </>
            )}
          />
          <Table.Column
            dataIndex="email"
            title={translate("caretaker_properties.fields.email")}
            render={(name: string, record: any) => (
              <>
                {caretakerIsLoading ? (
                  <>Loading...</>
                ) : (
                  <>
                    {
                      caretakerData?.data?.find(
                        (item) => item.id === record.caretaker_id
                      )?.email
                    }
                  </>
                )}
              </>
            )}
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
        </Table>
      </List>
    </CanAccess>
  );
};
