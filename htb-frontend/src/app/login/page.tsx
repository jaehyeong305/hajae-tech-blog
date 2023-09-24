import Icon from '../components/icon/Icon';
import LoginForm from './components/LoginForm';
import styles from './page.module.scss'

const Login: React.FC = () => {
    return (
        <div className={styles.loginPageWrapper}>
            <div className={styles.loginWrapper}>
                <span className={styles.loginTitle}> 로 그 인 </span>
                <LoginForm />
            </div>
            {/* <div className={styles.loginInfoWrapper}>
                <Icon iconName='info' iconCustomStyle={{color: '#FFBB00', marginRight: '10px'}}/>
                <p>
                    해당 블로그에서는 방명록 작성을 위한 로그인 기능을 구현했습니다. <br />
                    <strong>자주 사용하는 이메일과 비밀번호가 아닌 기억만 할 수 있는 정보</strong>를 입력해주세요.
                </p>
            </div> */}
        </div>
    );
}

export default Login;