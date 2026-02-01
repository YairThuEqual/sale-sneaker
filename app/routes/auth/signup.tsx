import { DoorOpen, Handshake, UserPlus } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { signupSchema, type SignUpForm } from "~/lib/form-schema";
import {zodResolver} from "@hookform/resolvers/zod"
import AppFormInput from "~/components/custom/app-form-input";
import { Button } from "~/components/ui/button";
import { Link, useNavigate } from "react-router";
import AppPageTitle from "~/components/custom/app-page-title";
import { signup } from "~/lib/client/auth-client";

export default function SignUp () {

    const navigation = useNavigate();

    const form = useForm<SignUpForm>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const signupAction = async (form: SignUpForm) => {
        try{
            const result = await signup(form)
            console.log(result)
            if(result.check){
                navigation('/signin')
            } else {
                alert(result.message)
            }
        } catch (error) {
            console.log(error)
            alert("An error occurred during signup.");
        }
    }

    return (
        <div className="w-full">
            <header className="mb-3">
                <AppPageTitle icon={<UserPlus/>} title="sign up" />
                <p>Welcome Sign up</p>
            </header>
            <div>
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(signupAction)}>
                        <AppFormInput control={form.control} path="name" label="Name" placeholder="Enter your name" className="mb-3"/>
                        <AppFormInput control={form.control} path="email" label="Email" type="email" placeholder="example243@gmail.com" className="mb-3"/>
                        <AppFormInput control={form.control} path="password" label="Password" type="password" placeholder="Enter password" className="mb-3"/>

                        <div className="mt-5">
                            <Button asChild variant="outline">
                                <Link to={'/signin'}>
                                    <DoorOpen/> Sign in
                                </Link>
                            </Button>
                            <Button type="submit" className="ml-2">
                                <Handshake/> Sign up
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    )
}