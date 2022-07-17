import React, {useState, useEffect} from 'react';
import { Button, Input , Form, Radio, Space, Select } from "antd";
import smsPanalHoc from '../hoc/smsPanalModal.hoc';
import {SmsContext} from '../../contexts/smsContext';

const SenderForm = (props) => {

    const { data, handleSubmit, handleOk, type, store, showEvaluate, isEvaluateClicked, resetEvaluateClick, handleLoader, handleEvaluateLoader } = props;

    const [form] = Form.useForm();
    const formLayout = 'vertical';

    const onFinish = (values) => {

      let customizedValues;

      if(!isEvaluateClicked) {
          handleLoader(true);
          const {trainedMessage, isActive, category, subcategory, domainName} = values;
          customizedValues = {
            trainedMessage,
            isActive,
            category,
            subcategory,
            domainName,
            hashCode: data.hashcode
          }
      } else {
        handleEvaluateLoader(true);
        customizedValues = {
            trainMessage: values.trainedMessage,
            originalMessage: values.originalMessage.trim(),
            domainName: values.domainName
        }
      }
      handleSubmit(customizedValues, handleOk, isEvaluateClicked, handleLoader, handleEvaluateLoader);
    };

    useEffect(() => {
      if(isEvaluateClicked) {
        form.submit();
        setTimeout(() => {
          resetEvaluateClick();
        }, 0)
      }
    }, [isEvaluateClicked]);

    let subCategories = store.txnList.filter((item, index, array) => {
        return item.category === data?.transactionCategoryId?.category
    });

    const [subCategoryList, setSubCategoryList] = useState(subCategories);

    const getFilteredCategory = () => {
      const unique = [];
      return store.txnList.filter((item, index, array) => {
          if(!unique.includes(item.category)) {
              unique.push(item.category);
              return true;
          }
          return false;
      });
    }

    const onFormValueChange = (value) => {
        if(value?.category) {
            subCategories = store.txnList.filter((item, index, array) => {
                return item.category === value?.category
            });
            setSubCategoryList(subCategories);
            form.setFieldsValue({
              'subcategory': ''
            })
        }
    }

    return (
      <>
      <Form
          layout={formLayout}
          form={form}
          name="templateForm"
          onFinish={onFinish}
          onValuesChange={onFormValueChange}
          initialValues={{
              layout: formLayout,
              originalMessage: data?.originalMessage,
              templateMessage: data?.templateMessage,
              trainedMessage: data?.trainedMessage,
              messageCount: `${data?.messageCount}`,
              domainName: data?.domainId?.domainName,
              category: data?.transactionCategoryId?.category,
              subcategory: data?.transactionCategoryId?.subcategory,
              isActive: data?.active ? (data?.active === 'true') : true
           }}
        >
          <Form.Item
            label="Sample Message"
            name="originalMessage"
            rules={[{
              max: 500, message: "Max Character limit is 500"
            }]}>
            <Input placeholder="Sender Name should be 50 character max" disabled={type === 'edit'} />
          </Form.Item>

          <Form.Item
            label="Template Message"
            name="templateMessage"
            rules={[{
              max: 500, message: "Max Character limit is 500"
            }]}>
            <Input placeholder="Shortcode should be 50 character max" disabled={type === 'edit'} />
          </Form.Item>

          <Form.Item
            label="Trained Message"
            name="trainedMessage"
            rules={[{
              max: 500, message: "Max Character limit is 500"
            }, ({ getFieldValue }) => ({
                validator(_, value) {
                  if (isEvaluateClicked && !value) {
                    return Promise.reject(new Error('This is a required field'));
                  } else {
                    return Promise.resolve();
                  }
                },
              })]}>
            <Input.TextArea placeholder="Trained message should be 500 character max" />
          </Form.Item>

          <Form.Item
            label="Message Count"
            name="messageCount"
            rules={[{
              max: 50, message: "Max Character limit is 50"
            }]}>
            <Input placeholder="Description should be 50 character max" disabled={type === 'edit'}  />
          </Form.Item>

          <Form.Item
            label="Domain Name"
            rules={[
              ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value && getFieldValue('trainedMessage')) {
                      return Promise.reject(new Error('This is a required field'));
                    } else {
                        return Promise.resolve();
                    }
                  },
                })]}
            name="domainName">
              <Select>
                  {store?.domainList?.map((item) => {
                      return (<Select.Option value={item.domainName}>{item.domainName}</Select.Option>)
                  })}
              </Select>
          </Form.Item>

          <Form.Item
            label="Txn Category"
            name="category"
            rules={[]}>
              <Select>
                  {getFilteredCategory()?.map((item) => {
                      return (<Select.Option value={item.category}>{item.category}</Select.Option>)
                  })}
              </Select>
          </Form.Item>

          <Form.Item
            label="Txn Sub Category"
            name="subcategory"
            rules={[
              ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value && getFieldValue('category')) {
                      return Promise.reject(new Error('This is a required field'));
                    } else {
                        return Promise.resolve();
                    }
                  },
                })]}>
              <Select>
                {subCategoryList.map((item) => {
                    return (<Select.Option value={item.subcategory}>{item.subcategory}</Select.Option>)
                })}

              </Select>
          </Form.Item>

          <Form.Item label="Active" name="isActive">
            <Radio.Group>
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

const SenderFormContainer = (props) => {
    return (
      <SmsContext.Consumer>
          {store => {
              return <SenderForm {...props} store={store} />
          }}
      </SmsContext.Consumer>
    )
}

export default smsPanalHoc(SenderFormContainer, 'templateForm');
