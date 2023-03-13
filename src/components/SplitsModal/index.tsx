import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux"
import { Button, Modal, Table, Input, message, Select, Upload } from "antd";
import {
  fetchSplitsByRelease, 
  /* deleteRelease */
} from '../../redux/releases/actions';

function SplitsModal(props: {
  modalTitle: string;
  isModalVisible: boolean;
  onCancel: any;
  id: string;
}) {
  const { modalTitle, isModalVisible, onCancel, id } = props;
  const { splits, loadingSplits } = useSelector((state: any) => state.releases);

  const dispatch = useDispatch();

  useEffect(() => {
    if(isModalVisible===true){
      dispatch(fetchSplitsByRelease(id));
    }
    
  }, [dispatch, isModalVisible]);

  const [data, setData] = useState(splits || [{}]);

  useEffect(() => {
    setData(splits);
  }, [splits]);
  return (
    <>
      <Modal
        title={modalTitle}
        visible={isModalVisible}
        onCancel={onCancel}
        width= "auto"
        footer={[
          <Button key="back" onClick={onCancel} danger>
            Cerrar
          </Button>
        ]}
      >
        <Table
          pagination={{ pageSize: 10 }}
          loading={loadingSplits}
          dataSource={data}
          style={{
            margin: '4px',
          }}
          rowKey="name"
          columns={[
            { title: 'Split Id', dataIndex: 'splitId', key: 'splitId', sorter: (a, b): any => a.splitId.localeCompare(b.splitId) },
            { title: 'Label Id', dataIndex: 'labelId', key: 'labelId', sorter: (a, b): any => parseFloat(a.labelId) - parseFloat(b.labelId) },
            { title: 'Release Id', dataIndex: 'releaseId', key: 'releaseId', sorter: (a, b): any => a.releaseId.localeCompare(b.releaseId) },
            { title: 'Email', dataIndex: 'email', key: 'email', sorter: (a, b): any => a.email.localeCompare(b.email) },
            { title: 'Role', dataIndex: 'role', key: 'role', sorter: (a, b): any => a.role.localeCompare(b.role) },
            { title: '%', dataIndex: 'percent', key: 'percent', sorter: (a, b): any => parseFloat(a.percent) - parseFloat(b.percent) },
            { title: 'Retention', dataIndex: 'retention', key: 'retention', sorter: (a, b): any => parseFloat(a.retention) - parseFloat(b.retention) },
            
          ]}
        />
      </Modal>
    </>
  );
}

export default SplitsModal;
