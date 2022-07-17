import { Button, message, Table, Col } from "antd";
import { useEffect, useState } from "react";
import { viewOutputFileStatus, downloadResultFile } from "../../../utils/api";
import { nameColumn } from "../../AjaxTable/columns";
import { Pagination } from "../pagination"


export const ViewStatusTable = ({ activityId, tabChange, permissions }) => {

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [nextMarker, setNextMarker] = useState([null]);
   
    const [total, setTotal] = useState(1);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchData = async (isReload) => {
        setLoading(true);
        const userId = JSON.parse(localStorage.getItem('ls.user')).email;
        if(nextMarker) {
            let marker = nextMarker;
            setNextMarker([...marker.slice(0, pageNumber+1)]);
        }
        let params = {
            userId,
            activityId,
            'prevMarker': null,
            'marker': nextMarker[pageNumber-1] ? nextMarker[pageNumber-1] : null,
            pageNumber,
            'pageSize': 10,
            'isInputFile': true,
            'isSuperUser': permissions.includes("SUPER_ADMIN_VIEW")
        }

        let response = await viewOutputFileStatus(params);
        if (response.data.data !== null) {
            let totalRecords = response.data.data.files.length;
            setTotal(totalRecords);
            let data = response.data.data.files;
            setDataSource(data);
            setNextMarker([...nextMarker, response.data.data.nextMarker]);
        } else {
            message.warning(response.data.error.errorMessage);
        }
        setLoading(false);
    }

    useEffect(() => {
        (async () => {
            await fetchData();
        })()
    }, [pageNumber, permissions, tabChange])

    const onPaginate = async (pageSize, pageNumber) => {
        setPageSize(pageSize);
        setPageNumber(pageNumber);
    };

    const downloadResult = async (fileName, isInputFile) => {
        const userId = JSON.parse(localStorage.getItem('ls.user')).email;
        let fileParams = {
            fileName,
            userId,
            activityId,
            isInputFile
        }

        let response = await downloadResultFile(fileParams);
        window.open(response.data.data, '_blank');
    }


    const columns = [
        nameColumn("Uploaded By", ["allMetaData", "uploadedby"]),
        nameColumn("Upload Time", ["allMetaData", "uploadedtime"]),
        {
            title: "Input File",
            dataIndex: "inputFileName",
            key: "inputFileName",
            render: (params) => {

                return (
                    <Button onClick={() => downloadResult(params, true)}>
                        <a>{params}</a>
                    </Button>
                )
            }
        },
        {
            title: "Output File",
            dataIndex: "outputFileName",
            key: "outputFileName",
            render: (params, data) => {
                let outputFile = params.slice(7);
                return (
                    <Button disabled={!data.hasOutputFile} onClick={() => downloadResult(outputFile, false)}>
                        <a>{params}</a>
                    </Button>
                )

            }
        }
    ]

    return (
        <>
            {
                fetchData && <Col span={24} className="align-items-right">
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => fetchData(true)}
                    >
                        Reload
                    </Button>
                </Col>
            }
            <Table
                dataSource={dataSource}
                columns={columns}
                total={total}
                scroll={{ x: true }}
                loading={loading}
                pagination={false}
            ></Table>
            <Pagination
                pageSize={pageSize}
                pageNumber={pageNumber}
                onPaginate={onPaginate}
                totalRecodsPerPage={total}
                showSizeChanger={true}
                pageSelectDisabled={true}
            ></Pagination>
        </>
    )
}
