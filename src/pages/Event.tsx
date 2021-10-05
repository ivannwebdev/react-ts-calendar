import { Button, Layout, Modal, Row } from "antd";
import React, { FC, useEffect, useState } from "react"
import EventCalendar from '../components/EventCalendar';
import EventForm from "../components/EventForm";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { IEvent } from "../models/IEvent";
import { useActions } from './../hooks/useActions';

const Event: FC = () => {

    const [modalVisible, setModalVisible] = useState(false)
    const {fetchGuests, createEvent, fetchEvents} = useActions()
    const {guests, events} = useTypeSelector(state => state.event)
    const {user} = useTypeSelector(state => state.auth)

    useEffect(() => {
        fetchGuests()
        fetchEvents(user.username)
    }, [])

    const addNewEvent = (event: IEvent) => {
        setModalVisible(false)
        createEvent(event)
        

    }

    return(
        <Layout>
            <EventCalendar events= {events}/>
            <Row justify= 'center'>
                <Button style= {{fontSize: 16, backgroundColor: 'darkcyan', color: 'white', width: 135, height: 43, borderRadius: 5}} onClick= {() => setModalVisible(true)}>
                    Добавить 
                </Button>
            </Row>
            <Modal
                title= 'Добавить событие'
                visible= {modalVisible}
                footer= {null}
                onCancel= {() => setModalVisible(false)}
            >
                <EventForm guests= {guests} submit= {addNewEvent}/>

            </Modal>
        </Layout>
    )
}

export default Event