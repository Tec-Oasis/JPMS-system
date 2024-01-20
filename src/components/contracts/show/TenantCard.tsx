import React from "react";
import { useTranslate } from "@refinedev/core";
import { Card, Spin, Descriptions, Image } from "antd";

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
      //   title={translate("contracts.fields.tenant_id")}
      title="Tenant Details"
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

          <Descriptions.Item >
            <Image
              src={tenantPicture}
              alt="Tenant Picture"
              style={{ maxWidth: 200, borderRadius: "50%" }}
            />
          </Descriptions.Item>

          <Descriptions.Item label="Name">{tenantName}</Descriptions.Item>

          <Descriptions.Item label="IC Number">{tenantIcNo}</Descriptions.Item>
          <Descriptions.Item label="Phone Country Code">
            {tenantPhoneCountryCode}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Number">
            {tenantPhoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{tenantEmail}</Descriptions.Item>
        </Descriptions>
      )}
    </Card>
  );
};
