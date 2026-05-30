import './Bubbles.css';
import React from 'react';

const Bubbles = () => {
    // Generate random bubble styles once upon mount to keep render pure and stable
    const [bubbleStyles] = React.useState(() => 
        Array.from({ length: 8 }).map(() => ({
            size: Math.random() * 150 + 50,
            left: Math.random() * 100,
            delay: Math.random() * 20,
            duration: Math.random() * 20 + 20
        }))
    );

    return (
        <div className="bubbles-container">
            {bubbleStyles.map((style, i) => (
                <div 
                    key={i} 
                    className="bubble" 
                    style={{
                        width: `${style.size}px`,
                        height: `${style.size}px`,
                        left: `${style.left}%`,
                        animationDelay: `${style.delay}s`,
                        animationDuration: `${style.duration}s`
                    }}
                />
            ))}
        </div>
    );
};

export default Bubbles;
