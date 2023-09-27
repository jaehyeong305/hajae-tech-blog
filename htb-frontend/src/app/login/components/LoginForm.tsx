'use client'

import React from "react";
import styles from './LoginForm.module.scss';
import { InputWrapper } from "@/app/components/customInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/navigation";

const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        try {
            const data = await response.json(); // JSON 데이터 파싱
            console.log("response data: ", data);
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    } else {
        console.error('User login failed');
    }
};

type LoginFormValues = {
    username: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup.string().required("이름을 입력해주세요"),
    password: yup.string().required("비밀번호를 입력해주세요").min(8, '비밀번호는 8~14 자리수로 입력해주세요').max(14, '비밀번호는 8~14 자리수로 입력해주세요'),
});

const LoginForm: React.FC = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schema),
    });

    const handleBlurValidation = async (fieldName: keyof LoginFormValues) => {
        await trigger(fieldName);
    }

    const onLogin: SubmitHandler<LoginFormValues> = async (data: LoginFormValues) => {
        await login(data.username, data.password).then((res) => router.push('/'));
    };

    return (
        <form onSubmit={handleSubmit(onLogin)} className={styles.loginForm} action="/api/auth/login">
            <InputWrapper id="username" type="text">
                <InputWrapper.Input placeholder="Jaehyeong Ha" {...register("username", { onBlur: () => handleBlurValidation('username') })} />
            </InputWrapper>
            {errors.username && <p className={styles.errorMessage}>{errors.username.message}</p>}

            <InputWrapper id="password" type="password">
                <InputWrapper.Input placeholder="Password" {...register("password", { onBlur: () => handleBlurValidation('password') })} />
            </InputWrapper>
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}

            <button type="submit" className={styles.primaryButton}>Login</button>
            <button type="button" className={styles.closeButton}>Back</button>
        </form>
    )
}

export default LoginForm;