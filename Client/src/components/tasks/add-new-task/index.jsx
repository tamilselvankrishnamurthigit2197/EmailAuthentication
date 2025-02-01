
import CommonDialog from '@/components/common-dialog';
import {addNewTaskFormControls} from '@/config'

function AddNewTask({
                    showDialog,
                    handleSubmit,
                    setShowDialog,
                    taskFormData,
                    currentEditedId,
                    setCurrentEditedId,
}) {
    return(
        <CommonDialog
            formControls={addNewTaskFormControls}
            showDialog={showDialog}
            onOpenChange={()=>{
                setShowDialog(false);
                currentEditedId ? taskFormData.reset() : null;
                setCurrentEditedId(null);
            }}
            title={currentEditedId ? "Edit Task" : "Post New Task"}
            btnText={"Add"}
            handleSubmit={handleSubmit}
            formData={taskFormData}
            description="Fill out the form below, here add new Task"
             />
    )
}
export default AddNewTask;