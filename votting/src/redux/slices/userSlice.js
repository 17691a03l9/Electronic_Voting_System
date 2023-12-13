import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// import { COMMON_ADMIN_APIS } from "../../../../config/api-config";
// import { apiCall } from "@config/http-config";


const initialState = {
  data: [],
  loading: false,
  status: "",
  error: "",
  showSuccessPopup: false,
  popupMessage: "",
  usersList: []
};

const userSlice = createSlice({
  name: "compendium",
  initialState,
  reducers: {
    setShowSuccessPopup: (state, action) => {
      state.showSuccessPopup = action.payload;
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload;
    },
    setCompendiumEditData: (state, action) => {
      state.compendiumData = action.payload;
    },
    setCompendiumListDelete: (state, action) => {
      state.compendiumListDelete = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userRegistration.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userRegistration.fulfilled, (state, action) => {
      state.usersList = action.payload;
      state.loading = false;
    });
    builder.addCase(userRegistration.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // builder.addCase(getRelationList.pending, (state, action) => {
    //   state.loading = true;
    // });
    // builder.addCase(getRelationList.fulfilled, (state, action) => {
    //   state.relationList = action.payload;
    //   state.loading = false;
    // });
    // builder.addCase(getRelationList.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message;
    // });
  }
});
export const { setShowSuccessPopup, setPopupMessage, setCompendiumEditData } = userSlice.actions;
export default userSlice.reducer;

// export const getPayerCompendiumsList = createAsyncThunk(
//   "getPayerCompendiums/get",
//   async ({
//     pagination,
//     status,
//     sortKey,
//     sortOrder,
//     searchValue,
//     searchKeys,

//     sortBy
//   }) => {
//     return apiCall({
//       url: COMPENDIUM.getPayerCompendiums(),
//       method: "POST",
//       xTenantId: getXtenantId(),
//       data: {
//         pageNo: pagination.pageIndex || 0,
//         pageSize: pagination.pageSize || 10,
//         sortKey: sortKey || "lastModifiedDate",
//         sortOrder: sortOrder || "DESC",
//         searchValue: searchValue || ""
//         // searchKeys: searchKeys || "",
//         // sortBy: sortBy || "",
//       }
//     }).then((response) => response?.data);
//   }
// );


export const userRegistration = createAsyncThunk("userRegistration/post", async (data) => {
  return axios.post(`http://localhost:8060/api/users`, {
 data
  }).then((res) => res.data);
});

// export const getRelationList = createAsyncThunk("relationlist/get", async (id) => {
//   return apiCall({
//     url: COMMON_ADMIN_APIS.getRelastionList(id),
//     method: "GET",
//   }).then((response) => response?.data);
// });
