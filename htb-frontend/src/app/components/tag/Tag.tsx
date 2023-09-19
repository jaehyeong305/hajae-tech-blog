import styles from './Tag.module.scss'

type TagProps = {
    tagName: string;
    isActive?: boolean | false;
}

const Tag: React.FC<TagProps> = (props: TagProps) => {
    return (
        <div className={`${styles.tagWrapper} ${props.isActive ? styles.active : ''}`}>{props.tagName}</div>
    )
}

export default Tag;