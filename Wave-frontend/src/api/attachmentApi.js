import api from "../services/axios";

export const uploadAttachment = (file) => {
    const formData = new FormData();
    formData.append("attachment", file);
    return api.post(
        "/attachments/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

};