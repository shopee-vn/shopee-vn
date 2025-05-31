import React from 'react';
import { Link } from 'react-router-dom';

function PageError() {
    return (
        <section className="max-w-md mx-auto p-4 bg-white shadow rounded">
            <Link to={'/'} className="flex items-center mb-6">
                <button aria-label="Back" className="text-orange-500 hover:text-orange-600 mr-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <h2 className="text-lg font-medium text-gray-900">Xác nhận</h2>
            </Link>
            <div className="text-center">
                <div className="mx-auto mb-6 w-24 h-24 text-gray-300">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 64 64"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-full h-full"
                    >
                        <rect x="16" y="8" width="32" height="48" rx="4" ry="4" stroke="#d1d5db" fill="#f9fafb" />
                        <line x1="20" y1="12" x2="44" y2="12" stroke="#d1d5db" />
                        <circle cx="32" cy="32" r="12" stroke="#f87171" fill="#fee2e2" />
                        <line x1="25" y1="25" x2="39" y2="39" stroke="#f87171" strokeLinecap="round" />
                        <line x1="39" y1="25" x2="25" y2="39" stroke="#f87171" strokeLinecap="round" />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Lỗi tải</h3>
                <p className="text-gray-600 mb-6">Xin lỗi, chúng tôi đang gặp sự cố tải, bạn vui lòng thử lại nhé.</p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition">
                    Thử Lại
                </button>
                <p className="mt-6 text-xs text-gray-400 select-text">ID:301536f6879-7bd9-48fa-a6e5-17351fec46cf</p>
            </div>
        </section>
    );
}

export default PageError;
