import { SearchOutlined } from "@ant-design/icons";
import { Row, Col, Form, Select, Table, Button, Space, DatePicker, Input, InputNumber, AutoComplete, message } from "antd";
import { useEffect, useState } from "react";
import { getCustomerOrders, getPartners, downloadStatement } from "src/utils/api";
import { nameColumn } from "src/components/AjaxTable/columns";





const CustomerOrderTable = () => {

    const[partners, setPartners] = useState([]);
    const [pageRecordStart, setPageRecordStart] = useState(0);
    const[requestParams, setRequestParams] = useState(null);
    const[customerData, setCustomerData] = useState(null);
    const[dates, setDates] = useState(null);
    const [form] = Form.useForm();
    const[total,setTotal] = useState(0);
    const[type, setType] = useState(null);
    const { RangePicker } = DatePicker;

   

    useEffect(()=>{

        (async() =>{

            let payload = { 
                "prt_no": 0
             }
             let response = await getPartners(payload);
             
             if(response.data.partners){
             setPartners(response.data.partners);
             }
             else message.error(response.data.Message);
             
             

        }
         )()
        
    },[]);

    const onChange = (value,dateString) =>{

        
         setDates(dateString);

    }


    const onReset = () => {

        form.resetFields();
    }

    const onDownload = async() => {

        let response = await downloadStatement(requestParams);
        window.open(response.data.data, '_blank');
    }

    const onSelect = (value) =>{
        setType(value);
    }

    const onPaginate = async(paginate) => {
        let requestStart = requestParams.start;
        if(paginate === "prev"){
            requestStart = pageRecordStart - 10;
            
        }
        else{
            requestStart = pageRecordStart + 10;
        }
        setPageRecordStart(requestStart);

            let resData = await getCustomerOrders({...requestParams, "start" : requestStart});
            if(resData.data){
            setCustomerData(resData.data.orders);
            setTotal(resData.data.orders.length());
            }
            else message.error("Data not available at the moment, please try again later");
        
    }

    const onFinish = async(fieldsValue) => {
        
        

        let params = 
            {
                "input": fieldsValue.input,
                "searchType": fieldsValue.searchType,
                "startDate": dates[0],
                "endDate": dates[1],
                "start": pageRecordStart,
                "count": 10,
                "partnerid":fieldsValue.partnerid,
                "partnerName":fieldsValue.partnerName    
            }

            setRequestParams(params);

            let resData = await getCustomerOrders(params);
            if(resData.data){
            setCustomerData(resData.data.orders);
            }
            else message.error("Data not available at the moment, please try again later");
        
    }


    const items = partners.map(function(object){
        return(
            <Select.Option value = {object.partner_id}>{object.partner_name}</Select.Option>
        )
    })

    const inputType = (type) => {
        if(type === "email"){
            return(
                <Input type = "email"  placeholder="Email"/>
            )

        }
        else if(type === "mobile"){
            return(
                <Input type="number" placeholder="phone number"/>
            )
        }
        else return(
            <Input type= "text" placeholder="IMS ID"/>
        )
    }

    let columns = [
        nameColumn("Txn ID","affiliate_id"),
        nameColumn("Merchant ID","partner_id"),
        nameColumn("Merchant Name","partner_name"),
        nameColumn("Merchant Order ID","affiliate_order_id"),
        nameColumn("Amount","price"),
        nameColumn("Applicable Cashback Amount","freecharge_cashback_amt"),
        nameColumn("Txn Date","order_date"),
        nameColumn("Tentative Cashback Date","expected_cashback_date"),
        nameColumn("Cashback Status", "order_status")
    ]

    
    return(

        <>
        <Form 
        name="customerForm"
        onFinish={onFinish}
        layout="vertical"
        form={form}
        >
            <Row justify="space-between" type="flex">
            <Col xs={6}>
                <Form.Item
                label="Search Type"
                name="searchType"
                rules={[
                    {
                      required: true,
                      message: 'Please select Search Type',
                    },
                  ]}
                >
                    <Select placeholder="Select a search type" onSelect={onSelect}>
                    <Select.Option value="imsId">IMS-Vernost</Select.Option>
                    <Select.Option value="email">Email-Vernost</Select.Option>
                    <Select.Option value="mobile">Phone Number-Vernost</Select.Option>
                    </Select>
                </Form.Item>
            </Col>
            <Col xs={6}>
                <Form.Item 
                label = "Enter Input"
                name = "input"
                rules={[
                    {
                      required: true,
                      message: 'Please enter Input',
                    },
                  ]}
                >
                {inputType(type)}
                </Form.Item>
            </Col>
            </Row>
            <Row justify="space-between" >
            <Col span={6}>
            <Form.Item
            label="Merchant Type"
            name="partnerid"
            >
                <Select placeholder="Select a merchant type"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }>
                
                {items}
                </Select>
            </Form.Item>
            </Col>
            <Col span={6} >
                    <Form.Item
                    label="Select Dates"
                    rules={[
                        {
                          required: true,
                          message: 'Please provide dates',
                        },
                      ]}
                    >
                        
                            <RangePicker
                            rules={[
                                {
                                  required: true,
                                  message: 'Please provide dates',
                                },
                              ]}
                            format="YYYY-MM-DD "
                            onChange={onChange}
                            />
                        
                    </Form.Item>
                    
                </Col>
                <Col span={4}>
                <Form.Item
                    label=" "
                    
                    >
                        <Button type="primary" 
                        htmlType="submit"
                        size="medium"
                        disabled={(dates) ? false : "disabled"}
                        icon={<SearchOutlined />}
                    
                        >
                    Search
                    </Button>
                    </Form.Item>
                </Col>
                <Col xs={3}>
                <Form.Item
                label=" "
                >

                <Button 
                onClick={onReset}
                type="primary"
                >
                    Reset
                </Button>
                </Form.Item>
                </Col>
                <Col xs={3}>
                <Form.Item
                label=" "
                >

                <Button 
                onClick={onDownload}
                disabled={(requestParams) ? false : "disabled"}
                type="primary"
                >
                    Download
                </Button>
                </Form.Item>
                </Col>
                </Row>
                    

        </Form>

        {customerData && 
        <>                     
        <Table 
        dataSource={customerData}
        columns={columns}
        scroll={{x:true}}
        pagination={false}                    
        />
            <Row>
                <Col xs={22}>
                <Button disabled ={pageRecordStart<=0 ? true : false} onClick={() => onPaginate("prev")}>
                    Previous
                </Button>
                </Col>
                <Col xs={2}>
                <Button disabled ={customerData.length< 10 ? true : false} onClick={() => onPaginate("next")}>
                    Next
                </Button>
                </Col>
                </Row>    
           </>     
        
        }
        </>


    )
}



export default CustomerOrderTable;