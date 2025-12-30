import React from 'react';

const AboutRankings = () => {
    return (
        <section
            className="w-full max-w-6xl mx-auto"
            style={{
                marginTop: '60px',
                background: 'rgba(0,0,0,0.3)',
                borderLeft: '4px solid #ff6b35',
                borderRadius: '15px',
                padding: '40px'
            }}
        >
            <div className="grid md:grid-cols-2 gap-12">
                {/* Left Column - Art of the Assist */}
                <div>
                    <h3 className="flex items-center gap-3 font-bold mb-6" style={{ fontSize: '1.8rem', color: '#ffd700' }}>
                        <span>🏀</span> The Art of the Assist
                    </h3>
                    <div style={{ maxWidth: '600px', lineHeight: '1.8', fontSize: '1.05rem', textAlign: 'justify' }}>
                        <p className="mb-4 text-[#d0d0d0]">
                            Assists are the lifeblood of team basketball. They represent vision, unselfishness, and the ability to elevate teammates.
                        </p>
                        <p className="text-[#d0d0d0]">
                            This gallery honors the playmakers who saw the game differently, transforming passing into an art form that captivates fans and defines legacies.
                        </p>
                    </div>
                </div>

                {/* Right Column - Data Info */}
                <div className="flex flex-col gap-5">
                    {/* Data Source Box */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '20px',
                        borderRadius: '10px'
                    }}>
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">📊 Data Source</div>
                        <div className="text-white font-semibold">Official NBA Historical Stats</div>
                    </div>

                    {/* Active vs Retired Box */}
                    <div style={{
                        background: 'rgba(255,255,255,0.05)',
                        padding: '20px',
                        borderRadius: '10px'
                    }}>
                        <div className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Active vs. Retired</div>
                        <div className="text-gray-300">
                            <span className="text-green-400 font-bold">Active players</span> currently climbing the ranks are highlighted with projections showing their chase for history.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutRankings;
