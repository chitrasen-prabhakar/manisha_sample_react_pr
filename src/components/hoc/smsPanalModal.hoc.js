import React, {useState, useEffect} from 'react';
import { Modal, Button } from "antd";
import './modalStyle.less';

const smsPanalModalHoc = (Component, formName) => {
    const UpdatedComponentWithModal = (props) => {

        const { isFormOpen, hideForm, heading, showEvaluate } = props;

        const [isModalVisible, setIsModalVisible] = useState(false);
        const [isEvaluateClicked, setIsEvaluateClicked] = useState(false);

        const [isEvalLoading, setEvalLoading] = useState(false);
        const [isLoading, setLoading] = useState(false);

        const showModal = () => {
          setIsModalVisible(true);
        };

        const handleOk = () => {
          hideForm()
          handleLoader(false);
          handleEvaluateLoader(false);
          setIsModalVisible(false);
        };

        const handleCancel = () => {
          hideForm()
          setIsModalVisible(false);
          handleLoader(false);
          handleEvaluateLoader(false);
        };

        useEffect(() => {
            if(isFormOpen) {
                showModal();
            }
        }, [isFormOpen])

        const handleEvaluate = (e) => {
            setIsEvaluateClicked(true);
        }

        const resetEvaluateClick = () => {
            setIsEvaluateClicked(false);
        }

        const handleLoader = (loading) => {
            setLoading(loading);
        }

        const handleEvaluateLoader = (loading) => {
            setEvalLoading(loading);
        }

        return (
            <Modal
                title={heading}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                  <>
                    {showEvaluate && <Button key="submit" type="primary" onClick={handleEvaluate} block loading={isEvalLoading} disabled={isLoading}>
                        Evaluate
                    </Button>}
                  </>,
                  <Button key="submit" type="primary" form={formName} htmlType="submit" block loading={isLoading} disabled={isEvalLoading}>
                      Save {showEvaluate ? 'Template' : ''}
                  </Button>,
                  <Button key="back" onClick={handleCancel} block>
                    Cancel
                  </Button>
                ]}>
                {isModalVisible ? <Component  {...props} handleEvaluateLoader={handleEvaluateLoader} handleLoader={handleLoader} handleOk={handleOk} isEvaluateClicked={isEvaluateClicked} resetEvaluateClick={resetEvaluateClick} /> : null}
            </Modal>
        )
    }

    return UpdatedComponentWithModal;
}

export default smsPanalModalHoc;
