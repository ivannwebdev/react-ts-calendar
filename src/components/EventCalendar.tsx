import { Calendar } from "antd";
import { Moment } from "moment";
import React, { FC, PropsWithChildren } from "react";
import { IEvent } from "../models/IEvent";
import { formatDate } from './../utils/formatDate';

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = (props: PropsWithChildren<EventCalendarProps>) => {
    
    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate())
        const currentDaysEvents = props.events.filter(ev => ev?.date === formatedDate)
        return (
            <div>
                {
                    currentDaysEvents.map((ev, index) => <div key= {index}>
                        {ev.description}
                    </div>)
                }
            </div>
        )
      }  
    return(
        <Calendar
            dateCellRender= {dateCellRender}
        />
    )
}

export default EventCalendar