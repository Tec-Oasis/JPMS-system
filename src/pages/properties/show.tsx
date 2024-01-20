import React from "react";
import {
    IResourceComponentsProps,
    useShow,
    useTranslate,
} from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    MarkdownField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const PropertyShow: React.FC<IResourceComponentsProps> = () => {
    const translate = useTranslate();
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>{translate("properties.fields.id")}</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>{translate("properties.fields.name")}</Title>
            <TextField value={record?.name} />
            <Title level={5}>
                {translate("properties.fields.total_rooms")}
            </Title>
            <NumberField value={record?.total_rooms ?? ""} />
            <Title level={5}>
                {translate("properties.fields.property_type")}
            </Title>
            <TextField value={record?.property_type} />
            <Title level={5}>
                {translate("properties.fields.coordinate_x")}
            </Title>
            <NumberField value={record?.coordinate_x ?? ""} />
            <Title level={5}>
                {translate("properties.fields.coordinate_y")}
            </Title>
            <NumberField value={record?.coordinate_y ?? ""} />
            <Title level={5}>{translate("properties.fields.img")}</Title>
            <MarkdownField value={record?.img} />
            <Title level={5}>
                {translate("properties.fields.description")}
            </Title>
            <TextField value={record?.description} />
            <Title level={5}>{translate("properties.fields.rent")}</Title>
            <NumberField value={record?.rent ?? ""} />
            <Title level={5}>{translate("properties.fields.location")}</Title>
            <TextField value={record?.location} />
            <Title level={5}>{translate("properties.fields.amenities")}</Title>
            {record?.amenities?.map((item: any) => (
                <TagField value={item} key={item} />
            ))}
        </Show>
    );
};
