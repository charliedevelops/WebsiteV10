import { FC } from 'react';

interface DividerProps {
    width?: string | number;
    className?: string;
}

const Divider: FC<DividerProps> = ({ width = '100%', className = '' }) => {
    const widthValue = typeof width === 'number' ? `${width}px` : width;

    return (
        <div 
            className={`h-[2px] bg-white/80 my- ${className}`}
            style={{ width: widthValue }}
        />
    );
};

export default Divider;