import Icon from '../icon/Icon';
import styles from './Navigator.module.scss'

const Navigator: React.FC = () => {
    return (
        <div className={styles.navigatorWrapper}>
            <ul className={styles.navigator}>
                <li>
                    <Icon iconName='assignment' iconCustomStyle={{fontSize: '24px'}}/>
                </li>
                <li>
                    <Icon iconName='help' iconCustomStyle={{fontSize: '24px'}}/>
                </li>
                <li>
                    <Icon iconName='monitoring' iconCustomStyle={{fontSize: '24px'}}/>
                </li>
                <li>
                    <Icon iconName='taunt' iconCustomStyle={{fontSize: '24px'}}/>
                </li>
                <li>
                    <Icon iconName='psychology' iconCustomStyle={{fontSize: '24px'}}/>
                </li>
                <li>
                    <Icon iconName='contacts' iconCustomStyle={{fontSize: '24px'}}/>
                </li>
                <li>
                    <Icon iconName='mail' iconCustomStyle={{fontSize: '24px'}}/>
                </li>
            </ul>
        </div>
    )
}

export default Navigator;