import React, { FC, useMemo } from "react";
import { Tag, Tooltip } from "antd";

import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  FileDoneOutlined,
  FileSearchOutlined,
  FileSyncOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";

import "./UserApplicationStatusChip.scss";

interface Props {
  status:
    | "PENDING"
    | "APPROVED"
    | "REJECTED"
    | "requested"
    | "SIGNED"
    | "ACCEPTED"
    | "ACTIVE"
    | "contractSended"
    | "access_config";
  descriptionMessage?: string;
}

export const UserApplicationStatusChip: FC<Props> = ({
  status = "PENDING",
  descriptionMessage = null,
}) => {
  const color = useMemo(() => {
    switch (status) {
      case "requested":
        return "gold";
      case "APPROVED":
        return "cyan";
      case "ACCEPTED":
        return "geekblue";
      case "SIGNED":
        return "processing";
      case "REJECTED":
        return "error";
      case "access_config":
      case "contractSended":
      case "ACTIVE":
        return "green";
      case "PENDING":
      default:
        return "warning";
    }
  }, [status]);

  const label = useMemo(() => {
    switch (status) {
      case "APPROVED":
        return "Aprovada";
      case "ACCEPTED":
        return "Aceptada";
      case "requested":
        return "Solicitada";
      case "SIGNED":
        return "Firmada";
      case "REJECTED":
        return "Reachazada";
      case "contractSended":
      case "ACTIVE":
      case "access_config":
        return "Activa";
      case "PENDING":
      default:
        return "Pendiente";
    }
  }, [status]);

  const Icon = useMemo(() => {
    switch (status) {
      case "APPROVED":
        return <FileProtectOutlined />;
      case "ACCEPTED":
        return <FileSearchOutlined />;
      case "access_config":
      case "contractSended":
      case "ACTIVE":
        return <CheckCircleOutlined />;
      case "REJECTED":
        return <CloseCircleOutlined />;
      case "PENDING":
        return <ExclamationCircleOutlined />;
      case "SIGNED":
        return <FileDoneOutlined />;
      case "requested":
      default:
        return <ClockCircleOutlined />;
    }
  }, [status]);

  const description = useMemo(() => {
    switch (status) {
      case "requested":
        return descriptionMessage || "En espera de aprobación.";
      case "APPROVED":
        return (
          descriptionMessage || "Aprobada. Pendiente de la firma del contrato."
        );
      case "SIGNED":
        return (
          descriptionMessage || "Contrato firmado. En espera de la activación."
        );
      case "ACCEPTED":
        return (
          descriptionMessage ||
          "Aceptada. En espera de que el cliente configure sus datos de acceso."
        );
      case "REJECTED":
        return descriptionMessage || "La solicitud está rechazada.";
      case "contractSended":
      case "access_config":
      case "ACTIVE":
        return descriptionMessage || "La cuenta del usuario está activa.";
      case "PENDING":
        return descriptionMessage || "Pendiente de revisión.";
      default:
        return descriptionMessage || "Pendiente de aprobación.";
    }
  }, [status]);

  return (
    <Tooltip placement='top' title={description}>
      <Tag
        style={{
          borderRadius: "2px",
        }}
        className='userApplicationChip'
        color={color}
        icon={Icon}
      >
        {label}
      </Tag>
    </Tooltip>
  );
};
