import { Table } from "antd";
import { nameColumn } from "../../../AjaxTable/columns";


export const RefundDetailsTable = ({dataSource}) => {

    let refundData = dataSource.transactionDetailedView;

    let columns = [
        nameColumn("Reference ID","referenceId"),
        nameColumn("Idempotency ID","idempotencyId"),
        nameColumn("RRN", "refundReferenceNumber"),
        nameColumn("Refund Amount", "refundAmount"),
        nameColumn("Refund Status", "refundStatus"),
        nameColumn("Created Time", "refundCreatedTime"),
        nameColumn("Last Updated Time", "refundUpdatedTime"),
        nameColumn("Refund Request", "refundRequest"),
        nameColumn("Refund Response", "refundResponse")
    ]


    return (
        <Table
        dataSource={[refundData]}
        columns={columns}
        size="small"
        scroll={{x : true}}
        ></Table>
    )
}