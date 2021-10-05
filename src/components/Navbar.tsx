import { Layout, Menu, Row } from "antd";
import React from "react";
import { useHistory } from "react-router";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { RoutNames } from "../router";
import { useActions } from "../hooks/useActions";

const Navbar = () => {

    const router = useHistory()
    const {isAuth, user} = useTypeSelector(state => state.auth)
    const {logout} = useActions()

    return(
        
            <Layout.Header>
                <Row justify= 'end'>
                    {isAuth ?
                    <> 
                    <div style= {{color: 'white', fontSize: 18}}>{user.username}</div>
                    <Menu theme= 'dark' mode= 'horizontal'>
                        <Menu.Item key= {1} onClick= { logout}>Выйти</Menu.Item>
                    </Menu>
                    </>
                    : <>
                    <Menu theme= 'dark' mode= 'horizontal'>
                        <Menu.Item style= {{marginRight: 13, fontSize: 17}} onClick= {() => router.push(RoutNames.LOGIN)} key= {1}>Логин</Menu.Item>
                    </Menu>
                    </>
                    }
                </Row>
            </Layout.Header>
        
    )
}

export default Navbar