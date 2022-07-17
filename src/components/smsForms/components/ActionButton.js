import React, {useState} from 'react';
import { Button, Modal } from "antd";
import {
  ExclamationCircleOutlined
} from "@ant-design/icons";

const ActionButton = ({title, onClick, Form, data, handleSubmit, type, heading, showEvaluate, handleEvaluate, handleDelete}) => {

    const [isFormOpen, setFormOpen] = useState(false);

    const showForm = () => {
        setFormOpen(true)
    }

    const hideForm = () => {
        setFormOpen(false)
    }

    const deleteConfirm = () => {
      Modal.confirm({
        title: 'Delete',
        icon: <ExclamationCircleOutlined />,
        content: 'Are you sure you want to delete?',
        onOk: handleDelete,
        okText: 'Delete',
        cancelText: 'Cancel'
      });
    }

    if(type === 'delete') {
        return <Button type="primary" onClick={deleteConfirm}>{title}</Button>
    }

    return (
      <>
        <Button type="primary" onClick={showForm}>{title}</Button>
        {Form &&
          <Form
            showEvaluate={showEvaluate}
            handleEvaluate={handleEvaluate}
            isFormOpen={isFormOpen}
            heading={heading}
            hideForm={hideForm}
            data={data}
            handleSubmit={handleSubmit}
            type={type} />}
      </>)
}

export default ActionButton;
