export const SignUpFormControls = [
    {
        id: "name",
        label: "Name",
        placeholder: "Enter Your Name",
        componentType: "input",
        type: "text"
    },
    {
        id: "email",
        label: "Email",
        placeholder: "Enter Your Email",
        componentType: "input",
        type: "email"
    },
    {
        id: "password",
        label: "Password",
        placeholder: "Enter Your Password",
        componentType: "input",
        type: "password"
    },
];

export const SignInFormControls = [
    {
        id: "email",
        label: "Email",
        placeholder: "Enter Your Email",
        componentType: "input",
        type: "email"
    },
    {
        id: "password",
        label: "Password",
        placeholder: "Enter Your Password",
        componentType: "input",
        type: "password"
    },
];

export const ScrumBoardOptions = [
    {
        id: "todo",
        label: "To Do",
    },
    {
        id: "inProgress",
        label: "In Progress",
    },
    {
        id: "blocked",
        label: "Blocked",
    },
    {
        id: "review",
        label: "Review",
    },
    {
        id: "done",
        label: "Done",
    }
];

/* Task form control */

export const addNewTaskFormControls = [
    {
        id: "title",
        type: "text",
        placeholder: "Enter Title",
        label: "Title",
        componentType: "input",
    },
    {
        id: "description",
        type: "text",
        placeholder: "Enter Description",
        label: "Description",
        componentType: "input",
    },
    {
        id: "status",
        placeholder: "Enter Status",
        label: "Status",
        componentType: "select",
        options: ScrumBoardOptions,
    },
    {
        id: "priority",
        placeholder: "Enter Priority",
        label: "Priority",
        componentType: "input",
        componentType: "select",
        options:[
            {
                id: "low",
                label: "Low",
            },
            {
                id: "medium",
                label: "Medium",
            },
            {
                id: "high",
                label: "High",
            },
        ],
    },
];