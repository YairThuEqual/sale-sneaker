import { DoorOpen, LogIn, UserPlus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { signInSchema, type SigninForm } from "~/lib/form-schema";
import {zodResolver} from "@hookform/resolvers/zod"
import AppFormInput from "~/components/custom/app-form-input";
import { Button } from "~/components/ui/button";
import { Link, useNavigate } from "react-router";
import AppPageTitle from "~/components/custom/app-page-title";
import { signin } from "~/lib/client/auth-client";

export default function SignIn () {

    const navigation = useNavigate();

    const form = useForm<SigninForm>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const signinAction = async (form: SigninForm) => {
        try {
            const result = await signin(form);

            localStorage.setItem("accessToken", result.accessToken);
            localStorage.setItem("refreshToken", result.refreshToken);

            if(result.role.toLowerCase() == "admin"){
                navigation('/management')
            } else {
                navigation('/member');
            }
 
        } catch (error) {
            console.error("Signin failed", error);
            alert("Invalid email or password");
        }
    }

    return (
        <div className="w-full">
            <header className="mb-3">
                <AppPageTitle icon={<DoorOpen/>} title="sign in" />
                <p>Welcome Sign in</p>
            </header>
            <div>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(signinAction)}>
                        <AppFormInput control={form.control} path="email" label="Email" placeholder="example243@gmail.com" className="mb-3"/>
                        <AppFormInput control={form.control} path="password" label="Password" placeholder="Enter password" className="mb-3"/>

                        <div className="mt-5">
                            <Button asChild className="cursor-pointer" variant={"outline"}>
                                <Link to={'/signup'}>
                                    <UserPlus/> Sign Up
                                </Link>
                            </Button>
                            <Button type="submit" className="ml-2 cursor-pointer">
                                <LogIn/> Sign In
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}