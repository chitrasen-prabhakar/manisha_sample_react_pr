import React, { useEffect, useState, useRef } from 'react'

import { 
    Form,
    Button,
    message,
    Col,
    Input,
    Row,
    DatePicker,
    Table
    } from "antd";
    
    const { RangePicker } = DatePicker;

// import Table from "src/components/AjaxTable";
import { nameColumn, actionColumn, timeColumn, withTag, getColumnSearchProps } from "src/components/AjaxTable/columns";
import { 
    getLeadData,
    getLeadFilters,
    getModelData
} from "src/api/services/lead";

 
import { displayMessages, successMessages } from "src/utils/messages";

import FormSelect from "../../forms/form-input/form-select";
import validateMessages from "src/utils/validationMessages";

import { generalErrorHandler } from "src/utils/errors";
import moment from 'moment';


function LeadList() {
    const [tableData, setTableData] = useState([]);
    const [cityList, setCityList] = useState([]);
    const [bankList, setBankList] = useState([]);
    const [loanStatusList, setLoanStatusList] = useState([]);
    const [makeList, setMakeList] = useState([]);
    const [modelList, setModelList] = useState([]);
    const [totalRecords, setTotalRecords] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const fetchData = async (fieldsValue, pageNoIn, pageSizeIn) => {
        setLoading(true)
        var searchParams = ""
        if(typeof pageNoIn!="undefined" && pageNoIn){
            searchParams += "pageNo="+pageNoIn
            setPageNo(pageNoIn)
        }else{
            searchParams += "pageNo="+pageNo
        }
        if(typeof pageSizeIn!="undefined" && pageSizeIn){
            if(searchParams){
                searchParams += "&"
            }
            searchParams += "pageSize="+pageSizeIn
            setPageSize(pageSizeIn)
        }else{
            if(searchParams){
                searchParams += "&"
            }
            searchParams += "pageSize="+pageNo
        }
        if(searchParams){
            searchParams = "?"+searchParams;
        }
        let response = await getLeadData({filter:fieldsValue},searchParams);
        if (response.statusCode >= 400) {
            generalErrorHandler(response)
            setLoading(false)
            return;

        }
        response = response.data
        
        setTotalRecords(response.totalRecords)
        setTableData(response.data);
        setLoading(false)
    }
    
    const fetchFilter = async () => {
        setLoading(true)
        let response = await getLeadFilters();
        if (response.statusCode >= 400) {
            generalErrorHandler(response)
            setLoading(false)
            return;

        }
        response = response.data;
        (typeof response.cityData!="undefined")?setCityList(response.cityData):"";
        (typeof response.bankData!="undefined")?setBankList(response.bankData):"";
        (typeof response.loanStatus!="undefined")?setLoanStatusList(response.loanStatus):"";
        (typeof response.makeData!="undefined")?setMakeList(response.makeData):"";
        setLoading(false)
    }
    useEffect(() => {
        (
            async () => {
                await fetchData({},pageNo,pageSize);
                await fetchFilter();
            }
        )()
    }, [])
    const onFinish = async (fieldsValue) => {
        const submitMsg = message.loading(displayMessages.request, 0);
        const res = await fetchData(fieldsValue);
        submitMsg();
        
    };

    const onFinishFailed = (errorInfo) => {
        message.error(displayMessages.failed);
    };

    const columns = [
            nameColumn("Lead Id", "lead_id", { ...getColumnSearchProps("leadId")}),
            nameColumn("Customer Name", "customer_name"),
            nameColumn("Gender", "gender"),
            nameColumn("Loan Status", "loan_status"),
            nameColumn("Bank Name", "bank_name"),
            nameColumn("Employment", "employment_type"),
            nameColumn("Bike Details", "bike_details"),
            actionColumn({title : 'View Detail', link: '/lead/detail/[id]', dir: '/lead/detail/[lead_id]', dataIndex: 'lead_id',display:'View Detail'  }),
            actionColumn({title : 'Action', link: '/lead/edit/[id]', dir: '/lead/edit/[lead_id]', dataIndex: 'lead_id',display:'Edit'  })

    ]
    const getModelList = async (make) =>{
        setLoading(true)
        setModelList([])
        form.resetFields(['model']);
        let response = await getModelData({make});
        if (response.statusCode >= 400) {
            generalErrorHandler(response)
            setLoading(false)
            return;

        }
        response = response.data
        if(response){
            setModelList(response);
        }
        
        setLoading(false)
    }
    return (
        <>
                <Form
                    name = "transactionFilter"
                    label = "Filter Transactions"
                    onFinish={(fieldsValue)=>{
                        setCurrentPage(1)
                        fetchData(fieldsValue,1,pageSize)
                    }}
                    layout="vertical"
                    form={form}
                    onFinishFailed={onFinishFailed}
                    validateMessages={validateMessages}

                >
                    <Row gutter={16}>
                            <Col span={6}>
                                <Form.Item
                                    label="Lead Id"
                                    name="lead_id"
                                    
                                    >
                                    <Input
                                        placeholder="Enter Lead Id"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item
                                    label="Date range"
                                    name="date_range"
                                >
                                    <RangePicker />

                                </Form.Item>
                            </Col>
                            
                            <Col span={6}>
                                <FormSelect
                                        name="city"
                                        options={
                                                cityList
                                            }
                                        
                                        label="City"
                                        placeholder="Select City"
                                />
                            </Col>
                            <Col span={6}>
                                <FormSelect
                                        name="bank"
                                        options={bankList}
                                        
                                        label="Bank"
                                        placeholder="Select Bank"
                                        

                                />
                            </Col>
                            {/* <Col span={6}>
                                <FormSelect
                                        name="lead_status"
                                        options={loanStatusList}
                                        
                                        label="Lead Status"
                                        placeholder="Select Lead Status"
                                        

                                />
                            </Col> */}
                            <Col span={6}>
                                <FormSelect
                                        name="make"
                                        options={makeList}
                                        onSelect={getModelList}
                                        label="Make"
                                        placeholder="Select Make"
                                />
                            </Col>
                            {
                                modelList?<Col span={6}>
                                <FormSelect
                                        name="model"
                                        options={modelList}
                                        label="Model"
                                        placeholder="Select Model"
                                />
                            </Col>:""
                            }
                            
                            <Col span={6}>
                                <FormSelect
                                        name="loan_status"
                                        options={loanStatusList}
                                        
                                        label="Loan Status"
                                        placeholder="Select Loan Status"
                                        

                                />
                            </Col>
                            <Col span={6}><Form.Item
                        >
                            <Button
                            htmlType="submit"
                            type="primary"
                            style={{ marginTop: '28px' }}
                            >
                                Search
                            </Button>
                            <Button
            style={{ margin: '0 8px' }}
            onClick={() => {
              form.resetFields();
            }}
          >
            Clear
          </Button>
                        </Form.Item>
                        </Col>
                    </Row>
                    
                </Form>
            <Table
                columns={columns}
                dataSource={tableData}
                fetchData={fetchData}
                loading={loading}
                 pagination={
                    {
                        current:currentPage,
                        pageSize:pageSize,
                        total: totalRecords,
                        onChange: (pageNo,pageSize)=>{
                            setCurrentPage(pageNo)
                            fetchData(form.getFieldValue(),pageNo,pageSize)
                        }
                    }
                 }
            />
        </>
    )
}



export default LeadList;
