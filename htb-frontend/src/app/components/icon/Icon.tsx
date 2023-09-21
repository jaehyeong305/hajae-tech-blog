type IconProps = {
    iconName: string;
    iconCustomStyle?: React.CSSProperties;
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
    return (
        <span className="material-symbols-rounded" style={props.iconCustomStyle}>{props.iconName}</span>
    )
}

export default Icon;