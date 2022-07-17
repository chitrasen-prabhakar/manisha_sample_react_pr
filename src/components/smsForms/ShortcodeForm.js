import React, {useState} from 'react';
import { Button, Input , Form, Radio, Space, Select } from "antd";
import smsPanalHoc from '../hoc/smsPanalModal.hoc';
import {SmsContext} from '../../contexts/smsContext';

const ShortcodeForm = (props) => {

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
          name="shortcodeForm"
          onFinish={onFinish}
          initialValues={{
            layout: formLayout,
            senderName: '',
            shortcode: data?.shortcode,
            description: data?.description,
            active: true
           }}
        >
          <Form.Item
            name="senderName"
            label="Sender Name"
            rules={[{ required: true, message: 'This is a required field', whitespace: true }, {
              max: 50, message: "Max Character limit is 50"
            }]}>
            <Input placeholder="Token Name should be 50 character max" disabled={type === 'edit'} />
          </Form.Item>

          <Form.Item
            name="shortcode"
            label="Shortcode"
            rules={[{
              max: 50, message: "Max Character limit is 50"
            }]}>
            <Input placeholder="Token Name should be 50 character max" disabled={true} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{
              max: 100, message: "Max Character limit is 100"
            }]}>
            <Input placeholder="Description should be 100 character max" />
          </Form.Item>

          <Form.Item label="Active" name="active">
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

export default smsPanalHoc(ShortcodeForm, 'shortcodeForm');
