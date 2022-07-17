import React, {useState} from 'react';
import { Button, Input , Form, Radio, Space } from "antd";
import smsPanalHoc from '../hoc/smsPanalModal.hoc';

const TxnCategoryForm = (props) => {

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
          name="txnCategoryForm"
          onFinish={onFinish}
          initialValues={{
            layout: formLayout,
            category: data?.category,
            subcategory: data?.subcategory,
            isActive: data?.active ? (data?.active === 'true') : true
           }}
        >
          <Form.Item
            label="Category"
            name="category"
            tooltip={{title:"What do you want others to call you?"}}
            rules={[{ required: true, message: 'This is a required field', whitespace: true }, {
              max: 100, message: "Max Character limit is 100"
            }]}>
            <Input placeholder="Category should be 100 character max" disabled={type === 'edit'} />
          </Form.Item>
          <Form.Item
            name="subcategory"
            label="Sub Category"
            rules={[{ required: true, message: 'This is a required field', whitespace: true },{
              max: 100, message: "Max Character limit is 100"
            }]}>
            <Input placeholder="Sub category should be 100 character max" disabled={type === 'edit'} />
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

export default smsPanalHoc(TxnCategoryForm, 'txnCategoryForm');
