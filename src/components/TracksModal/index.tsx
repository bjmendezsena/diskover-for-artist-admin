import React from "react";
import { Button, Modal, Table, Tag, } from "antd";
import { MinusCircleOutlined , ShoppingOutlined } from '@ant-design/icons';

function TracksModal(props: {
  modalTitle: string;
  isModalVisible: boolean;
  onCancel: any;
  data: any;
}) {
  const { modalTitle, isModalVisible, onCancel, data } = props;

  const expandedRowRender = (data: any) => {
    const columns = [
      { title: 'ID', dataIndex: 'id', key: 'id' },
      { title: 'Type', dataIndex: 'type', key: 'type' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Sku', dataIndex: 'sku', key: 'sku' },
      { title: 'Price', dataIndex: 'price', key: 'price' },
      { title: 'CCY', dataIndex: 'ccy', key: 'ccy' },
      { title: 'Format', dataIndex: 'format', key: 'format' },
    ];

    return <Table columns={columns} dataSource={data.products} pagination={false} />;
  };
  return (
    <>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onCancel={onCancel}
        width="auto"
        footer={[
          <Button key="back" onClick={onCancel} danger>
            Cerrar
          </Button>
        ]}
      >
        <Table
          pagination={{ pageSize: 10 }}
          loading={false}
          dataSource={data}
          style={{
            margin: '4px',
          }}
          expandable={{ expandedRowRender, expandIcon: ({ expanded, onExpand, record }) =>
          expanded ? (
            <MinusCircleOutlined  onClick={e => onExpand(record, e)} />
          ) : (
            <ShoppingOutlined onClick={e => onExpand(record, e)} />
          ) }}
          rowKey="id"
          columns={[
            {
              title: 'Track ID',
              dataIndex: 'id',
              key: 'id',
              defaultSortOrder: 'ascend',
              sorter: (a, b): any => parseInt(a.id) - parseInt(b.id)
            },
            {
              title: 'Disc N°',
              dataIndex: 'discnum',
              key: 'discnum',
              defaultSortOrder: 'ascend',
              sorter: (a, b): any => parseInt(a.discnum) - parseInt(b.discnum)
            },
            {
              title: 'Track N°',
              dataIndex: 'tracknum',
              key: 'tracknum',
              defaultSortOrder: 'ascend',
              sorter: (a, b): any => parseInt(a.tracknum) - parseInt(b.tracknum)
            },
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              defaultSortOrder: 'ascend',
              sorter: (a, b): any => a.title.localeCompare(b.title)
            },
            {
              title: 'Artist',
              dataIndex: 'artist',
              key: 'artist',
              defaultSortOrder: 'ascend',
              sorter: (a, b): any => a.artist.localeCompare(b.artist)
            },
            {
              title: 'ISRC',
              dataIndex: 'isrc',
              key: 'isrc',
              defaultSortOrder: 'ascend',
              sorter: (a, b): any => a.isrc.localeCompare(b.isrc)
            },
            {
              title: 'Categories',
              dataIndex: 'categories',
              key: 'categories',
              defaultSortOrder: 'ascend',
              render: (value: any, record: any) => (
                record.categories.map((cat: string) => {
                  return <Tag color="#0a00ec">{cat}</Tag>
                })
              )
            },
            {
              title: 'Participants',
              dataIndex: 'participants',
              key: 'participants',
              defaultSortOrder: 'ascend',
              render: (value: any, record: any) => (
                record.participants.map((part: any) => {
                  return <Tag color="geekblue">{part.name + " / " + part.role} </Tag>
                })
              )
            }
          ]}
        />
      </Modal>
    </>
  );
}

export default TracksModal;
