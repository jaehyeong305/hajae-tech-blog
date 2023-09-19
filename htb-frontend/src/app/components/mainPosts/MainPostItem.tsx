import styles from './MainPosts.module.scss'
import PostItem from './PostItem';

const MainPostItem: React.FC = () => {
    return (
        <div className={styles.posts}>
            <div className={styles.postItemLeft}>
                <PostItem />
            </div>
            <div className={styles.postItemRight}>
                <PostItem />
            </div>
        </div>
    )
}

export default MainPostItem;