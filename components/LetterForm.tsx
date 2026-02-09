
import React, { useState, useEffect } from 'react';
import { LetterMode, FormData } from '../types';
import { PROVINCES } from '../constants';

interface LetterFormProps {
  mode: LetterMode;
  onSubmit: (data: FormData) => void;
  onBack: () => void;
}

const LetterForm: React.FC<LetterFormProps> = ({ mode, onSubmit, onBack }) => {
  const [data, setData] = useState<Partial<FormData>>({
    mode,
    city: '',
    province: '',
    needValue: '',
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const checkValidity = () => {
      const basicFields = data.city && data.province && data.needValue;
      if (mode === LetterMode.SCHOOL) {
        return basicFields && data.centerName;
      }
      if (mode === LetterMode.INDIVIDUAL) {
        return basicFields && data.name;
      }
      if (mode === LetterMode.SISTER) {
        return basicFields && data.name && data.community && data.mission;
      }
      return false;
    };
    setIsValid(!!checkValidity());
  }, [data, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(data as FormData);
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case LetterMode.SCHOOL: return 'Como colegio';
      case LetterMode.INDIVIDUAL: return 'De forma personal';
      case LetterMode.SISTER: return 'Como hermana';
      default: return '';
    }
  };

  const inputClass = "w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all";
  const labelClass = "block text-sm font-medium text-stone-700 mb-1";

  return (
    <div className="bg-white p-8 rounded-2xl border border-stone-100 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-stone-400 hover:text-stone-600 flex items-center gap-1 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Volver
        </button>
        <span className="px-4 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider">
          {getModeTitle()}
        </span>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mode === LetterMode.SCHOOL && (
            <div className="md:col-span-2">
              <label htmlFor="centerName" className={labelClass}>Nombre del centro *</label>
              <input 
                type="text" id="centerName" name="centerName" required
                value={data.centerName || ''} onChange={handleChange}
                placeholder="Ej. Vedruna Sagrat Cor" className={inputClass} 
              />
            </div>
          )}

          {(mode === LetterMode.INDIVIDUAL || mode === LetterMode.SISTER) && (
            <div className={mode === LetterMode.INDIVIDUAL ? "md:col-span-2" : ""}>
              <label htmlFor="name" className={labelClass}>{mode === LetterMode.INDIVIDUAL ? 'Nombre de la persona o grupo *' : 'Tu nombre *'}</label>
              <input 
                type="text" id="name" name="name" required
                value={data.name || ''} onChange={handleChange}
                placeholder="Ej. María o Grupo de Pastoral" className={inputClass} 
              />
            </div>
          )}

          {mode === LetterMode.SISTER && (
            <>
              <div>
                <label htmlFor="community" className={labelClass}>Comunidad *</label>
                <input 
                  type="text" id="community" name="community" required
                  value={data.community || ''} onChange={handleChange}
                  placeholder="Nombre de la comunidad" className={inputClass} 
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="mission" className={labelClass}>Misión actual *</label>
                <input 
                  type="text" id="mission" name="mission" required
                  value={data.mission || ''} onChange={handleChange}
                  placeholder="Ej. Acompañamiento a jóvenes" className={inputClass} 
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="city" className={labelClass}>Población *</label>
            <input 
              type="text" id="city" name="city" required
              value={data.city || ''} onChange={handleChange}
              placeholder="Ej. Vic" className={inputClass} 
            />
          </div>

          <div>
            <label htmlFor="province" className={labelClass}>Provincia *</label>
            <select 
              id="province" name="province" required
              value={data.province || ''} onChange={handleChange}
              className={inputClass}
            >
              <option value="">Selecciona provincia</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="needValue" className={labelClass}>Necesidad o valor a trabajar *</label>
          <input 
            type="text" id="needValue" name="needValue" required
            value={data.needValue || ''} onChange={handleChange}
            placeholder="Ej. Esperanza, paciencia, alegría..." className={inputClass} 
          />
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>Mensaje libre (opcional)</label>
          <textarea 
            id="message" name="message" rows={3}
            value={data.message || ''} onChange={handleChange}
            placeholder="Algo más que le quieras contar a Joaquina..." className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all shadow-md ${
            isValid 
              ? 'bg-amber-600 text-white hover:bg-amber-700 hover:shadow-lg active:scale-95' 
              : 'bg-stone-100 text-stone-400 cursor-not-allowed'
          }`}
        >
          Generar carta
        </button>
      </form>
      {mode === LetterMode.SISTER && (
        <p className="mt-4 text-xs text-amber-600 italic text-center">
          Nota: Se utilizará un tono profundamente espiritual y fraternal.
        </p>
      )}
    </div>
  );
};

export default LetterForm;
