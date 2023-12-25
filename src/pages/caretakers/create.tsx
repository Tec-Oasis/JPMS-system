import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  CanAccess,
} from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const CaretakersCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: propertySelectProps } = useSelect({
    resource: "properties",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <CanAccess
      resource="caretaker_properties"
      action="create"
      fallback={<h1>You're not authorized to access this resource</h1>}
    >
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
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
      </Create>
    </CanAccess>
  );
};
