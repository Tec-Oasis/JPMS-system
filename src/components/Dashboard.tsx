import React from "react";
import { Card, Col, Row, Statistic, DatePicker, Select, Divider } from "antd";
import { Line, Pie } from "@ant-design/charts";

const { Option } = Select;

const Dashboard = () => {
  // Placeholder data for the charts
  const lineData = [
    { month: "Jan", value: 120 },
    { month: "Feb", value: 200 },
    { month: "Mar", value: 150 },
    { month: "Apr", value: 180 },
    { month: "May", value: 220 },
    { month: "Jun", value: 190 },
  ];

  const pieData = [
    { type: "Marina Residence", value: 27 },
    { type: "Jabal Ali", value: 25 },
    { type: "Sharjah", value: 18 },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={24} style={{ marginBottom: 20 }}>
          <Card>
            <Row gutter={16}>
              <Col span={8}>
                <Statistic title="Total invoices Amount" value="MYR 558,000"/>
              </Col>
              <Col span={8}>
                <Statistic title="Unpaid Invoices" value={"MYR 121,560"} />
              </Col>
              <Col span={8}>
                <Statistic title="Active contracts" value={43} />
              </Col>
              {/* Add more statistics here */}
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Overview">
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Total Revenue" value={112893} />
              </Col>
              <Col span={12}>
                <Statistic title="Total Expenses" value={109301} />
              </Col>
              <Col span={12}>
                <Statistic title="Net Income" value={3592} />
              </Col>
              <Col span={12}>
                <Statistic title="Profit Margin (%)" value={3.18} />
              </Col>
            </Row>
            <Divider />
            <Line data={lineData} xField="month" yField="value" />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Revenue Breakdown" style={{height:"100%"}}>
            <Pie data={pieData} angleField="value" colorField="type" />
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Financial Analytics">
            <Row gutter={16}>
              <Col span={12}>
                <Card title="Revenue Breakdown">
                  <Pie data={pieData} angleField="value" colorField="type" />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Expense Breakdown">
                  <Pie data={pieData} angleField="value" colorField="type" />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      {/* More sections here */}
    </div>
  );
};

export default Dashboard;
