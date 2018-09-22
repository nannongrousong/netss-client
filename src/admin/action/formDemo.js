import { SAVE_CHANGES } from 'ADMIN_ACTIONTYPE/formDemo';

export const saveChanges = (formValues) => (dispatch, getState) => {
    dispatch({
        type: SAVE_CHANGES,
        data: formValues
    });
};