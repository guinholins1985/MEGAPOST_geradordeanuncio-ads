
import React, { useState, useCallback } from 'react';
import type { FormState, AdCopy } from './types';
import { generateAdCopy } from './services/geminiService';
import { AdGeneratorForm } from './components/AdGeneratorForm';
import { AdResults } from './components/AdResults';
import { SparklesIcon } from './components/Icons';

function App() {
  const [formData, setFormData] = useState<FormState>({
    productName: '',
    productDescription: '',
    targetAudience: '',
    tone: 'Profissional',
  });
  const [adCopy, setAdCopy] = useState<AdCopy | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateAdCopy(formData);
      setAdCopy(result);
    } catch (e) {
      console.error(e);
      setError('Falha ao gerar o texto do anúncio. Verifique o console para mais detalhes.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4">
            <SparklesIcon className="w-10 h-10 text-purple-400" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Gerador de Anúncios com IA
            </h1>
          </div>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Crie textos de anúncios de alta conversão para Google Ads e Meta Ads em segundos.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <AdGeneratorForm 
              formData={formData} 
              setFormData={setFormData}
              onSubmit={handleGenerate}
              isLoading={isLoading}
            />
          </div>
          <div className="lg:col-span-3">
             <AdResults 
                adCopy={adCopy}
                isLoading={isLoading}
                error={error}
             />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
