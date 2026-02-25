import { useState } from "react";
import { motion, MotionValue } from "motion/react";
import { ChevronDown } from "lucide-react"; 
import backgroundHero from "../assets/about/backgroundHero.jpg";
import clairePhoto from "../assets/about/claire.png";

// --- Logos: Prefer PNGs from assets; fallback to inline SVG icons ---
const logoModules = import.meta.glob(
  '/src/assets/logos/*.{png,PNG}',
  { eager: true, import: 'default' }
) as Record<string, string>;

const logoEntries = Object.entries(logoModules).sort((a, b) => a[0].localeCompare(b[0]));
function getLogoUrl(keywords: string[]) {
  const found = logoEntries.find(([path]) => {
    const p = path.toLowerCase();
    return keywords.some((k) => p.includes(k));
  });
  return found?.[1] as string | undefined;
}

const PROGRAM_LOGOS = {
  pr: getLogoUrl(['premiere', 'pr']),
  ae: getLogoUrl(['aftereffects', 'after-effects', 'after', 'ae']),
  avid: getLogoUrl(['avid']),
  resolve: getLogoUrl(['resolve', 'davinci', 'blackmagic']),
  lr: getLogoUrl(['lightroom', 'lr']),
};

const IconPr = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <rect width="24" height="24" rx="4" fill="#00005C" />
    <path d="M6 7h5.5c2 0 3 .9 3 2.4 0 1.6-1.1 2.6-3 2.6H8v5H6V7zm2 3.6h3c.8 0 1.2-.4 1.2-1.1 0-.6-.4-1.1-1.2-1.1H8v2.2z" fill="#9999FF" />
    <path d="M15.5 12.3h1.7v1.2c.4-.9 1.3-1.4 2.3-1.4.3 0 .5 0 .5.1v1.8c-.3-.1-.6-.1-1-.1-1 0-1.7.6-1.7 1.8v1.3h-1.8v-4.7z" fill="#9999FF" />
  </svg>
);

const IconAe = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <rect width="24" height="24" rx="4" fill="#00005C" />
    <path d="M9.5 7l4.8 10h-2l-1-2.4H6.8L5.8 17H4l5.5-10zm1.2 5.8L9.5 9.6 8.3 12.8h2.4z" fill="#9999FF" />
    <path d="M15.2 14.6c0 1.4 1 2.5 2.5 2.5.9 0 1.6-.4 1.9-1h-1.6c-.1.2-.4.4-.7.4-.6 0-1-.5-1-1.1h3.6v-.6c0-1.8-.9-2.7-2.3-2.7-1.5 0-2.4 1.1-2.4 2.5zm2.3-1.4h-1.6c0-.6.4-1 1-1s.8.4.8 1z" fill="#9999FF" />
  </svg>
);

const IconLr = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <rect width="24" height="24" rx="4" fill="#001E36" />
    <path d="M6 7h2v8.5h4.5v1.5H6V7z" fill="#31A8FF" />
    <path d="M14.5 12.3h1.7v1.2c.4-.9 1.3-1.4 2.3-1.4.3 0 .5 0 .5.1v1.8c-.3-.1-.6-.1-1-.1-1 0-1.7.6-1.7 1.8v1.3h-1.8v-4.7z" fill="#31A8FF" />
  </svg>
);

const IconAvid = () => (
  <svg width="20" height="20" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <polygon points="2,32 14,8 26,32" fill="#D3008E" />
    <rect x="28" y="8" width="5" height="24" fill="#D3008E" />
    <polygon points="36,8 46,20 36,32" fill="#D3008E" />
  </svg>
);

const IconResolve = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <circle cx="12" cy="12" r="10" fill="#1A1A1A"/>
    <path d="M12 4A8 8 0 0 1 18.5 7.5L12 12V4Z" fill="#CE403C"/>
    <path d="M18.5 7.5A8 8 0 0 1 16.5 18.5L12 12L18.5 7.5Z" fill="#E87D3E"/>
    <path d="M16.5 18.5A8 8 0 0 1 5.5 18.5L12 12L16.5 18.5Z" fill="#E8B03E"/>
    <path d="M5.5 18.5A8 8 0 0 1 4 12L12 12L5.5 18.5Z" fill="#6B2827"/>
    <path d="M4 12A8 8 0 0 1 12 4V12L4 12Z" fill="#992B2A"/>
  </svg>
);

interface HeroProps {
  backgroundY: MotionValue<string>;
  t: any;
}

export const Hero = ({ backgroundY, t }: HeroProps) => {
  const [showTeachings, setShowTeachings] = useState(false);
  
  return (
    <section id="hero" className="relative min-h-screen flex flex-col bg-black text-white overflow-hidden">
      
      {/* Moitié Supérieure - Fond et Titre */}
      <div className="h-[50vh] w-full relative overflow-hidden shrink-0">
        <motion.img 
          style={{ y: backgroundY }}
          src={backgroundHero} 
          className="w-full h-[120%] object-cover object-bottom opacity-30"
          alt="Hero background"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-60% to-black/70" />
        
        <div className="absolute top-27 left-1/2 -translate-x-1/2 text-center z-10 w-full px-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl md:text-6xl font-display leading-none uppercase tracking-tighter"
          >
            Claire Buhaceanu <br /> Laborde
          </motion.h1>
        </div>
      </div>

      {/* Moitié Inférieure - Contenu */}
      <div className="flex-1 w-full flex flex-col items-center px-6 text-center pb-24 z-20">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="-mt-24 md:-mt-36 mb-10 p-2 w-48 md:w-60 shadow-2xl relative z-30"
        >
          <img 
            src={clairePhoto} 
            className="w-full h-auto "
            alt="Claire"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-6xl w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            
            <div className="md:col-span-2">
              <div 
                className="text-xs md:text-sm leading-relaxed opacity-70 font-mono"
                dangerouslySetInnerHTML={{ __html: t.bio }}
              />

              <div className="mt-6 border border-white/10 rounded-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-2 text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-70 hover:opacity-100 transition bg-white/5 hover:bg-white/10"
                  onClick={() => setShowTeachings(!showTeachings)}
                  aria-expanded={showTeachings}
                >
                  <span>{t.teachings}</span>
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${showTeachings ? "rotate-180" : ""}`} 
                  />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: showTeachings ? "auto" : 0, opacity: showTeachings ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="px-6 py-4 text-xs md:text-sm opacity-70 space-y-2 list-disc list-inside">
                    {(t.teachingsList ?? []).map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* Programmes avec les vrais logos 100% SVG */}
            <div>
              <h3 className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-60 mb-3">{t.programs}</h3>
              <ul className="text-xs md:text-sm opacity-70 space-y-3">
                <li>
                  <a href="https://www.adobe.com/products/premiere.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    {PROGRAM_LOGOS.pr ? (
                      <img src={PROGRAM_LOGOS.pr} alt={t.programsLabels?.pr ?? 'Premiere Pro'} className="h-5 md:h-6 object-contain shrink-0" />
                    ) : (
                      <IconPr />
                    )}
                    {t.programsLabels?.pr ?? 'Premiere Pro'}
                  </a>
                </li>
                <li>
                  <a href="https://www.adobe.com/products/aftereffects.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    {PROGRAM_LOGOS.ae ? (
                      <img src={PROGRAM_LOGOS.ae} alt={t.programsLabels?.ae ?? 'After Effects'} className="h-5 md:h-6 object-contain shrink-0" />
                    ) : (
                      <IconAe />
                    )}
                    {t.programsLabels?.ae ?? 'After Effects'}
                  </a>
                </li>
                <li>
                  <a href="https://www.avid.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    {PROGRAM_LOGOS.avid ? (
                      <img src={PROGRAM_LOGOS.avid} alt={t.programsLabels?.avid ?? 'Avid Suite'} className="h-5 md:h-6 object-contain shrink-0" />
                    ) : (
                      <IconAvid />
                    )}
                    {t.programsLabels?.avid ?? 'Avid Suite'}
                  </a>
                </li>
                <li>
                  <a href="https://www.blackmagicdesign.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    {PROGRAM_LOGOS.resolve ? (
                      <img src={PROGRAM_LOGOS.resolve} alt={t.programsLabels?.resolve ?? 'Blackmagic Design'} className="h-5 md:h-6 object-contain shrink-0" />
                    ) : (
                      <IconResolve />
                    )}
                    {t.programsLabels?.resolve ?? 'Blackmagic Design'}
                  </a>
                </li>
                <li>
                  <a href="https://www.adobe.com/products/photoshop-lightroom.html" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white hover:opacity-100 transition-all duration-300 hover:translate-x-1">
                    {PROGRAM_LOGOS.lr ? (
                      <img src={PROGRAM_LOGOS.lr} alt={t.programsLabels?.lr ?? 'Lightroom'} className="h-5 md:h-6 object-contain shrink-0" />
                    ) : (
                      <IconLr />
                    )}
                    {t.programsLabels?.lr ?? 'Lightroom'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-20"
        >
          <div className="w-[1px] h-12 bg-white" />
        </motion.div>

      </div>
    </section>
  );
};