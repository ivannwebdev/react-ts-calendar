import { authCreators } from "../reducers/auth/auth-creators";
import { eventCreators } from "../reducers/event/event-creators";

export const allActionCreators = {
    ...authCreators,
    ...eventCreators
}