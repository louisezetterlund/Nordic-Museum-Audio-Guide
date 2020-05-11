import { UPDATE_EVENTS } from "../actions/device";

//Calendar functionality
//Added by KTH project 2020

const initialState = {
  events: {}
};

export function calendarEvents(state = initialState, action) {
  switch (action.type) {
    default: {
      return state;
    }

    case UPDATE_EVENTS: {
      return Object.assign({}, state, {
        events: Object.assign({}, state.events, action.newEvents)
      });
    }
  }
}
