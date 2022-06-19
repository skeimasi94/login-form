import classes from "./CardView.module.scss";
import React from "react";


interface ParentCompProps {
    padding?: string,
    bgcolor?: string,
    children?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string,
    color?: string,
    opt?: Object
}

const CardView: React.FC<ParentCompProps> = (props) => {
    const {
        children,
        style,
        className,
        padding = "1rem",
        bgcolor,
        color,
        opt,
    } = props;
    return (
        <div {...opt} className={`${classes.card} ${className}`}
            style={{
                ...style,
                backgroundColor: bgcolor, color: color, padding: padding
            }}
        >
            {children}
        </div>
    )
}

export default CardView;