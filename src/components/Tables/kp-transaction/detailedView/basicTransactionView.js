import { Table } from "antd";
import { nameColumn } from "../../../AjaxTable/columns";


export const BasicTransactionView = ({dataSource}) => {

    let basicViewData = dataSource.transactionDetailedView;
    if(!basicViewData){
        message.warning("No basic data available");
    }

    let columns = [
        nameColumn("Transaction ID","transactionId"),
        nameColumn("KP MID","kpMid"),
        nameColumn("Product/Merchant Name", "merchantName"),
        nameColumn("PG Used", "pgUsed"),
        nameColumn("Payment Type", "paymentType"),
        nameColumn("Card Type", "cardType"),
        nameColumn("Issuer", "issuer"),
        nameColumn("Amount", "amount"),
        {
            title : "Status",
            dataIndex : "status",
            key : "status",
            render : (params) => {
                return(

                    <p> { (params)? "SUCCESS" : "FAILED"}</p>
                   
                )
            }
        }
    ]


    return (
        <Table
        dataSource={[basicViewData]}
        columns={columns}
        size="small"
        scroll={{x : true}}
        ></Table>
    )
}