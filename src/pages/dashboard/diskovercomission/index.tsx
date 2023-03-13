import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    PageHeader,
    Table,
    Select,
    Input,
    Tag,
} from "antd";
import { Line } from '@ant-design/charts';

import { EyeOutlined } from "@ant-design/icons";

import { fetchComission } from '../../../redux/income/actions'

const { Option } = Select;



function DiskoverComission() {


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchComission())
    }, [])



    const { comission, loading } = useSelector(
        (state: any) => state.income
    );

    const [totalData, setTotalData] = useState([])

    const [year, setYear] = useState("21")


    useEffect(() => {


        const filtered = comission.filter((el: any) => el.year === year)


        setTotalData(filtered)
        console.log(comission[0]);

    }, [comission, year])

    // useEffect(() => {
    //     setPayedData(payed[0])
    //     console.log("payed");

    //     console.log(payed[0]);

    // }, [payed])

    const routes = [
        {
            path: "index",
            breadcrumbName: "",
        },
    ];

    function handleChange(value: string) {
        setYear(value)
    }

    if (loading) {
        return <div></div>
    }
    else {
        return (
            <div>
                <PageHeader
                    title="Total"
                    ghost={false}
                    breadcrumb={{ routes }}
                />

                <div
                    className="top_content_container"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: "8px 12px",
                        margin: "8px 8px 0",
                        backgroundColor: "#fafafa",
                        borderRadius: "4px",
                        width: "auto",
                    }}
                >
                    <Select defaultValue="21" style={{ width: 120 }} onChange={handleChange}>
                        <Option value={"20"}>2020</Option>
                        <Option value={"21"}>2021</Option>
                        <Option value={"22"}>2022</Option>
                    </Select>

                </div>
                <div className="content_container">
                    <Line
                        loading={loading}
                        data={totalData}
                        height={400}
                        xField='month'
                        yField='total'
                        seriesField="type"
                        point={{
                            size: 10,
                            shape: 'diamond',
                        }}
                        label={{
                            style: {
                                fill: '#aaa',
                            },
                        }}
                    />
                    {/* <Line
                        loading={loading}
                        data={payedData}
                        height={400}
                        xField='month'
                        yField='total_paid'
                        seriesField="type"
                        point={{
                            size: 10,
                            shape: 'diamond',
                        }}
                        label={{
                            style: {
                                fill: '#aaa',
                            },
                        }}
                    /> */}
                </div>
            </div>
        );
    }
}
export default DiskoverComission;
