import React, { useState, useEffect } from 'react';
import { Table, Button, Col } from "antd";

const AjaxTable = (props) => {
    const { data = [], pagination, resetPagination, columns, fetchData, loading, dataIndex,expandable } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([])
    const handlePagination = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        if (data.length > currentData.length) {
            setCurrentPage(1);
            setCurrentData(data);
        }
    }, [data])

    let defaultPagination = {
        onChange: handlePagination,
        current: currentPage,
    };

    if (pagination) {
        defaultPagination = pagination;
    }


    return <>
        {
            fetchData && <Col span={24} className="align-items-right">
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    onClick={() => fetchData()}
                >
                    Reload
                </Button>
            </Col>
        }




        <Table
            loading={loading}
            dataSource={data}
            rowKey={dataIndex}
            columns={columns}
            pagination={data.length > 10 ? defaultPagination : false}
            scroll={{ x: true }}
            expandable={expandable}
            bordered />

    </>
}

export default AjaxTable;
