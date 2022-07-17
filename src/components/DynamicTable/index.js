import React, {useState, useEffect} from 'react';
import { Table, Button  } from "antd";

const DynamicTable = ({data, pagination, resetPagination}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([])
    const handlePagination = (page) => {
        setCurrentPage(page);
    }

    useEffect(() => {
      if(data.length > currentData.length) {
        setCurrentPage(1);
        setCurrentData(data);
      }
    }, [data])

    let defaultPagination = {
      onChange: handlePagination,
      current:currentPage,
    };

    if(pagination) {
      defaultPagination = pagination;
    }

    const createColumns = () => {
          const cols = [];
          for (let key in data[0]) {
              if(key !== 'key') {
                  cols.push({
                    title: key,
                    dataIndex: key,
                    key
                  });
              }
          }
          return cols;
    }

    return <Table dataSource={data} columns={createColumns()} pagination={defaultPagination} scroll={{ x: true }} />
}

export default DynamicTable;
