import React, { useState, useEffect } from 'react';
import styles from '../page.module.scss'

const TypewriterText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentIndex < text.length) {
                setDisplayText(text.substring(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }
        }, 100); // 각 글자마다 100ms 간격으로 표시

        return () => clearTimeout(timer);
    }, [currentIndex, text]);

    return <div className={styles.typingText}>{displayText} <span className={styles.textBlink}>|</span> </div>;
};

export default TypewriterText;
