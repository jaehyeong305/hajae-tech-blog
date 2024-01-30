import Image from 'next/image';
import Tag from '../tag/Tag';
import styles from './MainPosts.module.scss'

type PostItem = {
    postId: string,
    postTitle: string,
    postBody: string,
    postMainImage: string,
    createdBy: string,
    createdAt: Date, // November 16, 2023
    postTags: string[],
    comments: Comment[],
}

type Comment = {
    message: string,
    commentedBy: string,
    commentedAt: Date,
}

type LatestPostItemProps = {
    latestPostItem: PostItem
}

const LatestPostItem: React.FC<LatestPostItemProps> = ({ latestPostItem }) => {
    return (
        <div className={styles.latestPostItemWrapper}>
            <div className={styles.latestPostItemImage}>
                <Image src={latestPostItem.postMainImage} alt="" width={130} height={130}/>
            </div>
            <div className={styles.latestPostItemBody}>
                <span className={styles.latestPostItemBodyTitle}>{latestPostItem.postTitle}</span>
                <span className={styles.latestPostItemBodyDescription}>{latestPostItem.postBody}</span>
                <span className={styles.latestPostItemWriter}>by {latestPostItem.createdBy}</span>
                <div className={styles.latestPostItemTags}>
                    {latestPostItem.postTags.map((tag, index) => (
                        <Tag key={index} tagName={tag} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LatestPostItem;