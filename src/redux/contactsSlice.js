import { createSlice, createSelector } from '@reduxjs/toolkit'
import {
  fetchContacts,
  addContact,
  deleteContact,
} from './contactsOps'
import { selectNameFilter } from './filtersSlice'

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.error = false
        state.loading = true
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.error = true
        state.loading = false
      })
      .addCase(addContact.pending, (state) => {
        state.error = false
        state.loading = true
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload)
        state.loading = false
      })
      .addCase(addContact.rejected, (state) => {
        state.error = true
        state.loading = false
      })
      .addCase(deleteContact.pending, (state) => {
        state.error = false
        state.loading = true
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id,
        )
        state.loading = false
      })
      .addCase(deleteContact.rejected, (state) => {
        state.error = true
        state.loading = false
      }),
})

export default contactsSlice.reducer

export const selectItems = (state) => state.contacts.items
export const selectLoading = (state) => state.contacts.loading
export const selectError = (state) => state.contacts.error

export const selectFilteredContacts = createSelector(
  [selectItems, selectNameFilter],
  (contacts, filter) => {
    if (!filter) return contacts
    return contacts.filter((contact) =>
      contact.name
        .toLowerCase()
        .includes(filter.toLowerCase().trim()),
    )
  },
)
