import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import calculatorServices from './services'

interface ListTypes {
  type: any,
  callback?: () => void,
}

interface Update {
  value: any,
  callback?: () => void
}

interface Callback {
  callback?: () => void,
}

export const listTypes = createAsyncThunk('calculator/listTypes', async (_, { rejectWithValue }) => {
  try {
    const response = await calculatorServices.listTypes()
    return response?.data?.list
  } catch (err) {
    return rejectWithValue({
      error: 'Une erreur est survenue',
    })
  }
})

export const listCalnut = createAsyncThunk('calculator/listCalnut', async (_, { rejectWithValue }) => {
  try {
    const response = await calculatorServices.listCalnut()
    return response?.data?.list
  } catch (err) {
    return rejectWithValue({
      error: 'Une erreur est survenue',
    })
  }
})


export const listAgribalyse = createAsyncThunk('calculator/listAgribalyse', async (data: ListTypes, { rejectWithValue }) => {
  try {
    const response = await calculatorServices.listAgribalyse(data.type)
    return response?.data?.list
  } catch (err) {
    return rejectWithValue({
      error: 'Une erreur est survenue',
    })
  }
})

export const listEnergy = createAsyncThunk('calculator/listEnergy', async (data: Callback, { rejectWithValue }) => {
  try {
    const response = await calculatorServices.listEnergy()
    if (data.callback) data.callback()
    return response?.data?.list
  } catch (err) {
    return rejectWithValue({
      error: 'Une erreur est survenue',
    })
  }
})

export const listImpact = createAsyncThunk('calculator/listImpact', async (data: Callback, { rejectWithValue }) => {
  try {
    const response = await calculatorServices.listImpact()
    if (data.callback) data.callback()
    return response?.data?.list
  } catch (err) {
    return rejectWithValue({
      error: 'Une erreur est survenue',
    })
  }
})

export const listAnc = createAsyncThunk('calculator/listAnc', async (data: Callback, { rejectWithValue }) => {
  try {
    const response = await calculatorServices.listAnc()
    if (data.callback) data.callback()
    return response?.data?.list
  } catch (err) {
    return rejectWithValue({
      error: 'Une erreur est survenue',
    })
  }
})

export const listQuestions= createAsyncThunk('calculator/listQuestions', async (_, { rejectWithValue }) => {
  try {
    const response = await calculatorServices.listQuestions()
    return response?.data?.list
  } catch (err) {
    return rejectWithValue({
      error: 'Une erreur est survenue',
    })
  }
})

export const updateQuestions= createAsyncThunk('calculator/updateQuestions', async (data: Update, { rejectWithValue }) => {
  try {
    const response = await calculatorServices.updateQuestions(data.value)
    if (data.callback) data.callback()
    return response?.data?.list
  } catch (err) {
    return rejectWithValue({
      error: 'Une erreur est survenue',
    })
  }
})


const calculatorSlice = createSlice({
  name: 'calculator',
  initialState: {
    listTypes: [],
    loadingListTypes: false,
    listEnergy: null,
    loadingListEnergy: false,
    listTypesError: false,
    listEnergyError: false,
    loadingListImpact: false,
    listImpact: null,
    listImpactError: false,
    listAnc: null,
    loadingListAnc: false,
    listAncError: false,
    listAgribalyse: null,
    loadingListAgribalyse: false,
    listAgribalyseError: false,
    listCalnut: null,
    loadingListCalnut: false,
    listCalnutError: false,
    loadingListQuestions: false,
    listQuestions: null,
    listQuestionsError: false,
    loadingUpdateQuestions: false, 
    updateQuestionsError: false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(listTypes.pending.toString(), (state) => {
      state.loadingListTypes = true
    }).addCase(listTypes.fulfilled.toString(), (state, { payload }: any) => {
      state.loadingListTypes = false
      state.listTypes = payload
      state.listTypesError = false
    }).addCase(listTypes.rejected.toString(), (state, { payload }: any) => {
      state.loadingListTypes = false
      state.listTypesError = true
    }).addCase(listEnergy.pending.toString(), (state) => {
      state.loadingListEnergy = true
    }).addCase(listEnergy.fulfilled.toString(), (state, { payload }: any) => {
      state.loadingListEnergy = false
      state.listEnergy = payload
      state.listEnergyError = false
    }).addCase(listEnergy.rejected.toString(), (state, { payload }: any) => {
      state.loadingListEnergy = false
      state.listEnergyError = true
    }).addCase(listImpact.pending.toString(), (state) => {
      state.loadingListImpact = true
    }).addCase(listImpact.fulfilled.toString(), (state, { payload }: any) => {
      state.loadingListImpact = false
      state.listImpact = payload
      state.listImpactError = false
    }).addCase(listImpact.rejected.toString(), (state, { payload }: any) => {
      state.loadingListImpact = false
      state.listImpactError = true
    }).addCase(listAnc.pending.toString(), (state) => {
      state.loadingListAnc = true
    }).addCase(listAnc.fulfilled.toString(), (state, { payload }: any) => {
      state.loadingListAnc = false
      state.listAnc = payload
      state.listAncError = false
    }).addCase(listAnc.rejected.toString(), (state, { payload }: any) => {
      state.loadingListAnc= false
      state.listAncError = true
    }).addCase(listAgribalyse.pending.toString(), (state) => {
      state.loadingListAgribalyse = true
    }).addCase(listAgribalyse.fulfilled.toString(), (state, { payload }: any) => {
      state.loadingListAgribalyse = false
      state.listAgribalyse = payload
      state.listAgribalyseError = false
    }).addCase(listAgribalyse.rejected.toString(), (state, { payload }: any) => {
      state.loadingListAgribalyse = false
      state.listAgribalyseError = true
    }).addCase(listCalnut.pending.toString(), (state) => {
      state.loadingListCalnut = true
    }).addCase(listCalnut.fulfilled.toString(), (state, { payload }: any) => {
      state.loadingListCalnut = false
      state.listCalnut = payload
      state.listCalnutError = false
    }).addCase(listCalnut.rejected.toString(), (state, { payload }: any) => {
      state.loadingListCalnut = false
      state.listCalnutError = true
    }).addCase(listQuestions.pending.toString(), (state) => {
      state.loadingListQuestions = true
    }).addCase(listQuestions.fulfilled.toString(), (state, { payload }: any) => {
      state.loadingListQuestions = false
      state.listQuestions = payload
      state.listQuestionsError = false
    }).addCase(listQuestions.rejected.toString(), (state, { payload }: any) => {
      state.loadingListQuestions = false
      state.listQuestionsError = true
    }).addCase(updateQuestions.pending.toString(), (state) => {
      state.loadingUpdateQuestions = true
    }).addCase(updateQuestions.fulfilled.toString(), (state, { payload }: any) => {
      state.loadingUpdateQuestions = false
      state.updateQuestionsError = false
    }).addCase(updateQuestions.rejected.toString(), (state, { payload }: any) => {
      state.loadingUpdateQuestions = false
      state.updateQuestionsError = true
    })
  },
})

export default calculatorSlice
