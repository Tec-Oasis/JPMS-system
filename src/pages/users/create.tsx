import React from "react";
import {
  IResourceComponentsProps,
  useTranslate,
  CanAccess,
} from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const UserCreate: React.FC<IResourceComponentsProps> = () => {
  const translate = useTranslate();
  const { formProps, saveButtonProps, queryResult } = useForm();

  return (
    <CanAccess resource="users" action="create" fallback={<h1>You're not authorized to access this resource</h1>}>
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
            label={translate("users.fields.name")}
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
            label={translate("users.fields.email")}
            name={["email"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={translate("users.fields.password_hashed")}
            name={["password_hashed"]}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={translate("users.fields.role")}
            name={["role"]}
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
    </CanAccess>
  );
};
