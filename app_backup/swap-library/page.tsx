"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Gamepad2, Search, Disc, Truck, RefreshCw, Library, Star, ChevronRight, Check } from "lucide-react";

const platforms = ["All", "PS5", "PS4", "Xbox Series X", "Xbox One", "Nintendo Switch"];
const genres = ["All", "Action", "Adventure", "Sports", "RPG", "Racing", "Fighting"];

const games = [
  { id: 1, title: "FC 24", platform: "PS5", genre: "Sports", rating: 4.5, swaps: 234 },
  { id: 2, title: "Spider-Man 2", platform: "PS5", genre: "Action", rating: 4.9, swaps: 567 },
  { id: 3, title: "Halo Infinite", platform: "Xbox Series X", genre: "Shooter", rating: 4.3, swaps: 189 },
  { id: 4, title: "Zelda: TOTK", platform: "Nintendo Switch", genre: "Adventure", rating: 4.9, swaps: 892 },
  { id: 5, title: "God of War Ragnarök", platform: "PS5", genre: "Action", rating: 4.8, swaps: 445 },
  { id: 6, title: "Forza Horizon 5", platform: "Xbox Series X", genre: "Racing", rating: 4.6, swaps: 312 },
];

const howSwapWorks = [
  { icon: Library, title: "Browse Library", description: "500+ games across PS5, Xbox, and Switch. New titles added weekly." },
  { icon: Disc, title: "Request Swap", description: "Pay swap fee (from Ksh 500). We'll collect your game and deliver the new one." },
  { icon: Truck, title: "Rider Exchange", description: "Same-day pickup and delivery in Nairobi. Next-day for other cities." },
  { icon: RefreshCw, title: "Play & Repeat", description: "Finished the game? Swap it again for another title." }
];

export default function SwapLibraryPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("All");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter(game => {
    const platformMatch = selectedPlatform === "All" || game.platform === selectedPlatform;
    const genreMatch = selectedGenre === "All" || game.genre === selectedGenre;
    const searchMatch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    return platformMatch && genreMatch && searchMatch;
  });

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="bg-black">
        <Navbar />
      </div>
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="apple-eyebrow text-purple-400">Swap Library</span>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
              Africa's largest
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                game swap platform.
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              Finished your game? Swap it for another. Build Africa's largest physical game library.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>500+ Games</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>From Ksh 500/swap</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Same-day Exchange</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">How Swapping Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howSwapWorks.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 rounded-xl border border-gray-800 focus:border-purple-500 outline-none text-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSelectedPlatform(platform)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedPlatform === platform ? "bg-purple-600 text-white" : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-6 mb-6">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedGenre === genre ? "bg-white text-black" : "bg-gray-900 text-gray-400 hover:bg-gray-800"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900 rounded-2xl overflow-hidden group hover:bg-gray-800 transition-colors"
              >
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                  <Gamepad2 className="w-16 h-16 text-gray-700" />
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs">
                    {game.platform}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold group-hover:text-purple-400 transition-colors">
                      {game.title}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{game.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{game.genre}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{game.swaps} swaps</span>
                    <button className="px-4 py-2 bg-purple-600 rounded-full text-sm font-medium hover:bg-purple-700 transition-colors">
                      Swap Now
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-20">
              <Gamepad2 className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No games found</h3>
              <p className="text-gray-500">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to start swapping?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Join thousands of gamers building their dream library. First swap is free with code SWAPSTART.
          </p>
          <Link href="https://wa.me/254XXXXXXXXX" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors">
            Start Swapping on WhatsApp
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <div className="bg-gray-900">
        <Footer />
      </div>
    </main>
  );
}