import React, { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";


import {
  Form,
  Input,
  Button,
  Typography,
  Popconfirm,
  message,
  InputNumber,
  Switch,
} from "antd";
import { DeleteOutlined, EditTwoTone, SendOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Text } = Typography;

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

const FormCateg = ({ categ }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [modificando, setModificando] = useState(false);
  const [mostrarcaja, setMostrarCaja] = useState(null);
  const [newcolor, setNewColor] = useState(null);
  let { nombre, descripcion, orden, color, imagen, mostrar_caja, id } = categ;

  const created = dayjs(categ.created).format("dddd, MMMM D YYYY, HH:mm:ss");
  const modified = dayjs(categ.modified).format("dddd, MMMM D YYYY, HH:mm:ss");

  const confirm = () => {
    message.info("Clicked on Yes.");
  };

  form.setFieldsValue({
    nombre,
    descripcion,
    orden,
    imagen,
  });

  useEffect(() => {
    setModificando(false);
    setMostrarCaja(mostrar_caja);
    setNewColor(color);
  }, [categ]);

  useEffect(() => {
    form.setFieldsValue({
      color: newcolor,
    });
  }, [newcolor]);

  const onFinish = (values) => {
    setLoading(true);
    console.log("Success:", values);
    setLoading(false);
  };

  const onFinishFailed = (errorInfo) => {
    setLoading(true);
    console.log("Failed:", errorInfo);
    setLoading(false);
  };
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  return (
    <div>
      <h2>{nombre}</h2>
      <h5>
        <Text code>{id}</Text>
      </h5>
      <h5>
        <Text code>Creada: {created}</Text>
      </h5>
      <h5>
        <Text code>Modificada {modified}</Text>
      </h5>
      <br />

      <Form
        layout="horizontal"
        form={form}
        size="small"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="nombre"
          label="Nombre"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          rules={[
            {
              transform: (value) => {
                return value.trim();
              },
              required: true,
              message: "El nombre es requerido",
            },
            {
              transform: (value) => {
                return value.trim();
              },
              min: 2,
              message: "El nombre es demasiado corto",
            },
            {
              transform: (value) => {
                return value.trim();
              },
              max: 25,
              message: "No puedes superar los 25 caracteres",
            },
          ]}
        >
          <Input placeholder="Nombre" disabled={!modificando} />
        </Form.Item>

        <Form.Item
          name="descripcion"
          label="descripcion"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          rules={[
            {
              transform: (value) => {
                return value.trim();
              },
              max: 250,
              message: "No puedes superar los 250 caracteres",
            },
          ]}
        >
          <Input.TextArea disabled={!modificando} />
        </Form.Item>

        <Form.Item
          name="orden"
          label="orden"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          rules={[
            {
              type: "number",
              min: 1,
              message: "El valor no puede ser manor a 1",
            },
            {
              type: "number",
              max: 9999,
              message: "Numero ha superado el limite",
            },
          ]}
        >
          <InputNumber disabled={!modificando} min={1} max={9999} />
        </Form.Item>

        <Form.Item
          name="color"
          label="color"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          {modificando ? (
            <ColorPicker
              width={25}
              height={25}
              position={"absolute"}
              color={newcolor}
              cambiarColor={setNewColor}
            />
          ) : (
            <div
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "2px",
                background: color,
              }}
            />
          )}
        </Form.Item>

        <Form.Item
          name="imagen"
          label="imagen"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
        >
          <Input placeholder="imagen" disabled={!modificando} />
        </Form.Item>

        <Form.Item
          name="mostrar_caja"
          label="Mostrar en Caja "
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
        >
          <Switch
            disabled={!modificando}
            checked={mostrarcaja}
            onChange={() => setMostrarCaja(!mostrarcaja)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 14, offset: 14 }}>

          <Button
            type="default"
            size="large"
            shape="circle-outline"
            icon={<EditTwoTone />}
            onClick={() => setModificando(!modificando)}
          />
          <span> </span>

          <Popconfirm
            placement="topLeft"
            title={"Si eliminar esta catagoria no podra recuperarse, seguro?"}
            onConfirm={confirm}
            okText="Si"
            cancelText="No"
            disabled={!modificando}
          >
            <Button
              type="default"
              size="large"
              shape="circle-outline"
              icon={<DeleteOutlined />}
              disabled={!modificando}
            />
          </Popconfirm>
        </Form.Item>

        <Form.Item wrapperCol={{ span: 14, offset: 7 }}>
          {modificando && (
            <Button
              type="primary"
              icon={<SendOutlined />}
              loading={loading}
              htmlType="submit"
            >
              APLICAR CAMBIOS
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormCateg;
