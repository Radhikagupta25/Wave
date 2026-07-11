import api from "../services/axios";

export const getConversations= async()=>{
    const res= await api.get("/conversations");
    return res.data.data
}

