import React, { useState } from "react";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, DatePicker, AutoComplete } from "antd";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

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
  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  const [center, setCenter] = useState({ lat: 25, lng: 55 });

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const handleMapClick = (event: google.maps.KmlMouseEvent) => {
    const lat = event.latLng ? event.latLng.lat() : 0;
    const lng = event.latLng ? event.latLng.lng() : 0;

    setCoordinates({ lat, lng });
    setCenter({ lat, lng });
    formProps.form?.setFieldsValue({
      coordinate_x: lat,
      coordinate_y: lng,
    });
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
        <Form.Item label="Coordinates">
          <AutoComplete
            value={`${coordinates.lat}, ${coordinates.lng}`}
            onChange={(value) => {
              formProps.form?.setFieldsValue({ coordinates: value });
            }}
          >
            <Input disabled />
          </AutoComplete>
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
          <Input value={coordinates.lat} disabled />
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
          <Input value={coordinates.lng} disabled />
        </Form.Item>

        <LoadScript googleMapsApiKey="AIzaSyDVxOGQBiyLGzauNNOSkcnIm7Q3MjPo6Hc">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
            onClick={(event: google.maps.MapMouseEvent) =>
              handleMapClick(event)
            }
          >
            {coordinates.lat !== 0 && coordinates.lng !== 0 && (
              <Marker position={coordinates} />
            )}
          </GoogleMap>
        </LoadScript>

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
