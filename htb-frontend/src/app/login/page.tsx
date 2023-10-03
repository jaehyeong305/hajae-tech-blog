import LoginForm from './components/LoginForm';
import styles from './page.module.scss'

const Login: React.FC = () => {    
    return (
        <div className={styles.loginPageWrapper}>
            <div className={styles.loginWrapper}>
                <span className={styles.loginTitle}> 로 그 인 </span>
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;