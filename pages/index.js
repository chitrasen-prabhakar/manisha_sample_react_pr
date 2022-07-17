import React from 'react'
import LeadForm from "../src/components/forms/lead/LeadForm";

import { Row,Col } from 'antd';
const Index = (props) => {
  
  return (
    <div className='containerLogin'>
    <Row justify="space-around">
      <Col style={{ marginTop: 20 , maxWidth:600}} span={24} >
          <LeadForm />
      </Col>
    </Row>
    </div>
  );
};

export default Index;
