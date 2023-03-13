import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  PageHeader,
  Table,
  Input,
  Typography,
  Tag
} from 'antd';
import SplitsModal from '../../../components/SplitsModal';

import {
  fetchAllReleases,
  /* deleteRelease */
} from '../../../redux/releases/actions';
import { SplitCellsOutlined, TeamOutlined, RightCircleOutlined, ShoppingOutlined } from '@ant-design/icons';

function ReleasesMainPage() {

  const [isSplitsVisible, setIsSplitsVisible] = useState(false);
  const [selectedReleaseId, setSelectedReleaseId] = useState("");

  const closeSplits = () => {
    setSelectedReleaseId("");
    setIsSplitsVisible(false);
  };
  const showSplits = (id: string) => {
    setSelectedReleaseId(id);
    setIsSplitsVisible(true);
  };
  const { releases, loadingReleases } = useSelector((state: any) => state.releases);
  const { Text } = Typography;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllReleases());
  }, [dispatch]);

  const [data, setData] = useState(releases || [{}]);

  useEffect(() => {
    setData(releases);
  }, [releases]);

  const routes = [
    {
      path: 'index',
      breadcrumbName: 'Releases',
    },
  ];

  const [searchInput, setSearchInput] = useState("")

  return (
    <div>
      <PageHeader title="Releases Resume" ghost={false} breadcrumb={{ routes }} />
      <div className="top_content_container">
        <Input
          style={{
            width: "144px",
            height: "40px",
            backgroundColor: "white",
            borderRadius: "4px",
            borderColor: "#0a00ec"
          }}
          placeholder="Buscar"
          value={searchInput}
          onChange={e => {
            const currValue: string = e.target.value.toLowerCase();
            setSearchInput(currValue);
            const filteredData = data.filter((entry: any) => {
              if (entry.id.toLowerCase().includes(currValue)) {
                return true;
              } else {
                if (entry.label.toLowerCase().includes(currValue)) {
                  return true;
                } else {
                  if (entry.percent.toLowerCase().includes(currValue)) {
                    return true;
                  } else {
                    return false;
                  }
                }
              }
            });
            if (filteredData.length <= 0 || currValue === "") {
              setData(releases);
            } else {
              setData(filteredData);
            }
          }}
        />
        <SplitsModal
          modalTitle="Splits"
          isModalVisible={isSplitsVisible}
          onCancel={closeSplits}
          id={selectedReleaseId}
        />
      </div>
      <div className="content_container">
        <Table
          locale={{ emptyText: 'No hay información' }}
          pagination={{ pageSize: 10 }}
          loading={loadingReleases}
          dataSource={data}
          style={{
            position: 'absolute',
            right: '1.6%',
            width: '83%',
            marginTop: '20px',
          }}
          rowKey="id"
          columns={[
            {
              title: 'Release ID',
              dataIndex: 'id',
              key: 'id',
              defaultSortOrder: 'ascend',
              sorter: (a, b): any => parseInt(a.id) - parseInt(b.id)
            },
            {
              title: 'Label ID',
              dataIndex: 'label',
              key: 'label',
              defaultSortOrder: 'ascend',
              sorter: (a, b): any => parseInt(a.label) - parseInt(b.label)
            },
            {
              title: 'Comisión',
              dataIndex: 'percent',
              key: 'percent',
              defaultSortOrder: 'ascend',
              sorter: (a, b): any => a.catalog.localeCompare(b.catalog)
            },
            {
              title: 'Status',
              dataIndex: 'status',
              align: 'center',
              key: 'status',
              sorter: (a, b): any => a.status.localeCompare(b.status),
              render: (value: any, record: any) => (
                <>
                  {record.status === "active"
                    ? (<Tag color="#009921">{record.status}</Tag>)
                    : (<Tag color="#943a3a">{record.status}</Tag>)}
                </>
              )
            },
            {
              title: 'Splits',
              dataIndex: 'splits',
              align: 'center',
              key: 'splits',
              render: (text: any, record: any) => (
                <>
                  <SplitCellsOutlined
                    style={{ fontSize: '20px', color: '#00000' }}
                    onClick={() => showSplits(record.id)}
                  />
                </>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default ReleasesMainPage;
