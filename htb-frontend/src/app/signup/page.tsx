'use client'

import { SubmitHandler } from 'react-hook-form';
import Icon from '../components/icon/Icon';
import SignUpForm, { SignUpFormValues } from './components/SignUpForm';
import styles from './page.module.scss'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const signUp = async (name: string, email: string, password: string) => {
    const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
        console.log(response.json());
    } else {
        console.error('User registration failed');
    }
};

const SignUp: React.FC = () => {
    const route = useRouter();
    const [signUpData, setSignUpData] = useState<SignUpFormValues | null>(null);

    const handleSignUp: SubmitHandler<SignUpFormValues> = async (data: SignUpFormValues) => {
      await signUp(data.name, data.email, data.password).then(() => route.push('/'));
      setSignUpData(data);
    };

    return (
        <div className={styles.signUpPageWrapper}>
            <div className={styles.signUpWrapper}>
                <span className={styles.signUpTitle}> 회 원 가 입 </span>
                <SignUpForm onSignUp={handleSignUp}/>
            </div>
            <div className={styles.signUpInfoWrapper}>
                <Icon iconName='info' iconCustomStyle={{ color: '#FFBB00', marginRight: '10px' }} />
                <p>
                    해당 블로그에서는 방명록 작성을 위한 로그인 기능을 구현했습니다. <br />
                    <strong>자주 사용하는 이메일과 비밀번호가 아닌 기억만 할 수 있는 정보</strong>를 입력해주세요.
                </p>
            </div>
        </div>
    );
}

export default SignUp;