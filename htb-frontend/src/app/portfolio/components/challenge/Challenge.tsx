'use client'

import styles from '../../page.module.scss'
import React, {useEffect, useState } from 'react';
import challenge from '../../../../../public/images/challenge.png'

const Challenge: React.FC = () => {
    const [isImageFixed, setIsImageFixed] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const [textOpacity, setTextOpacity] = useState(1);
    const [transformY, setTransformY] = useState(42);
    
    useEffect(() => {
        const handleScroll = () => {
            const mainChallenge = document.querySelector(`.${styles.challengeWrapper}`);
            
            if (!mainChallenge) return;
            const mainChallengePosition = mainChallenge.getBoundingClientRect().top;

            // NOTE(hajae): 해당 컴포넌트가 스크롤 되었을 때, 해당 이미지를 화면에 고정한다.
            if (mainChallengePosition <= 0 && mainChallengePosition >= -1750) {
                setIsImageFixed(true);
                // NOTE(hajae): 또한, 해당 컴포넌트를 벗어날 때, 투명도를 높여 없어지는 듯이 표시한다.
                const opacity = ((mainChallengePosition + 1750) / 500);
                setOpacity(opacity);
            } else {
                setIsImageFixed(false);
            }

            // NOTE(hajae): 해당 컴포넌트를 스크롤 할 때, 텍스트가 아래에서 올라오는 듯이 표시한다.
            if (mainChallengePosition <= 0 && mainChallengePosition >= -1150) {
                const y = 42 - (mainChallengePosition / -1150) * (42 + 65);
                setTransformY(y);
            }

            // NOTE(hajae): 텍스트가 올라가며 없어질 때, 투명도를 높여 없어지는 듯이 표시한다.
            if (mainChallengePosition <= -550 && mainChallengePosition >= -950) {
                const textOpacity = (mainChallengePosition + 950 ) / 400;
                setTextOpacity(textOpacity);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    
    return (
        <div className={styles.challengeWrapper}>
            <img src={challenge.src} alt="" className={isImageFixed ? `${styles.fixedImage}` : ""}
                style={{opacity: `${opacity}`}}></img>
            <div className={`${styles.description} ${isImageFixed ? `${styles.current}` : ""}`}>
                <p className={styles.textBox}>
                    <span style={{transform: `translate3d(0px, ${transformY}px, 0px)`, opacity: `${textOpacity}`}}>일본에서 경험을 쌓고</span>
                    <span style={{transform: `translate3d(0px, ${transformY}px, 0px)`}}>새로운 도전으로 여러 경험을 쌓고</span>
                </p>
                <p className={styles.textBox}>
                    <span style={{transform: `translate3d(0px, ${transformY}px, 0px)`, opacity: `${textOpacity}`}}>한국에서 새로운 도전을 위해 귀국했습니다.</span>
                    <span
                        style={{transform: `translate3d(0px, ${transformY}px, 0px)`}}>이러한 경험으로 전문성을 발전시키는 개발자가 되고 싶습니다.</span>
                </p>
            </div>
        </div>
    );
}

export default Challenge;