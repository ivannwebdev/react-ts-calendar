import Api from "../../../api/api";
import { IEvent } from "../../../models/IEvent";
import { IUser } from "../../../models/IUser";
import { AppDispatch } from "../../store";
import { EventActionEnum, setEventsAction, setGuestsAction } from "./types";

export const eventCreators =  {
    setGuests: (payload: IUser[]): setGuestsAction => ({type: EventActionEnum.SET_GUESTS, payload}),
    setEvents: (payload: IEvent[]): setEventsAction => ({type: EventActionEnum.SET_EVENTS, payload}),
    fetchGuests: () => async(dispatch: AppDispatch) => {
        try {
            const response = await Api.getUsers()
            dispatch(eventCreators.setGuests(response.data))
            
        } catch (e) {
            alert(e)
        }
    },

    createEvent: (event: IEvent) => async(dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            json.push(event)
            dispatch(eventCreators.setEvents(json))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            alert(e)
        }
    },

    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]'
            const json = JSON.parse(events) as IEvent[]
            const currentUserEvents =  json.filter(ev => ev.author === username || ev.guest === username)
            dispatch(eventCreators.setEvents(currentUserEvents))
        } catch (e) {
           
        }
    }
}