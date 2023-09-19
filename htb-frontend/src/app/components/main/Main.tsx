'use client'

import { useEffect, useState } from 'react';
import styles from './Main.module.scss'
import MainPosts from '../mainPosts/MainPosts';

const Main: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    // NOTE(hajae): 각 이미지의 이동 속도를 조절할 값
    const mainBannerSpeed = 1.4;
    const mainPageSpeed = 0.4;
  
    const mainBannerPosition = -scrollY * mainBannerSpeed;
    const mainPagePosition = -scrollY * mainPageSpeed;
    
    return (
        <div className={styles.mainWrapper}>
            <div className={styles.mainHeader}>Hajae Tech Blog</div>
            <div className={styles.mainBanner}
                style={{ backgroundImage: `url("/images/main-bgi6.jpg")`, transform: `translateY(${mainBannerPosition}px)` }}>
            </div>
            <div className={styles.mainPageWrapper} style={{ transform: `translateY(${mainPagePosition}px)` }}>
                <MainPosts/>
            </div>
        </div>
    )
}

export default Main;