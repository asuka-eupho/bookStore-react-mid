import React from 'react';
import { Input } from 'antd';

const { Search } = Input;
const SearchFilter = (props) => {
    const onSearch1 = (value) => {
        let query = "";
        if (value) {
            query = `&fullName=/${value}/i`;
        }
        if (query) {
            props.handleSearch(query);
        }
    }
    const onSearch2 = (value) => {
        let query = "";
        if (isNaN(value)) {
            query = `&email=/${value}/i`;
        } else {
            query = `&phone=/${value}/i`;
        }
        if (query) {
            props.handleSearch(query);
        }
    }

    return (
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", gap: 20 }}>
            <div style={{ width: "40%" }}>
                <p style={{ fontWeight: "500", color: "purple", fontSize: "20px" }}>Search by name</p>
                <Search placeholder="input search text" onSearch={onSearch1} enterButton />
            </div>

            <div style={{ width: "40%" }}>
                <p style={{ fontWeight: "500", color: "purple", fontSize: "20px" }}>Search by Email or phone</p>
                <Search placeholder="input search text" onSearch={onSearch2} enterButton />
            </div>
        </div>

    );
}
export default SearchFilter