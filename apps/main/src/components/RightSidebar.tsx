export default function RightSidebar() {
    return (
        <aside className="right-sidebar">
            <div className="sidebar-section">
                <h3>Sponsored</h3>
                <div className="sponsored-item">
                    <img src="https://via.placeholder.com/80x80" alt="Ad" />
                    <div>
                        <h4>Amazing Product</h4>
                        <p>Check out this amazing deal!</p>
                    </div>
                </div>
            </div>

            <div className="sidebar-section">
                <h3>Contacts</h3>
                <div className="contact-item">
                    <img src="https://randomuser.me/api/portraits/women/10.jpg" alt="Contact" />
                    <span>Alice Johnson</span>
                    <div className="online-status"></div>
                </div>
                <div className="contact-item">
                    <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="Contact" />
                    <span>Bob Wilson</span>
                    <div className="online-status"></div>
                </div>
                <div className="contact-item">
                    <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Contact" />
                    <span>Carol Brown</span>
                </div>
                <div className="contact-item">
                    <img src="https://randomuser.me/api/portraits/men/13.jpg" alt="Contact" />
                    <span>David Lee</span>
                    <div className="online-status"></div>
                </div>
            </div>
        </aside>
    );
}