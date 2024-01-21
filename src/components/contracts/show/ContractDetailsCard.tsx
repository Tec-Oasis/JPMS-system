import React, { useState } from "react";
import { Card, Typography, Statistic, Input, Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { BooleanField, NumberField, TextField } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";

const { Title, Text } = Typography;
const { TextArea } = Input;

type BaseRecord = {
  // Optional properties
  img?: string;
  name?: string;
  description?: string;
  rent?: number;
  property_type?: string;
  total_rooms?: number;
  notes?: string;
};

interface ContractDetailsCardProps {
  record: BaseRecord;
}

export const ContractDetailsCard: React.FC<ContractDetailsCardProps> = ({
  record,
}) => {
  const translate = useTranslate();

  const [note, setNote] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote(e.target.value);
  };

  const handleNoteSubmit = () => {
    alert(note);
  };

  return (
    <Card
      title={
        <>
          <FileTextOutlined />{" "}
          {translate("contracts.contractDetailsCard.title")}
        </>
      }
      style={{ marginTop: "10px", marginBottom: "10px", width: "100%" }}
    >
      <Statistic
        title={translate("contracts.contractDetailsCard.rent")}
        value={`${translate("contracts.contractDetailsCard.currency")} ${
          record?.rent ?? ""
        }`}
      />

      {/* <Title level={5}>{translate("contracts.fields.active")}</Title>
      <BooleanField value={record?.active} /> */}

      <div style={{ padding: "5px", marginTop: "10px" }}>
        {/* <Title level={5}>{translate("contracts.fields.notes")}</Title> */}

        <div style={{ padding: "5px" }}>
          <Text italic>{translate("contracts.contractDetailsCard.attached_note")}</Text>
        </div>
        <TextField value={record?.notes} />
        <TextArea
          showCount
          maxLength={100}
          onChange={onChange}
          placeholder={translate("contracts.contractDetailsCard.note_placeholder")}
          style={{ height: "5rem", resize: "none" }}
        />
        <Button
          type="primary"
          style={{ backgroundColor: "#27AE60", marginTop: "10px" }}
          onClick={handleNoteSubmit}
        >
          {translate("contracts.contractDetailsCard.submit_note")}
        </Button>
      </div>
    </Card>
  );
};
