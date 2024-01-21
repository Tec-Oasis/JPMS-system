import React from "react";
import {
  IResourceComponentsProps,
  BaseRecord,
  useTranslate,
  useMany,
  CrudFilters,
  HttpError,
} from "@refinedev/core";
import {
  useTable,
  List,
  ShowButton,
  DateField,
  BooleanField,
} from "@refinedev/antd";

import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Table,
  Space,
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  FormProps,
} from "antd";

interface IContract {
  id: number;
  tenant_id: number;
  property_id: number;
  contract_start: string;
  contract_end: string;
  rent: number;
  active: boolean;
}

export const ContractList: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();

  const { tableProps, searchFormProps } = useTable<IContract>({
    initialSorter: [
      {
        field: "id",
        order: "desc",
      },
    ],
    onSearch: (params: any) => {
      const filters: CrudFilters = [];
      const { q, active } = params;
      filters.push({
        field: "q",
        operator: "eq",
        value: q,
      });

      filters.push({
        field: "active",
        operator: "eq",
        value: active,
      });

      return filters;
    },

    syncWithLocation: true,
  });

  const { data: propertyData, isLoading: propertyIsLoading } = useMany({
    resource: "properties",
    ids: tableProps?.dataSource?.map((item) => item?.property_id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  const { data: tenantData, isLoading: tenantIsLoading } = useMany({
    resource: "tenants",
    ids: tableProps?.dataSource?.map((item) => item?.tenant_id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col
        xl={6}
        lg={24}
        xs={24}
        style={{
          marginTop: "48px",
        }}
      >
        <Card title={"Filters"}>
          <Filter formProps={searchFormProps} />
        </Card>
      </Col>
      <Col xl={18} xs={24}>
        <List>
          <Table {...tableProps} rowKey="id">
            {/* <Table.Column
              dataIndex={["tenant_id"]}
              title={translate("contracts.fields.fname")}
              render={(value: any) => {
                const tenant = tenantData?.data?.find(
                  (item) => item.id === value
                );
                return tenant?.fname;
              }}
            />
            <Table.Column
              dataIndex={["tenant_id"]}
              title={translate("contracts.fields.lname")}
              render={(value: any) => {
                const tenant = tenantData?.data?.find(
                  (item) => item.id === value
                );
                return tenant?.lname;
              }}
            /> */}
            <Table.Column
              dataIndex={["tenant_id"]}
              title={translate("contracts.fields.name")}
              render={(value: any) => {
                const tenant = tenantData?.data?.find(
                  (item) => item.id === value
                );
                return tenant?.name;
              }}
            />
            <Table.Column
              dataIndex={["property_id"]}
              title={translate("contracts.fields.property")}
              render={(value: any) => {
                const property = propertyData?.data?.find(
                  (item) => item.id === value
                );
                return property?.name;
              }}
            />
            <Table.Column
              dataIndex={["contract_start"]}
              title={translate("contracts.fields.contract_start")}
              render={(value: any) => <DateField value={value} />}
            />
            <Table.Column
              dataIndex={["contract_end"]}
              title={translate("contracts.fields.contract_end")}
              render={(value: any) => <DateField value={value} />}
            />
            <Table.Column
              dataIndex="rent"
              title={translate("contracts.fields.rent")}
            />
            {/* <Table.Column
              dataIndex="notes"
              title={translate("contracts.fields.notes")}
            /> */}
            <Table.Column<IContract>
              key="active"
              dataIndex="active"
              title={translate("contracts.fields.active")}
              render={(value: any) => <BooleanField value={value} />}
            />

            {/* <Table.Column
              dataIndex="id"
              title={translate("contracts.fields.id")}
            /> */}
            <Table.Column
              title={translate("table.actions")}
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                <Space>
                  <ShowButton hideText size="small" recordItemId={record.id} />
                </Space>
              )}
            />
          </Table>
        </List>
      </Col>
    </Row>
  );
};

const Filter: React.FC<{ formProps: FormProps }> = (props) => {
  const t = useTranslate();

  const { RangePicker } = DatePicker;

  return (
    <Form layout="vertical" {...props.formProps}>
      <Row gutter={[10, 0]} align="bottom">
        <Col xs={24} xl={24} md={12}>
          <Form.Item label={t("users.filter.search.label")} name="q">
            <Input
              placeholder={t("users.filter.search.placeholder")}
              prefix={<SearchOutlined />}
            />
          </Form.Item>
        </Col>
        {/* <Col xs={24} xl={24} md={12}>
          <Form.Item label={t("users.filter.createdAt.label")} name="createdAt">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Col> */}
        {/* <Col xs={24} xl={24} md={8}>
          <Form.Item label={t("users.filter.gender.label")} name="gender">
            <Select
              allowClear
              placeholder={t("users.filter.gender.placeholder")}
              options={[
                {
                  label: t("users.filter.gender.male"),
                  value: "Male",
                },
                {
                  label: t("users.filter.gender.female"),
                  value: "Female",
                },
              ]}
            />
          </Form.Item>
        </Col> */}
        <Col xs={24} xl={24} md={8}>
          <Form.Item label={t("users.filter.active.label")} name="active">
            <Select
              allowClear
              placeholder={t("users.filter.active.placeholder")}
              options={[
                {
                  label: t("users.filter.active.true"),
                  value: "true",
                },
                {
                  label: t("users.filter.active.false"),
                  value: "false",
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col xs={24} xl={24} md={8}>
          <Form.Item>
            <Button style={{ width: "100%" }} htmlType="submit" type="primary">
              {t("users.filter.submit")}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
