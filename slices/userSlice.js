import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    books: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        ADD_TO_COLLECTION: (state, action) => {
            //check if item is in array, return -1 if item isn't in array
            const index = state.books.findIndex(el => el.bookTitle === action.payload.item.bookTitle)

            if(index >= 0){
                console.log("non aggiunto: libro già presente")
            }else{
                state.books = [...state.books, action.payload.item]
            }
        },
        REMOVE_FROM_COLLECTION(state,action){
            // clone Array
            let cloneCollections = [...state.books]
            //check if item is in array, return -1 if item isn't in array
            const index = state.books.findIndex(el => el.bookTitle === action.payload.bookTitle)

            if(index >= 0){
                //item in array, remove the item
                cloneCollections.splice(index,1);
            }else{
                console.warn("item non presente")
            }
            state.books = cloneCollections
        }
    }
});

export const {
    ADD_TO_COLLECTION,
    REMOVE_FROM_COLLECTION,
} = userSlice.actions

//selector
export const selectCollection = state => state.user.books;

export default userSlice.reducer