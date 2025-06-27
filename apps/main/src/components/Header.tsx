export default function Header() {
    return (
        <header className="fb-header">
            <div className="header-left">
                <div className="logo">AppF4</div>
                <div className="search-bar">
                    <input type="text" placeholder="Search AppF4" />
                </div>
            </div>
            <div className="header-center">
                <div className="nav-icons">
                    <div className="nav-icon active">🏠</div>
                    <div className="nav-icon">👥</div>
                    <div className="nav-icon">📺</div>
                    <div className="nav-icon">🛍️</div>
                    <div className="nav-icon">🎮</div>
                </div>
            </div>
            <div className="header-right">
                <div className="profile-menu">
                    <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="Profile" className="header-avatar" />
                    <span>You</span>
                </div>
            </div>
        </header>
    );
}