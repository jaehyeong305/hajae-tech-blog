import styles from './MainPosts.module.scss'

const LatestPost: React.FC = () => {
    return (
        <div className={styles.latestPostWrapper}>
            <span>Latest Post</span>
        </div>
    )
}

export default LatestPost;