import { TempPostsLeft, TempPostsRight } from '@/app/constants';
import LatestPostItem from './LatestPostItem';
import styles from './MainPosts.module.scss'

const LatestPost: React.FC = () => {
    return (
        <div className={styles.latestPostWrapper}>
            <span>Latest Post</span>
            {TempPostsLeft.map((post, index) => (
                <LatestPostItem key={index} latestPostItem={post}/>
            ))}
            {TempPostsRight.map((post, index) => (
                <LatestPostItem key={index} latestPostItem={post}/>
            ))}
        </div>
    )
}

export default LatestPost;