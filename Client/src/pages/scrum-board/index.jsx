import CommonCard from "@/components/common-card";
import { ScrumBoardOptions } from "@/config";
import { TaskManagerContext } from "@/context"
import { getAllTasksApi, updateTaskApi } from "@/services";
import { Fragment, useContext, useEffect } from "react"

function ScrumBoardPage(){
    const {user, taskList, setTaskList} = useContext(TaskManagerContext)

    /* fetchList of Tasks */
    async function fetchListOfTasks(){
        const response = await getAllTasksApi(user?._id);

        if (response?.success) {
            setTaskList(response?.taskList);
        }
    }

    /* onDragStart */
    function onDragStart(event, getTaskId){

        event.dataTransfer.setData("id", getTaskId);
        console.log(event.dataTransfer);
    }

    /* update the task by status */
    async function updateTaskByStatus(getTask) {
        await updateTaskApi(getTask);
        await fetchListOfTasks();
    }

    /* onDrop function with current task */
    function onDrop(event, getCurrentStatus) {
        const getDraggedId = event.dataTransfer.getData("id");

        /* current task */
        let findCurrentTask = taskList.find(
            (item)=> item._id.toString() === getDraggedId
        );

        /* destructuring current task with rest tasks*/
        findCurrentTask = {...findCurrentTask, status: getCurrentStatus};
        updateTaskByStatus(findCurrentTask);
    }

    /* render the task by task status */
    function renderTaskByTaskStatus() {
        const taskStatuses = {
            todo: [],
            inProgress: [],
            blocked: [],
            review: [],
            done: [],
        };


        /* map the tasks list */
        taskList?.forEach((taskItem)=>{
            taskStatuses[taskItem.status].push(
                <div
                    onDragStart={taskItem.status !== "done" ? (event)=>onDragStart(event, taskItem._id) : null}
                    className="mb-2"
                    draggable={taskItem?.status !== "done" ? true : false}>
                        <CommonCard
                            extraTextStyles={taskItem?.status === "done" ? "line-through" : ""}
                            title={taskItem?.title}
                            description={ScrumBoardOptions.find(
                                (boardOption)=> boardOption.id === taskItem?.status
                            ).label}
                        />
                    </div>
            )
        });
        console.log(taskStatuses);

        return taskStatuses;
    }


    useEffect(()=>{
        if (user !== null) {
            fetchListOfTasks();
        }
    }, [user]);

    return(
        <Fragment>
            <div className="grid grid-cols-5 gap-2 h-full">
                {/* scrumboardOptions : id , label */}
                {ScrumBoardOptions.map((item)=>(
                    <div
                        className="border border-[#333333] rounded overflow-auto"
                        key={item.id}
                        onDrop={(event)=> onDrop(event, item.id)}
                        onDragOver={(event)=>event.preventDefault()}>
                            <div className="px-1 py-3 text-center bg-black border-none mb-3">
                                <h3 className="text-2xl font-extrabold text-white">
                                    {item.label}
                                </h3>
                            </div>

                            <div className="p-3">
                                {renderTaskByTaskStatus()[item.id]}
                            </div>
                        </div>
                ))}
            </div>
        </Fragment>
    )
}
export default ScrumBoardPage