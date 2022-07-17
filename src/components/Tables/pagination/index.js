import { Button, Row, Col, Select } from "antd";

export const Pagination = (props) => {
    const {
        pageNumber,
        pageSize = 10,
        showSizeChanger = false,
        onPaginate,
        totalRecodsPerPage,
        pageSelectDisabled
    } = props;


    const onPaginateFunction = (paginate) => {
        if (paginate === "prev") {
            onPaginate(pageSize, (pageNumber - 1))
        }
        else {
            onPaginate(pageSize, (pageNumber + 1))
        }
    }

    const changePageSize = (size) => {
        onPaginate(size, 1);
    }

    return (
        <>
            <Row style={{ marginTop: '20px' }} justify="end">
                {showSizeChanger && <><Col style={{ padding: '4px' }}>
                    Select Page size
                </Col>
                    <Select disabled={pageSelectDisabled} defaultValue={pageSize} style={{ width: 120 }} onChange={changePageSize}>
                        <Select.Option value="10">10</Select.Option>
                        <Select.Option value="20">20</Select.Option>
                        <Select.Option value="50">
                            50
                        </Select.Option>
                    </Select></>}
                <Col span={2} style={{ marginLeft: '10px' }}>
                    <Button disabled={pageNumber === 1} onClick={() => onPaginateFunction("prev")}>
                        Previous
                    </Button>
                </Col>
                <Col>
                    <Button disabled={totalRecodsPerPage < pageSize} onClick={() => onPaginateFunction("next")}>
                        Next
                    </Button>
                </Col>
            </Row>
        </>
    )
}

export default Pagination;