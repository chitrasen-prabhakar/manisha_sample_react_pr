import { message, Table } from "antd";
import { useEffect, useState } from "react";
import { amcListing } from "src/utils/api";
import { generalErrorHandler } from "src/utils/errors";
import { nameColumn, actionColumn } from "src/components/AjaxTable/columns";

export const ViewAMCList = () => {

    const [pageNumber, setPageNumber] = useState(1);
    const [AMCList, setAMCList] = useState([]);

    useEffect(() => {

        (async () => {

            

            let response = await amcListing();
            if (response.statusCode >= 400) {
                generalErrorHandler(response);
                return;
    
            }
            if (response.data.data !== null) {
                
                let AMCdata = response.data.data.amc_list;
                setAMCList(AMCdata);
            }
            else {
                message.warning(response.data.error.errorMessage);
            }

        })()

    }, [])


    const columns = [
        {
            title : "AMC Logo",
            dataIndex : "amc_logo",
            key : "amc_logo",
            width : 200,
            render : (params) => {
                
               return(
                <img width={50} src={params}/>
                
               ) 
            }
        },
        nameColumn("AMC Name",  "amc_name"),
        nameColumn("AMC Code",  "amc_code"),
        {
            title : "Status",
            dataIndex : "is_active",
            key : "is_active",
            render : (params) => {
                return(

                    <p> { (params)? "ACTIVE" : "INACTIVE"}</p>
                   
                )
            }
        },
        actionColumn({ link: '/amc-onboarding/[id]', dir: '/amc-onboarding/[amcId]', dataIndex: 'id' })
    ]

    return (
        <Table 
        dataSource={AMCList}
        columns={columns}
        scroll={{x : true}}
        pagination={{
            current: pageNumber,
            pageSize : 5,
            onChange : (page) => {
                setPageNumber(page);
            }
        }}
        ></Table>
    )
}