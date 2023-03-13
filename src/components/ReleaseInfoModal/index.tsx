import React from "react";
import {
  Button,
  Modal,
  Table,
  Tag,
} from "antd";
import {
  MinusCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

function ReleaseInfoModal(props: {
  modalTitle: string;
  isModalVisible: boolean;
  onCancel: any;
  data: any;
}) {
  const { modalTitle, isModalVisible, onCancel, data } =
    props;

  const expandedRowRender = (data: any) => {
    const columns = [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Type", dataIndex: "type", key: "type" },
      { title: "Name", dataIndex: "name", key: "name" },
      { title: "Sku", dataIndex: "sku", key: "sku" },
      { title: "Price", dataIndex: "price", key: "price" },
      { title: "CCY", dataIndex: "ccy", key: "ccy" },
      {
        title: "Format",
        dataIndex: "format",
        key: "format",
      },
    ];

    return (
      <Table
        columns={columns}
        dataSource={data.products}
        pagination={false}
      />
    );
  };

  return (
    <>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onCancel={onCancel}
        width="56rem"
        footer={[
          <Button key="back" onClick={onCancel} danger>
            Cerrar
          </Button>,
        ]}
      >
        <h3>Splits</h3>
        <Table
          pagination={{ pageSize: 5 }}
          dataSource={data.splits}
          loading={false}
          scroll={{ x: 1300 }}
          style={{
            margin: "4px",
          }}
          rowKey="name"
          columns={[
            {
              title: "Split Id",
              dataIndex: "splitId",
              key: "splitId",
              width: 110,
              fixed: "left",
              sorter: (a, b): any =>
                a.splitId.localeCompare(b.splitId),
            },
            {
              title: "Release Id",
              dataIndex: "releaseId",
              width: 110,
              fixed: "left",
              key: "releaseId",
              sorter: (a, b): any =>
                a.releaseId.localeCompare(b.releaseId),
            },
            {
              title: "Label Id",
              dataIndex: "labelId",
              key: "labelId",
              sorter: (a, b): any =>
                parseFloat(a.labelId) -
                parseFloat(b.labelId),
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
              sorter: (a, b): any =>
                a.email.localeCompare(b.email),
            },
            {
              title: "Role",
              dataIndex: "role",
              key: "role",
              sorter: (a, b): any =>
                a.role.localeCompare(b.role),
            },
            {
              title: "%",
              dataIndex: "percent",
              key: "percent",
              sorter: (a, b): any =>
                parseFloat(a.percent) -
                parseFloat(b.percent),
            },
            {
              title: "Retention",
              dataIndex: "retention",
              key: "retention",
              sorter: (a, b): any =>
                parseFloat(a.retention) -
                parseFloat(b.retention),
            },
          ]}
        />
        <br />
        <h3>Participants</h3>
        <Table
          pagination={{ pageSize: 5 }}
          loading={false}
          dataSource={data.participants}
          style={{
            margin: "4px",
          }}
          rowKey="name"
          columns={[
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.name.localeCompare(b.name),
            },
            {
              title: "Role",
              dataIndex: "role",
              key: "role",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.role.localeCompare(b.role),
            },
            {
              title: "Role Type",
              dataIndex: "role_type",
              key: "role_type",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.role_type.localeCompare(b.role_type),
            },
            {
              title: "Instrument",
              dataIndex: "instrument",
              key: "instrument",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.instrument.localeCompare(b.instrument),
            },
          ]}
        />
        <br />
        <h3>Tracks</h3>
        <Table
          pagination={{ pageSize: 5 }}
          loading={false}
          dataSource={data.tracks}
          scroll={{ x: 1300 }}
          style={{
            margin: "4px",
          }}
          expandable={{
            expandedRowRender,
            expandIcon: ({ expanded, onExpand, record }) =>
              expanded ? (
                <MinusCircleOutlined
                  onClick={(e) => onExpand(record, e)}
                />
              ) : (
                <ShoppingOutlined
                  onClick={(e) => onExpand(record, e)}
                />
              ),
          }}
          rowKey="id"
          columns={[
            {
              title: "Track ID",
              dataIndex: "id",
              width: 100,
              fixed: "left",
              key: "id",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                parseInt(a.id) - parseInt(b.id),
            },
            {
              title: "Disc N°",
              dataIndex: "discnum",
              key: "discnum",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                parseInt(a.discnum) - parseInt(b.discnum),
            },
            {
              title: "Track N°",
              dataIndex: "tracknum",
              key: "tracknum",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                parseInt(a.tracknum) - parseInt(b.tracknum),
            },
            {
              title: "Title",
              dataIndex: "title",
              key: "title",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.title.localeCompare(b.title),
            },
            {
              title: "Artist",
              dataIndex: "artist",
              key: "artist",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.artist.localeCompare(b.artist),
            },
            {
              title: "ISRC",
              dataIndex: "isrc",
              key: "isrc",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.isrc.localeCompare(b.isrc),
            },
            {
              title: "Categories",
              dataIndex: "categories",
              key: "categories",
              defaultSortOrder: "ascend",
              render: (value: any, record: any) =>
                record.categories.map((cat: string, i: number) => {
                  return <Tag key={i.toString()} color="#0a00ec">{cat}</Tag>;
                }),
            },
            {
              title: "Participants",
              dataIndex: "participants",
              width: 190,
              fixed: "right",
              key: "participants",
              defaultSortOrder: "ascend",
              render: (value: any, record: any) =>
                record.participants.map((part: any, i: number) => {
                  return (
                    <Tag key={i.toString()} color="geekblue">
                      {part.name + " / " + part.role}{" "}
                    </Tag>
                  );
                }),
            },
          ]}
        />
        <br />
        <h3>Products</h3>
        <Table
          pagination={{ pageSize: 10 }}
          loading={false}
          scroll={{ x: 1300 }}
          dataSource={data.products}
          style={{
            margin: '4px',
          }}
          rowKey="name"
          columns={[
            { title: 'Type', dataIndex: 'type', key: 'type', width: 100, fixed: "left", sorter: (a, b): any => a.type.localeCompare(b.type) },
            { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b): any => a.name.localeCompare(b.name) },
            { title: 'Sku', dataIndex: 'sku', key: 'sku', sorter: (a, b): any => a.sku.localeCompare(b.sku) },
            { title: 'CCY', dataIndex: 'ccy', key: 'ccy', sorter: (a, b): any => a.ccy.localeCompare(b.ccy) },
            { title: 'Format', dataIndex: 'format', key: 'format', sorter: (a, b): any => a.format.localeCompare(b.format)  },
            { title: 'Price', dataIndex: 'price', key: 'price', width: 100, fixed: "right", sorter: (a, b): any => parseFloat(a.price) - parseFloat(b.price) },
          ]}
        />
      </Modal>
    </>
  );
}

export default ReleaseInfoModal;
