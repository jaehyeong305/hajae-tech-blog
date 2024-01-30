import { TempPostsLeft, TempPostsRight } from '@/app/constants';
import styles from './MainPosts.module.scss'
import PostItem from './PostItem';

const MainPostItem: React.FC = () => {
    return (
        <div className={styles.posts}>
            <div className={styles.postItemLeft}>
                {TempPostsLeft.map(post => (
                    <PostItem key={post.postId} postItem={post}/>
                ))}
            </div>
            <div className={styles.postItemRight}>
                {TempPostsRight.map(post => (
                    <PostItem key={post.postId} postItem={post}/>
                ))}
            </div>
        </div>
    )
}

export default MainPostItem;