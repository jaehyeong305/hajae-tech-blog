import styles from './page.module.scss'
import Main from './components/main/Main';

const Home: React.FC = () => {  
  return (
    <main className={styles.main}>
        <Main/>
    </main>
  )
}

export default Home;