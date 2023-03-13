import React from "react";
import {
    ToolOutlined,
    FormatPainterOutlined 
  } from "@ant-design/icons";
const ComingSoon =()=>{
    return (
        <div
            style={{
                width: "95%",
                height: "80vh",
                margin: "15px auto",
                display: "flex",
                borderRadius: "4px",
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }}
        >
            <span
                style={{
                    fontSize: "24px"
                }}
            >
                ¡Próximamente!
            </span>
            <div style={{
                display: "flex"
            }}>
                <ToolOutlined style={{
                    fontSize: "32px",
                    margin: "8px 4px",
                    color: "#999"
                }} />
                <FormatPainterOutlined style={{
                    fontSize: "32px",
                    margin: "8px 4px",
                    color: "#999"
                }} />
            </div>
            <span
                style={{
                    fontSize: "16px",
                    color: "#666"
                }}
            >
                Estamos trabajando en esta sección. 
            </span>
            <span
                style={{
                    fontSize: "16px",
                    color: "#666"
                }}
            >
                ¡Gracias por su paciencia! 
            </span>
            
        </div>
    );
};

export default ComingSoon;