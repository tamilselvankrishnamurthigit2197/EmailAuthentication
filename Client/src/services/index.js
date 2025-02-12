import axios from 'axios'

/* save token in session storage after login/register */
const saveToken = (token) =>{
  sessionStorage.setItem("token", token);
};

/* get||fetch token from session storage */
const getToken = () =>{
  return sessionStorage.getItem("token");
};

/* clear the token from session storage once we click logout */
const clearToken = () =>{
  sessionStorage.removeItem("token");
};

/* register api */
export const callRegisterUserApi = async (formData) =>{
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/user/register`,
    formData,
    {withCredentials: true},
  );

  if (response?.data?.token) {
    saveToken(response.data.token); //save token in session storage
  }

  return response?.data;
}

/* login api */
export const callLoginUserApi = async (formData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/user/login`,
    formData,
    {withCredentials: true},
  );

  if (response?.data?.token) {
    saveToken(response.data.token); // save the token in s.storage
  }

  return response?.data;
}

/* User Auth api */
export const callUserAuthApi = async () => {
  const token = getToken(); //retrive token from session storage

  if (!token) {
    throw new Error("No Token is found, User not authenticated !");
  }
  
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/user/auth`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`, //attach token to request header
        "Cache-control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
  console.log(response, "response from auth");
  return response?.data;
}

/* logout api */
export const callLogoutApi = async (req, res) => {
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/user/logout`,
    {},
    {withCredentials: true},
  );

  clearToken(); // clear the token cookies from session storage
  return response?.data;
}

/* add new task */
export const addNewTaskApi = async (formData) => {
  const token = getToken(); //retrive token from session storage
  if(!token){
    throw new Error("No Token found, User not authenticated");
  }

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/task/add-new-task`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`, //attach token to request header
      },
    }
  );

  console.log(response, "add new task from API end");
  return response?.data;
};

/* fetching : GET task */
export const getAllTasksApi = async (getCurrentUserId) => {
  console.log(getCurrentUserId, "get current user Id");

  const token = getToken(); //retrive token from session storage
  if (!token) {
    throw new Error("No token found, User is not authenticated");
  }

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/task/get-all-tasks-by-userId/${getCurrentUserId}`,
    {
      headers:{
        Authorization: `Bearer ${token}`, //attach token to req header
      },
    }
  );
  
  console.log(response, "getAllTasksApi for fetching tasks");
  return response?.data;
}

/* update- PUT task */
export const updateTaskApi = async (formData) => {
  const token = getToken(); //retrive token from session storage
  if (!token) {
    throw new Error("No token found, User is not authenticated");
  }

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/api/task/update-task`,
    formData,
    {
      headers:{
        Authorization: `Bearer ${token}`, //attach token to req header
      },
    }
  );
  
  return response?.data;
}

/* delete task */
export const deleteTaskApi = async (getCurrentTaskId) => {
  const token = getToken(); //retrive token from session storage
  if (!token) {
    throw new Error("No token found, User is not authenticated");
  }

  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/task/delete-task/${getCurrentTaskId}`,
    {
      headers:{
        Authorization: `Bearer ${token}`, //attach token to req header
      },
    }
  );

  return response?.data;
}