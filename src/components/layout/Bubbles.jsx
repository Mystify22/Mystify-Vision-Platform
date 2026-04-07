import React from 'react';

const Bubbles = () => {
    // Generate fewer, larger bubbles for a more subtle elegant look
    const bubbles = Array.from({ length: 8 });

    return (
        <div className="bubbles-container">
            {bubbles.map((_, i) => {
                const size = Math.random() * 150 + 50; // Larger size
                return (
                    <div 
                        key={i} 
                        className="bubble" 
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 20}s`,
                            animationDuration: `${Math.random() * 20 + 20}s`
                        }}
                    />
                );
            })}
        </div>
    );
};

export default Bubbles;
