import { message, Table, Row, Col, Form, Descriptions, Badge, Button} from "antd";
import { useRouter } from "next/router";

import { nameColumn } from "../../../AjaxTable/columns";


export const GatewayResponseTable = ({dataSource}) => {

    let gatewayData = dataSource.transactionDetailedView;
    if(!gatewayData){
        message.warning("No request response data available");
    }

    const data = gatewayData.requestResponseMap;
    const router = useRouter();
    const onBack = () => {

        router.push(`/kp-transaction/summaryView`);
        

    }

    return (
    <>

    <Descriptions

    bordered
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >

        
    <Descriptions.Item label="INIT REQUEST" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
    {data.INIT_REQUEST}
    </Descriptions.Item>

    </Descriptions>

    <Descriptions

    bordered
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >

        
    <Descriptions.Item label="INIT RESPONSE" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
    {data.INIT_RESPONSE}
    </Descriptions.Item>

    </Descriptions>

    <Descriptions

    bordered
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >

        
    <Descriptions.Item label="AUTH REQUEST" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
    {data.AUTH_REQUEST}
    </Descriptions.Item>

    </Descriptions>

    <Descriptions

    bordered
    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >

        
    <Descriptions.Item label="AUTH RESPONSE" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
    {data.AUTH_RESPONSE}
    </Descriptions.Item>

    </Descriptions>

    <Form
    
    >
        <Button 
        htmlType="submit"
        type="primary"
        onClick={onBack}>
            Back to Dashboard
        </Button>
    </Form>

</>


            
            
    )
}