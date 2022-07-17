import React, { useEffect, useState } from 'react'

import { Button, Form, Input,Row,Col,Card, Steps, DatePicker,Radio,message, Divider } from 'antd';
import FormSelect from "../../forms/form-input/form-select";
import { validFullName } from "src/utils/Validation";
import validateMessages from "src/utils/validationMessages";
import { displayMessages, successMessages } from "src/utils/messages";
import { generalErrorHandler } from "src/utils/errors";
import { Regex } from "src/utils/Regex";
import { 
  fetchStateList,
  fetchCityList,
  saveLeadData
} from "src/api/services/lead";

const CustomerDetails = (props) => {
  const [form] = Form.useForm();
  const [cityList, setCityList] = useState((props.customerInitialData.cityList)?props.customerInitialData.cityList:[]);
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchState = async () => {
    setLoading(true)
    let response = await fetchStateList();
    if (response.statusCode >= 400) {
        generalErrorHandler(response)
        setLoading(false)
        return;
    }
    response = response.data;
    setStateList(response)
    setLoading(false)
  }
  const fetchCity = async (state,other) => {
    setLoading(true)
    form.resetFields(['city'])
    let response = await fetchCityList({state});
    if (response.statusCode >= 400) {
        generalErrorHandler(response)
        setLoading(false)
        return;
    }
    response = response.data;
    setCityList(response)
    setLoading(false)
  }
  
  useEffect(() => {
    (
        async () => {
            await fetchState();
        }
    )()
  }, [])
  useEffect(() => {
    (
        async () => {
          if(props.customerInitialData.state_id)
            await fetchCity(props.customerInitialData.state_id);
        }
    )()
  }, [props.customerInitialData.state_id])

  const onFinish = async (fieldsValue) => {
    setLoading(true)
    fieldsValue.lead_step="CUSTOMERDETAIL"
    if(props.leadId){
      fieldsValue.lead_id=props.leadId
    }
    props.setCustomerInitialData(fieldsValue)
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
      message.error("Please Enter Required Fields");
  };
  return (
    <Card
        bordered
        hoverable
    >
      
        <div className="cardHeader">
            <h2 className="heading">Customer Details</h2>
        </div>

        <Form
          name = "customerDetails"
          label = "Customer Details"
          onFinish={onFinish}
          layout="horizontal"
          form={form}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
          initialValues={props.customerInitialData} 
          size="large" 
        >
          
            <Form.Item
                name="mobile"
                rules={[
                  { 
                    required: true,
                    message:"Please Enter Mobile"
                  },
                  {
                    pattern: Regex.mobile,
                    message: 'Please Enter Valid Mobile',
                  }
                ]}

                >
                <Input
                    placeholder="Enter Mobile" maxLength={10}
                />
            </Form.Item>
            <Form.Item
                name="name"
                rules={[
                  { 
                    required: true,
                    message:"Please Enter Full Name"
                  },
                  {
                    validator: (_, value) => {
                      if (!value || validFullName(value)) {
                        return Promise.resolve('');
                      } else {
                        return Promise.reject('Please Enter Valid Full Name');
                      }
                     }
                   }
                 ]}
                >
                <Input
                    placeholder="Enter Full name"
                />
            </Form.Item>
            <Form.Item
                
                name="dob"
            >
                <DatePicker placeholder='Date of Birth' style={{ width: '100%' }}/>

            </Form.Item>
            <FormSelect
              name="state_id"
              options={ stateList }
              onSelect={fetchCity}
              rules={[{ required: true, message:"Please Select State"}]}
              placeholder="Select State"
            />
            <FormSelect
              name="city_id"
              options={cityList}
              rules={[{ required: true, message:"Please Select City"}]}
              placeholder="Select City"
            />
            <Form.Item
              name="pincode"
              rules={[
                {
                  pattern: Regex.pincode,
                  message: 'Please Enter Valid Pincode',
                }
              ]}
              >
              <Input
                  placeholder="Enter Pincode" maxLength={6}
              />
            </Form.Item>
            <FormSelect
              name="residential_type"
              options={
                      [
                          {text:"Owned", value:"Owned"},
                          {text:"Rented", value:"Rented"}
                      ]
                  }
              
              placeholder="Select Residential Type"
            />
            <Form.Item
                name="gender"
                initialValue={"Male"}
              >
              <Radio.Group size="large"  buttonStyle="solid">
                <Radio.Button value="Male">Male</Radio.Button>
                <Radio.Button value="Female">Female</Radio.Button>
                <Radio.Button value="Other">Other</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Divider />
            <Button
              htmlType="submit"
              type="primary"
              >
                Next

            </Button>
        </Form>
    </Card>
  );
};

export default CustomerDetails;
