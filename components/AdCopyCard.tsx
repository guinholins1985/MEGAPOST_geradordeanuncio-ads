
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface AdCopyCardProps {
    text: string;
}

export const AdCopyCard: React.FC<AdCopyCardProps> = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gray-900/50 border border-white/10 p-3 rounded-md flex justify-between items-center group">
            <p className="text-gray-200 text-sm flex-grow mr-4">{text}</p>
            <button
                onClick={handleCopy}
                className="p-2 rounded-md bg-gray-700 text-gray-300 hover:bg-purple-600 hover:text-white transition-all duration-200 opacity-50 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Copiar texto"
            >
                {copied ? (
                    <CheckIcon className="w-4 h-4 text-green-400" />
                ) : (
                    <CopyIcon className="w-4 h-4" />
                )}
            </button>
        </div>
    );
};
