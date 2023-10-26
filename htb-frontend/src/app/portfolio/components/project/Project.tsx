'use client'
import {Black_Ops_One, Do_Hyeon} from 'next/font/google';
import styles from '../../page.module.scss'
import React, {useEffect, useState } from 'react';
import airplane from '../../../../../public/images/airplane-icon.png'
import bird from '../../../../../public/images/bird-icon.png'
import hrmosMain from '../../../../../public/images/hrmos-main.png'
import selectionFlowMain from '../../../../../public/images/selection-flow-main.png'

const blackOpsOne = Black_Ops_One({ weight: '400', subsets: ['latin'] });
const doHyeon = Do_Hyeon({ weight: '400', subsets: ['latin'] });

const Project: React.FC = () => {
    const [isFlippedFrontend, setIsFlippedFrontend] = useState(false);
    const [isFlippedSelection, setIsFlippedSelection] = useState(false);
    const [isCurrent, setIsCurrent] = useState(false);
    const [isCurrentAirPlane, setIsCurrentAirPlane] = useState(false);
    const [isCurrentBird, setIsCurrentBird] = useState(false);
    const itemRef = React.createRef<HTMLDivElement>();

    const flipFrontendProject = () => {
        setIsFlippedFrontend(!isFlippedFrontend);
    };

    const flipSelectionProject = () => {
        setIsFlippedSelection(!isFlippedSelection);
    };

    useEffect(() => {
        const handleScroll = () => {
            const itemPosition = itemRef.current?.getBoundingClientRect().top || 0;

            if (itemPosition < 500) {
                setIsCurrent(true);
            } else if (itemPosition < 800) {
                setIsCurrentBird(true);
            } else if (itemPosition < 1100) {
                setIsCurrentAirPlane(true);
            } else {
                setIsCurrent(false);
                setIsCurrentAirPlane(false);
                setIsCurrentBird(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
        }, [itemRef]);

    return (
        <div className={`${styles.projectWrapper} ${blackOpsOne.className}`}>
            <img src={airplane.src} alt="" className={`${styles.airplane} ${isCurrentAirPlane ? styles.current : ''}`} />
            <div className={`${styles.cloud} ${styles.cloud1}`}></div>
            <div className={`${styles.cloud} ${styles.cloud2}`}></div>
            <div className={`${styles.cloud} ${styles.cloud3}`}></div>
            <div className={`${styles.cloud} ${styles.cloud4}`}></div>
            <div className={`${styles.cloud} ${styles.cloud5}`}></div>

            <span className={styles.projectMainTitle}>PROJECTs</span>

            <div className={styles.project}>
                <img src={bird.src} alt="" className={`${styles.bird} ${isCurrentBird ? styles.current : ''}`} />
                <div ref={itemRef} className={`${styles.flip} ${isFlippedFrontend ? styles.flipped : ''} ${isCurrent ? styles.current : ''}`}  onClick={flipFrontendProject}>
                    <div className={`${styles.projectFront} ${doHyeon.className} ${styles.info}`}>
                        <div className={styles.info}>클릭!!</div>
                        <span className={styles.projectTitle}>차세대 프론트엔드 프로젝트</span>
                        <span className={styles.projectPeriod}>2021.10 - 2023.03</span>
                        <div>
                            <span className={styles.projectDescription}>서포트 종료된 AngularJS를 Angular로 업그레이드 하는 프로젝트</span>
                        </div>
                        <div>
                            <img src={hrmosMain.src} alt="" className={styles.projectImage}/>
                        </div>
                        <div>
                            <span className={styles.projectOffice}>#AngularJS #Angular #Typescript #Sass</span>
                        </div>
                    </div>
                    <div className={`${styles.projectBack} ${doHyeon.className}`}>
                        <div>
                            <div className={styles.projectBackTitle}>근무처</div>
                            <span>Bizreach - Hrmos채용 부서</span>
                        </div>
                        <div>
                            <div className={styles.projectBackTitle}>규모</div>
                            <span>PM 1, 개발자 6(사원 2, SES 4), QA 3</span>
                        </div>
                        <div>
                            <div className={styles.projectBackTitle}>주요 업무</div>
                            <ul>
                                <li>기존에 작성되어 있는 AngularJS코드를 Angular 12버전으로 새롭게 작성</li>
                                <li>UI컴포넌트 작성</li>
                                <li>기존에 잠재되어 있던 버그 수정</li>
                                <li>1주 단위 스프린트로 업무를 계획/수행</li>
                                <li>CS(Customer Success)와 디자이너와 커뮤니케이션</li>
                            </ul>
                        </div>
                        <div>
                            <div className={styles.projectBackTitle}>주요 성과</div>
                            <ul>
                                <li>AngularJS모듈과 별개로 새로운 모듈작성</li>
                                <li>AngularJS로 작성된 페이지의 7/9 릴리즈</li>
                                <li>릴리즈한 페이지의 <strong>취약성 검사 통과</strong></li>
                                <li>잠재되어 있던 버그 80% 수정</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div ref={itemRef} className={`${styles.flip} ${isFlippedSelection ? styles.flipped : ''} ${isCurrent ? styles.current : ''}`}  onClick={flipSelectionProject}>
                <div className={`${styles.projectFront} ${doHyeon.className} ${styles.info}`}>
                    <div className={styles.info}>클릭!!</div>
                    <span className={styles.projectTitle}>전형흐름관리 프로젝트</span>
                    <span className={styles.projectPeriod}>2020.03 - 2021.09</span>
                    <div>
                        <span className={styles.projectDescription}>고정적인 채용의 전형흐름을 커스터마이징하는 기능을 추가</span>
                    </div>
                    <div>
                        <img src={selectionFlowMain.src} alt="" className={styles.projectImage}/>
                    </div>
                    <div>
                        <span className={styles.projectOffice}>#AngularJS #Typescript #Scala #MySQL #Sass</span>
                    </div>
                </div>
                <div className={`${styles.projectBack} ${doHyeon.className}`}>
                    <div>
                        <div className={styles.projectBackTitle}>근무처</div>
                        <span>Bizreach - Hrmos채용 부서</span>
                    </div>
                    <div>
                        <div className={styles.projectBackTitle}>규모</div>
                        <span>PM 1, 개발자 12, 디자이너 3, QA 2, CS 3↑</span>
                    </div>
                    <div>
                        <div className={styles.projectBackTitle}>주요 업무</div>
                        <ul>
                            <li>Backend, Frontend 개발</li>
                            <li>테이블(DB) 설계/수정</li>
                            <li>1주 단위 스프린트로 업무를 계획/수행</li>
                            <li>CS(Customer Success)와 디자이너와 커뮤니케이션</li>
                            <li>코드리뷰 & 에러감시</li>
                        </ul>
                    </div>
                    <div>
                        <div className={styles.projectBackTitle}>주요 성과</div>
                        <ul>
                            <li>2021년 상반기 <strong>우수팀상 수상</strong></li>
                            <li>기능요인으로 인한 서비스 해약률의 25% 해소</li>
                            <li>새로운 기능 릴리즈</li>
                            <li>개발자, 디자이너, CS, 영업부가 하나의 팀이 되는 것을 실현</li>
                        </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Project;