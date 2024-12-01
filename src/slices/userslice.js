import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../ApiInstance/apiInstance";
import {faker}  from "@faker-js/faker"

// get user from the database
export const getUser=createAsyncThunk(
    "user/getUser",async()=>{
        try{
            const res=await api.get("/user")
           if(res.status===200){
            return res.data
           }

        }catch(error){
            return error.message
        }
    }
)


// create user using post 
export const createUser=createAsyncThunk(
    "user/createUser",async() => {
        console.log("nter in the faker")
        
         try{
            const res=await api.post("user/",{
                name:faker.name.fullName()
             })
             return res.data
         }catch(error){
            console.log(error)
         }
         
    }
)


// delete user
export const deleteUser=createAsyncThunk(
    "user/deleteUser",async(id)=>{
        try{
            const res=await api.delete(`/user/${id}`)
            if(res.status===200){
                return id
            }
           
        }catch(error){
            return error
        }
    }
)
// slice of the user
const userSlice=createSlice({
    name:"user",
    initialState:({
        userData:[],
        isLoading:true,
        error:null
    }),

    // get user
    extraReducers(builder){
        builder
        .addCase(getUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getUser.fulfilled,(state,action)=>{
            state.userData=action.payload
            state.isLoading=false
        })
        .addCase(getUser.rejected,(state)=>{
            state.isLoading=false
            state.userData=[]
        })

        .addCase(createUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createUser.fulfilled,(state,action)=>{
            console.log(action.payload,"create user in extra reduser")
            state.userData.push(action.payload)
            state.isLoading=false
        })
        .addCase(createUser.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
            console.log(action.payload,"error in create user")
        })
        .addCase(deleteUser.pending,(state,action)=>{
            state.isLoading=true
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.isLoading=false
           state.userData=state.userData.filter((user)=>user.id!==action.payload)
        })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.payload
        })

    }

    
    
})
export const  userReducer=userSlice.reducer