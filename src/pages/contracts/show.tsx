import React from "react";
import { useMediaQuery } from "react-responsive";
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
  TextField,
  BooleanField,
} from "@refinedev/antd";
import { Typography, Card, Spin, Flex } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import {
  PropertyCard,
  InvoicesSection,
  ContractStatus,
  TenantCard,
  ContractDateCard,
  ContractDurationCard,
  ContractDetailsCard,
  InvoicesCountCard,
  UnpaidInvoicesCard,
} from "../../components/contracts/show";

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

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <Show isLoading={isLoading}>
      <Flex vertical>
        <Flex wrap={!isDesktopOrLaptop ? "wrap" : "unset"}>
          <PropertyCard
            propertyData={propertyData?.data}
            propertyIsLoading={propertyIsLoading}
          />
          <Flex vertical>
            <ContractStatus />
            <Flex wrap={!isDesktopOrLaptop ? "wrap" : "unset"}>
              <Flex vertical style={{ width: "100%" }}>
                <InvoicesCountCard />
                <UnpaidInvoicesCard />
              </Flex>
              <ContractDateCard record={record} />

              {/* <ContractDurationCard record={record} /> */}

              <ContractDetailsCard record={record} />
              <TenantCard
                tenantData={tenantData?.data}
                tenantIsLoading={tenantIsLoading}
              />
            </Flex>
          </Flex>
        </Flex>
        <InvoicesSection />
      </Flex>
    </Show>
  );
};
