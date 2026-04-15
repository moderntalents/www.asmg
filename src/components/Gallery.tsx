import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

interface GalleryImage {
  url: string;
  title: string;
  category: string;
  club?: string;
  tags: string[];
}

const IMAGES: GalleryImage[] = [
  {
    url: 'https://images.pexels.com/photos/262524/pexels-photo-262524.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Karate Sparring',
    category: 'Karate',
    club: 'Nairobi Elite Club',
    tags: ['karate', 'martial arts', 'sparring', 'nairobi elite club'],
  },
  {
    url: 'https://images.pexels.com/photos/1812960/pexels-photo-1812960.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Classical Ballet Performance',
    category: 'Classical Ballet',
    club: 'Kenyatta Arts Academy',
    tags: ['classical ballet', 'ballet', 'dance', 'performance', 'kenyatta arts academy'],
  },
  {
    url: 'https://images.pexels.com/photos/358010/pexels-photo-358010.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Contemporary Dance Showcase',
    category: 'Modern Dance',
    club: 'Afro Motion Crew',
    tags: ['modern dance', 'contemporary', 'dance', 'afro motion crew'],
  },
  {
    url: 'https://images.pexels.com/photos/277253/pexels-photo-277253.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Athletics Sprint Final',
    category: 'Athletics',
    club: 'Kenya Track Stars',
    tags: ['athletics', 'sprint', 'track', 'field', 'kenya track stars'],
  },
  {
    url: 'https://images.pexels.com/photos/261185/pexels-photo-261185.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Swimming Championship',
    category: 'Swimming',
    club: 'Aqua Lions Nairobi',
    tags: ['swimming', 'pool', 'aquatics', 'aqua lions nairobi'],
  },
  {
    url: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Football Quarter-Final',
    category: 'Football',
    club: 'Savanna FC',
    tags: ['football', 'soccer', 'team sports', 'savanna fc'],
  },
  {
    url: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Basketball Tournament',
    category: 'Basketball',
    club: 'Rift Valley Ballers',
    tags: ['basketball', 'team sports', 'rift valley ballers'],
  },
  {
    url: 'https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Volleyball League Match',
    category: 'Volleyball',
    club: 'Coastal Spikers',
    tags: ['volleyball', 'team sports', 'coastal spikers'],
  },
  {
    url: 'https://images.pexels.com/photos/1040157/pexels-photo-1040157.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Chess Grand Prix',
    category: 'Chess',
    club: 'Nairobi Mind Guild',
    tags: ['chess', 'mind sports', 'strategy', 'nairobi mind guild'],
  },
  {
    url: 'https://images.pexels.com/photos/3621311/pexels-photo-3621311.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Opening Ceremony',
    category: 'Events',
    club: 'ASMG Organization',
    tags: ['events', 'ceremony', 'opening', 'asmg organization'],
  },
  {
    url: 'https://images.pexels.com/photos/2306281/pexels-photo-2306281.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Martial Arts Kata Demo',
    category: 'Martial Arts',
    club: 'East Africa Budokan',
    tags: ['martial arts', 'kata', 'karate', 'east africa budokan'],
  },
  {
    url: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Long Jump Athletics',
    category: 'Athletics',
    club: 'Kenya Track Stars',
    tags: ['athletics', 'long jump', 'field', 'kenya track stars'],
  },
];

const CATEGORIES = [
  'All',
  'Karate',
  'Martial Arts',
  'Classical Ballet',
  'Modern Dance',
  'Athletics',
  'Swimming',
  'Football',
  'Basketball',
  'Volleyball',
  'Chess',
  'Events',
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return IMAGES.filter(img => {
      const matchCat = activeCategory === 'All' || img.category === activeCategory;
      const matchSearch =
        !q ||
        img.tags.some(t => t.includes(q)) ||
        img.title.toLowerCase().includes(q) ||
        img.category.toLowerCase().includes(q) ||
        (img.club?.toLowerCase().includes(q) ?? false);
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Gallery</h2>
          <p className="text-xl text-gray-500">Moments of excellence, unity, and celebration</p>
        </div>

        <div className="relative mb-6 max-w-lg mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by sport or club name..."
            className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeCategory === cat
                  ? 'bg-green-600 text-white border-green-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-lg font-medium">No photos match your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-4 text-sm text-green-600 hover:text-green-700 font-semibold underline underline-offset-2"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer aspect-square"
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-block bg-green-500 text-white text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">
                        {image.category}
                      </span>
                      <h3 className="text-white text-lg font-bold leading-tight">{image.title}</h3>
                      {image.club && (
                        <p className="text-gray-300 text-xs mt-1">{image.club}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-gray-400">
              Showing {filtered.length} of {IMAGES.length} photos
            </p>
          </>
        )}

      </div>
    </section>
  );
}
