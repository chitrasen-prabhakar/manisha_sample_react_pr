import { PropertySafetyFilled } from "@ant-design/icons";
import { Table } from "antd";
import { useState } from "react";
import { nameColumn, actionColumn } from "../../AjaxTable/columns";


export const TransactionViewTable = ({dataSource , total, pageFilter, onPaginate}) => {

    const [pageNumber, setPageNumber] = useState(pageFilter);
    const [isLoading, setIsLoading] = useState(false);
    
    const columns = [
        actionColumn({title : 'Transaction Id', link: '/kp-transaction/[id]', dir: '/kp-transaction/[transactionId]', dataIndex: 'transactionId', isEdit : false }),
        nameColumn("KP MID", "kpMid"),
        nameColumn("PG Used", "pgUsed"),
        nameColumn("Product/Merchant Name", "merchantName"),
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
            dataSource={dataSource}
            loading={isLoading}
            size="small"
            columns={columns}
            rowKey="transactionId"
            scroll={{x : true}}
            pagination={{
                current: pageNumber,
                total:(total*10),
                pageSize: 10,
                onChange: (page) => {
                    setIsLoading(true);
                    setPageNumber(page);
                    onPaginate(page);
                    setIsLoading(false);
                    
                }
            }}
        ></Table>
    )
}