import React, { useEffect, useState } from "react";
import { Upload, Modal, Button, message, Row, Col } from "antd";
import { PlusOutlined, UploadOutlined, SyncOutlined } from "@ant-design/icons";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

// Parameters:
// contentType: The content type of your file.
//              its like application/pdf or application/msword or image/jpeg or
//              image/png and so on
// base64Data: Its your actual base64 data
// fileName: Its the file name of the file which will be downloaded.
function downloadBase64File(contentType, base64Data, fileName) {
  const linkSource = base64Data;
  console.log("link", linkSource);
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.target = "_blank";
  downloadLink.click();
}

const UploadFile = ({
  NoOfFiles = 1,
  accept,
  listType = "text",
  maxSize,
  onUploadComplete,
  isDisable,
  defaultFileList,
  viewOnly,
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(defaultFileList);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    if (defaultFileList.length > 0) {
      setFileList(defaultFileList);
    }
  }, [defaultFileList.length]);

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

  const beforeUpload = (file) => {
    let validUploadType = accept.split(",").map((item) => item.trim());
    const isValidInput = validUploadType.includes(file.type);

    if (!isValidInput) {
      message.error("Invalid File Input ");
    }

    const isValidSize = file.size / 1024 / 1024 < 2;
    if (maxSize) isValidSize = file.size / 1024 / 1024 < maxSize;

    if (!isValidSize) {
      message.error(`Image must smaller than ${maxSize ? maxSize : 2}MB!`);
    }

    return isValidInput && isValidSize;
  };

  const handleChange = ({ fileList: newFileList, file: newFile }) => {
    setFileList(newFileList);
    if (newFile.status === "done") {
      setUploadStatus(newFile.status);
    }
  };

  const onDownload = async (file) => {
    console.log("==== On Download ====", file);
    if (file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    } else {
      file.preview = file.url;
    }
    downloadBase64File(file.type, file.preview, file.name);
  };

  useEffect(() => {
    if (uploadStatus === "done") {
      onUploadComplete(fileList);
    }
    return () => setUploadStatus(null);
  }, [uploadStatus]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Row>
      <Col span={24} style={{ textAlign: "center" }} className="upload-row">
        <Upload
          listType={listType}
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={beforeUpload}
          accept={accept}
          onDownload={onDownload}
          showUploadList={
            viewOnly
              ? {
                  showDownloadIcon: true,
                  showRemoveIcon: false,
                }
              : {
                  showDownloadIcon: true,
                  showRemoveIcon: true,
                  removeIcon: (
                    <SyncOutlined
                      style={{ color: "#fff" }}
                      onClick={() =>
                        message.info(
                          "Please Select another image, else Image will not be updated on server"
                        )
                      }
                      title="Replace Document"
                    />
                  ),
                }
          }
          disabled={isDisable}
          defaultFileList={
            defaultFileList.length > 0 ? [...fileList] : undefined
          }
        >
          {fileList.length >= NoOfFiles ? null : listType === "picture-card" ? (
            uploadButton
          ) : (
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          )}
        </Upload>
      </Col>
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
    </Row>
  );
};

export default UploadFile;
