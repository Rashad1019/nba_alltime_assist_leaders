import React from 'react';

const Layout = ({ children, activeFilter, onFilterChange }) => {
    const filters = [
        { id: 'all', label: 'All Players' },
        { id: 'active', label: 'Active' },
        { id: 'hof', label: 'Hall of Fame' }
    ];

    return (
        <div className="min-h-screen flex flex-col">
            {/* Navigation Bar - Sticky */}
            <header
                className="sticky top-0 z-50"
                style={{
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(12px)',
                    height: '70px'
                }}
            >
                <div
                    style={{
                        maxWidth: '1280px',
                        margin: '0 auto',
                        padding: '0 1.5rem',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                >
                    {/* Logo - Left */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.75rem' }}>🏀</span>
                        <span style={{
                            fontWeight: 700,
                            fontSize: '1.25rem',
                            color: '#ff6b35',
                            letterSpacing: '-0.5px'
                        }}>
                            NBA LEGENDS
                        </span>
                    </div>

                    {/* Filter Tabs - Right */}
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {filters.map(filter => (
                            <button
                                key={filter.id}
                                onClick={() => onFilterChange?.(filter.id)}
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '8px',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    ...(activeFilter === filter.id
                                        ? {
                                            background: '#ff6b35',
                                            color: 'white',
                                            border: 'none',
                                            boxShadow: '0 0 15px rgba(255, 107, 53, 0.4)'
                                        }
                                        : {
                                            background: 'transparent',
                                            color: 'white',
                                            border: '1px solid rgba(255, 255, 255, 0.3)'
                                        }
                                    )
                                }}
                                onMouseEnter={(e) => {
                                    if (activeFilter !== filter.id) {
                                        e.target.style.boxShadow = '0 0 15px rgba(255, 107, 53, 0.3)';
                                        e.target.style.borderColor = '#ff6b35';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeFilter !== filter.id) {
                                        e.target.style.boxShadow = 'none';
                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                                    }
                                }}
                            >
                                {filter.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Orange Accent Line */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'linear-gradient(90deg, transparent, #ff6b35, #ffd700, #ff6b35, transparent)'
                    }}
                />
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <footer
                style={{
                    background: 'rgba(0,0,0,0.5)',
                    padding: '40px 20px',
                    borderTop: '2px solid rgba(255,107,53,0.3)',
                    marginTop: '60px'
                }}
            >
                <div className="container text-center">
                    <p style={{ fontSize: '1.2rem', color: '#ff6b35', fontWeight: 600, marginBottom: '10px' }}>
                        Celebrating the greatest playmakers in NBA history 🏀📊
                    </p>
                    <p style={{ fontSize: '0.95rem', color: '#888' }}>
                        Data provided for educational purposes.
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '15px' }}>
                        Data source: NBA.com official statistics
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
