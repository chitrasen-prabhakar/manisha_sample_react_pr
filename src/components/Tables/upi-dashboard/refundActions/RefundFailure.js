import { Descriptions } from "antd";

export const RefundFailure = ({status, dataSource}) => {

    return (
        <Descriptions

            bordered
            >

                
            <Descriptions.Item label="Status" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {status}
            </Descriptions.Item>

            <Descriptions.Item label="Error Code" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {dataSource.errorCode}
            </Descriptions.Item>

            <Descriptions.Item label="Error Message" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {dataSource.errorMessage}
            </Descriptions.Item>

            <Descriptions.Item label="Meta Data" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {dataSource.data}
            </Descriptions.Item>

    </Descriptions>
    )
}

export default RefundFailure;