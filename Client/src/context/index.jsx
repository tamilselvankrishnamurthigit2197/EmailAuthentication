import { callUserAuthApi } from "@/services";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

export const TaskManagerContext = createContext(null);

function TaskManagerProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  
  const taskFormData = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "",
      priority: "",
    },
  });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const verifyUserCookie = async () => {

      /* quite a small delay */
      await new Promise((resolve)=> setTimeout(resolve, 500));
      const data = await callUserAuthApi();

      console.log(data, "verifyUserCookie response");

      if (data?.userInfo) {
        setUser(data?.userInfo);
      }

      return data?.success
        ? navigate(
            location.pathname === "/auth" || location.pathname === "/"
              ? "/tasks/list"
              : `${location.pathname}`
          )
        : navigate("/auth");
    };

    verifyUserCookie(); //fallback
  }, [navigate, location.pathname]);

  return (
    <TaskManagerContext.Provider
      value={{
        taskList,
        setTaskList,
        setLoading,
        loading,
        user,
        setUser,
        taskFormData,
        currentEditedId,
        setCurrentEditedId,
      }}
    >
      {children}
    </TaskManagerContext.Provider>
  );
}

export default TaskManagerProvider