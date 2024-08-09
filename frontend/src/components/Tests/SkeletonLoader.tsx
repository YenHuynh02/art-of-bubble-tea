import React from 'react';
import './SkeletonLoader.css';

interface SkeletonLoaderProps {
    width: string;
    height: string;
    style?: React.CSSProperties;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ width, height, style }) => {
    return (
        <div className="skeleton" style={{ width, height, ...style }}></div>
    );
};

export default SkeletonLoader;
