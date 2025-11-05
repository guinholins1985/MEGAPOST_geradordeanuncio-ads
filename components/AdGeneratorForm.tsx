
import React from 'react';
import type { FormState } from '../types';
import { SparklesIcon } from './Icons';

interface AdGeneratorFormProps {
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputField: React.FC<{
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (id: keyof FormState, value: string) => void;
  placeholder: string;
  as?: 'textarea';
}> = ({ id, label, value, onChange, placeholder, as = 'input' }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
      {label}
    </label>
    {as === 'textarea' ? (
      <textarea
        id={id}
        name={id}
        rows={4}
        className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 transition"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      />
    ) : (
      <input
        type="text"
        id={id}
        name={id}
        className="block w-full rounded-md border-0 bg-white/5 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 transition"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
      />
    )}
  </div>
);

export const AdGeneratorForm: React.FC<AdGeneratorFormProps> = ({ formData, setFormData, onSubmit, isLoading }) => {
  const handleInputChange = (id: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  const tones = ['Profissional', 'Amigável', 'Urgente', 'Divertido', 'Luxuoso', 'Inspirador'];

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-white/10 h-full">
      <h2 className="text-xl font-semibold text-white mb-6">Informações do Anúncio</h2>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <InputField 
          id="productName"
          label="Nome do Produto/Serviço"
          value={formData.productName}
          onChange={handleInputChange}
          placeholder="Ex: Tênis de Corrida UltraBoost"
        />
        <InputField 
          id="productDescription"
          label="Descrição do Produto/Serviço"
          value={formData.productDescription}
          onChange={handleInputChange}
          placeholder="Descreva os principais benefícios e características. Ex: Tênis leve com amortecimento responsivo para corredores de longa distância."
          as="textarea"
        />
        <InputField 
          id="targetAudience"
          label="Público-alvo"
          value={formData.targetAudience}
          onChange={handleInputChange}
          placeholder="Ex: Corredores amadores e profissionais que buscam performance."
        />
        <div>
          <label htmlFor="tone" className="block text-sm font-medium text-gray-300 mb-2">
            Tom de Voz
          </label>
          <select
            id="tone"
            name="tone"
            className="block w-full rounded-md border-0 bg-white/5 py-2.5 px-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:text-sm sm:leading-6 transition"
            value={formData.tone}
            onChange={(e) => handleInputChange('tone', e.target.value)}
          >
            {tones.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <button
          type="submit"
          disabled={isLoading || !formData.productName || !formData.productDescription}
          className="w-full flex justify-center items-center gap-2 rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Gerando...' : 'Gerar Anúncios'}
          {!isLoading && <SparklesIcon className="w-4 h-4" />}
        </button>
      </form>
    </div>
  );
};
