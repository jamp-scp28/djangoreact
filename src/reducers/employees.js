import _ from 'lodash';
import {
    GET_EMPLOYEES
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_EMPLOYEES:
            return {
                ...state,
                ..._.mapKeys(action.payload, 'id')
            };
        default:
            return state;
    }
};
