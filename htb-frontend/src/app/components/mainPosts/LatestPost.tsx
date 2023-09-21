import LatestPostItem from './LatestPostItem';
import styles from './MainPosts.module.scss'

const LatestPost: React.FC = () => {
    return (
        <div className={styles.latestPostWrapper}>
            <span>Latest Post</span>
            <LatestPostItem />
            <LatestPostItem />
        </div>
    )
}

export default LatestPost;