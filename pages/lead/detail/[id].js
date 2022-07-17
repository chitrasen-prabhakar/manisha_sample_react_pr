import React, { useEffect, useState } from 'react'

import {
    Row,
    Col,
    Spin,
    Card,
    Breadcrumb,
    Descriptions,
    Badge,
    Collapse
} from "antd";
const { Panel } = Collapse;
import { 
    getFullLeadData,
  } from "src/api/services/lead";
import { useRouter } from "next/router";
import Error from "next/error";
const Index = (props) => {
    const router = useRouter();
    const [leadData, setLeadData] = useState({});
    const [loading, setLoading] = useState(false);

    const { id } = router.query;
    useEffect(() => {
        (
            async () => {
                if(id){
                    await fetchData(id);
                }
            }
        )()
    }, [id])
    const fetchData = async (id) => {
        setLoading(true)
        let response = await getFullLeadData({lead_id:id});
        if (response.statusCode >= 400) {
            generalErrorHandler(response)
            setLoading(false)
            return;
    
        }
        response = response.data;
        setLeadData(response);
        setLoading(false)
    }
    return (
        <Row justify="space-around" type="flex">
                <Col xs={24} >
                    <Spin
                        spinning={false}
                        tip="Fetching existing form data"
                    >
                        <Card
                            bordered
                            hoverable
                            title="Lead"
                        >
                        <Collapse defaultActiveKey={['1']}>
                        <Panel header="Customer Details" key="1">
                        <Descriptions  bordered>
                            <Descriptions.Item label="Customer Name">{leadData.first_name} {leadData.last_name}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="Customer Email">{leadData.email}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="Customer Mobile">{leadData.mobile}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="DOB">{leadData.dob}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="City">{leadData.city_name}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="State">{leadData.state_name}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="Pincode">{leadData.pincode}&nbsp;</Descriptions.Item>

                            <Descriptions.Item label="PAN">{leadData.pancard}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="Gender">{leadData.gender}&nbsp;</Descriptions.Item>
                            {/* <Descriptions.Item label="Marital Status">{leadData.marital_status}&nbsp;</Descriptions.Item> */}
                            <Descriptions.Item label="Spouse Name">{leadData.spouse_first_name} {leadData.spouse_last_name}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="Spouse Number">{leadData.spouse_mobile}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="Mother Name">{leadData.mother_first_name} {leadData.mother_last_name}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="Mother Number">{leadData.mother_mobile}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="Father Name">{leadData.father_first_name} {leadData.father_last_name}&nbsp;</Descriptions.Item>
                            <Descriptions.Item label="Father Number">{leadData.father_mobile}&nbsp;</Descriptions.Item>
                        </Descriptions>
                        </Panel>
                        <Panel header="Asset Information" key="2">
                        <Descriptions  bordered>
                            <Descriptions.Item label="Make">{leadData.make_name}</Descriptions.Item>
                            <Descriptions.Item label="Model">{leadData.model_name}</Descriptions.Item>
                            {/* <Descriptions.Item label="Likely purchase date">{leadData.likely_purchase_date_of_bike}</Descriptions.Item> */}
                        </Descriptions>
                        </Panel>
                        <Panel header="Employement Details" key="3">
                        <Descriptions  bordered>
                            <Descriptions.Item label="Employement Type">{leadData.employment_type}</Descriptions.Item>
                            <Descriptions.Item label="Type of Organisation">{leadData.type_organisation}</Descriptions.Item>
                            <Descriptions.Item label="Name of Employer">{leadData.employer_name}</Descriptions.Item>
                            <Descriptions.Item label="Annual gross salary">{leadData.annual_gross_salary}</Descriptions.Item>
                            <Descriptions.Item label="Monthly income (in hand)">{leadData.monthly_income}</Descriptions.Item>
                            <Descriptions.Item label="Years at current company">{leadData.years_at_current_company}</Descriptions.Item>
                            <Descriptions.Item label="Total years of work exp">{leadData.total_years_of_work_exp}</Descriptions.Item>
                            <Descriptions.Item label="Work email address">{leadData.work_email_address}</Descriptions.Item>
                            
                        </Descriptions>
                        </Panel>
                        <Panel header="Residence Details" key="4">
                        <Descriptions  bordered>
                            <Descriptions.Item label="Address">{leadData.residential_address}</Descriptions.Item>
                            <Descriptions.Item label="Pincode">{leadData.residential_pincode}</Descriptions.Item>
                            <Descriptions.Item label="City">{leadData.residential_city}</Descriptions.Item>
                            <Descriptions.Item label="State">{leadData.residential_state}</Descriptions.Item>
                            <Descriptions.Item label="Land mark">{leadData.residential_landmark}</Descriptions.Item>
                            <Descriptions.Item label="Residential Type">{leadData.residential_type}</Descriptions.Item>
                            <Descriptions.Item label="Months in current residence">{leadData.months_in_current_residence}</Descriptions.Item>
                        </Descriptions>
                        </Panel>
                        
                        </Collapse>
                        
                        
                       

                        
                        </Card>
                    </Spin>
                </Col>
            </Row>
        
    );
};

export default Index;
