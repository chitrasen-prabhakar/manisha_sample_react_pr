import { Select, Table, Col, DatePicker, Form, Button, message, Row, Modal } from "antd";
import { useEffect, useState } from "react";
import { getOfferDetails, getPartners } from "src/utils/api";
import { nameColumn } from "src/components/AjaxTable/columns";




export const MerchantOffersTable = () => {

    const[date, setDate] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const[partners, setPartners] = useState([]);
    const[merchantOffers, setMerchantOffers] = useState(null);

    useEffect(()=>{

        (async() =>{

            let payload = { 
                "prt_no": 0
             }
             let response = await getPartners(payload);
             
             if(response.data.partners){
                setPartners(response.data.partners);
                }
                else message.error(response.data.Message);

        }
         )()
        
    },[]);

    

    const onChange = (value,dateString) =>{

        
         setDate(dateString);

    }

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    const onFinish = async(fieldsValue) => {
        console.log(fieldsValue);

        let params = {
            
                "date_time": date,
                "partner_id": fieldsValue.partnerID
             
        }

        

        let response = await getOfferDetails(params);
        if(response.data){
        setMerchantOffers(response.data.offers);
        }
        else message.error("Data not available at the moment, please try again later");

    }
    
    const merchants = partners.map(function(object){
        return(
            <Select.Option value = {object.partner_id}>{object.partner_name}</Select.Option>
        )
    })

    let columns = [
        nameColumn("Merchant Name","partner_name"),
        nameColumn("Merchant ID", "partner_id"),
        nameColumn("Valid From", "start_date_time"),
        nameColumn("Valid Till", "end_date_time"),
        {
            title : "Offer T&C",
            dataIndex : "freecharge_terms_conditions",
            key : "freecharge_terms_conditions",
            render : (params) => {
                
               return(
                <>
                <Button type="primary" onClick={showModal}>
                    Offer T and C
                </Button>
                <Modal title="Offers Terms and Conditions" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div dangerouslySetInnerHTML={{ __html: params }} />
                </Modal>
                </>
               ) 
            }
        }
    ]


    return (
        <>
        <Form
        name="merchantForm"
        onFinish={onFinish}
        layout="vertical">
            <Row justify="space-around" type="flex">
            <Col xs={6}>
            <Form.Item
            label="Choose Merchant"
            name="partnerID"
            >
                <Select placeholder="Select a merchant type"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }>

                {merchants}
                </Select>
            </Form.Item>
            </Col>
            <Col xs={12}>
            <Form.Item
            label="Choose Date and Time"
            name="date_and_time"
            >
                <DatePicker showTime onChange={onChange}  />
            </Form.Item> 
            </Col>
            <Col xs={2}>
            <Form.Item
                    label = " "
                    >
                        <Button type="primary" 
                        htmlType="submit"
                        size="medium"
                    
                        >
                    Get Offers
                    </Button>
                    </Form.Item>
            </Col>
                    </Row>
        </Form>

        <Table
        dataSource={merchantOffers}
        columns={columns}
        scroll={{x:true}}
        />
        
        </>
        
    )
}

export default MerchantOffersTable;