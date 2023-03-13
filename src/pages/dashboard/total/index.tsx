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

import { fetchTotal } from '../../../redux/income/actions'

const { Option } = Select;



function IngresosTotal() {


  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchTotal())
  }, [])



  const { total, loading } = useSelector(
    (state: any) => state.income
  );

  const [totalData, setTotalData] = useState([])

  useEffect(() => {
    setTotalData(total[1])
  }, [total])

  const routes = [
    {
      path: "index",
      breadcrumbName: "",
    },
  ];

  function handleChange(value: String) {
    let selectedYear = total.filter((element: any) => element[0].year === value)
    console.log(selectedYear[0]);
    setTotalData(selectedYear[0])
  }

  if (loading) {
    return <div></div>
  }
  else {
    return (
      <div>
        <PageHeader
          title="Ingresos totales (CSVs)"
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
            {total.map((year: any) => {
              return <Option value={year[0].year}>20{year[0].year}</Option>
            })}
          </Select>

        </div>
        <div className="content_container">
          <Line
            loading={loading}
            data={totalData}
            height={400}
            xField='month'
            yField='paid'
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
        </div>
      </div>
    );
  }
}
export default IngresosTotal;
