import React, { FC, PropsWithChildren, useState } from "react"
import { Button, DatePicker, Form, Input, Row, Select } from 'antd';
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from './../utils/formatDate';
import { useTypeSelector } from "../hooks/useTypeSelector";

interface EventFormProps {
    guests: IUser[]
    submit:(event: IEvent) => void
}

const EventForm: FC<EventFormProps> = (props: PropsWithChildren<EventFormProps>) => {

    const [event, setEvent] = useState<IEvent>({
        guest: '',
        author: '',
        date: '',
        description: ''
    } as IEvent)

    const {user} = useTypeSelector(state => state.auth)

    const selectDate = (date: Moment | null) => {
        if(date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }

    const submitForm = () => {
        props.submit({...event, author: user.username})
    }

    return(
        <Form onFinish= {submitForm}>
            <Form.Item
                label="Название события"
                name="description"
                rules={[rules.required()]}
            >
            <Input value= {event.description} onChange= {(e) => setEvent({...event, description: e.target.value})}/> 
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[rules.required(), rules.isDateAfter('К сожалению нельзя планировать прошлое')]}
            >
                <DatePicker onChange= {(date)=> {selectDate(date)}}/>
            </Form.Item>
            <Form.Item
                label= "Выберите гостя"
                name= "guest"
                rules= {[rules.required()]}
            >
                <Select onChange= {(guest: string) => setEvent({...event, guest})}>
                    {props.guests.map((guest => <Select.Option key= {guest.username} value= {guest.username}>{guest.username}</Select.Option>))}
                </Select>
            </Form.Item>
            <Row justify= 'end'>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button style= {{marginRight: 40}} type="primary" htmlType="submit">
                    Добавить
                    </Button>
                </Form.Item>
            </Row>
            
        </Form>
    )
}

export default EventForm