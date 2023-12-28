import React from "react";
import {
  IResourceComponentsProps,
  useShow,
  useTranslate,
  useOne,
} from "@refinedev/core";
import {
  Show,
  DateField,
  NumberField,
  TagField,
  TextField,
  BooleanField,
} from "@refinedev/antd";
import {
  Typography,
  Row,
  Col,
  Card,
  Spin,
  Progress,
  Flex,
  Image,
  Descriptions,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  CheckCircleOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import moment from "moment";

const { Title } = Typography;

export const ContractShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: propertyData, isLoading: propertyIsLoading } = useOne({
    resource: "properties",
    id: record?.property_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const { data: tenantData, isLoading: tenantIsLoading } = useOne({
    resource: "tenants",
    id: record?.tenant_id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const {
    img: propertyImg,
    name: propertyName,
    description: propertyDescription,
    rent: propertyRent,
    property_type: propertyType,
    total_rooms: totalRooms,
  } = propertyData?.data || {};

  const {
    fname: tenantFname,
    lname: tenantLname,
    ic_no: tenantIcNo,
    phone_country_code: tenantPhoneCountryCode,
    phone_number: tenantPhoneNumber,
    email: tenantEmail,
  } = tenantData?.data || {};

  return (
    // <Show isLoading={isLoading}>
    //   <Title level={5}>{translate("contracts.fields.contract_start")}</Title>
    //   <DateField value={record?.contract_start} />
    //   <Title level={5}>{translate("contracts.fields.contract_end")}</Title>
    //   <DateField value={record?.contract_end} />
    //   <Title level={5}>{translate("contracts.fields.rent")}</Title>
    //   <NumberField value={record?.rent ?? ""} />
    //   <Title level={5}>{translate("contracts.fields.notes")}</Title>
    //   <TextField value={record?.notes} />
    //   <Title level={5}>{translate("contracts.fields.active")}</Title>
    //   <BooleanField value={record?.active} />
    //   <Title level={5}>{translate("contracts.fields.property_id")}</Title>
    //   {propertyIsLoading ? <>Loading...</> : <>{propertyData?.data?.id}</>}
    //   <Title level={5}>{translate("contracts.fields.tenant_id")}</Title>
    //   {tenantIsLoading ? <>Loading...</> : <>{tenantData?.data?.id}</>}
    //   <Title level={5}>{translate("contracts.fields.id")}</Title>
    //   <NumberField value={record?.id ?? ""} />
    // </Show>

    <Show isLoading={isLoading}>
      <Flex>
        <Card
          title={translate("contracts.fields.property_id")}
          style={{ margin: "10px", padding: "10px" }}
        >
          {propertyIsLoading ? (
            <Spin />
          ) : (
            <>
              <Image width={200} src={propertyImg} alt={propertyName} />
              <Descriptions column={1} style={{ marginTop: "1rem" }}>
                <Descriptions.Item label={<HomeOutlined />}>
                  {propertyName}
                </Descriptions.Item>
                <Descriptions.Item label={<DollarOutlined />}>
                  {propertyRent}
                </Descriptions.Item>
                <Descriptions.Item label={<AppstoreAddOutlined />}>
                  {propertyType}
                </Descriptions.Item>
                <Descriptions.Item label={"rooms"}>
                  {totalRooms}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
        </Card>
        <Flex style={{ marginLeft: "2rem" }}>
          <Card
            title={translate("contracts.fields.tenant_id")}
            style={{ margin: "10px" }}
          >
            {tenantIsLoading ? <>Loading...</> : <>{tenantData?.data?.id}</>}
          </Card>
          <Card
            title={translate("contracts.fields.tenant_id")}
            style={{ margin: "10px", padding: "10px" }}
          >
            {tenantIsLoading ? (
              <Spin />
            ) : (
              <Descriptions column={1}>
                <Descriptions.Item label="First Name">
                  {tenantFname}
                </Descriptions.Item>
                <Descriptions.Item label="Last Name">
                  {tenantLname}
                </Descriptions.Item>
                <Descriptions.Item label="IC Number">
                  {tenantIcNo}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Country Code">
                  {tenantPhoneCountryCode}
                </Descriptions.Item>
                <Descriptions.Item label="Phone Number">
                  {tenantPhoneNumber}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {tenantEmail}
                </Descriptions.Item>
              </Descriptions>
            )}
          </Card>
          <Card
            title={
              <>
                <CalendarOutlined /> Contract Duration
              </>
            }
            style={{ margin: "10px" }}
          >
            <Title level={5}>
              {translate("contracts.fields.contract_start")}
            </Title>
            <DateField value={record?.contract_start} />
            <Title level={5}>
              {translate("contracts.fields.contract_end")}
            </Title>
            <DateField value={record?.contract_end} />
          </Card>

          <Card
            title={
              <>
                <FileTextOutlined /> Contract Details
              </>
            }
            style={{ margin: "10px" }}
          >
            <Title level={5}>{translate("contracts.fields.rent")}</Title>
            <NumberField value={record?.rent ?? ""} />
            <Title level={5}>{translate("contracts.fields.notes")}</Title>
            <TextField value={record?.notes} />
            <Title level={5}>{translate("contracts.fields.active")}</Title>
            <BooleanField value={record?.active} />
          </Card>

          <Card
            title={
              <>
                <UserOutlined /> Associated Entities
              </>
            }
            style={{ margin: "10px" }}
          >
            <Title level={5}>{translate("contracts.fields.property_id")}</Title>
            {propertyIsLoading ? <Spin /> : <>{propertyData?.data?.name}</>}
            <Title level={5}>{translate("contracts.fields.tenant_id")}</Title>
            {tenantIsLoading ? <Spin /> : <>{tenantData?.data?.name}</>}
          </Card>
        </Flex>
      </Flex>
    </Show>
  );
};
