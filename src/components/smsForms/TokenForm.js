import React, {useState} from 'react';
import { Button, Input , Form, Radio, Space, Select } from "antd";
import smsPanalHoc from '../hoc/smsPanalModal.hoc';
import {SmsContext} from '../../contexts/smsContext';

const TokenForm = (props) => {

    const { data, handleSubmit, handleOk, type, store: { domainList }, handleLoader } = props;

    const [form] = Form.useForm();
    const formLayout = 'vertical';

    const onFinish = (values) => {
      handleLoader(true);
      handleSubmit(values, handleOk, handleLoader);
    };

    const dataTypeEnum = ['INTEGER', 'FLOAT', 'LONG', 'STRING'];

    return (
      <>
      <Form
          layout={formLayout}
          form={form}
          name="tokenForm"
          onFinish={onFinish}
          initialValues={{
            layout: formLayout,
            domainName: data?.domainName,
            tokenName: data?.tokenName,
            description: data?.description,
            dataType: data?.dataType,
            isActive: data?.active ? (data?.active === 'true') : true
           }}
        >
          <Form.Item
            label="Domain Name"
            name="domainName"
            rules={[{ required: true, message: 'This is a required field', whitespace: true },{
              max: 50, message: "Max Character limit is 50"
            }]}>
              <Select disabled={type === 'edit'}>
                {domainList && domainList.map((item) => {
                    return (<Select.Option value={item.domainName}>{item.domainName}</Select.Option>)
                })}
              </Select>
          </Form.Item>

          <Form.Item
            name="tokenName"
            label="Token Name"
            rules={[{ required: true, message: 'This is a required field', whitespace: true }, {
              max: 50, message: "Max Character limit is 50"
            }]}>
            <Input placeholder="Token Name should be 50 character max" disabled={type === 'edit'} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'This is a required field', whitespace: true },{
              max: 100, message: "Max Character limit is 100"
            }]}>
            <Input placeholder="Description should be 100 character max" />
          </Form.Item>

          <Form.Item
            label="Data Type"
            name="dataType"
            rules={[{ required: true, message: 'This is a required field', whitespace: true }]}>
              <Select>
                {dataTypeEnum.map((item) => {
                    return (<Select.Option value={item}>{item}</Select.Option>)
                })}
              </Select>
          </Form.Item>

          <Form.Item label="Active" name="isActive">
            <Radio.Group >
              <Space direction="vertical">
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
        </>
    );
}

const TokenFormContainer = (props) => {
    return (
      <SmsContext.Consumer>
          {store => {
              return <TokenForm {...props} store={store} />
          }}
      </SmsContext.Consumer>
    )
}

export default smsPanalHoc(TokenFormContainer, 'tokenForm');
