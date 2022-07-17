import { Table, Form, Input, Row, Col, Button, message, Typography} from "antd";
import { useState } from "react";
import { getVpaDetails} from "src/utils/api";
import { generalErrorHandler } from "src/utils/errors"
import moment from "moment";
import { nameColumn, timeColumn } from "src/components/AjaxTable/columns";

export const VpaStatusTable = () => {
    const [status,setStatus] = useState("");
    const [time, setTime] = useState("");
    const[mobile, setMobile] = useState(null); 
    const[isDetailsSubmitting, setIsDetailsSubmitting] = useState(false);
    const[isBlockSubmitting, setIsBlockSubmitting] = useState(false);
    const[isUnblockSubmitting, setIsUnblockSubmitting] = useState(false);
    const [vpaDetails, setVpaDetails] = useState(null);

    const {Text} = Typography;

    const onFinish = async(fieldsValue) => {
        setIsDetailsSubmitting(true);
        setMobile(fieldsValue.mobileNo);
        let params = {  
            "action": "GET",  
            "mobile": fieldsValue.mobileNo  
         }
         let response = await getVpaDetails(params);
         if (response.statusCode >= 400) {
            generalErrorHandler(response)
            setIsDetailsSubmitting(false)
            return;

        }

        if(response.data.data){
         
         setVpaDetails(response.data.data.vpas);
         setStatus(response.data.data.status);
         let time = response.data.data.timestamp;
         setTime(moment(time).format("LLLL"));

         setIsDetailsSubmitting(false);
        }

        else{
            message.error(response.data.error.errorMessage);
            setIsDetailsSubmitting(false);
        }
    }

    const onBlock = async() => {
        setIsBlockSubmitting(true);
        let params = {  
            "action": "BLOCK",  
            "mobile": mobile  
         }
         

         let response = await getVpaDetails(params);
         if (response.statusCode >= 400) {
            generalErrorHandler(response)
            setIsBlockSubmitting(false)
            return;

        }
        let allVpas = response.data.data.vpas;
        let status = response.data.data.status;
        let time = response.data.data.timestamp;
        let primaryVpa = allVpas.filter(obj => obj.status === "PRIMARY");
        setVpaDetails(primaryVpa);
        setStatus(status);
        setTime(moment(time).format("LLLL"));
        message.success(`VPA successfully ${status} at ${moment(time).format("LLLL")} `);

         setIsBlockSubmitting(false);
    }

    const onUnblock = async() => {
        setIsUnblockSubmitting(true);
        let params = {  
            "action": "UNBLOCK",  
            "mobile": mobile  
         }

         let response = await getVpaDetails(params);
         if (response.statusCode >= 400) {
            generalErrorHandler(response)
            setIsUnblockSubmitting(false)
            return;

        }
         
        let allVpas = response.data.data.vpas;
        let status = response.data.data.status;
        let time = response.data.data.timestamp;
        let primaryVpa = allVpas.filter(obj => obj.status === "PRIMARY");
        setVpaDetails(primaryVpa);
        setStatus(status);
        setTime(moment(time).format("LLLL"));
        message.success(`VPA successfully ${status} at ${moment(time).format("LLLL")} `);

        setIsUnblockSubmitting(false);
    }

    const columns = [
        nameColumn("VPA                 ", "vpa" ),
        nameColumn("Status ", "status"),
        nameColumn("Type", "type"),
        timeColumn("Time of Creation", "timestamp"),
        {
            title : "MPIN Set",
            dataIndex : "isMpinSet",
            key : "isMpinSet",
            render : (params) => {
                return(

                    <p> { (params)? "YES" : "NO"}</p>
                   
                )
            }
        }
    ]

    return(
        <>
        <Form
        name="vpaUserDetails"
        layout="horizontal"
        onFinish={onFinish}
        >
            <Row>
                <Col xs={8}>
            <Form.Item
            label="Enter Mobile No"
            name="mobileNo"
            layout="vertical"
            rules={[
              {
                 validator(_, value) {
                   if (!value || value.length === 12) {
                     return Promise.resolve();
                   }
                   return Promise.reject('Please enter mobile Number starting with 91!');
                 },
            }]}>
                <Input/>
            </Form.Item>
            </Col>
            <Col xs={4}>
            <Form.Item>
            <Button
                htmlType="submit"
                type="primary"
                loading={isDetailsSubmitting ? true : undefined}
                >
                    Get Details
                </Button>
            </Form.Item>
            </Col>
            <Col xs={4}>
            <Form.Item>
            <Button
                
                type="primary"
                loading={isBlockSubmitting ? true : undefined}
                disabled = {status === "BLOCKED" ? true : false}
                onClick={() => onBlock()}
                >
                    Block
                </Button>
            </Form.Item>
            </Col>
            <Col xs={4}>
            <Form.Item>
            <Button
                
                type="primary"
                loading={isUnblockSubmitting ? true : undefined}
                disabled = {(status === "DEREGISTERED" || status === "REGISTERED") ? true : false}
                onClick={() => onUnblock()}
                >
                    Unblock
                </Button>
            </Form.Item>
            </Col>
            {status && time &&
            <Col xs={8}>
                <Text strong
                >
                    {status} at {time};
                </Text>
            </Col>
            }
            </Row>
        </Form>

        {vpaDetails&&    
        <Table
        dataSource={vpaDetails}
        columns={columns}
        tableLayout="horizontal"
        pagination={false}/>
        }
        
        </>


    )
}

export default VpaStatusTable;