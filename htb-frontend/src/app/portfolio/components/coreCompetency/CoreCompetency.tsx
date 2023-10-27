'use client'
import styles from '../../page.module.scss'
import React, {useEffect, useState } from "react";
import { Black_Ops_One, Do_Hyeon } from 'next/font/google';
import ship from '../../../../../public/images/ship-icon.png'

const blackOpsOne = Black_Ops_One({ weight: '400', subsets: ['latin'] });
const doHyeon = Do_Hyeon({ weight: '400', subsets: ['latin'] });
const NUM_LIGHTS = 50;

type CoreCompetencyInfo = {
    title: string,
    description: string,
}

const coreCompetenciesInfo: CoreCompetencyInfo[] = [
    {
        title: '풀스택 개발 경험',
        description: '풀스택 개발 경험을 통해 프로젝트의 전반적인 흐름을 이해하고, 문제 발생 시 빠르게 대응하며 효율적인 솔루션을 제공할 수 있습니다.',
    },
    {
        title: '프론트엔드 프레임워크(Angular) 개발 경험',
        description: '취약성이 발견된 AngularJS에서 Angular12 버전으로 업그레이드하며 코드 리팩토링과 아키텍처 통일화 작업을 수행한 경험을 통해 안정적이고 유지보수 가능한 코드베이스를 구축할 수 있습니다.',
    },
    {
        title: '다른 직종과의 협업과 커뮤니케이션 능력',
        description: '각 팀원의 전문성과 역할을 이해하고, 서로를 존중하는것이 중요합니다. 디자이너와 개발자들이 서로의 제안을 수용하고 협력하여 최적의 사용자 경험을 만들 수 있었습니다.',
    },
    {
        title: '유연한 적응력으로 글로벌 환경에서의 협업 경험',
        description: '저는 새로운 문화와 규칙에 적응한 경험이 있고 다양한 배경과 가치관을 가진 사람들과 함께 일한 경험이 있습니다. 이를 통해 저는 다른 문화에 대한 이해와 존중, 그리고 적응력을 키웠습니다.',
    },
]

const CoreCompetency: React.FC = () => {
    const [lights, setLights] = useState<JSX.Element[]>([]);
    
    useEffect(() => {
        const generatedStars = [];

        for (let i = 0; i < NUM_LIGHTS; i++) {
            const style = {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${1 + Math.random() * 5}s`,
            };

            generatedStars.push(
                <div key={i} className={`${styles.lights} ${styles.blink}`} style={style}></div>
                );
        }

        setLights(generatedStars);
        }, []);

    const handleScroll = () => {
        const competencyElements = document.querySelectorAll(`.${styles.coreCompetencyBox}`);

        competencyElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const isAnimated = rect.top < window.innerHeight;

            if (isAnimated) {
                element.classList.add(styles.animated);
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
        }, []);

    return (
        <div className={`${styles.coreCompetencyWrapper} ${blackOpsOne.className}`}>
            <img src={ship.src} alt="" className={styles.ship}/>
            <div>
                {lights}
            </div>
            <span className={styles.coreCompetencyMainTitle}>Core Competency</span>
            
            {coreCompetenciesInfo.map((coreCompetency, index) => (
                <div key={index} className={`${styles.coreCompetencyBox} ${doHyeon.className}`}>
                    <span className={styles.coreCompetencyTitle}>{index+1}. {coreCompetency.title}</span>
                    <span className={styles.coreCompetencyDescription}>{coreCompetency.description}</span>
                </div>
            ))}
        </div>
    );
}

export default CoreCompetency;