import React, {useState} from 'react';
import { Button, Input , Form, Radio, Space } from "antd";
import smsPanalHoc from '../hoc/smsPanalModal.hoc';

const SenderForm = (props) => {

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
          name="senderForm"
          onFinish={onFinish}
          initialValues={{
            layout: formLayout,
            senderName: data?.senderName,
            shortcode: data?.shortcode,
            description: data?.description,
            active: data?.active ? (data?.active === 'true') : true
           }}
        >
          <Form.Item
            label="Sender Name"
            name="senderName"
            rules={[{
              max: 50, message: "Max Character limit is 50"
            }]}>
            <Input placeholder="Sender Name should be 50 character max" disabled={type === 'edit'} />
          </Form.Item>

          <Form.Item
            name="shortcode"
            label="Shortcode"
            rules={[{ required: true, message: 'This is a required field', whitespace: true },{
              max: 50, message: "Max Character limit is 50"
            }]}>
            <Input placeholder="Shortcode should be 50 character max" disabled={type === 'edit'} />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{
              max: 50, message: "Max Character limit is 50"
            }]}>
            <Input placeholder="Description should be 50 character max" />
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

export default smsPanalHoc(SenderForm, 'senderForm');
