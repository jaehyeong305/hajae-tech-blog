import React from "react";
import styles from "./Tooltip.module.scss";

type TooltipProps = {
    value: string;
    children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ value, children }) => (
  <div className={styles.tooltipContainer}>
    {children}
    <div className={styles.tooltip}>{value}</div>
  </div>
);

export default Tooltip;
