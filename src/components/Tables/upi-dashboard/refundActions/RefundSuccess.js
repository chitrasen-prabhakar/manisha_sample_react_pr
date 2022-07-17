import { Descriptions } from "antd";

export const RefundSuccess = ({status, dataSource}) => {

    return (
        <Descriptions

            bordered
            >

                
            <Descriptions.Item label="Status" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {status}
            </Descriptions.Item>

            <Descriptions.Item label="Code" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {dataSource.code}
            </Descriptions.Item>

            <Descriptions.Item label="Result" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {dataSource.result}
            </Descriptions.Item>

            <Descriptions.Item label="Meta data" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {dataSource.data}
            </Descriptions.Item>

    </Descriptions>
    )
}

export default RefundSuccess;