import React from "react";
import styles from '../../page.module.scss'
import velog from '../../../../../public/images/velog.png'
import githubMark from '../../../../../public/images/github-mark.png'
import Icon from "@/app/components/icon/Icon";

const Footer: React.FC = () => {
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.footerLinkContainer}>
                <div className={styles.footerLink}>
                    <a href="https://github.com/jaehyeong305" target="_blank" rel="noreferrer"><img src={githubMark.src} alt="" /></a>
                </div>
                <div className={styles.footerLink}>
                    <a href="https://velog.io/@hajae305" target="_blank" rel="noreferrer"><img src={velog.src} alt="" /></a>
                </div>
            </div>
            <div className={styles.footerConnect}>
                <span><Icon iconName='call' iconCustomStyle={{ fontSize: '20px', marginRight: '5px' }} />010-8077-1157</span>
                <span><Icon iconName='mail' iconCustomStyle={{ fontSize: '20px', marginRight: '5px' }} />hajae305@gmail.com</span>
            </div>
            <div className={styles.copylight}>
                <span>ⓒ 2023. Jaehyeong Ha All rights reserved.</span>
            </div>
            <div className={styles.source}>
                <span>( 아이콘 출처 : Freepik - Flaticon )</span>
            </div>
        </div>
    );
}

export default Footer;