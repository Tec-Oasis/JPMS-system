import React, { useState } from "react";
import { IResourceComponentsProps, useTranslate, useSelect } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import AmenityList from "../../components/properties/AmenityList";


export const PropertyEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm();

    const propertiesData = queryResult?.data?.data;

    const handleAmenitiesChange = (amenities: string[]) => {
        // Log the changes to the console
        // console.log("Parent component onChange:", amenities);
        return amenities;
      };

    //   const { selectProps: propertySelectProps } = useSelect({
    //     resource: "properties",
    //     defaultValue: propertiesData?.amenities,
    //   });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label={translate("properties.fields.property_id")}
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
                    name="img"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.TextArea rows={5} />
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
                <Form.Item
                    label={translate("properties.fields.amenities")}
                    name={["amenities"]}
                    >
                    <AmenityList onChange={handleAmenitiesChange} existingAmenitites={propertiesData?.amenities}/>
                    
                     {/* <Select mode="multiple" {...propertySelectProps} /> */}
                </Form.Item>
            </Form>
        </Edit>
    );
};
