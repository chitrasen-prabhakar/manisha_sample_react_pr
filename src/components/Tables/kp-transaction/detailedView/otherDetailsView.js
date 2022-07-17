import { Table } from "antd";
import { nameColumn } from "../../../AjaxTable/columns";


export const OtherDetailsView = ({dataSource}) => {

    

    let columns = [
        nameColumn("Platform Used","platform"),
        nameColumn("Created Date/Time",["transactionDetailedView","nCreated"]),
        nameColumn("Last Updated Date/Time",["transactionDetailedView","nLastUpdated"]),
        nameColumn("Failure Reason", "failureReason"),
        nameColumn("Failure Code", "failureCode"),
        nameColumn("Transaction Type", ["transactionDetailedView","transactionType"]),
        nameColumn("IMS id", ["transactionDetailedView","imsId"]),
        nameColumn("Mobile Number", "mobileNumber"),
        nameColumn("Email ID", ["transactionDetailedView","emailId"]),
        nameColumn("PG Transaction ID", ["transactionDetailedView","pgTxnId"]),
    ]


    return (
        <Table
        dataSource={[dataSource]}
        columns={columns}
        size="small"
        scroll={{x:true}}
        ></Table>
    )
}