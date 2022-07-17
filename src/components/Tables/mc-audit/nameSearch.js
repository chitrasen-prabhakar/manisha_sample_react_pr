import { Form, Input, Table, Button, Row, Col, message} from "antd";
import { useState } from "react";

export const NameSearch = ({ label, columns, fetchData, isVariable}) => {
    const[data, setData] = useState(null);

    const onFinish = async(fieldsValue) => {
        let searchParam = fieldsValue.param;
        let response = await fetchData(searchParam);
        if(response.data.data){
        if(isVariable){
        let variableData = [response.data.data.variableAuditInfo];
        setData(variableData);
        return;
        }
        else{
            let ruleData = [response.data.data.ruleInfo];
            setData(ruleData);
        }
    }
    else{
        message.error(response.data.error.errorMessage);
    }
        
    }
    return (
        <>
        <Form
        name="FetchSearchedName"
        layout="horizontal"
        onFinish={onFinish}>
            <Row gutter ="40">
             <Col xs={16}>   
            <Form.Item
            name="param"
            label={label}>
                <Input/>
            </Form.Item>
            </Col>
            <Col xs={8}>
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

        {data &&
        <Table
        dataSource={data}
        columns={columns}
        size="small"
        scroll={{x:true}}
        pagination={false}
        />
        }
        
        </>
    )
}

export default NameSearch;