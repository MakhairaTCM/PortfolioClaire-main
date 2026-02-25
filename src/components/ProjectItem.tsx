import { useState } from "react";
import { motion } from "motion/react";
import { Play, ArrowRight, ChevronDown } from "lucide-react";
import { LazyImage } from "./LazyImage";

function getYouTubeEmbedUrl(url: string) {
  if (!url || url === '#') return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

interface ProjectItemProps {
  key?: any;
  project: any;
  idx: number;
  t: any;
  lang: string;
  onImageClick: (images: string[], index: number) => void;
}

export const ProjectItem = ({ project, idx, t, lang, onImageClick }: ProjectItemProps) => {
  const videoImage = project.images[0];
  const otherImages = project.images.slice(1);
  const embedUrl = getYouTubeEmbedUrl(project.videoUrl);
  const [showBTS, setShowBTS] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
    >
      {/* Script Info Column */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">{t.extScene} {idx + 1} — {t.day}</span>
          <h3 className="text-4xl md:text-5xl font-display uppercase leading-tight">"{project.title}"</h3>
          <p className="text-sm opacity-60 italic">{project.year} — {project.type}</p>
          <p className="text-[10px] opacity-40 uppercase tracking-widest">{t.producedBy} {project.producer}</p>
        </div>

        {/* Video Embed - Mobile Only (Above Script Page) */}
        <div className="lg:hidden">
          <div 
            className="relative overflow-hidden bg-zinc-900"
            style={{ transform: '(-1deg)', aspectRatio: '16/9' }}
          >
            {embedUrl ? (
              <iframe 
                src={embedUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full">
                <LazyImage 
                  src={videoImage} 
                  className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700 cursor-pointer"
                  alt={`${project.title} video`}
                  onClick={() => onImageClick(project.images, 0)}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-bg-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => onImageClick(project.images, 0)}
                >
                  <Play size={32} className="text-title fill-title" />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="p-8 bg-white script-page border border-zinc-200 relative">
          <div className="tape tape-top" />
          <div className="absolute top-4 right-4 text-[10px] opacity-20">FILE_REF: {project.id.toUpperCase()}</div>
          <div className="space-y-6 text-sm leading-relaxed">
            <div>
              <span className="font-bold block mb-1 uppercase text-[10px] tracking-tighter opacity-40">{t.roles}</span>
              <p className="red-scribble inline">{project.role[lang]}</p>
            </div>
            
            {project.duration && (
              <div>
                <span className="font-bold block mb-1 uppercase text-[10px] tracking-tighter opacity-40">{t.duration}</span>
                <p>{project.duration}</p>
              </div>
            )}

            {project.composition && (
              <div>
                <span className="font-bold block mb-1 uppercase text-[10px] tracking-tighter opacity-40">{t.composition}</span>
                <p className="italic">{project.composition[lang]}</p>
              </div>
            )}

            <div>
              <span className="font-bold block mb-1 uppercase text-[10px] tracking-tighter opacity-40">{t.action}</span>
              <p>{project.description[lang]}</p>
            </div>
            <div className="pt-4 border-t border-zinc-100">
              <p className="text-[10px] opacity-40">{t.notes}: <span className="redacted">{t.classified}</span></p>
            </div>
          </div>
        </div>

        {project.videoUrl !== '#' && (
          <motion.a 
            href={project.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold group"
          >
            {t.playReel} <ArrowRight size={16} className="group-hover:text-accent transition-colors" />
          </motion.a>
        )}
      </div>

      {/* Visuals Column */}
      <div className="lg:col-span-7 space-y-8">
        {/* Video Embed - Desktop Only */}
        <div className="hidden lg:block">
          <div 
            className="relative  overflow-hidden bg-zinc-900"
            style={{ transform: '(-1deg)', aspectRatio: '16/9' }}
          >
            {embedUrl ? (
              <iframe 
                src={embedUrl}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full">
                <LazyImage 
                  src={videoImage} 
                  className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700 cursor-pointer"
                  alt={`${project.title} video`}
                  onClick={() => onImageClick(project.images, 0)}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center bg-bg-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => onImageClick(project.images, 0)}
                >
                  <Play size={32} className="text-title fill-title" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Photos - Always here (Bottom on mobile) */}
        <div className="grid grid-cols-2 gap-8">
          {otherImages.map((img: string, i: number) => (
            <div 
              key={i} 
              className="relative  cursor-pointer col-span-1"
              style={{ transform: `(${i % 2 === 0 ? 1 : -1}deg)` }}
              onClick={() => onImageClick(project.images, i + 1)}
            >
              <LazyImage
                src={img}
                className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
                alt={`${project.title} still ${i}`}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Behind The Scenes - Full width row */}
      {project.behindTheScenes && project.behindTheScenes.length > 0 && (
        <div className="lg:col-span-12 space-y-4">
          <button
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold mt-2 hover:text-accent transition-all duration-300 hover:opacity-80 hover:scale-105 origin-left cursor-pointer"
            onClick={() => setShowBTS(!showBTS)}
          >
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${showBTS ? 'rotate-180' : 'rotate-0'}`}
            />
            {t.behindTheScenes}
          </button>
          {showBTS && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {project.behindTheScenes.map((img: string, i: number) => (
                <div 
                  key={i}
                  className="relative  cursor-pointer"
                  style={{ transform: `(${i % 2 === 0 ? 1 : -1}deg)` }}
                  onClick={() => onImageClick(project.behindTheScenes, i)}
                >
                  <LazyImage
                    src={img}
                    className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
                    alt={`${project.title} BTS ${i}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};
