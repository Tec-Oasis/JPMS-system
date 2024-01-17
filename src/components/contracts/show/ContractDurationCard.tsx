import { CalendarOutlined } from "@ant-design/icons";
import { DateField } from "@refinedev/antd";
import { useTranslate } from "@refinedev/core";
import { Card, Progress, Typography, Statistic, Divider, Space } from "antd";

const { Title, Text } = Typography;

interface ContractDurationCardProps {
  record: any;
}

export const ContractDurationCard = ({ record }: ContractDurationCardProps) => {
  const translate = useTranslate();

  // formate the date to be in the format of "YYYY-MM-DD"
  const startDate = record?.contract_start;
  const endDate = record?.contract_end;

  // get the difference between the two dates in days:
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  // get the remaining days to contract end from today's date:
  const today = new Date();
  const diffDays = Math.abs(date2.getTime() - today.getTime());

  const remainingDays = Math.ceil(diffDays / (1000 * 3600 * 24));
  const startDateString = date1.toDateString();
  const endDateString = date2.toDateString();

  const totalDays = Math.ceil(
    Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)
  );
  const remainingPercentage = (remainingDays / totalDays) * 100;

  return (
    <Card style={{width:"100%", margin:"10px"}}>
      {/* <Statistic title="Remaining days to end of contract" /> */}
      {/* <Space> */}
        <Text type="secondary">Days Remaining</Text>
        <div style={{ marginTop: "10px" }}>
          <Progress
            type="circle"
            percent={remainingPercentage}
            format={(percent) => `${remainingDays} Days`}
            strokeColor="#52c41a" // color of the progress bar
            strokeLinecap="round" // shape of the progress bar end: 'round' or 'square'
            strokeWidth={2} // width of the progress bar
            trailColor="#D9D9D9" // color of the trail
            width={80}
          />
        </div>
      {/* </Space> */}

      {/* <Title level={5}>{translate("contracts.fields.contract_start")}</Title>
      <DateField value={record?.contract_start} />
      <Title level={5}>{translate("contracts.fields.contract_end")}</Title>
      <DateField value={record?.contract_end} /> */}
    </Card>
  );
};