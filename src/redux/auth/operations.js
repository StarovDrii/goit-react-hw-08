import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

axios.defaults.baseURL = 'https://connections-api.herokuapp.com'

const setAuthToken = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const clearAuthToken = () => {
  axios.defaults.headers.common['Authorization'] = ''
}

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    console.log(credentials)
    try {
      const responce = await axios.post('/users/signup', credentials)
      setAuthToken(responce.data.token)
      return responce.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const responce = await axios.post('/users/login', credentials)
      setAuthToken(responce.data.token)
      return responce.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const responce = await axios.post('/users/logout')
      clearAuthToken()
      return responce.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const {
        auth: { token },
      } = thunkAPI.getState()
      setAuthToken(token)
      const responce = await axios.get('/users/current')
      return responce.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
  {
    condition: (_, api) => {
      const {
        auth: { token },
      } = api.getState()
      return token ? true : false
    },
  },
)
