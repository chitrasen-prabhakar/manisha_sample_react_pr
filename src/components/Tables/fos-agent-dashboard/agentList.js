import React, { useEffect, useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, message} from 'antd';
import { updateAgentDetails, changeAgentStatus, addAgentDetails } from "src/utils/api";
import { displayMessages, successMessages } from "src/utils/messages";
import { generalErrorHandler } from "src/utils/errors";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AgentList = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(props.AgentData);
  const [editingKey, setEditingKey] = useState('');


  useEffect(() => {
    setData(props.AgentData)
  }, [props.AgentData])
  

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
        agentCode: '',
        agentName: '',
        mobileNumber: '',
        status: '',
        ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (record) => {
    try {
      const submitMsg = message.loading(displayMessages.request, 0);
      const row = await form.validateFields();
      const newData = [...data];
      console.log(record);
      const userEmail = typeof Storage !== "undefined"
            ? localStorage.getItem("ls.emailId").replace(/^"(.*)"$/, "$1")
            : null
      
      let reqData = {
        agentCode: record.agentCode,
        oldDetails: {agentCode: record.agentCode, agentName: record.agentName, mobileNumber: record.mobileNumber},
        updatedDetails: {agentCode: record.agentCode,agentName: '',mobileNumber: '', ...row},
        userId: userEmail
      }
      const res = await updateAgentDetails(reqData);
      setEditingKey('');
      submitMsg();
      
      if(res.data.success) {
        message.success('Agent Updated Successfully');
        props.getAgentList(props.formfields);
      } else {
        message.error(res.data.error ? res.data.error.errorMessage : 'Something went wrong, Please try again later');
      }
      
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Agent Code',
      dataIndex: 'agentCode',
      width: '25%',
      editable: false,
    },
    {
      title: 'Agent Name',
      dataIndex: 'agentName',
      width: '25%',
      editable: true,
    },
    {
      title: 'Mobile Number',
      dataIndex: 'mobileNumber',
      width: '25%',
      editable: true,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        width: '25%',
        editable: false,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
    {
        title: 'Update Status',
        dataIndex: 'updateStatus',
        render: (_, record) => {
          return (
            <span>
              <Typography.Link
                onClick={() => props.openUpdateStatusDialog(record)}
                style={{
                  marginRight: 8,
                }}
              >
                Update Status
              </Typography.Link>
            </span>
          )
        },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'mobileNumber' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
      />
    </Form>
  );
};

export default AgentList;