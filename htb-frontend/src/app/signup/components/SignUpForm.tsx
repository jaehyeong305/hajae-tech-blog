'use client'

import React from "react";
import styles from './SignUpForm.module.scss';
import { InputWrapper } from "@/app/components/customInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getBaseUrl } from "@/app/lib/auth";

const signUp = async (username: string, email: string, password: string) => {
    const response = await fetch(`${getBaseUrl()}/api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        try {
            const responseText = await response.text();
            console.log(responseText);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    } else {
        console.error('User registration failed');
    }
};

export type SignUpFormValues = {
    username: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup.string().required("이름을 입력해주세요"),
    email: yup.string().email("메일 형식이 올바르지 않습니다").required("이메일을 입력해주세요"),
    password: yup.string().required("비밀번호를 입력해주세요").min(8, '비밀번호는 8~14 자리수로 입력해주세요').max(14, '비밀번호는 8~14 자리수로 입력해주세요'),
});

const SignUpForm: React.FC = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schema),
    });

    const handleBlurValidation = async (fieldName: keyof SignUpFormValues) => {
        await trigger(fieldName);
    }

    const onSignUp: SubmitHandler<SignUpFormValues> = async (data: SignUpFormValues) => {
        await signUp(data.username, data.email, data.password).then(() => router.push('/'));
    };

    return (
        <form onSubmit={handleSubmit(onSignUp)} className={styles.signUpForm}>
            <InputWrapper id="username" type="text">
                <InputWrapper.Input {...register("username", { onBlur: () => handleBlurValidation('username') })} />
            </InputWrapper>
            {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}

            <InputWrapper id="email" type="email">
                <InputWrapper.Input {...register("email", { onBlur: () => handleBlurValidation('email') })} />
            </InputWrapper>
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}

            <InputWrapper id="password" type="password">
                <InputWrapper.Input {...register("password", { onBlur: () => handleBlurValidation('password') })} />
            </InputWrapper>
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}

            <button type="submit" className={styles.primaryButton}>Sign Up</button>
            <Link href='/'>
                <button type="button" className={styles.closeButton}>Back</button>
            </Link>
        </form>
    )
}

export default SignUpForm;