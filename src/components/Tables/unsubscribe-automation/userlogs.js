import { Form, Table, DatePicker, Button, Row, Col, Input, message } from "antd";
import { useState } from "react";
 import {downloadLogs, viewLogs, searchUsers} from "src/utils/api";
 import { nameColumn, timeColumn } from "src/components/AjaxTable/columns";


export const UserLogs = () => {
    const [users, setUsers] = useState([]);
    const [params, setParams] = useState({});
    const[dates, setDates] = useState(null);
    const { RangePicker } = DatePicker;

    const onChange = (value,dateString) =>{

        console.log(dateString);
        
        setDates(dateString);

        
   }

   const onDownload = async() => {
       let params = 
            {
                "fromDate" : dates[0],
                "toDate" : dates[1]
            }
        ;


        let response = await downloadLogs(params);
        if(response.data.data){
        window.open(response.data.data, '_blank');
        }
        else{
            message.error("download not available at the moment");
        }
   }

   const onDateView = async() =>{
    let params = 
            {
                "fromDate" : dates[0],
                "toDate" : dates[1]
            }
        ;

        let response = await viewLogs(params);
        setUsers(response.data.data);
   }

   const onFinish = async(fieldsValue) => {
       let payload = {
        "mobileNo":"",
        "emailId":""
       }


       if(isNaN(fieldsValue.InputField)){
           payload.emailId = fieldsValue.InputField;
       }
       else{
           payload.mobileNo = fieldsValue.InputField;
       }
       console.log(payload);

       let response = await searchUsers(payload);
       if(response.data.data.length === 0){
        setUsers(response.data.data);
        message.warning("Logs not found for given query");
        }
        else{
         setUsers(response.data.data); 
        }
   }

   let columns = [
       nameColumn("Mobile No", "mobileNo"),
       nameColumn("Email ID", "emailId"),
       nameColumn("Restriction Type", "restrictionType"),
       {
        title : "Status",
        dataIndex : "status",
        key : "status",
        render : (params) => {
            return(

                <p> { (params)? "SUCCESS" : "FAILED"}</p>
               
            )
        },
        },
        {
            title : "Sms Unsubscribed",
            dataIndex : "isSmsUnsubscribe",
            key : "isSmsUnsubscribe",
            render : (params) => {
                return(
    
                    <p> { (params)? "YES" : "NO"}</p>
                   
                )
            },
            
        },
        {
            title : "Email Unsubscribed",
            dataIndex : "isEmailUnsubscribe",
            key : "isEmailUnsubscribe",
            render : (params) => {
                return(
    
                    <p> { (params)? "YES" : "NO"}</p>
                   
                )
            },
            
        },
        timeColumn("Created On", "createdOn"),
        nameColumn("Requested By", "changedBy")

   ]

    return(
    <>

        <Form
        name="FetchUnsubscribedUsers"
        layout="horizontal"
        onFinish={onFinish}
        >
            <Row>
                <Col xs={6}>
            <Form.Item>
               <Button
                type="primary"
                onClick={onDownload}
                disabled={(dates) ? false : "disabled"}
                >
                    Download All Logs
                </Button> 
            </Form.Item>

            </Col>
            <Col xs={12}>

                <Form.Item
                 label="Select Dates"
                    >
                        
                            <RangePicker
                            format="YYYY-MM-DD "
                            onChange={onChange}
                            />
                        
                    </Form.Item>
                    </Col>

                    <Col xs={6}>
                    <Form.Item>
                    <Button
                        type="primary"
                        onClick={onDateView}
                        disabled={(dates) ? false : "disabled"}
                        >
                            View Logs
                        </Button> 
                    </Form.Item>

                    </Col>
                    </Row> 
                    <Row>
                    <Col xs={12}>
                    <Form.Item
                    label="Enter Mobile No./Email-ID"
                    name="InputField"
                    >
                        
                            <Input placeholder = "MobileNo/Email"/>
                        
                    </Form.Item> 
                    </Col>

                    <Col xs={14}>
                    <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        >
                            Search Logs
                        </Button> 
                    </Form.Item>

                    </Col>

                    </Row>        
        </Form>
        {(users !== []) && 
        <Table
        columns={columns}
        dataSource={users}
        scroll={{x : true}}
        ></Table>
        }
        

        </>
    )
}

export default UserLogs;