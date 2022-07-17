import { Table, Tag, Space } from "antd";
import moment from "moment";

/**
 * Raw data converted to Antd compatible design
 */
const parseOrderDetails = (orderDetails) => {
  let data = [];
  Object.keys(orderDetails).forEach(key => {
    data.push({orderId:key, date: orderDetails[key]});
  })
  return data;
}

const PastOrderTable = (orderDetails) => {
  try {
    const columns = [
      {
        title: "OrderId",
        dataIndex: "orderId",
        key: "orderId",
        className: "break-column"
      },
      {
        title: "Date",
        dataIndex: "date",
        className: "break-column",
        key: "date",
        render: (date) => (moment(date).format("LLLL"))
      }
    ];
    const data = parseOrderDetails(orderDetails);
    
    return <Table columns={columns} dataSource={data} />;
  } catch (e) {
    console.log(e);
    return "Oops Some error occured!";
  }
  
};

export default PastOrderTable;