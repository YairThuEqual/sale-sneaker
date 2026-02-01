import type { SigninForm, SignUpForm } from "../form-schema";
import type { RequestResult } from "../model/output/request-result";
import type { SignUpResult } from "../model/output/signup-result";
import { restClient, restClientData } from "../utils";

export async function signin(form: SigninForm): Promise<RequestResult> {
    const response = await restClientData().post('/auth/signin', form)
    return response.data;
}

export async function signup(form: SignUpForm): Promise<SignUpResult> {
    const response = await restClientData().post('/auth/signup', form);
    return response.data;
}