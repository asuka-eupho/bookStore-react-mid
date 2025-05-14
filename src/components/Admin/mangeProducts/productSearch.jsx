import { Input } from 'antd';

const { Search } = Input;
const SearchFilterProduct = (props) => {
    const onSearch1 = (value) => {
        let query = "";
        if (value) {
            query = `&mainText=/${value}/i`;
        }
        if (query) {
            props.handleSearch(query);
        }
    }
    const onSearch2 = (value) => {
        let query = "";
        if (value) {
            query = `&author=/${value}/i`;
        }
        if (query) {
            props.handleSearch(query);
        }
    }
    return (
        <>
            <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                <div style={{ width: "40%" }}>
                    <p style={{ fontWeight: "500", color: "purple", fontSize: "20px" }}>Search by Title Book</p>
                    <Search placeholder="input search text" onSearch={onSearch1} enterButton />
                </div>

                <div style={{ width: "40%" }}>
                    <p style={{ fontWeight: "500", color: "purple", fontSize: "20px" }}>Search by Authors</p>
                    <Search placeholder="input search text" onSearch={onSearch2} enterButton />
                </div>
            </div>
        </>
    )
}
export default SearchFilterProduct