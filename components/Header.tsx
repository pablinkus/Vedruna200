
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center space-y-6 no-print animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex flex-col items-center gap-2">
         <div className="text-amber-800 font-serif text-3xl font-bold tracking-tight uppercase border-b-2 border-amber-200 pb-1">
            200 Años Vedruna
         </div>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-serif font-semibold text-stone-800">
        Conversando con Joaquina
      </h1>
      
      <div className="text-stone-600 max-w-3xl mx-auto space-y-4 text-sm md:text-base leading-relaxed">
        <p className="italic font-serif text-lg md:text-xl text-stone-700">
          Santa Joaquina de Vedruna nos enseñó a mirar la vida con amor, fe y esperanza, y a servir allí donde más se nos necesita. Te invitamos a compartir con ella tus preocupaciones, tus sueños y el compromiso de transformar el mundo a través de la educación y el cuidado.
        </p>
        
        <p className="font-semibold text-stone-800 pt-4">Puedes escribirle de tres maneras:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-emerald-50/60 p-5 rounded-2xl border border-emerald-100 shadow-sm">
            <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <span className="bg-emerald-200 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              Como colegio
            </h3>
            <p className="text-xs md:text-sm text-emerald-800/80">
              Comparte el nombre de tu colegio y el valor que queréis cultivar o la necesidad que os preocupa como comunidad. Joaquina te responderá con unas palabras llenas de fe y ánimo, para fortalecer vuestra misión común.
            </p>
          </div>
          
          <div className="bg-stone-100/60 p-5 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-2">
              <span className="bg-stone-300 text-stone-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              De forma personal
            </h3>
            <p className="text-xs md:text-sm text-stone-800/80">
              Indica el nombre de la persona o del grupo al que quieras dedicar unas palabras. Cuéntale también el valor, necesidad o dificultad que quieras poner en sus manos. Ella te escribirá con cercanía y ternura, para acompañarte en tu camino y sostener tu entrega.
            </p>
          </div>

          <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-100 shadow-sm">
            <h3 className="font-bold text-amber-900 mb-2 flex items-center gap-2">
              <span className="bg-amber-200 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
              Como hermana
            </h3>
            <p className="text-xs md:text-sm text-amber-800/80">
              Indica tu nombre, comunidad y misión actual. Cuéntale tus anhelos o dificultades en el seguimiento del Señor. Ella te escribirá con la ternura de una hermana para sostener tu entrega y vocación.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
