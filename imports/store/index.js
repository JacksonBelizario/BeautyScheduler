import { createStore } from 'redux';

const initialState = {
    showSnackBar: {
        type: 'SNACKBAR',
        message: '',
        variant: 'success',
        show: false,
    },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SNACKBAR':
            return {
                ...state,
                showSnackBar: {
                    message: action.message,
                    variant: action.variant || 'success',
                    show: action.show,
                },
            };
        default:
            return state;
    }
};

export const store = createStore(reducer);
