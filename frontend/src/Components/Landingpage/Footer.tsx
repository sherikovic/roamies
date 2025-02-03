import React from "react";

const Footer: React.FC = () => {
    return (
        <div className="footer-container py-4 px-5 bg-gray-800 bg-opacity-90 text-white flex justify-between items-center">
            <div className="footer-content">
                <a
                    href="/privacy.html"
                    className="text-white hover:text-blue-400 transition duration-300"
                >
                    Privacy Policy
                </a>
            </div>
            <div className="footer-trademark text-sm">
                <p>&copy; 2025 <span className="font-semibold">Roamies</span>. All Rights Reserved.</p>
            </div>
        </div>
    );
};

export default Footer;