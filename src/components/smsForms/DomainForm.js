import React, {useState} from 'react';
import { Button, Input , Form, Radio, Space } from "antd";
import smsPanalHoc from '../hoc/smsPanalModal.hoc';

const DomainForm = (props) => {

    const { data, handleSubmit, handleOk, type, handleLoader } = props;

    const [form] = Form.useForm();
    const formLayout = 'vertical';

    const onFinish = (values) => {
      handleLoader(true);
      handleSubmit(values, handleOk, handleLoader);
    };

    return (
      <>
      <Form
          layout={formLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            layout: formLayout,
            domainName: data?.domainName,
            description: data?.description,
            isActive: data?.active ? (data?.active === 'true') : true
           }}
        >
          <Form.Item
            label="DomainName"
            name="domainName"
            tooltip={{title:"What do you want others to call you?"}}
            rules={[{ required: true, message: 'This is a required field', whitespace: true }, {
              max: 50, message: "Max Character limit is 50"
            }]}>
            <Input placeholder="Domain name should be 50 character max" disabled={type === 'edit'} />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[{
              max: 255, message: "Max Character limit is 255"
            }]}
            label="Description">
            <Input placeholder="Description should be 255 character max" />
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

export default smsPanalHoc(DomainForm, 'register');
