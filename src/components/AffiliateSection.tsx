export default function AffiliateSection() {
  return (
    <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-12 mt-16 rounded-2xl">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">
          Complete Your Wedding Planning
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Everything you need for your perfect wedding day
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Amazon Wedding Registry */}
          <a
            href="https://www.amazon.com/wedding/home?tag=yourtaghere"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                🎁
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Wedding Registry</h3>
                <p className="text-sm text-gray-500">Amazon</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              Create your perfect wedding registry with millions of products, free shipping, and easy returns.
            </p>
            <div className="text-purple-600 font-semibold text-sm hover:text-purple-700">
              Browse Registry Items →
            </div>
          </a>

          {/* Etsy Wedding Decorations */}
          <a
            href="https://www.etsy.com/search?q=wedding+decorations"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-2xl">
                💐
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Wedding Decor</h3>
                <p className="text-sm text-gray-500">Etsy</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              Unique handmade decorations, personalized signs, table numbers, and custom wedding favors.
            </p>
            <div className="text-purple-600 font-semibold text-sm hover:text-purple-700">
              Shop Decorations →
            </div>
          </a>

          {/* Booking.com Hotels */}
          <a
            href="https://www.booking.com/wedding.html?aid=youraidhere"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                🏨
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">Guest Hotels</h3>
                <p className="text-sm text-gray-500">Booking.com</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              Find the perfect accommodations for your guests. Group rates and special wedding discounts available.
            </p>
            <div className="text-purple-600 font-semibold text-sm hover:text-purple-700">
              Find Hotels →
            </div>
          </a>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8 max-w-3xl mx-auto">
          Disclosure: We earn a small commission from purchases made through these links at no extra cost to you.
          This helps keep WeddingSeats free for everyone.
        </p>
      </div>
    </section>
  );
}
