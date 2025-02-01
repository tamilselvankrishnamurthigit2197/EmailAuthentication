import CommonForm from "../common-form"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog"

function CommonDialog({showDialog, onOpenChange, title, formControls, formData, handleSubmit, btnText, description}){
    return(
        <Dialog
            open={showDialog}
            onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                {
                    description && 
                        <DialogDescription>
                        {description}
                        </DialogDescription>
                }
                <div>
                    <CommonForm 
                       formControls={formControls}
                       form={formData}
                       handleSubmit={handleSubmit}
                       btnText={btnText} />
                </div>
            </DialogContent>
        </Dialog>
    )
}
export default CommonDialog