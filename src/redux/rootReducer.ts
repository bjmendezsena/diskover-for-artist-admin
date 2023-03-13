import { combineReducers } from "redux";

import auth from "./auth/reducer";
import admin from "./admin/reducer";
import user from "./user/reducer";
import admins from "./admins/reducer";
import users from "./users/reducer";
import publications from "./publications/reducer";
import challenges from "./challenges/reducer";
import purchases from "./purchases/reducer";
import releases from "./releases/reducer";
import calculatorSlice from "./calculator";
import foodSlice from "./food";
import objectiveSlice from "./objective";
import fileReducer from "./csv/reducer";
import payment_requests from "./payments/reducer";
import royalties from "./royalties/reducer";
import income from "./income/reducer";
import applications from "./applications/reducer";

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  auth,
  payment_requests,
  income,
  file: fileReducer,
  releases,
  admin,
  user,
  admins,
  users,
  publications,
  purchases,
  challenges,
  calculator: calculatorSlice.reducer,
  food: foodSlice.reducer,
  objective: objectiveSlice.reducer,
  royalties,
  applications,
});

export default rootReducer;
