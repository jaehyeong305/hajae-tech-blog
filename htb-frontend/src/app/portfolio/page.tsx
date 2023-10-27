'use client'
import styles from './page.module.scss'
import React, { useEffect, useState } from 'react';
import hajaeMoon from '../../../public/images/hajae-moon.png'
import rocketIcon from '../../../public/images/rocket-icon.png'
import TypewriterText from './components/TypewriterText'
import AboutMe from "@/app/portfolio/components/aboutMe/AboutMe";
import Challenge from "@/app/portfolio/components/challenge/Challenge";
import Project from "@/app/portfolio/components/project/Project";
import {Black_Ops_One} from 'next/font/google';
import Award from "@/app/portfolio/components/award/Award";
import CoreCompetency from './components/coreCompetency/CoreCompetency';

const blackOpsOne = Black_Ops_One({ weight: '400', subsets: ['latin'] });
const NUM_STARS = 50;

const Portfolio: React.FC = () => {
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

    return (
        <div className={styles.portfolioPageWrapper}>
            <div className={`${styles.protfolioWrapper} ${blackOpsOne.className}`}>
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
            <Challenge />
            <Project />
            <Award />
            <CoreCompetency />
        </div>
    );
}

export default Portfolio;