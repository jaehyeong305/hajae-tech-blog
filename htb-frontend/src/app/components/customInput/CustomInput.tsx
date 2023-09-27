'use client'

import React, { Ref, forwardRef } from "react";
import styles from "./CustomInput.module.scss"

const InputContext = React.createContext({
    id: '',
    type: 'text',
})

export const InputWrapper = (
    { id, type, children }: { id: string, type: string, children: React.ReactNode }
) => {
    const contextValue = { id, type };
    return (
        <InputContext.Provider value={contextValue}>
            {children}
        </InputContext.Provider>
    )
};

const CustomInput: React.FC = forwardRef(({ ...props }, ref: Ref<HTMLInputElement>) => {
    const { id, type } = React.useContext(InputContext);
    const [isFocused, setIsFocused] = React.useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const getIcon = () => {
        switch (id) {
            case "username":
                return "person";
            case "email":
                return "mail";
            case "password":
                return "lock"
        }
    }

    return (
        <div className={styles.inputField}>
            <input
                id={id}
                type={type}
                className={`${styles.customInput} ${isFocused ? styles.focused : ''}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={ref}
                {...props}
            />
            <span className={`${styles.inputIcon} material-symbols-rounded ${isFocused ? styles.focusedIcon : ''} `}>
                {getIcon()}
            </span>
        </div>
    )
});

const CustomLabel: React.FC<{ children: React.ReactNode }> = ({ children, ...props }: { children: React.ReactNode }) => {
    const { id } = React.useContext(InputContext);
    return (
        <label htmlFor={id} {...props}>
            {children}
        </label>
    )
}

InputWrapper.Input = CustomInput;
InputWrapper.Label = CustomLabel;