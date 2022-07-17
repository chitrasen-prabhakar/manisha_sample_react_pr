import React, { useEffect, useState, useRef } from 'react'

import { 
    Form,
    Button,
    message,
    Divider,
    Col,
    Input,
    Card, Typography 
    } from "antd";
    import FormSelect from "../form-input/form-select";
   
import { Regex } from "src/utils/Regex";

import { displayMessages, successMessages } from "src/utils/messages";

import validateMessages from "src/utils/validationMessages";

const { Text, Link } = Typography;
import { 
  saveLeadData
} from "src/api/services/lead";
import { useRouter } from 'next/router'
const EmploymentDetails = (props) => {
  const [loading, setLoading] = useState(false);
  const viewFormRef = useRef()
  const router = useRouter()

  const onFinish = async (fieldsValue) => {
    setLoading(true)
    fieldsValue.lead_step="EMPLOYMENTDETAIL"
    if(props.leadId){
      fieldsValue.lead_id=props.leadId
    }
    props.setEmploymentInitialData(fieldsValue)
    let response = await saveLeadData(fieldsValue);
    response = response.data
    if (response.statusCode >= 400) {
        generalErrorHandler(response)
        setLoading(false)
        return;
    }
    props.setLeadId(response.data.lead_id)
    setLoading(false)
    props.next()
  };

  const onFinishFailed = (errorInfo) => {
      message.error(displayMessages.failed);
  };
  useEffect(() => {
    (
        async () => {
          if(typeof props.leadId=="undefined" || !props.leadId){
            message.error("Something went wrong!!!.. Please start over");
            setTimeout(()=>{
              router.reload(window.location.pathname)
            },1000)
          }
        }
    )()
  }, [props.leadId])
  return (
    <Card
        bordered
        hoverable
    >
      <div className="cardHeader">
          <h3 className="">You are already half way through!</h3>
          <Text type="success">Your PAN card will help us calculate actual loan amount</Text>
      </div>
      <Divider />
      <Form
          name = "Employment Details"
          label = "Employment Details"
          onFinish={onFinish}
          layout="horizontal"
          ref={viewFormRef}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
          initialValues={props.employmentInitialData}
          size="large" 
      >
        <Form.Item
            name="monthly_income"
            rules={[
              { required: true, message:"Please Enter Monthly Salary"},
              {
                pattern: Regex.number,
                message: 'Only Number allowed',
              }
            ]}
            >
            <Input
                placeholder="Monthly Salary (In Hand)"
            />
        </Form.Item>
        <Form.Item
            name="employer_name"
            rules={[
              { required: true, message:"Please Enter Company Name"},
            ]}
            >
            <Input
                placeholder="Company Name"
            />
        </Form.Item>
        <div>PAN Card Details</div>
        <Text type="success">Your PAN card will help us calculate actual loan amount</Text>

        <Form.Item
            name="pan_no"
            rules={[
              { required: true, message:"Please Enter Pan Numner"},
              {
                pattern: Regex.pancard,
                message: 'Please Enter Valid Pan No',
              }
            ]}

            >
            <Input
                placeholder="PAN Number" maxLength={10}
            />
        </Form.Item>
        <Text style={{color:"blue"}}>
        Your details are secure and will be used only for the loan application process
        </Text>
        <Divider/>
        <div className="steps-action">
          <Button type="primary" htmlType="submit">
            Next
          </Button>
          <Button style={{ margin: '0 8px' }} onClick={() => props.prev()}>
            Previous
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EmploymentDetails