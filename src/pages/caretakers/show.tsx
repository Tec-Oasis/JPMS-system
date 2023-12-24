import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
  useMany,
  CanAccess,
} from "@refinedev/core";
import {
  Show,
  NumberField,
  TagField,
  TextField,
  EmailField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const CaretakersShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: propertyData, isLoading: propertyIsLoading } = useMany({
    resource: "properties",
    ids: record?.property_ids || [],
    queryOptions: {
      enabled: !!record && !!record?.property_ids?.length,
    },
  });

  return (
    <CanAccess
      resource="caretaker_properties"
      action="show"
      fallback={<h1>You're not authorized to access this resource</h1>}
    >
      <Show isLoading={isLoading}>
        <Title level={5}>{translate("caretaker_properties.fields.id")}</Title>
        <NumberField value={record?.id ?? ""} />
        <Title level={5}>{translate("caretaker_properties.fields.name")}</Title>
        <TextField value={record?.name} />
        <Title level={5}>
          {translate("caretaker_properties.fields.email")}
        </Title>
        <EmailField value={record?.email} />
        <Title level={5}>
          {translate("caretaker_properties.fields.property_ids")}
        </Title>
        {propertyIsLoading && record?.property_ids?.length ? (
          <>Loading...</>
        ) : (
          <></>
        )}
      </Show>
    </CanAccess>
  );
};
