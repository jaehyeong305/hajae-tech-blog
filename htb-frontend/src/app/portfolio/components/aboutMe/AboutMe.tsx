'use client'
import styles from '../../page.module.scss'
import React from 'react';
import hajae from '../../../../../public/images/hajae.png'
import Icon from "@/app/components/icon/Icon";

const AboutMe: React.FC = () => {
    const iconStyle = {fontSize: '30px', marginTop: '0', marginRight: '5px', color: '#393E46'};

    return (
            <div className={styles.aboutMeWrapper}>
                <div className={styles.aboutMe}>
                    <div className={styles.aboutMeProfile}>
                        <img className={styles.aboutMeImg} src={hajae.src} alt="" />
                        <span><Icon iconName='emoji_people' iconCustomStyle={iconStyle}/>하 재 형</span>
                        <span><Icon iconName='cake' iconCustomStyle={iconStyle}/>1994.03.05</span>
                        <span><Icon iconName='call' iconCustomStyle={iconStyle}/>010-8077-1157</span>
                        <span><Icon iconName='mail' iconCustomStyle={iconStyle}/>hajae305@gamil.com</span>
                    </div>
                    <div className={styles.aboutmeInfo}>
                        <span className={styles.aboutMeTitle}>About Me</span>
                        <span>
                            커뮤니케이션의 중요성을 아는 프론트엔드 개발자. <br/><br/>
                            일본 기업에서 Sprint 단위로 개발을 진행하면서 PM, 디자이너, CS와 많은 소통을 하며 커뮤니케이션을 중요성을 배웠고
                            고객에게 더 많은 가치를 제공하기 위해 노력하며 역량을 키워왔습니다. <br/>
                            일본에서 4년 1개월의 경험을 쌓고 이제는 한국에서의 새로운 도전을 위해 귀국했습니다.
                        </span>
                        
                        <span className={styles.aboutMeTitle}>Career</span>
                        <span>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={{paddingRight: '20px'}}>2019.04 - 2023.04</td>
                                        <td>일본기업 Bizreach(株式会社 ビズリーチ)</td>
                                    </tr>
                                    <tr>
                                        <td style={{paddingRight: '20px'}}>2023.05 -</td>
                                        <td>...</td>
                                    </tr>
                                </tbody>
                            </table>
                        </span>
                        <span className={styles.aboutMeTitle}>Skills</span>
                        <div className={styles.skills}>
                            <div className={styles.skill}>
                                <span>Typescript</span>
                                <div className={styles.progressBar}>
                                    <div className={styles.barStyle} style={{width: '90%'}}></div>
                                </div>
                            </div>
                            <div className={styles.skill}>
                                <span>HTML/CSS</span>
                                <div className={styles.progressBar}>
                                    <div className={styles.barStyle} style={{width: '80%'}}></div>
                                </div>
                            </div>
                            <div className={styles.skill}>
                                <span>Angular</span>
                                <div className={styles.progressBar}>
                                    <div className={styles.barStyle} style={{width: '80%'}}></div>
                                </div>
                            </div>
                            <div className={styles.skill}>
                                <span>React</span>
                                <div className={styles.progressBar}>
                                    <div className={styles.barStyle} style={{width: '60%'}}></div>
                                </div>
                            </div>
                            <div className={styles.skill}>
                                <span>Next.js</span>
                                <div className={styles.progressBar}>
                                    <div className={styles.barStyle} style={{width: '50%'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
}

export default AboutMe;