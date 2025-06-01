import React from 'react';
import { Link } from 'react-router-dom';

import {
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/outline';

function Header({query, setQuery,  handleKeyDown}) {

    return (
        <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-md w-full max-w-xl mx-auto">
            <div className="flex items-center flex-1 mr-4 bg-gray-100 px-3 py-2 rounded-md">
                <MagnifyingGlassIcon className="w-5 h-5 mr-2.5 opacity-25" />
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    type="text"
                    placeholder="MUA 1 TẶNG 1"
                    className="bg-transparent outline-none w-full text-base text-gray-700 placeholder-red-700"
                />
            </div>
            <div className="flex items-center gap-4 relative ">
                <div className="relative">
                    <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                        4
                    </span>
                </div>
                <Link to={'/login'} className='flex items-center justify-center'>
                    <img src="https://i.pravatar.cc/40" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                </Link>
            </div>
        </div>
    );
}

export default Header;
