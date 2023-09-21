import Icon from '../icon/Icon';
import Tag from '../tag/Tag';
import styles from './MainPosts.module.scss'

const PostItem: React.FC = () => {
    return (
        <div className={styles.postItemWrapper}>
            <div className={styles.postImage}>
                <img src={'/images/main-bgi5.jpg'} alt="" />
            </div>
            <div className={styles.postItem}>
                <div className={styles.createdInfo}>
                    <span>by jaehyeong.ha</span><span>November 16, 2023</span>
                </div>
                <span className={styles.itemTitle}>Next.js 그래서 왜 씀?</span>
                <span className={styles.itemBody}>안녕하세요 하재형입니다. 왜쓰냐면 에이치티엠엘 랜더링을 잘해서 씀ㅋ 이하 생략</span>
                <div className={styles.itemComment}>
                    <div className={styles.commentBox}>
                        <Icon iconName='chat_bubble' iconCustomStyle={{fontSize: '18px'}}/>
                        <span>0</span>
                    </div>
                </div>
                <div className={styles.itemTags}>
                    <Tag tagName="Next.js" />
                </div>
            </div>
        </div >
    )
}

export default PostItem;