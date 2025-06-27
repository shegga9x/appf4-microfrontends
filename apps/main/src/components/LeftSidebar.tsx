export default function LeftSidebar() {
    return (
        <aside className="left-sidebar">
            <div className="sidebar-item">
                <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="Profile" />
                <span>Your Profile</span>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-icon">👥</span>
                <span>Friends</span>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-icon">⏰</span>
                <span>Memories</span>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-icon">💾</span>
                <span>Saved</span>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-icon">👥</span>
                <span>Groups</span>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-icon">📺</span>
                <span>Video</span>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-icon">🛍️</span>
                <span>Marketplace</span>
            </div>
            <div className="sidebar-item">
                <span className="sidebar-icon">🎮</span>
                <span>Gaming</span>
            </div>
        </aside>
    );
}