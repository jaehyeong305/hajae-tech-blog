'use client'
import styles from './page.module.scss'
import React, { useEffect, useState } from 'react';
import hajaeMoon from '../../../public/images/hajae-moon.png'
import rocketIcon from '../../../public/images/rocket-icon.png'
import TypewriterText from './components/TypewriterText'
import AboutMe from "@/app/portfolio/components/aboutMe/AboutMe";

const NUM_STARS = 50;

const Portfolio: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const [stars, setStars] = useState<JSX.Element[]>([]);

    useEffect(() => {
        const generatedStars = [];

        for (let i = 0; i < NUM_STARS; i++) {
            const style = {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${1 + Math.random() * 5}s`,
            };

            generatedStars.push(
                <div key={i} className={`${styles.star} ${styles.blink}`} style={style}></div>
            );
        }

        setStars(generatedStars);
    }, []);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    useEffect(() => {
        
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    return (
        <div className={styles.portfolioPageWrapper}>
            <div className={styles.protfolioWrapper}>
                <div>
                    {stars}
                </div>
                <img src={rocketIcon.src} alt="" className={styles.rocket} />
                <section className={styles.protfolioMoonWrapper}>
                    <div className={styles.protfolioHajaeMoon} style={{backgroundImage: `url(${hajaeMoon.src})`}} ></div>
                    <div className={styles.protfolioMoon}></div>
                </section>
                <div className={styles.textWrapper}>
                    <TypewriterText text={"Ha Jaehyeong's \nFrontend Portfolio !"} />
                </div>
            </div>
            <AboutMe />
        </div>
    );
}

export default Portfolio;