import { SAVE_FORM_CHANGES } from 'NETSS_ACTIONTYPE/formDemo';

export const saveFormChanges = (formValues) => (dispatch, getState) => {
    dispatch({
        type: SAVE_FORM_CHANGES,
        data: formValues
    });
};