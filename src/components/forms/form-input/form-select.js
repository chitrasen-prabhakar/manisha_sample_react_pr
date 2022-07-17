import React from 'react';
import { Form, Select } from 'antd';

const fullWidthStyle = { width: '100%' };

const SelectType = (props) => {
    const {
        type,
        options,
        searching,
        handleSearch,
        ...rest
    } = props;

    if (type === 'search') {
        return (
            <Select
                showSearch
                tokenSeparators={[',']}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                loading={searching}
                onSearch={handleSearch}
                notFoundContent={searching ? 'Fetching data' : 'Not found anything'}
                allowClear
                style={fullWidthStyle}
                {...rest}
            >
                {
                    options.length ? options.map((d, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Select.Option key={`${d.value}${index}`} value={d.value}>
                            {d.text}
                        </Select.Option>
                    )) : null
                }
            </Select>
        );
    }

    return (
        <Select
            showSearch
            tokenSeparators={[',']}
            //showArrow={false}
            style={fullWidthStyle}
            filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            {...rest}
        >
            {
                options.map((d) => (
                    <Select.Option key={d.value} value={d.value}>
                        {d.text}
                    </Select.Option>
                ))
            }
        </Select>
    );
};
/**
 * 
 */

const FormSelect = React.memo((props) => {
    const {
        label,
        name,
        rules,
        dependencies,
        shouldUpdate,
        field,
        type,
        ...rest
    } = props;

    return (
        <Form.Item
            {...field}
            hasFeedback
            validateFirst
            label={label}
            name={name}
            rules={rules}
            dependencies={dependencies}
            shouldUpdate={shouldUpdate}
        >
            <SelectType type={type} {...rest} />
        </Form.Item>
    );
});


export default FormSelect;
