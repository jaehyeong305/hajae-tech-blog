'use client'

import React from "react";
import styles from './SignUpForm.module.scss';
import { InputWrapper } from "@/app/components/customInput/CustomInput";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

type FormValues = {
    name: string;
    email: string;
    password: string;
}

const schema = yup.object().shape({
    name: yup.string().required("이름을 입력해주세요"),
    email: yup.string().email("메일 형식이 올바르지 않습니다").required("이메일을 입력해주세요"),
    password: yup.string().required("비밀번호를 입력해주세요").min(8, '비밀번호는 8~14 자리수로 입력해주세요').max(14, '비밀번호는 8~14 자리수로 입력해주세요'),
});

const SignUpForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        console.log(data);
    }
    
    const handleBlurValidation = async (fieldName: keyof FormValues) => {
        await trigger(fieldName);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.signUpForm}>
            <InputWrapper id="name" type="text">
                <InputWrapper.Input placeholder="Jaehyeong Ha" {...register("name", { onBlur: () => handleBlurValidation('name')})}  />
            </InputWrapper>
            {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}

            <InputWrapper id="email" type="email">
                <InputWrapper.Input placeholder="example@example.com" {...register("email", { onBlur: () => handleBlurValidation('email')})} />
            </InputWrapper>
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}

            <InputWrapper id="password" type="password">
                <InputWrapper.Input placeholder="Password" {...register("password", { onBlur: () => handleBlurValidation('password')})} />
            </InputWrapper>
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}

            <button type="submit" className={styles.primaryButton}>Sign Up</button>
            <button type="submit" className={styles.closeButton}>Back</button>
        </form>
    )
}

export default SignUpForm;