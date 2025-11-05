
import React from 'react';
import type { AdCopy } from '../types';
import { AdCopyCard } from './AdCopyCard';
import { GoogleIcon, MetaIcon, SparklesIcon } from './Icons';

interface AdResultsProps {
    adCopy: AdCopy | null;
    isLoading: boolean;
    error: string | null;
}

const LoadingSkeleton: React.FC = () => (
    <div className="space-y-8 animate-pulse">
        <div>
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
                <div className="h-10 bg-gray-700 rounded"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
            </div>
        </div>
        <div>
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
                <div className="h-10 bg-gray-700 rounded"></div>
                <div className="h-10 bg-gray-700 rounded"></div>
            </div>
        </div>
    </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <SparklesIcon className="w-16 h-16 mb-4"/>
        <h3 className="text-xl font-semibold text-gray-300">Seus anúncios aparecerão aqui</h3>
        <p className="mt-2 max-w-sm">Preencha as informações ao lado e clique em "Gerar Anúncios" para que a magia aconteça.</p>
    </div>
);

export const AdResults: React.FC<AdResultsProps> = ({ adCopy, isLoading, error }) => {
    const renderContent = () => {
        if (isLoading) {
            return <LoadingSkeleton />;
        }
        if (error) {
            return <div className="text-red-400 bg-red-900/50 p-4 rounded-md">{error}</div>;
        }
        if (!adCopy) {
            return <InitialState />;
        }
        return (
            <div className="space-y-8">
                <div>
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                        <GoogleIcon className="w-6 h-6"/>
                        Google Ads
                    </h3>
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-400">Headlines</h4>
                        {adCopy.googleAds.headlines.map((text, i) => <AdCopyCard key={`g-h-${i}`} text={text} />)}
                        
                        <h4 className="font-medium text-gray-400 pt-2">Descriptions</h4>
                        {adCopy.googleAds.descriptions.map((text, i) => <AdCopyCard key={`g-d-${i}`} text={text} />)}
                    </div>
                </div>

                <div className="border-t border-white/10 my-6"></div>

                <div>
                     <h3 className="flex items-center gap-2 text-lg font-semibold text-white mb-4">
                        <MetaIcon className="w-6 h-6"/>
                        Meta Ads
                    </h3>
                    <div className="space-y-4">
                        <h4 className="font-medium text-gray-400">Primary Texts</h4>
                        {adCopy.metaAds.primaryTexts.map((text, i) => <AdCopyCard key={`m-p-${i}`} text={text} />)}
                        
                        <h4 className="font-medium text-gray-400 pt-2">Headlines</h4>
                        {adCopy.metaAds.headlines.map((text, i) => <AdCopyCard key={`m-h-${i}`} text={text} />)}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-white/10 min-h-[500px] h-full">
            <h2 className="text-xl font-semibold text-white mb-6">Resultados Gerados</h2>
            <div className="overflow-auto h-full pr-2">
                {renderContent()}
            </div>
        </div>
    );
};
