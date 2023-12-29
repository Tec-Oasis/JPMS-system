import { useTranslate } from "@refinedev/core";
import { Card, Descriptions, Image, Spin } from "antd";
import {
  AppstoreAddOutlined,
  DollarOutlined,
  HomeOutlined,
} from "@ant-design/icons";

import { FaBuilding } from "react-icons/fa";
import { MdOutlineRealEstateAgent } from "react-icons/md";

interface PropertyCardProps {
  propertyData: {
    img: string;
    name: string;
    description: string;
    rent: number;
    property_type: string;
    total_rooms: number;
  };
  propertyIsLoading: boolean; // Added propertyIsLoading to the interface
}

export const PropertyCard = ({
  propertyData,
  propertyIsLoading,
}: PropertyCardProps) => {
  const translate = useTranslate();

  const {
    img: propertyImg,
    name: propertyName,
    description: propertyDescription,
    rent: propertyRent,
    property_type: propertyType,
    total_rooms: totalRooms,
  } = propertyData || {};

  const cardTitle = translate("contracts.propertyCard.title");

  return (
    <Card
      title={
        <>
          <MdOutlineRealEstateAgent /> {cardTitle}
        </>
      }
      style={{ marginRight: "10px", padding: "10px", maxWidth: "20rem" }}
    >
      {propertyIsLoading ? (
        <Spin />
      ) : (
        <>
          <Image width={250} src={propertyImg} alt={propertyName} />
          <Descriptions column={1} style={{ marginTop: "1rem" }}>
            <Descriptions.Item label={<HomeOutlined />}>
              {propertyName}
            </Descriptions.Item>
            <Descriptions.Item label={<DollarOutlined />}>
              RM {propertyRent}
            </Descriptions.Item>
            <Descriptions.Item label={<AppstoreAddOutlined />}>
              {propertyType}
            </Descriptions.Item>
            <Descriptions.Item
              label={translate("contracts.propertyCard.rooms")}
            >
              {totalRooms}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Card>
  );
};

export default PropertyCard;
