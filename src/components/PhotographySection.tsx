import { motion } from "motion/react";
import { LazyImage } from "./LazyImage";

interface PhotographySectionProps {
  albums: { id: string; title: { FR: string; ENG: string }; description?: { FR: string; ENG: string }; items: { title: string; desc: string; url: string }[] }[];
  t: any;
  onImageClick: (images: string[], index: number) => void;
  lang: 'FR' | 'ENG';
}

export const PhotographySection = ({ albums, t, onImageClick, lang }: PhotographySectionProps) => {
  return (
    <section id="photography" className="py-24 bg-bg border-y border-title-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div>
            <h2 className="text-sm uppercase tracking-[0.5em] mb-2 opacity-40">{t.visualArchives}</h2>
            <p className="text-4xl font-display uppercase text-title">{t.photographyWall}</p>
          </div>
        </div>

        {albums.map((album) => (
          <div className="mb-24" key={album.id}>
            <h3 className="text-xs uppercase tracking-[0.3em] mb-2 opacity-60 border-l-2 border-accent pl-4">{album.title[lang]}</h3>
            {album.description?.[lang] && (
              <p className="text-[10px] opacity-50 mb-6 pl-4">{album.description[lang]}</p>
            )}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {album.items.map((photo, i) => (
                <PhotoItem
                  key={i}
                  photo={photo}
                  onClick={() => onImageClick(album.items.map(p => p.url), i)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

function PhotoItem({ photo, onClick, albumTitle, albumDesc }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pinterest-item group relative cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-sm bg-bg">
        <LazyImage 
          src={photo.url} 
          alt={photo.title}
          className="w-full h-auto group-hover:grayscale-0 transition-all duration-700 ease-in-out"
        />
        <div className="absolute inset-0 bg-bg-20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <div className="text-title">
            <p className="text-[10px] font-bold uppercase tracking-widest">{photo.title}</p>
            <p className="text-[8px] opacity-70 italic">{photo.desc}</p>
            {(albumTitle || albumDesc) && (
              <p className="text-[8px] opacity-60 mt-1">{albumTitle}{albumDesc ? ` — ${albumDesc}` : ''}</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
