import {
    Row,
    Col,
    Spin,
    Card
} from "antd";
import LeadForm from "../../src/components/forms/lead/LeadForm";

const Create = (props) => {
console.log('process.env.DB_USER',process.env.LMS_URL)
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
                            title="Create Lead"
                        >

                        <LeadForm/>
                        </Card>
                    </Spin>
                </Col>
            </Row>
        </>
    );
};

export default Create;
