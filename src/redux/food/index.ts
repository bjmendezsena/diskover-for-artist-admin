import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import foodServices from './services'

interface Delete {
  id: string,
  callback?: () => void,
}

interface Edit {
  id: string,
  data: any,
  callback?: () => void,
}

interface Create {
  image?: any,
  name: any,
  category: any,
  value: number,
  age: boolean,
  impacting: boolean,
}

export const fetchFoods = createAsyncThunk('food/fetchFoods', async (_, { rejectWithValue }) => {
	try {
		const response = await foodServices.fetchAll()
    return response?.data?.list
	} catch (err) {
		return rejectWithValue({
			error: 'Une erreur est survenue',
		})
	}
})

export const deleteFood = createAsyncThunk('food/deleteFood', async (data: Delete, { rejectWithValue }) => {
	try {
		//const response = await foodServices.delete(data.id)
    if (data.callback) data.callback()
    //return response?.data
	} catch (err) {
    let errorMessage
    if (err?.response?.status === 401) errorMessage = 'Utilisateur non trouvé'
    else if (err?.response?.status === 404) errorMessage = 'Aliment non trouvé'
    else errorMessage = 'Une erreur est survenue'
		return rejectWithValue({
			error: errorMessage
		})
	}
})

export const editFood = createAsyncThunk('food/editFood', async (data: Edit, { rejectWithValue }) => {
	try {
		//const response = await foodServices.edit(data.id, data.data)
    if (data.callback) data.callback()
    //return response?.data
	} catch (err) {
    let errorMessage
    if (err?.response?.status === 404) errorMessage = 'Aliment non trouvé'
    else errorMessage = 'Une erreur est survenue'
		return rejectWithValue({
			error: errorMessage
		})
	}
})

export const createFood = createAsyncThunk('food/createFood', async (data: Create, { rejectWithValue }) => {
	try {
		//const response = await foodServices.create(data.image, data.name, data.category, data.value, data.age, data.impacting)
    //return response?.data
	} catch (err) {
    let errorMessage
    if (err?.response?.status === 404) errorMessage = 'Aliment non trouvé'
    else errorMessage = 'Une erreur est survenue'
		return rejectWithValue({
			error: errorMessage
		})
	}
})

const foodSlice = createSlice({
	name: 'food',
	initialState: {
		fetchFoodsLoading: false,
		foods: null,
		fetchFoodsError: null,
    creating: false,
    creatingError: null,
    created: false,
	},
	reducers: {},
	extraReducers: builder => {
    builder.addCase(fetchFoods.pending.toString(), (state) => {
      state.fetchFoodsLoading = true
			state.fetchFoodsError = null
    })
    .addCase(fetchFoods.fulfilled.toString(), (state, { payload }: any) => {
      state.foods = payload
			state.fetchFoodsLoading = false
			state.fetchFoodsError = null
    })
    .addCase(fetchFoods.rejected.toString(), (state, { payload }: any) => {
      state.foods = payload.error
			state.fetchFoodsLoading = false
			state.fetchFoodsError = null
    })
    .addCase(createFood.pending.toString(), (state) => {
      state.creating = true
      state.created = false
      state.creatingError = null
    })
    .addCase(createFood.fulfilled.toString(), (state) => {
      state.creating = false
      state.created = true
      state.creatingError = null
    })
    .addCase(createFood.rejected.toString(), (state, { payload }: any) => {
      state.creating = false
      state.created = false
      state.creatingError = payload.error
    })
	},
})

export default foodSlice
