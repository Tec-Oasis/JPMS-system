import React from "react";
import { useTranslate } from "@refinedev/core";
import { Card, Spin, Descriptions, Image, Flex } from "antd";

interface TenantCardProps {
  tenantData: {
    name: string;
    picture: string;
    fname: string;
    lname: string;
    ic_no: string;
    phone_country_code: string;
    phone_number: string;
    email: string;
  };
  tenantIsLoading: boolean;
}

export const TenantCard: React.FC<TenantCardProps> = ({
  tenantData,
  tenantIsLoading,
}) => {
  const translate = useTranslate();

  const {
    name: tenantName,
    picture: tenantPicture,
    fname: tenantFname,
    lname: tenantLname,
    ic_no: tenantIcNo,
    phone_country_code: tenantPhoneCountryCode,
    phone_number: tenantPhoneNumber,
    email: tenantEmail,
  } = tenantData || {};

  return (
    <Card
      title={translate("contracts.tenantCard.title")}
      style={{ margin: "10px", width: "100%" }}
    >
      {tenantIsLoading ? (
        <Spin />
      ) : (
        <Descriptions column={1}>
          {/* <Descriptions.Item label="First Name">
            {tenantFname}
          </Descriptions.Item> */}

          {/* <Descriptions.Item label="Last Name">{tenantLname}</Descriptions.Item> */}

          <Descriptions.Item>
            <Image
              src={tenantPicture}
              style={{ borderRadius: "50%" }}
              alt="Tenant Picture"
              preview={false}
            />
          </Descriptions.Item>

          <Descriptions.Item label={translate("contracts.tenantCard.name")}>
            {tenantName}
          </Descriptions.Item>

          <Descriptions.Item label={translate("contracts.tenantCard.ic_no")}>
            {tenantIcNo}
          </Descriptions.Item>
          {/* <Descriptions.Item label="Phone Country Code">
            {tenantPhoneCountryCode}
          </Descriptions.Item> */}
          <Descriptions.Item
            label={translate("contracts.tenantCard.phone_number")}
          >
            {tenantPhoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label={translate("contracts.tenantCard.email")}>
            {tenantEmail}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};
