import {createStore} from 'redux';

const initialState = {
    showSnackBar: {
        type: 'SNACKBAR',
        message: '',
        show: false
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SNACKBAR':
            return {
                ...state,
                showSnackBar: {
                    message: action.message,
                    show: action.show,
                }
            };
        default:
            return state;
    }
};

export const store = createStore(reducer);