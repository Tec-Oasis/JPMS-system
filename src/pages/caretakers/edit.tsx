import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const CaretakersEdit: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  const caretakersData = queryResult?.data?.data;

  const { selectProps: propertySelectProps } = useSelect({
    resource: "properties",
    defaultValue: caretakersData?.property_ids,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={translate("caretaker_properties.fields.id")}
          name={["id"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input readOnly disabled />
        </Form.Item>
        <Form.Item
          label={translate("caretaker_properties.fields.name")}
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("caretaker_properties.fields.email")}
          name={["email"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("caretaker_properties.fields.property_ids")}
          name={"property_ids"}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select mode="multiple" {...propertySelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
