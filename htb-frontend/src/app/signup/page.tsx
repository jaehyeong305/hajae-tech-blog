import Icon from '../components/icon/Icon';
import SignUpForm from './components/SignUpForm';
import styles from './page.module.scss'

const SignUp: React.FC = () => {
    return (
        <div className={styles.signUpPageWrapper}>
            <div className={styles.signUpWrapper}>
                <span className={styles.signUpTitle}> 회 원 가 입 </span>
                <SignUpForm />
            </div>
            <div className={styles.signUpInfoWrapper}>
                <Icon iconName='info' iconCustomStyle={{color: '#FFBB00', marginRight: '10px'}}/>
                <p>
                    해당 블로그에서는 방명록 작성을 위한 로그인 기능을 구현했습니다. <br />
                    <strong>자주 사용하는 이메일과 비밀번호가 아닌 기억만 할 수 있는 정보</strong>를 입력해주세요.
                </p>
            </div>
        </div>
    );
}

export default SignUp;