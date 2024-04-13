import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

axios.defaults.baseURL = 'https://66199816125e9bb9f29a5c65.mockapi.io'

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const responce = await axios.get('/contacts')
      return responce.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkAPI) => {
    try {
      const responce = await axios.post('/contacts', newContact)
      return responce.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const responce = await axios.delete(`/contacts/${contactId}`)
      return responce.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)
