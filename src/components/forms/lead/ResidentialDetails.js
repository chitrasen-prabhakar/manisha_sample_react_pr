import React, { useEffect, useState, useRef } from "react";

import {
  Form,
  Button,
  message,
  Col,
  Input,
  Row,
  Divider,
  Card,
  Typography,
  Radio,
} from "antd";
import FormItem from "antd/lib/form/FormItem";

import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { useRouter } from "next/router";
import validateMessages from "src/utils/validationMessages";
import { displayMessages, successMessages } from "src/utils/messages";
import { generalErrorHandler } from "src/utils/errors";
import { Regex } from "src/utils/Regex";
const { Text } = Typography;

import { saveLeadData } from "src/api/services/lead";
import TextArea from "antd/lib/input/TextArea";
const docText = {
  AadharCard: "Aadhar",
  VoterID: "Voted Id",
  DrivingLicense: "Driving License",
  Passport: "Passport",
};
const ResidentialDetails = (props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [docImage, setDocImage] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [doc_type, setDocType] = useState(
    props.residentialInitialData.doc_type
      ? props.residentialInitialData.doc_type
      : "AadharCard"
  );
  const router = useRouter();

  const onFinish = async (fieldsValue) => {
    setLoading(true);
    fieldsValue.lead_step = "RESIDENTIALDETAIL";
    if (props.leadId) {
      fieldsValue.lead_id = props.leadId;
    }
    if (fieldsValue.doc_number) {
      fieldsValue.doc_type = doc_type;
    }
    props.setResidentialInitialData(fieldsValue);
    let response = await saveLeadData(fieldsValue);
    response = response.data;
    if (response.statusCode >= 400) {
      generalErrorHandler(response);
      setLoading(false);
      return;
    }
    props.setLeadId(response.data.lead_id);
    setLoading(false);
    await saveLeadData({
      lead_id: props.leadId,
      lead_step: "COMPLETE",
    });
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
        form.setFieldsValue({ doc_image: newFileList[0].response });
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
        Upload {docText[doc_type]}
      </div>
    </div>
  );
  return (
    <Card bordered hoverable>
      <div className="cardHeader">
        <h3 className="">
          Great! Almost there, just some additional details left
        </h3>
      </div>
      <Divider />
      <Form
        name="residentialDetails"
        label="Customer Details"
        onFinish={onFinish}
        layout="horizontal"
        form={form}
        onFinishFailed={onFinishFailed}
        validateMessages={validateMessages}
        initialValues={props.residentialInitialData}
        size="large"
      >
        <Form.Item
          name="doc_type"
          onChange={(e) => {
            setDocType(e.target.value);
          }}
          initialValue={doc_type}
        >
          <Radio.Group size="large" buttonStyle="solid">
            <Radio.Button value="AadharCard" style={{ margin: 10, width: 150 }}>
              Aadhar Card
            </Radio.Button>
            <Radio.Button value="VoterID" style={{ margin: 10, width: 100 }}>
              Voter ID
            </Radio.Button>
            <Radio.Button
              value="DrivingLicense"
              style={{ margin: 10, width: 150 }}
            >
              Driving License
            </Radio.Button>
            <Radio.Button value="Passport" style={{ margin: 10, width: 100 }}>
              Passport
            </Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="doc_number">
          <Input placeholder={`Enter ${docText[doc_type]}`} />
        </Form.Item>
        <FormItem
          name="doc_image"
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
        <Form.Item name="address">
          <TextArea placeholder="Address" />
        </Form.Item>
        <Form.Item
          name="year_in_current_residence"
          rules={[
            {
              pattern: Regex.number,
              message: "Only Number allowed",
            },
          ]}
        >
          <Input placeholder="Years in Current Residence" />
        </Form.Item>

        <div className="steps-action">
          <Button style={{ margin: "0 8px" }} onClick={() => props.prev()}>
            Previous
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ResidentialDetails;
