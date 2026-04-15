import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Images, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryEvent {
  id: string;
  name: string;
  created_at: string;
  cover_url?: string;
  photo_count: number;
}

interface GalleryPhoto {
  id: string;
  public_url: string;
  filename: string;
}

export default function Gallery() {
  const [events, setEvents] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const { data } = await supabase
        .from('gallery_events')
        .select('id, name, created_at')
        .order('created_at', { ascending: false });

      if (!data) { setLoading(false); return; }

      const enriched = await Promise.all(
        data.map(async (ev) => {
          const { data: firstPhoto } = await supabase
            .from('gallery_photos')
            .select('public_url')
            .eq('gallery_event_id', ev.id)
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

          const { count } = await supabase
            .from('gallery_photos')
            .select('id', { count: 'exact', head: true })
            .eq('gallery_event_id', ev.id);

          return {
            ...ev,
            cover_url: firstPhoto?.public_url,
            photo_count: count ?? 0,
          };
        })
      );

      setEvents(enriched.filter(ev => ev.photo_count > 0));
      setLoading(false);
    }
    fetchEvents();
  }, []);

  async function openEvent(ev: GalleryEvent) {
    setSelectedEvent(ev);
    setLoadingPhotos(true);
    const { data } = await supabase
      .from('gallery_photos')
      .select('id, public_url, filename')
      .eq('gallery_event_id', ev.id)
      .order('created_at', { ascending: true });
    setPhotos(data ?? []);
    setLoadingPhotos(false);
  }

  function closeLightbox() { setLightboxIndex(null); }

  function prevPhoto() {
    setLightboxIndex(i => (i !== null ? (i - 1 + photos.length) % photos.length : null));
  }

  function nextPhoto() {
    setLightboxIndex(i => (i !== null ? (i + 1) % photos.length : null));
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, photos.length]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-white to-gray-50">
      {lightboxIndex !== null && photos[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={photos[lightboxIndex].public_url}
            alt={photos[lightboxIndex].filename}
            className="max-h-[88vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={e => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!selectedEvent ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Gallery</h2>
              <p className="text-xl text-gray-500">Moments of excellence, unity, and celebration</p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-[4/3] rounded-2xl bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-20">
                <Images className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400 text-lg font-medium">No gallery events yet.</p>
                <p className="text-gray-400 text-sm mt-1">Check back after the event!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(ev => (
                  <button
                    key={ev.id}
                    onClick={() => openEvent(ev)}
                    className="group relative text-left overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <div className="aspect-[4/3] bg-gray-200">
                      {ev.cover_url ? (
                        <img
                          src={ev.cover_url}
                          alt={ev.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <Images className="w-10 h-10 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white text-lg font-bold leading-tight mb-1">{ev.name}</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-flex items-center gap-1 bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                          <Images className="w-3 h-3" />
                          {ev.photo_count} photo{ev.photo_count !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 ring-2 ring-inset ring-white/0 group-hover:ring-white/20 rounded-2xl transition-all" />
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-10">
              <button
                onClick={() => { setSelectedEvent(null); setPhotos([]); }}
                className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-green-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                All Galleries
              </button>
              <span className="text-gray-300">/</span>
              <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.name}</h2>
            </div>

            {loadingPhotos ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square rounded-xl bg-gray-100 animate-pulse" />
                ))}
              </div>
            ) : photos.length === 0 ? (
              <div className="text-center py-20">
                <Images className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-400">No photos in this gallery yet.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((photo, idx) => (
                    <button
                      key={photo.id}
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative aspect-square overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <img
                        src={photo.public_url}
                        alt={photo.filename}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all rounded-xl" />
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-center text-sm text-gray-400">
                  {photos.length} photo{photos.length !== 1 ? 's' : ''} in this gallery
                </p>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}
