import styles from './Tag.module.scss'

type TagProps = {
    tagName: string;
    size?: 's' | 'm' | 'l';
    isActive?: boolean | false;
}

const Tag: React.FC<TagProps> = (props: TagProps) => {
    const sizeClassName = props.size ? styles[props.size] : styles['m'];

    return (
        <div className={`${styles.tagWrapper} ${sizeClassName} ${props.isActive ? styles.active : ''}`}>{props.tagName}</div>
    )
}

export default Tag;