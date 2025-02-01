import CommonForm from "@/components/common-form";
import { SignUpFormControls } from "@/config";

import { useToast } from "@/hooks/use-toast";
import { callRegisterUserApi } from "@/services";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const formData = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  async function handleSubmit(getData) {
    console.log(getData, "signUp data: name, email, password")
    const data = await callRegisterUserApi(getData);

    console.log(data, "data");

    if (data?.success) {
      toast({
        title: "User register successful",
        description: "Welcome",
      });
      navigate("/tasks/list");
    } else {
      toast({
        title: "Error",
        description: "Some error occured",
      });
    }
  }

  return (
    <div>
      <CommonForm 
        form={formData}
        formControls={SignUpFormControls}
        handleSubmit={handleSubmit}
        btnText={"Sign Up"}
      />
    </div>
  );
}

export default SignUp;