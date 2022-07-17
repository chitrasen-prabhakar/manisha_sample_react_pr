import { message, Table } from "antd";
import { useState, useEffect } from "react";
import { nameColumn } from "../../../AjaxTable/columns";


export const FailureReasonTable = ({dataSource}) => {

    

    let failuredata = dataSource.transactionSummaryData.failureReasonMapList;

    let columns = [
        nameColumn("Top Failure Reasons", "failureReason"),
        nameColumn("Count", "failureReasonCount"),
        nameColumn("Failure Contribution", "failureReasonPercentage")
    ]

    return(
        <Table
            dataSource={failuredata}
            columns={columns}
            size="small"
        ></Table>
    )
}