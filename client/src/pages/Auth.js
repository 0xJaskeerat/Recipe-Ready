import { Button, Form, Input, notification } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
 
const FormsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 88vh;
  justify-content: center;
`;

const StyledLoginFormContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const StyledRegisterationFormContainer = styled.div`
  width: 100%;
  margin: auto;
`;

const Auth = () => {
  return (
    <FormsContainer>
      <Login />
      <Register />
    </FormsContainer>
  );
};

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try{
      const response = await axios.post("http://localhost:4000/auth/login",  values)
      console.log("respons", response);
      const token = response.data.token;
      setCookies("access_token", token)
      window.localStorage.setItem("userId", response.data.userID);
      navigate("/");
      notification.success({
        message: `Welcome ${username}`
      })
    }
    catch(err) {
      console.log("er",err)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <StyledLoginFormContainer>
     <FormComponent
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        formName={"login-form"}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        btnName={"Login"}
      />
    </StyledLoginFormContainer>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerForm] = Form.useForm();

  const onFinish = async (values) => {
    try{
      await axios.post("http://localhost:4000/auth/register",  values)
      notification.success({
        message: "Registeration Successfull",
        description: "You can login now"
      })
      registerForm.resetFields();
    }
    catch(err) {
      console.log("er",err)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <StyledRegisterationFormContainer>
      <FormComponent
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        formName={registerForm}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        btnName={"Register"}
      />
    </StyledRegisterationFormContainer>
  );
};

const FormComponent = ({
  username,
  setUsername,
  password,
  setPassword,
  formName,
  onFinish,
  onFinishFailed,
  btnName,
}) => {
  return (
    <Form
      name={formName}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        username: "",
        password: ""
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          {btnName}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Auth;
