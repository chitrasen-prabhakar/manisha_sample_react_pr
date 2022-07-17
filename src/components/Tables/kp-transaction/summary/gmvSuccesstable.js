import { message, Table, Typography } from "antd";
import { useState, useEffect } from "react";
import { SummaryData } from "src/utils/api";
import { nameColumn } from "../../../AjaxTable/columns";

export const GMVSuccessTable = ({dataSource}) => {


   const { Title } = Typography;
    

    let columns = [
        nameColumn("Total GMV",["transactionSummaryData","gmv"]),
        nameColumn("Overall Success Rate",["transactionSummaryData","overallSuccessRate"]),
        nameColumn("Total Transactions",["transactionSummaryData","totalTransaction"] )
    ]

    return(
        <>
        <Title strong level={4}>Summary</Title>
        <Table
            dataSource={[dataSource]}
            columns={columns}
            size="small"
        ></Table>
        </>
    )
}