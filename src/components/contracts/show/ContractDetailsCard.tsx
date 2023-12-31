import React, { useState } from "react";
import { Card, Typography, Statistic, Input, Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { BooleanField, NumberField, TextField } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";

const { Title, Text } = Typography;
const { TextArea } = Input;

interface ContractDetailsCardProps {
  record: any;
}

export const ContractDetailsCard = ({ record }: ContractDetailsCardProps) => {
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
          <FileTextOutlined /> Contract Details
        </>
      }
      style={{ marginTop: "10px", marginBottom:"10px", width: "100%" }}
    >
      <Statistic title="Rent" value={`RM ${record?.rent ?? ""}`} />

      {/* <Title level={5}>{translate("contracts.fields.active")}</Title>
      <BooleanField value={record?.active} /> */}

      <div style={{ padding: "5px", marginTop: "10px" }}>
        {/* <Title level={5}>{translate("contracts.fields.notes")}</Title> */}

        <div style={{ padding: "5px" }}>
          <Text italic>Attached note</Text>
        </div>
        <TextField value={record?.notes} />
        <TextArea
          showCount
          maxLength={100}
          onChange={onChange}
          placeholder="There is no attached note for this contract."
          style={{ height: "5rem", resize: "none" }}
        />
        <Button
          type="primary"
          style={{ backgroundColor: "#27AE60", marginTop: "10px" }}
          onClick={handleNoteSubmit}
        >
          Submit Note
        </Button>
      </div>
    </Card>
  );
};
