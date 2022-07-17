import { message, Table } from "antd";
import usePermission from "src/components/hooks/usePermission";
import { nameColumn } from "../../../AjaxTable/columns";
import { useState, useEffect } from "react";


export const PaymentInfoTable = ({dataSource}) => {

    

    let paymentdata = dataSource.transactionSummaryData.paymentTypeInfoList;

    let columns = [
        nameColumn("Payment Method", "paymentType"),
        nameColumn("Transaction Count", "transactionCount"),
        nameColumn("Success Count", "successTransactionCount"),
        nameColumn("Success Rate", "successRate")
    ]

    return(
        <Table
            dataSource={paymentdata}
            columns={columns}
            size="small"
        ></Table>
    )
}