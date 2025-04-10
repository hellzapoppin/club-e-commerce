import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Category from '../../../types/category.types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase.config'
import { categoryConverter } from '../../../converters/firestore.converters'

export const fetchCategories = createAsyncThunk(
  'categorues/fetch',
  async () => {
    const categoriesFromFirebase: Category[] = []

    const querySnapshot = await getDocs(
      collection(db, 'categories').withConverter(categoryConverter)
    )

    querySnapshot.forEach((doc) => {
      categoriesFromFirebase.push(doc.data())
    })

    return categoriesFromFirebase
  }
)

interface InitialState {
  categories: Category[]
  isLoading: boolean
}

const initialState: InitialState = {
  categories: [],
  isLoading: false
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // carregando
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true
    })
    // sucesso
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.isLoading = false
    })
    // erro
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false
    })
  }
})

export default categorySlice.reducer
