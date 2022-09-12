import React, { useEffect, useState, useRef } from "react";

import {
  Form,
  Button,
  message,
  Divider,
  Col,
  Input,
  Card,
  Typography,
} from "antd";
import { Regex } from "src/utils/Regex";

import { displayMessages, successMessages } from "src/utils/messages";

import validateMessages from "src/utils/validationMessages";

const { Text, Link } = Typography;
import { saveLeadData } from "src/api/services/lead";
import { useRouter } from "next/router";
import FormItem from "antd/lib/form/FormItem";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const EmploymentDetails = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [docImage, setDocImage] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [uploadImageMsg, setUploadImageMsg] = useState("");
  const [fileList, setFileList] = useState([]);
  const onFinish = async (fieldsValue) => {
    setLoading(true);

    fieldsValue.lead_step = "EMPLOYMENTDETAIL";
    if (props.leadId) {
      fieldsValue.lead_id = props.leadId;
    }
    props.setEmploymentInitialData(fieldsValue);
    let response = await saveLeadData(fieldsValue);
    response = response.data;
    if (response.statusCode >= 400) {
      generalErrorHandler(response);
      setLoading(false);
      return;
    }
    props.setLeadId(response.data.lead_id);
    setLoading(false);
    props.next();
  };

  const onFinishFailed = (errorInfo) => {
    message.error(displayMessages.failed);
  };
  useEffect(() => {
    (async () => {
      if (typeof props.leadId == "undefined" || !props.leadId) {
        message.error("Something went wrong!!!.. Please start over");
        setTimeout(() => {
          router.reload(window.location.pathname);
        }, 1000);
      }
    })();
  }, [props.leadId]);
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      if (typeof newFileList[0].response != "undefined")
        form.setFieldsValue({ pan_image: newFileList[0].response });
    }
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload PAN
      </div>
    </div>
  );
  return (
    <Card bordered hoverable>
      <div className="cardHeader">
        <h3 className="">You are already half way through!</h3>
        <Text type="success">
          Your PAN card will help us calculate actual loan amount
        </Text>
      </div>
      <Divider />
      <Form
        name="Employment Details"
        label="Employment Details"
        onFinish={onFinish}
        layout="horizontal"
        form={form}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        initialValues={props.employmentInitialData}
        size="large"
      >
        <Form.Item
          name="monthly_income"
          rules={[
            { required: true, message: "Please Enter Monthly Salary" },
            {
              pattern: Regex.number,
              message: "Only Number allowed",
            },
          ]}
        >
          <Input placeholder="Monthly Salary (In Hand)" />
        </Form.Item>
        <Form.Item
          name="employer_name"
          rules={[{ required: true, message: "Please Enter Company Name" }]}
        >
          <Input placeholder="Company Name" />
        </Form.Item>
        <div>PAN Card Details</div>
        <Text type="success">
          Your PAN card will help us calculate actual loan amount
        </Text>

        <Form.Item
          name="pan_no"
          rules={[
            { required: true, message: "Please Enter Pan Numner" },
            {
              pattern: Regex.pancard,
              message: "Please Enter Valid Pan No",
            },
          ]}
        >
          <Input placeholder="PAN Number" maxLength={10} />
        </Form.Item>
        <FormItem
          name="pan_image"
          rules={[{ required: true, message: "Please Upload Pan" }]}
        >
          <Upload
            action={process.env.NEXT_PUBLIC_LMS_HOST + "/lead/docupload"}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
          <Modal
            visible={previewVisible}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{
                width: "100%",
              }}
              src={previewImage}
            />
          </Modal>
        </FormItem>
        <Text style={{ color: "blue" }}>
          Your details are secure and will be used only for the loan application
          process
        </Text>
        <Divider />
        <div className="steps-action">
          <Button style={{ margin: "0 8px" }} onClick={() => props.prev()}>
            Previous
          </Button>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default EmploymentDetails;
