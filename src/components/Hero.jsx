import React from 'react';

const Hero = () => {
    return (
        <section
            className="relative flex items-center justify-center overflow-hidden"
            style={{ paddingTop: '80px', paddingBottom: '60px' }}
        >
            {/* Background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1a] via-[#1a1a2e] to-[#0f3460] z-0"></div>

            {/* Content */}
            <div className="container relative z-10 px-4" style={{ textAlign: 'center' }}>
                {/* Top Label */}
                <p
                    className="uppercase tracking-widest mb-6 animate-fade-in-up"
                    style={{ fontSize: '0.85rem', color: '#888', letterSpacing: '3px' }}
                >
                    🏀 All-Time Assists Leaders
                </p>

                {/* Main Title with Gradient */}
                <h1
                    className="font-bold mb-5 animate-fade-in-up px-2"
                    style={{
                        fontSize: 'clamp(1.75rem, 8vw, 4rem)',
                        fontWeight: 700,
                        letterSpacing: '-1px',
                        lineHeight: 1.2,
                        background: 'linear-gradient(135deg, #ff6b35 0%, #ffd700 50%, #ff6b35 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        filter: 'drop-shadow(0 0 30px rgba(255, 107, 53, 0.3))'
                    }}
                >
                    The Greatest Passers in NBA History
                </h1>

                {/* Subtitle */}
                <p
                    className="mx-auto animate-fade-in-up px-4"
                    style={{
                        fontSize: 'clamp(0.95rem, 3.5vw, 1.3rem)',
                        color: '#b8b8b8',
                        maxWidth: '700px',
                        marginTop: '20px',
                        lineHeight: 1.6
                    }}
                >
                    A tribute to the top 10 maestros who redefined teamwork and court vision
                </p>
            </div>
        </section>
    );
};

export default Hero;
