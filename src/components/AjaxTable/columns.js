/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

//hook imports

//component imports
import ActiveLink from "src/components/layouts/ActiveLink";

import Highlighter from "react-highlight-words";

import {
    Tag,
    Switch,
    Tooltip,
    Button,
    Select,
    DatePicker,
    Input,
    Space,
    Modal,
    Form,
    Checkbox
} from "antd";
import moment from "moment";

export const nameColumn = (
    title = "Name",
    dataIndex = "name",
    { ...rest } = {}
) => ({
    title,
    dataIndex,
    key: "id",
    ellipsis: true,
    width: 80,
    render: (name, record) => (

        <span>{name?name.toString():name}</span>
    ),
    ...rest,
});

export const withTooltip = (
    title,
    dataIndex,
    toolTipMsg,
    { ...rest } = {}
) => ({
    title,
    dataIndex,
    // eslint-disable-next-line no-unused-vars
    render: (name, record) => (
        // eslint-disable-next-line no-eval
        <Tooltip title={toolTipMsg}>
            <span>{name.toString()}</span>
        </Tooltip>
    ),
    ellipsis: true,
    ...rest,
});

export const withTag = (
    title,
    dataIndex,
    { color = "blue", ...rest } = {}
) => ({
    title,
    dataIndex,
    render: (name, record) => {
        const upperName = name && name.toUpperCase();
        return (
            upperName && (
                <Tag
                    key={record.id}
                    color={
                        typeof color === "string"
                            ? color
                            : color[upperName]
                                ? color[upperName]
                                : color
                    }
                >
                    {upperName}
                </Tag>
            )
        );
    },
    ...rest,
});

export const actionColumn = (
    {
        title = "Action",
        link = "",
        dir = "",
        dataIndex = "id",
        display = "Edit",
        isEdit = true,
    } = {},
    { ...rest } = {}
) => ({
    title,
    dataIndex,
    key: "id",
    render: (id) => (
        <ActiveLink
            key={id}
            activeClassName=""
            href={dir}
            as={link.replace("[id]", id)}
        >
            <a>{isEdit ? display : id}</a>
        </ActiveLink>
    ),
    width: 40,
    ...rest,
});


export const modalColumn = ({ visible, getEditFormItemsData, dataIndex, form, callbackFntn }) => {
    const [isModalVisible, setIsModalVisible] = useState(visible);

    const onOk = () => {
        callbackFntn();
        setIsModalVisible(false)
    }

    const onCancel = () => {
        setIsModalVisible(false)
    }

    const openModal = (id) => {
        getEditFormItemsData(id);
        setIsModalVisible(true);
    }

    return {
        dataIndex,
        render: (id) =>
            <>
                <a onClick={() => openModal(id)}>Edit</a>
                {isModalVisible && <Modal
                    title="Update"
                    visible={isModalVisible}
                    onOk={() => onOk()}
                    okText="Update"
                    onCancel={() => onCancel()}
                >
                    {form}
                </Modal>}
            </>
    };
};

const iconStyle = {
    width: 80,
    maxWidth: "100%",
};

export const iconColumn = (title = "Icon", dataIndex = "icon") => ({
    title,
    dataIndex,
    render: (url) => (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img src={url} style={iconStyle} />
    ),
    width: 80,
});

export const timeColumn = (
    title,
    dataIndex,
    sorter = false,
    { ...rest } = {}
) => ({
    title,
    dataIndex,
    render: (time) => time && moment(time).format("LLLL"),
    sorter,
    ellipsis: true,
    ...rest,
});

export const getColumnSearchProps = (dataIndex) => {
    const [searchedColumn, setSearchedColumn] = useState("");
    const [searchText, setSearchText] = useState("");
    let searchInput = null;

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();

        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    return {
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                    .toString()
                    .toLowerCase()
                    .startsWith(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    };
};

export const deleteActionColumn = (
    { callbackFntn, dataIndex = "id", permissions } = {},
    { ...rest } = {}
) => ({
    title: "Action",
    dataIndex,
    key: "id",
    render: (id) => {
        let disabled = true;

        if (permissions.includes("EDIT_CLOSED_USER_GROUP")) {
            disabled = false;
        }

        function confirmModal(id) {
            Modal.confirm({
                title: "Do you Want to delete this?",
                icon: <ExclamationCircleOutlined />,
                onOk() {
                    callbackFntn(id);
                },
                onCancel() {
                    return;
                },
            });
        }

        return (
            <Button
                onClick={() => confirmModal(id)}
                size="small"
                type="primary"
                danger
                disabled={disabled}
            >
                Delete
            </Button>
        );
    },
    width: 40,
    ...rest,
});
