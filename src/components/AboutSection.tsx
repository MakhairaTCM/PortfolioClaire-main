import { motion } from "motion/react";
import { LazyImage } from "./LazyImage";
import clairePortrait from '../assets/about/claireAbout.jpg';

interface AboutSectionProps {
  t: any;
  onImageClick: (images: string[], index: number) => void;
}

export const AboutSection = ({ t, onImageClick }: AboutSectionProps) => {
  return (
    <section id="about" className="py-32 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        <div className="relative">
          <div className="p-4 shadow-xl border-4 border-title">
            <LazyImage
              src={clairePortrait}
              className="w-full h-auto object-cover rounded-sm shadow-sm cursor-pointer"
              alt="Claire"
              onClick={() => onImageClick([clairePortrait], 0)}
            />
            <p className="mt-4 text-[10px] text-center opacity-40 uppercase tracking-widest">Subject: Claire B.L.</p>
          </div>
          <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-accent" />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-accent" />
        </div>

        <div className="space-y-8 text-left">
          <h2 className="text-5xl font-display uppercase tracking-tighter text-title">{t.theDirector}</h2>
          <div className="space-y-4 text-sm leading-relaxed text-text">
            <p dangerouslySetInnerHTML={{ __html: t.bio }} />
            <p className="opacity-60">
              {t.bioSub}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
