import React from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const PropertyEdit: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { formProps, saveButtonProps, queryResult } = useForm();

    const propertiesData = queryResult?.data?.data;

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
                <>
                    {(propertiesData?.amenities as any[])?.map(
                        (item, index) => (
                            <Form.Item
                                key={index}
                                label={translate("properties.fields.amenities")}
                                name={["amenities", index]}
                            >
                                <Input type="text" />
                            </Form.Item>
                        ),
                    )}
                </>
            </Form>
        </Edit>
    );
};
