// import merge from 'lodash/merge';
import { AnyAction, CombinedState, combineReducers } from 'redux';
// import storage from 'redux-persist/lib/storage';

// import connectionReducer from '../domains/connections/slice';
// import dataTransfers from '../domains/data-transfers/slice';
// import databaseModelReducer from '../domains/database-models/slice';
// import datamodelsReduc er from '../domains/datamodels/slice';
// import documentationReducer from '../domains/documentation/slice';
// import favoritesReducer from '../domains/favorites/slice';
// import foldersReducer from '../domains/folders/slice';
// import formulasReducer from '../domains/formulas/slice';
// import ganttReducer from '../domains/gantts/slice';
// import groupsReducer from '../domains/groups/slice';
// import history from '../domains/history/slice';
// import importReducer from '../domains/import/slice';
// import itemsReducer from '../domains/items/slice';
// import kpisReducer from '../domains/kpis/slice';
// import loginReducer from '../domains/login/slice';
// import modalsReducer from '../domains/modals/slice';
// import permissionsReducer from '../domains/permissions/slice';
// import scripts from '../domains/scripts/slice';
// import snapShotsReducer from '../domains/snapshot/slice';
// import systemReducer from '../domains/system/slice';
// import usersReducer from '../domains/users/slice';
// import workbenchReducer from '../domains/workbench/slice';
// import workflowsReducer from '../domains/workflows/slice';

const appReducer = combineReducers({
    
    // ...
});

const rootReducer = (
    state: CombinedState<any>,
    action: AnyAction
): CombinedState<any> => {
    if (action.type === 'LOGOUT') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export default rootReducer;
