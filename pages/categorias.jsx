import React, { useState } from "react";
import LayoutAnt from "../components/layout/LayoutAnt";

import Img from "react-image";

/////////////////////////////////ANTD
import { Spin, Table, Modal, Button } from "antd";
import { MoreOutlined } from "@ant-design/icons";

/////////////////////////////////Apollo
import { withApollo } from "../apollo/client";
import { useQuery } from "@apollo/react-hooks";
import { SHOW_CATEGORIAS } from "../apolloClientGQLs/Queries";
import FormCateg from "../components/FormCateg";

const Categorias = () => {
  const columns = [
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
      render: (rowValue) => <h5>{rowValue}</h5>,
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion",
    },
    {
      title: "Orden",
      dataIndex: "orden",
      key: "orden",
    },
    {
      title: "Imagen",
      dataIndex: "imagen",
      key: "imagen",
      render: (rowValue) => (
        <Img
          src={rowValue || "/images/category.png"}
          loader={<Spin />}
          style={{ height: 40, width: 40 }}
          crossOrigin="anonymous"
        />
      ),
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
      render: (rowValue) => (
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "2px",
            background: rowValue,
          }}
        />
      ),
    },
    {
      title: "Detalles",
      key: "action",
      render: (text, record) => (
        <Button
          type="secondary"
          onClick={() => showModal(record)}
          shape="circle"
          icon={<MoreOutlined />}
        />
      ),
    },
  ];
  let dataTable = [];
  const resp = useQuery(SHOW_CATEGORIAS);
  const [state, setState] = useState({
    ModalText: null,
    visible: false,
    confirmLoading: false,
  });

  if (resp.loading)
    return (
      <LayoutAnt>
        <Spin />
      </LayoutAnt>
    );
  if (resp.error) return <p>Error...</p>;

  const showModal = (record) => {

    setState({
      ...state,
      visible: true,
      ModalContent: <FormCateg categ={record}/>,
    });
  };

  const handleOk = () => {
    setState({
      ...state,
      confirmLoading: true,
    });
    setTimeout(() => {
      setState({
        ...state,
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setState({
      ...state,
      visible: false,
    });
  };

  const dataTableFill = () => {
    dataTable = resp.data.categorias.map((categoria) => {
      categoria.key = categoria.id;
      return categoria;
    });
    return dataTable;
  };

  const { visible, confirmLoading, ModalContent } = state;

  return (
    <LayoutAnt>
      <h1>Categorias</h1>
      <Table columns={columns} dataSource={dataTableFill()} />
      <Modal
        visible={visible}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        centered={true}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cerrar
          </Button>,
        ]}
      >
        {ModalContent}
      </Modal>
    </LayoutAnt>
  );
};

export default withApollo(Categorias);
