import CommonButton from "@/components/common-button";
import AddNewTask from "@/components/tasks/add-new-task";
import TaskItem from "@/components/tasks/task-item";
import { TaskManagerContext } from "@/context";
import { addNewTaskApi, deleteTaskApi, getAllTasksApi, updateTaskApi } from "@/services";
import { useEffect, useState, Fragment, useContext } from "react";

function TasksPage() {

    const [showDialog, setShowDialog] = useState(false);
    const { user, setLoading, taskList, setTaskList, taskFormData, currentEditedId, setCurrentEditedId } = useContext(TaskManagerContext);

    /* fetchingList Of Tasks */
    async function fetchListOfTasks() {
        setLoading(true);
        const response = await getAllTasksApi(user?._id);
        console.log(response, 'tasks from API');
        

        if (response?.success) {
            setTaskList(response?.taskList );
            setLoading(false);
        }
    }

    async function handleSubmit(getData) {
        const payload = {...getData, userId: user?._id};
        console.log("payload being sent to API", payload);
        

        const response = currentEditedId !== null ? 
        await updateTaskApi({...getData, _id: currentEditedId, userId: user?._id}) : await addNewTaskApi(payload);

        if (response) {
            fetchListOfTasks();
            setShowDialog(false);
            taskFormData.reset();
            setCurrentEditedId(null);
        }
        console.log(response);
    }

    async function handleDelete(getTaskId) {
        console.log(getTaskId);
        const response = await deleteTaskApi(getTaskId);
        if (response?.success) {
            fetchListOfTasks();
        }
    };

    useEffect(()=>{
        if (user !== null) fetchListOfTasks();
    }, [user]);

    return(
        <Fragment>
            <div className="mb-5">
                <CommonButton
                    onClick={()=>setShowDialog(true)}
                    buttonText={"Add New Task"}
                />
            </div>

            <div className="mt-5 flex flex-col">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {
                        taskList?.length > 0 ? 
                            (taskList.map((taskItem)=>(
                                <TaskItem
                                    setShowDialog={setShowDialog}
                                    handleDelete={handleDelete}
                                    item={taskItem}
                                    key={taskItem._id}
                                    setCurrentEditedId={setCurrentEditedId}
                                    taskFormData={taskFormData}
                                 />
                            )))
                        : (
                            <h1>No Tasks added! Please Add One..</h1>
                        )
                    }
                </div>
            </div>

            <AddNewTask 
                showDialog={showDialog}
                handleSubmit={handleSubmit}
                setShowDialog={setShowDialog}
                taskFormData={taskFormData}
                currentEditedId={currentEditedId}
                setCurrentEditedId={setCurrentEditedId}
            />
        </Fragment>
    )
}

export default TasksPage