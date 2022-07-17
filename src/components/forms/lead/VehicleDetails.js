import React, { useEffect, useState, useRef } from 'react'

import { 
    Form,
    Button,
    message,
    Radio,
    Input,
    Row,
    DatePicker,
    Card, Space, Divider 
    } from "antd";
    import FormSelect from "../form-input/form-select";
   
const { RangePicker } = DatePicker;
import { 
  getMakeData,
  getModelData,
  saveLeadData
} from "src/api/services/lead";


import { displayMessages, successMessages } from "src/utils/messages";

import validateMessages from "src/utils/validationMessages";

import { generalErrorHandler } from "src/utils/errors";
import { useRouter } from 'next/router'
const VehicleDetails = (props) => {
  const [makeList, setMakeList] = useState([]);
  const [modelList, setModelList] = useState((props.vehicleInitialData.modelList)?props.vehicleInitialData.modelList:[]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter()
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

  useEffect(() => {
    (
        async () => {
            await fetchMake();
        }
    )()
  }, [])
  useEffect(() => {
    (
        async () => {
          if(props.vehicleInitialData.make_id)
            await getModelList(props.vehicleInitialData.make_id);
        }
    )()
  }, [props.vehicleInitialData.make_id])
  const onFinish = async (fieldsValue) => {
    setLoading(true)
    fieldsValue.lead_step="VEHICLEDETAIL"
    if(props.leadId){
      fieldsValue.lead_id=props.leadId
    }
    props.setVehicleInitialData(fieldsValue)
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
  const getModelList = async (make,other) =>{
    form.resetFields(['model_id']);
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
          <h3 className="">You were looking for</h3>
      </div>
      <Divider />
      <Form
        name = "assetDetails"
        label = "Asset Details"
        onFinish={onFinish}
        layout="horizontal"
        form={form}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        initialValues={{
          ...props.vehicleInitialData,
          vehicle_type: (props.vehicleInitialData.vehicle_type)?props.vehicleInitialData.vehicle_type:"Bike"
        }}
        size="large" 
      >
        <FormSelect
          name="make_id"
          options={makeList}
          onSelect={getModelList}
          placeholder="Select Make"
          rules={[{ required: true,message:'Please Select Make'}]}
        />
        <FormSelect
          rules={[{ required: true,message:'Please Select Model'}]}
          name="model_id"
          options={modelList}
          placeholder="Select Model"
        />
        <Form.Item
                name="likely_purchase_in"
                initialValue={"7"}
                label="Planning to purchase in how many days?"
              >
          <Radio.Group optionType="button" buttonStyle="solid" size="large" >
            <Radio.Button value="7" style={{width:90}}>7 Days</Radio.Button>
            <Radio.Button value="15" style={{width:90}}>15 Days</Radio.Button>
            <Radio.Button value="30" style={{width:120}}>30 Days</Radio.Button>
            <Radio.Button value="45" style={{width:90}}>45 Days</Radio.Button>
            <Radio.Button value="60" style={{width:90}}>60 Days</Radio.Button>
            <Radio.Button value="JC" style={{width:120}}>JustChecking</Radio.Button>
          </Radio.Group>
        </Form.Item>
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

export default VehicleDetails