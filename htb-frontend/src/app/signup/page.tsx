import SignUpForm from './components/SignUpForm';
import styles from './page.module.scss'

const SignUp: React.FC = () => {
    return (
        <div className={styles.signUpPageWrapper}>
            <div className={styles.signUpWrapper}>
                <span className={styles.signUpTitle}> 회 원 가 입 </span>
                <SignUpForm />
            </div>
        </div>
    );
}

export default SignUp;