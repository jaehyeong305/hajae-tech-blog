'use client'
import styles from '../../page.module.scss'
import React, { useEffect } from "react";
import Icon from "@/app/components/icon/Icon";
import { Black_Ops_One, Do_Hyeon } from 'next/font/google';
import confetti from "canvas-confetti";
import award from '../../../../../public/images/award.png'

const blackOpsOne = Black_Ops_One({ weight: '400', subsets: ['latin'] });
const doHyeon = Do_Hyeon({ weight: '400', subsets: ['latin'] });

const Award: React.FC = () => {
    // NOTE(hajae): 폭죽효과 추가
    const firework = () => {
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 10, spread: 300, ticks: 30, zIndex: 0 };

        function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        const interval: NodeJS.Timeout = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) { return clearInterval(interval); }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, {particleCount,origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }}));
            confetti(Object.assign({}, defaults, {particleCount,origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }}));}, 250);
    }
    
    useEffect(() => {
            const handleScroll = () => {
                const award = document.querySelector(`.${styles.awardWrapper}`);

                if (!award) return;
                const awardPosition = award.getBoundingClientRect().top;

                // NOTE(hajae): 해당 컴포넌트가 스크롤 되었을 때, 폭죽효과를 실행한다.
                if (awardPosition < -250 && awardPosition > -280) {
                    firework();
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, 
    []);
    
    return (
        <div className={`${styles.awardWrapper} ${blackOpsOne.className}`}>
            <span className={styles.awardMainTitle}>
                Award
                <Icon iconName='emoji_events' iconCustomStyle={{fontSize: '4rem', paddingTop: '5px'}}/>
            </span>
            <img src={award.src} alt="" />
            <span className={`${doHyeon.className} ${styles.awardTitle}`}>2021 상반기 우수팀 상 수상</span>
            <span className={`${doHyeon.className} ${styles.awardDescription}`}>1. 기능요인으로 인한 서비스 해약률의 25% 해소</span>
            <span className={`${doHyeon.className} ${styles.awardDescription}`}>2. 엔지니어, 디자이너, CS, 영업부가 하나의 팀이 되는 것을 실현</span>
            <span className={`${doHyeon.className} ${styles.awardDescription}`}>3. 고객과 연계하여 어플리케이션 개선을 실시</span>
        </div>
        );
}

export default Award;