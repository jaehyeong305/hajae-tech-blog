import Icon from '../icon/Icon';
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

type PostItemProps = {
    postItem: PostItem
}

const PostItem: React.FC<PostItemProps> = ({ postItem }) => {
    return (
        <div className={styles.postItemWrapper}>
            <div className={styles.postImage}>
                <img src={postItem.postMainImage} alt="" />
            </div>
            <div className={styles.postItem}>
                <div className={styles.createdInfo}>
                    <span>by {postItem.createdBy}</span><span>{postItem.createdAt.toDateString()}</span>
                </div>
                <span className={styles.itemTitle}>{postItem.postTitle}</span>
                <span className={styles.itemBody}>{postItem.postBody}</span>
                <div className={styles.itemComment}>
                    <div className={styles.commentBox}>
                        <Icon iconName='chat_bubble' iconCustomStyle={{fontSize: '18px'}}/>
                        <span>{postItem.comments.length}</span>
                    </div>
                </div>
                <div className={styles.itemTags}>
                    {postItem.postTags.map((tag, index) => (
                        <Tag key={index} tagName={tag} />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default PostItem;