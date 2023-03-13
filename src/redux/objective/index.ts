import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import objectiveServices from './services'

interface Edit {
  data: any,
  callback?: () => void,
}

export const fetchObjectives = createAsyncThunk('objective/fetchObjectives', async (_, { rejectWithValue }) => {
	try {
		const response = await objectiveServices.fetchAll()
    return response?.data?.response
	} catch (err) {
		return rejectWithValue({
			error: 'Une erreur est survenue',
		})
	}
})

export const editObjective = createAsyncThunk('objective/editObjective', async (data: Edit, { rejectWithValue }) => {
	try {
		const response = await objectiveServices.edit(data)
    if (data.callback) data.callback()
    return response?.data
	} catch (err) {
    let errorMessage
    if (err?.response?.status === 404) errorMessage = 'Objectif non trouvé'
    else errorMessage = 'Une erreur est survenue'
		return rejectWithValue({
			error: errorMessage
		})
	}
})

const objectiveSlice = createSlice({
	name: 'objective',
	initialState: {
		objectives: null,
	},
	reducers: {},
	extraReducers: builder => {
    builder.addCase(fetchObjectives.fulfilled.toString(), (state, { payload }: any) => {
      state.objectives = payload
    })
	},
})

export default objectiveSlice
