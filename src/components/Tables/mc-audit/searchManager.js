//lib imports
import { Form, Table, Button, Row, Col, Input, DatePicker, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";

//utility component for profile and Rule Search

export const SearchManagerTable = ({isProfile, columns, fetchData}) => {

    const[startDate, setStartDate] = useState(null);
    const[endDate, setEndDate] = useState(null);
    const[data, setData] = useState(null);
    const [loading, setLoading] = useState(false);


    const onStartChange = (value,dateString) =>{
      let dateObj = new Date(dateString); 
      let startdateObj  = dateObj.toISOString();      
      setStartDate(startdateObj);
    }

    const onEndChange = (value,dateString) =>{
      let dateObj = new Date(dateString);
      let enddateObj = dateObj.toISOString();
      setEndDate(enddateObj);
      }

    const onFinish = async(fieldsValue) => {
      setLoading(true);
        let params = {
            "transactionType": fieldsValue.transactionType,
                "startDate": startDate,
                "endDate": endDate
        }
        
        if(fieldsValue.profileName){
            params = {...params, "profileName" : fieldsValue.profileName}
        }

        let response = await fetchData(params);
        if(response.data.data){
            if(isProfile){
                
                let RuleData = response.data.data.profileInfoList;
                    
                setData(RuleData);
                setLoading(false);
                return;
                }
                else{
                    let ProfileData = response.data.data.txnProfileInfoList;
                    setData(ProfileData);
                }
        }
        else{
            message.error(response.data.error.errorMessage);
        }
        
        setLoading(false);

    }

    return(
        <>
        <Form 
        name="SearchForm"
        onFinish={onFinish}
        >

        <Row justify="space-between" type="flex">
            <Col xs={6}>
                <Form.Item
                label="Transaction Type"
                name="transactionType"
                rules={[
                    {
                      required: true,
                      message: 'Please enter Transaction Type',
                    },
                  ]}
                >
                <Input/>
                </Form.Item>
            </Col>

            {isProfile &&
            <Col xs={4}>
            <Form.Item
            label="Profile Name"
            name="profileName"
            rules={[
                {
                  required: true,
                  message: 'Please enter Profile Name',
                },
              ]}
            >
            <Input/>
            </Form.Item>
        </Col>}
            <Col span={6} >
                    <Form.Item
                    label="Start Date"
                    rules={[
                        {
                          required: true,
                          message: 'Please provide dates',
                        },
                      ]}
                    >
                        
                            <DatePicker
                            showTime
                            rules={[
                                {
                                  required: true,
                                  message: 'Please provide start date',
                                },
                              ]}
                            
                            onChange={onStartChange}
                            />
                        
                    </Form.Item>
            </Col>
            <Col span={6} >
                    <Form.Item
                    label="End Date"
                    rules={[
                        {
                          required: true,
                          message: 'Please provide dates',
                        },
                      ]}
                    >
                        
                            <DatePicker
                            showTime
                            rules={[
                                {
                                  required: true,
                                  message: 'Please provide end date',
                                },
                              ]}
                
                            onChange={onEndChange}
                            />
                        
                    </Form.Item>
            </Col>
            <Col span={4}>
                <Form.Item
                    >
                        <Button type="primary" 
                        htmlType="submit"
                        disabled={(startDate && endDate) ? false : "disabled"}
                        loading={loading ? true : false}
                        icon={<SearchOutlined />}
                    
                        >
                    Search
                    </Button>
                    </Form.Item>
                </Col>
            </Row> 

            </Form>    

            {data &&                  
            <Table
            dataSource={data}
            columns={columns}
            scroll={{x : true}}
            pagination={false}
            /> 
            }          


        </>
    )
}

export default SearchManagerTable;