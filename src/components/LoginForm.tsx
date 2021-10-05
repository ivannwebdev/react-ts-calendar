import React, { FC, useState } from "react";
import { Form, Input, Button} from 'antd'
import { rules } from "../utils/rules";
import { useTypeSelector } from './../hooks/useTypeSelector';
import { useActions } from "../hooks/useActions";


const LoginForm: FC = () => {
    const {login} = useActions()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        
        login(username, password)
    }

    const {isLoading, error} = useTypeSelector(state => state.auth)

    return(
        <Form onFinish= {submit}>
          {error && <div style= {{color: 'red', fontSize: 17,}}>
              Error
            </div>}
      <Form.Item
        label="Логин"
        name="username"
        rules={[rules.required('Введите login')]}
      >
        <Input value= {username} onChange= {(e) => setUsername(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[rules.required('Введите пароль')]}
      >
        <Input.Password value= {password} onChange= {(e) => setPassword(e.target.value)}/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading= {isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
    )
}

export default LoginForm