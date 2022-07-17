import React, { useEffect, useState, useRef } from 'react'

import { 
    Form,
    Button,
    message,
    Col,
    Input,
    Row,
    DatePicker,
    Card, Space 
    } from "antd";
import FormSelect from "../../../src/components/forms/form-input/form-select";
import validateMessages from "src/utils/validationMessages";
import { displayMessages, successMessages } from "src/utils/messages";
import { generalErrorHandler } from "src/utils/errors";
import { useRouter } from "next/router";
import moment from "moment";

const { RangePicker } = DatePicker;
import { 
  fetchStateList,
  fetchCityList,
  getFullLeadData,
  getModelData,
  getMakeData,
  updateLeadToLms
} from "src/api/services/lead";
import { Regex } from "src/utils/Regex";
import { validFullName } from "src/utils/Validation";
const Index = (props) => {
    const router = useRouter();

    const { id } = router.query;

  const [form] = Form.useForm();

  const [cityList, setCityList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stateName, setStateName] = useState(false);
  const [cityName, setCityName] = useState(false);
  const [leadData, setLeadData] = useState({});
  const [makeList, setMakeList] = useState([]);
  const [make, setMakeName] = useState(false);
  const [model, setModelName] = useState(false);
  const [modelList, setModelList] = useState([]);
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
  const fetchMake = async () => {
    setLoading(true)
    let response = await getMakeData();
    if (response.statusCode >= 400) {
        generalErrorHandler(response)
        setLoading(false)
        return;
    }
    response = response.data;

    setMakeList(response)
    setLoading(false)
  }
  const getModelList = async (make,other) =>{
    setLoading(true)
    let response = await getModelData({make});
    if (response.statusCode >= 400) {
        generalErrorHandler(response)
        setLoading(false)
        return;
    }
    response = response.data
    if(response){
        setModelList(response);
    }
    
    setLoading(false)
  }
  const fetchCity = async (state,other) => {
    setLoading(true)
    //form.resetFields(['city_id']);
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
  const fetchData = async (id) => {
    setLoading(true)
    let response = await getFullLeadData({lead_id:id});
    if (response.statusCode >= 400) {
        generalErrorHandler(response)
        setLoading(false)
        return;

    }
    response = response.data;
    (response.dob)?response.dob = moment(response.dob):"";
    if(typeof response.spouse_first_name!="undefined" && response.spouse_first_name){
      response.spouse_name = response.spouse_first_name
      if(typeof response.spouse_last_name!="undefined" && response.spouse_last_name){
        response.spouse_name += " "+response.spouse_last_name
      }
    }
    if(typeof response.father_first_name!="undefined" && response.father_first_name){
      response.father_name = response.father_first_name
      if(typeof response.father_last_name!="undefined" && response.father_last_name){
        response.father_name += " "+response.father_last_name
      }
    }
    if(typeof response.mother_first_name!="undefined" && response.mother_first_name){
      response.mother_name = response.mother_first_name
      if(typeof response.mother_last_name!="undefined" && response.mother_last_name){
        response.mother_name += " "+response.mother_last_name
      }
    }

    if(response.state_id){
        fetchCity(response.state_id)
    }
    if(response.make_id){
        getModelList(response.make_id)
    }
    
    setLeadData(response);
    setLoading(false)
}
  useEffect(() => {
    (
        async () => {
            if(id){
                await fetchData(id);
            }
            fetchState()
            fetchMake()
        }
    )()
}, [id])
  const onFinish = async (fieldsValue) => {
    const submitMsg = message.loading(displayMessages.request, 0);

   const response = await updateLeadToLms(fieldsValue)
   if (response.statusCode >= 400) {
        generalErrorHandler(response)
        setLoading(false)
        return;

    }
    setLoading(false)
    submitMsg();
    message.success(response.data.message)
      setTimeout(()=>{
        router.push(`/lead`)
      })
  };

  const onFinishFailed = (errorInfo) => {
      message.error(displayMessages.failed);
  };
  
  
  function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
  return (
    <>
    { (!isEmpty(leadData)) && 
        <Form
        {...{
            labelCol: { span: 5 },
            wrapperCol: { span: 14 },
        }}
        name = "customerDetails"
        label = "Customer Details"
        onFinish={onFinish}
        layout="horizontal"
        form={form}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        initialValues={leadData}
        >
           
        <Space direction="vertical" size="middle" style={{ display: 'flex', paddingTop:20 }}>
        <Card title="Customer Detail" size="big">
        <Row>
        <Col span={12}>
            <Form.Item
                label="First Name"
                name="first_name"
                >
                <Input
                    placeholder="Enter First name" disabled={true}
                />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
                label="Last Name"
                name="last_name"
                >
                <Input
                    placeholder="Enter Last name" disabled={true}
                />
            </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item
                label="Mobile"
                name="mobile"
                >
                <Input
                    placeholder="Enter Mobile" maxLength={10} disabled={true}
                />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                      pattern: Regex.email,
                      message: 'Please Enter Valid Email',
                    }
                  ]}
                >
                <Input
                    placeholder="Enter Email"
                />
            </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item
                label="DOB"
                name="dob"
            >
                <DatePicker />

            </Form.Item>
        </Col>
        <Col span={12}>
            <FormSelect

                    name="gender"
                    options={
                            [
                                {text:"Male", value:"Male"},
                                {text:"Female", value:"Female"}
                            ]
                        }
                    
                    label="Gender"
                    placeholder="Select Gender"
            />
        </Col>
        </Row>
        <Row>
        <Col span={12}>
        <FormSelect
                    name="state_id"
                    options={ stateList }
                    onSelect={()=>{fetchCity();form.setFieldsValue({city_id:null});}}
                    rules={[{ required: true}]}
                    label="State"
                    placeholder="Select State"
            />
        </Col>
        <Col span={12}>
            <FormSelect
                    name="city_id"
                    options={cityList}
                    rules={[{ required: true}]}
                    onSelect={(value,other)=>{setCityName(other.children)}}
                    label="City"
                    placeholder="Select City"
            />
        </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item
                label="Pincode"
                name="pincode"
                rules={[
                    {
                      pattern: Regex.pincode,
                      message: 'Please Enter Valid Pincode',
                    }
                  ]}
                >
                <Input
                    placeholder="Enter Pincode"
                />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
                label="PAN No"
                name="pancard"
                rules={[
                    { required: true},
                    {
                      pattern: Regex.pancard,
                      message: 'Please Enter Valid Pan No',
                    }
                  ]}

                >
                <Input
                    placeholder="Enter PAN No"
                />
            </Form.Item>
        </Col>
        </Row>

        <Row>
        <Col span={12}>
            <Form.Item
                label="Spouse Name"
                name="spouse_name"
                rules={[
                    {
                      validator: (_, value) => {
                        if (validFullName(value)) {
                          return Promise.resolve('');
                        } else {
                          return Promise.reject('Please Enter Valid Full Name');
                        }
                       }
                     }
                   ]}
                >
                <Input
                    placeholder="Enter Spouse Name"
                />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
                label="Spouse Mobile"
                name="spouse_mobile"
                rules={[
                    {
                      pattern: Regex.mobile,
                      message: 'Please Enter Valid Mobile',
                    }
                  ]}
                >
                <Input
                    placeholder="Enter Spouse Mobile"
                />
            </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item
                label="Father Name"
                name="father_name"
                rules={[
                    {
                      validator: (_, value) => {
                        if (validFullName(value)) {
                          return Promise.resolve('');
                        } else {
                          return Promise.reject('Please Enter Valid Full Name');
                        }
                       }
                     }
                   ]}
                >
                <Input
                    placeholder="Enter Father Name"
                />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
                label="Father Mobile"
                name="father_mobile"
                rules={[
                    {
                      pattern: Regex.mobile,
                      message: 'Please Enter Valid Mobile',
                    }
                  ]}
                >
                <Input
                    placeholder="Enter Father Mobile"
                />
            </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item
                label="Mother Name"
                name="mother_name"
                rules={[
                    {
                      validator: (_, value) => {
                        if (validFullName(value)) {
                          return Promise.resolve('');
                        } else {
                          return Promise.reject('Please Enter Valid Full Name');
                        }
                       }
                     }
                   ]}
                >
                <Input
                    placeholder="Enter Mother Name"
                />
            </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item
                label="Mother Mobile"
                name="mother_mobile"
                rules={[
                    {
                      pattern: Regex.mobile,
                      message: 'Please Enter Valid Mobile',
                    }
                  ]}
                >
                <Input
                    placeholder="Enter Mother Mobile"
                />
            </Form.Item>
        </Col>
        </Row>
        </Card>
        <Card title="Vehicle Detail" size="big">
    
    <Row>
      <Col span={12}>
      <FormSelect
                name="make_id"
                options={makeList}
                onSelect={()=>{getModelList();form.setFieldsValue({model_id:null});}}
                label="Make"
                placeholder="Select Make"
                rules={[{ required: true}]}
        />
      </Col>
      <Col span={12}>
        <FormSelect
        rules={[{ required: true}]}
                name="model_id"
                options={modelList}
                label="Model"
                placeholder="Select Model"
                onSelect={(value,other)=>{setModelName(other.children)}}
        />
      </Col>
    </Row>
    <Row>
      
      <Col span={12}>
        <FormSelect
                name="vehicle_type"
                defaultValue="Bike"
                options={
                        [
                            {text:"Bike", value:"Bike"},
                            {text:"Car", value:"Car"}
                        ]
                    }
                
                label="Vehicle Type"
                placeholder="Select Vehicle Type"
        />
      </Col>
    </Row>
    </Card>
    <Card title="Employment Detail" size="big">
    
    <Row>
      
      <Col span={12}>
      <Form.Item
            label="Min Monthly Income"
            name="min_monthly_income"
            rules={[
                {
                  pattern: Regex.number,
                  message: 'Only Number allowed',
                }
              ]}
            >
            <Input
                placeholder="Enter Min Monthly Income"
            />
        </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item
            label="Max Monthly Income"
            name="max_monthly_income"
            rules={[
                {
                  pattern: Regex.number,
                  message: 'Only Number allowed',
                }
              ]}
            >
            <Input
                placeholder="Enter Max Monthly Income"
            />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
      <FormSelect
                name="employment_type"
                options={
                        [
                            {text:"Salaried", value:"Salaried"},
                            {text:"Self Employed", value:"Self-Employed"},
                            {text:"Retired", value:"Retired"},
                            {text:"Student", value:"Student"},
                            {text:"Home Maker", value:"Home-Maker"}
                        ]
                    }
                
                label="Employment Type"
                placeholder="Select Employment Type"
        />
      </Col>
      <Col span={12}>
        <FormSelect
                name="type_organisation"
                options={
                        [
                            {text:"IT", value:"IT"},
                            {text:"MNC", value:"MNC"}
                        ]
                    }
                
                label="Organisation Type"
                placeholder="Select Organisation Type"
        />
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Form.Item
            label="Employer Name"
            name="employer_name"
            
            >
            <Input
                placeholder="Enter Employer Name"
            />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
            label="Annual Gross Salary"
            name="annual_gross_salary"
            rules={[
                {
                  pattern: Regex.number,
                  message: 'Only Number allowed',
                }
              ]}
            >
            <Input
                placeholder="Enter Annual Gross Salary"
            />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Form.Item
            label="Monthly Income"
            name="monthly_income"
            rules={[
                {
                  pattern: Regex.number,
                  message: 'Only Number allowed',
                }
              ]}
            >
            <Input
                placeholder="Enter Monthly Income"
            />
        </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item
            label="Work Email"
            name="work_email_address"
            rules={[
                {
                  pattern: Regex.email,
                  message: 'Enter Valid Email',
                }
              ]}
            >
            <Input
                placeholder="Enter Work Email"
            />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Form.Item
            label="Year at current company"
            name="years_at_current_company"
            rules={[
                {
                  pattern: Regex.number,
                  message: 'Only Number allowed',
                }
              ]}
            >
            <Input
                placeholder="Enter Current Year"
            />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
            label="Total year of exp"
            name="total_years_of_work_exp"
            rules={[
                {
                  pattern: Regex.number,
                  message: 'Only Number allowed',
                }
              ]}
            >
            <Input
                placeholder="Enter exp"
            />
        </Form.Item>
      </Col>
    </Row>
    </Card>

    <Card title="Residential Detail" size="big">
    
    <Row>
      
      <Col span={12}>
        <FormSelect
                name="residential_type"
                options={
                        [
                            {text:"Owned", value:"Owned"},
                            {text:"Rented", value:"Rented"}
                        ]
                    }
                
                label="Residential Type"
                placeholder="Select Residential Type"
        />
      </Col>
      <Col span={12}>
      <Form.Item
            label="Address"
            name="residential_address"
            
            >
            <Input
                placeholder="Enter Address"
            />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
      <FormSelect
                name="residential_state"
                options={ stateList }
                onSelect={fetchCity}
                label="State"
                placeholder="Select State"
        />
      </Col>
      <Col span={12}>
        <FormSelect
                name="residential_city"
                options={cityList}
                onSelect={(value,other)=>{setCityName(other.children)}}
                label="City"
                placeholder="Select City"
        />
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Form.Item
            label="Pincode"
            name="pincode"
            rules={[
                {
                  pattern: Regex.pincode,
                  message: 'Please Enter Valid Pincode',
                }
              ]}
            >
            <Input
                placeholder="Enter Pincode"
            />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
            label="Landmark"
            name="residential_landmark"
            
            >
            <Input
                placeholder="Enter Landmark"
            />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Form.Item
            label="Year in current residence"
            name="year_in_current_residence"
            rules={[
                {
                  pattern: Regex.number,
                  message: 'Only Number allowed',
                }
              ]}
            >
            <Input
                placeholder="Enter Current Year"
            />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
            label="Months in current residence"
            name="months_in_current_residence"
            rules={[
                {
                  pattern: Regex.number,
                  message: 'Only Number allowed',
                }
              ]}
            >
            <Input
                placeholder="Enter Current Month"
            />
        </Form.Item>
      </Col>
    </Row>
    <Form.Item >
            <Button
            htmlType="submit"
            type="primary"
            >
            Update

            </Button>
        </Form.Item>
    </Card>
        
        </Space>
        <Form.Item
                name="lead_id"
                >
                <Input type={"hidden"} />
            </Form.Item>
            <Form.Item
                name="customer_id"
                >
                <Input type={"hidden"} />
            </Form.Item>
        </Form>
    }
    </>
    
  );
};

export default Index