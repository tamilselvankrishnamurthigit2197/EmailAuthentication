import axios from "axios";

export const callRegisterUserApi = async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/register`,
      formData,
      { withCredentials: true }
    );
  
    return response?.data;
  };
  
  export const callLoginUserApi = async (formData) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/login`,
      formData,
      { withCredentials: true }
    );
  
    return response?.data;
  };
  
  export const callUserAuthApi = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/auth`,
      {},
      { withCredentials: true }
    );
  
    console.log(response, "response from auth");
  
    return response?.data;
  };
  
  export const callLogoutApi = async (req, res) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/user/logout`,
      {},
      { withCredentials: true }
    );
  
    return response?.data;
  };
  
  export const addNewTaskApi = async (formData) => {
    console.log(formData, "Payload sent to API");
    
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/task/add-new-task`,
      formData
    );
  console.log(response, "add new task from API");
  
    return response?.data;
  };
  
  /* here post used instead of get by changing `URL/${getCurrentUserId}` => "URL", {userId: getCurrentUserId} */
  export const getAllTasksApi = async (getCurrentUserId) => {
    console.log(getCurrentUserId, "get current User Id");
    const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/task/get-all-tasks-by-userid/${getCurrentUserId}`
    );
    console.log(response, "from getAllTaskApi for fetching tasks");
    return response?.data;
};

  
  export const updateTaskApi = async (formData) => {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/api/task/update-task`,
      formData
    );
  
    return response?.data;
  };
  
  export const deleteTaskApi = async (getCurrentTaskId) => {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/task/delete-task/${getCurrentTaskId}`
    );
  
    return response?.data;
  };