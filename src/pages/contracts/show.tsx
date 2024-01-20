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

type BaseRecord = {
  img?: string;
  name?: string;
  description?: string;
  rent?: number;
  property_type?: string;
  total_rooms?: number;
  notes?: string;
  fname?: string;
  lname?: string;
  ic_no?: string;
  phone_country_code?: string;
  phone_number?: string;
  email?: string;
};

type ContractRecord = BaseRecord & {
  // Additional properties specific to contracts
  property_id: string;
  tenant_id: string;
};

export const ContractShow: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { queryResult } = useShow<ContractRecord>();
  const { data, isLoading } = queryResult;

  const record: BaseRecord | undefined = data?.data;

  const { data: propertyData, isLoading: propertyIsLoading } =
    useOne<BaseRecord>({
      resource: "properties",
      id: record?.property_id || "",
      queryOptions: {
        enabled: !!record,
      },
    });

  const { data: tenantData, isLoading: tenantIsLoading } = useOne<BaseRecord>({
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
              {record && <ContractDateCard record={record} />}

              {/* <ContractDurationCard record={record} /> */}

              {record && (
                <ContractDetailsCard
                  record={{
                    img: record.img || "",
                    name: record.name || "",
                    description: record.description || "",
                    rent: record.rent || 0,
                    property_type: record.property_type || "",
                    total_rooms: record.total_rooms || 0,
                    notes: record.notes || "",
                  }}
                />
              )}
              {record && tenantData?.data && (
                <TenantCard
                  tenantData={tenantData?.data}
                  tenantIsLoading={tenantIsLoading}
                />
              )}
            </Flex>
          </Flex>
        </Flex>
        <InvoicesSection />
      </Flex>
    </Show>
  );
};
