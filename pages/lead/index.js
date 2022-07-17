import {
    Row,
    Col,
    Spin,
    Card
} from "antd";
import LeadList from "../../src/components/pages/lead/LeadList";

const Index = (props) => {

    return (
        <>

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
                            <LeadList/>
                        </Card>
                    </Spin>
                </Col>
            </Row>
        </>
    );
};

export default Index;
