import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";

import AmenityList from "../../components/properties/AmenityList";

export const PropertyCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: propertySelectProps } = useSelect({
    resource: "properties",
  });

  const handleAmenitiesChange = (amenities: string[]) => {
    // Log the changes to the console
    // console.log("Parent component onChange:", amenities);
    return amenities;
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={translate("properties.fields.name")}
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
          label={translate("properties.fields.total_rooms")}
          name={["total_rooms"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("properties.fields.property_type")}
          name={["property_type"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("properties.fields.coordinate_x")}
          name={["coordinate_x"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("properties.fields.coordinate_y")}
          name={["coordinate_y"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("properties.fields.img")}
          name={["img"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("properties.fields.description")}
          name={["description"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("properties.fields.amenities")}
          name={["amenities"]}
        >
          <AmenityList onChange={handleAmenitiesChange} />
        </Form.Item>
        <Form.Item
          label={translate("properties.fields.rent")}
          name={["rent"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={translate("properties.fields.location")}
          name={["location"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
