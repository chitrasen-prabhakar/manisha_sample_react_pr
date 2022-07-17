import { Descriptions } from "antd";

export const RefundStatus = ({status, dataSource}) => {

    return (
        <Descriptions

            bordered
            >

                
            <Descriptions.Item label="Status" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {status}
            </Descriptions.Item>

            <Descriptions.Item label="Merchant TXN Id" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {dataSource.merchantTransactionId}
            </Descriptions.Item>

            <Descriptions.Item label="Idempotency Id" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {dataSource.refundIdempotencyId}
            </Descriptions.Item>

            <Descriptions.Item label="Refund Status" style={{"overflow-wrap": "anywhere", "min-width":"150px"}}>
            {dataSource.refundStatus}
            </Descriptions.Item>

    </Descriptions>
    )
}

export default RefundStatus;