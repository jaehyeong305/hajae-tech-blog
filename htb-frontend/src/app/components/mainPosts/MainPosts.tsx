import { PostTags } from "@/app/constants";
import styles from "./MainPosts.module.scss"
import Tag from "../tag/Tag";
import MainPostItem from "./MainPostItem";
import LatestPost from "./LatestPost";

export type PostTag = {
    tagName: string;
    isActive: boolean;
}

const MainPosts: React.FC = () => {
    return (
        <div className={styles.mainPostsWrapper}>
            <div className={styles.tagWrapper}>
                {PostTags.map(tag => (
                    <Tag tagName={tag.tagName} isActive={tag.isActive}/>
                ))}
            </div>
            <div className={styles.postWrapper}>
                <MainPostItem />
                <LatestPost />
            </div>
        </div>
    )
}

export default MainPosts;