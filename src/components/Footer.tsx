import { Mail, MapPin, FileText, Instagram } from "lucide-react";

interface FooterProps {
  t: any;
  onCvOpen: () => void;
}

export const Footer = ({ t, onCvOpen }: FooterProps) => {
  return (
    <footer id="contact" className="bg-bg text-text py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-6xl font-display uppercase">{t.theEnd}</h2>
          <p className="opacity-40 max-w-xs font-mono text-xs">
            // {t.status} <br />
            // {t.location}
          </p>
          <div className="space-y-4">
            <a href="mailto:claire.blaborde@gmail.com" className="flex items-center gap-4 hover:text-accent transition-colors">
              <Mail size={20} /> claire.blaborde@gmail.com
            </a>
            <div className="flex items-center gap-4">
              <MapPin size={20} /> {t.locationLine ?? 'Based in France / Open to Travel'}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-end">
          <div className="flex gap-6">
            {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-title-20 flex items-center justify-center hover:bg-title hover:text-bg transition-all">
              <Linkedin size={20} />
            </a> */}
            <button onClick={onCvOpen} className="w-12 h-12 rounded-full border border-title-20 flex items-center justify-center hover:bg-title hover:text-bg transition-all cursor-pointer">
              <FileText size={20} />
            </button>
            <a href="#" className="w-12 h-12 rounded-full border border-title-20 flex items-center justify-center hover:bg-title hover:text-bg transition-all">
              <Instagram size={20} />
            </a>
          </div>
          
          <div className="text-right space-y-2 pt-12 md:pt-0">
            {/* <p className="text-[10px] uppercase tracking-[0.5em] opacity-20">{t.credits}</p> */}
            {/* <p className="text-xs">{t.designedWith}</p> */}
            <p className="text-[10px] opacity-20">© 2026 — {t.rights}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
