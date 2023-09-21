import Tag from '../tag/Tag';
import styles from './MainPosts.module.scss'

const LatestPostItem: React.FC = () => {
    return (
        <div className={styles.latestPostItemWrapper}>
            <div className={styles.latestPostItemImage} style={{ backgroundImage: "url('/images/main-bgi5.jpg')" }}>
            </div>
            <div className={styles.latestPostItemBody}>
                <span className={styles.latestPostItemBodyTitle}>Next.js 그래서 왜 씀?</span>
                <span className={styles.latestPostItemBodyDescription}>안녕하세요 하재형입니다. 왜쓰냐면 에이치티엠엘 랜더링을 잘해서 씀ㅋ 이하 생략안녕하세요 하재형입니다. 왜쓰냐면 에이치티엠엘 랜더링을 잘해서 씀ㅋ 이하 생략</span>
                <span className={styles.latestPostItemWriter}>by jaehyeong.ha</span>
                <div className={styles.latestPostItemTags}>
                    <Tag size='s' tagName='Next.js' />
                </div>
            </div>
        </div>
    )
}

export default LatestPostItem;