"use client";

import Link from 'next/link';
import Script from 'next/script';
import { useApp } from '../../layout';

export default function BlogPost2() {
  const { language } = useApp();
  const isHr = language === 'hr';  // Keep for paragraphs that are only EN/HR
  
  // Language mapping for all supported languages
  const getContent = (contents: { en: string; hr?: string; es?: string; de?: string; fr?: string }) => {
    return contents[language] || contents.en;
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Kako Rasporediti Goste Da Svi Budu Srećni: Potpuni Vodič",
    "alternativeHeadline": "How to Arrange Wedding Guests So Everyone Is Happy: Complete Guide",
    "description": "Kompletni vodič za kreiranje idealnog rasporeda sedenja na venčanju. Naučite kako grupisati goste, balansirati stolove i stvoriti atmosferu u kojoj će svi uživati.",
    "image": "https://weddingseats.app/blog-happy-guests.jpg",
    "author": {
      "@type": "Organization",
      "name": "WeddingSeats Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WeddingSeats",
      "logo": {
        "@type": "ImageObject",
        "url": "https://weddingseats.app/icon.svg"
      }
    },
    "datePublished": "2025-10-07",
    "dateModified": "2025-10-07",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://weddingseats.app/blog/how-to-arrange-wedding-guests"
    },
    "keywords": ["wedding seating guide", "happy guests", "seating arrangement", "wedding planning", "guest arrangement", "venčanje", "srećni gosti"]
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <article className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link href="/" className="hover:text-purple-600">Home</Link>
        {' > '}
        <Link href="/blog" className="hover:text-purple-600">Blog</Link>
        {' > '}
        <span className="text-gray-900">
          {getContent({
            en: 'How to Arrange Guests',
            hr: 'Kako Rasporediti Goste',
            es: 'Cómo Organizar Invitados',
            de: 'Gäste Anordnen',
            fr: 'Comment Organiser les Invités'
          })}
        </span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <div className="text-6xl mb-4">😊</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {getContent({
            en: 'How to Arrange Wedding Guests So Everyone Is Happy: Complete Guide',
            hr: 'Kako Rasporediti Goste Da Svi Budu Srećni: Potpuni Vodič',
            es: 'Cómo Organizar a los Invitados Para Que Todos Sean Felices: Guía Completa',
            de: 'So Ordnen Sie Hochzeitsgäste An, Damit Alle Glücklich Sind: Vollständiger Leitfaden',
            fr: 'Comment Organiser les Invités Pour Que Tout le Monde Soit Heureux: Guide Complet'
          })}
        </h1>
        <div className="flex items-center gap-4 text-gray-600">
          <span>📅 {getContent({
            en: 'October 7, 2025',
            hr: '7. oktobar 2025',
            es: '7 de octubre de 2025',
            de: '7. Oktober 2025',
            fr: '7 octobre 2025'
          })}</span>
          <span>⏱️ 7 min {getContent({
            en: 'read',
            hr: 'čitanja',
            es: 'lectura',
            de: 'Lesezeit',
            fr: 'lecture'
          })}</span>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
          {isHr
            ? 'Kreiranje rasporeda sedenja koji će zadovoljiti sve goste je umetnost koja zahteva pažljivo planiranje, empatiju i razumevanje dinamike između različitih grupa ljudi. Evo vašeg kompletnog vodiča za savršen raspored:'
            : 'Creating a seating arrangement that will satisfy all guests is an art that requires careful planning, empathy, and understanding of the dynamics between different groups of people. Here\'s your complete guide to the perfect arrangement:'}
        </p>

        {/* Introduction */}
        <section className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            🎯 {isHr ? 'Osnovna Načela' : 'Basic Principles'}
          </h2>
          <p className="text-gray-800 mb-3">
            {isHr
              ? 'Pre nego što počnete sa planiranjem, važno je razumeti tri osnovna principa uspešnog rasporeda sedenja:'
              : 'Before you start planning, it\'s important to understand three basic principles of successful seating:'}
          </p>
          <ul className="space-y-2 text-gray-800">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>
                <strong>{isHr ? 'Kompatibilnost' : 'Compatibility'}:</strong> {isHr ? 'Sedite ljude koji imaju zajedničke interese ili iskustva' : 'Seat people who have common interests or experiences'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>
                <strong>{isHr ? 'Balans' : 'Balance'}:</strong> {isHr ? 'Mešajte introverte sa ekstrovertima' : 'Mix introverts with extroverts'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>
                <strong>{isHr ? 'Strategija' : 'Strategy'}:</strong> {isHr ? 'Razmislite o lokaciji stolova u prostoru' : 'Think about table locations in the space'}
              </span>
            </li>
          </ul>
        </section>

        {/* Step 1 */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            1️⃣ {isHr ? 'Kategorišite Svoje Goste' : 'Categorize Your Guests'}
          </h2>
          <p className="text-gray-800 mb-4">
            {isHr
              ? 'Prvi korak je da podelite svoje goste u logične grupe. Ovo vam pomaže da vidite širu sliku i olakšava odlučivanje:'
              : 'The first step is to divide your guests into logical groups. This helps you see the bigger picture and makes decision-making easier:'}
          </p>
          
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="font-bold text-purple-900 mb-2">
                👨‍👩‍👧‍👦 {isHr ? 'Porodica' : 'Family'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Bliska porodica (roditelji, bake i deke, braća i sestre), dalja rodbina, rodbina sa decom'
                  : 'Close family (parents, grandparents, siblings), extended family, family with children'}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-bold text-blue-900 mb-2">
                👥 {isHr ? 'Prijatelji' : 'Friends'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Najbliži prijatelji, prijatelji sa fakulteta/posla, prijatelji iz detinjstva, prijatelji koji ne poznaju druge'
                  : 'Best friends, college/work friends, childhood friends, friends who don\'t know others'}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-bold text-green-900 mb-2">
                💼 {isHr ? 'Kolege i Poslovni Kontakti' : 'Colleagues and Business Contacts'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Kolege sa trenutnog posla, bivše kolege, poslovni partneri'
                  : 'Current colleagues, former colleagues, business partners'}
              </p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-bold text-yellow-900 mb-2">
                🌟 {isHr ? 'VIP Gosti' : 'VIP Guests'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Kum/kuma, starija lica, gosti sa posebnim potrebama, važne osobe u vašim životima'
                  : 'Best man/maid of honor, elderly guests, guests with special needs, important people in your lives'}
              </p>
            </div>
          </div>

          <div className="mt-4 bg-white border-2 border-purple-200 rounded-lg p-4">
            <p className="font-semibold text-purple-900 mb-2">
              💡 {isHr ? 'WeddingSeats Tip:' : 'WeddingSeats Tip:'}
            </p>
            <p className="text-gray-800 text-sm">
              {isHr
                ? 'U našoj aplikaciji možete dodati tagove svakom gostu (npr. "porodica", "najbolji prijatelji", "posao"). Ovo vam omogućava da brzo filtrirate i grupišete goste pri pravljenju rasporeda.'
                : 'In our app, you can add tags to each guest (e.g., "family," "best friends," "work"). This allows you to quickly filter and group guests when creating arrangements.'}
            </p>
          </div>
        </section>

        {/* Step 2 */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            2️⃣ {isHr ? 'Identifikujte "Mostove" Između Grupa' : 'Identify "Bridges" Between Groups'}
          </h2>
          <p className="text-gray-800 mb-4">
            {isHr
              ? '"Mostovi" su ljudi koji poznaju goste iz različitih grupa. Oni su ključni za uspešan raspored jer pomažu u povezivanju ljudi:'
              : '"Bridges" are people who know guests from different groups. They are key to successful arrangements as they help connect people:'}
          </p>
          
          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <h3 className="font-bold text-blue-900 mb-3">
              {isHr ? 'Primeri "mostova":' : 'Examples of "bridges":'}
            </h3>
            <ul className="space-y-2 text-gray-800">
              <li>• {isHr ? 'Prijatelj koji poznaje i vašu porodicu i prijatelje sa fakulteta' : 'Friend who knows both your family and college friends'}</li>
              <li>• {isHr ? 'Rođak koji je isto tako blizak sa obe porodice (vaša i partnerova)' : 'Relative who is equally close to both families (yours and your partner\'s)'}</li>
              <li>• {isHr ? 'Društvena osoba koja lako započinje razgovore sa strancima' : 'Social person who easily starts conversations with strangers'}</li>
              <li>• {isHr ? 'Stari prijatelj koji poznaje mnoge od vaših drugih prijatelja' : 'Old friend who knows many of your other friends'}</li>
            </ul>
          </div>

          <div className="bg-white border-2 border-blue-200 rounded-lg p-4">
            <p className="font-semibold text-blue-900 mb-2">
              🎯 {isHr ? 'Strategija:' : 'Strategy:'}
            </p>
            <p className="text-gray-800">
              {isHr
                ? 'Koristite "mostove" da povežete različite grupe. Ako morate da sedite ljude koji se ne poznaju, stavite "most" sa njima da započne razgovore i stvori prijatnu atmosferu.'
                : 'Use "bridges" to connect different groups. If you need to seat people who don\'t know each other, place a "bridge" with them to start conversations and create a pleasant atmosphere.'}
            </p>
          </div>
        </section>

        {/* Step 3 */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            3️⃣ {isHr ? 'Planirajte Pozicije Stolova' : 'Plan Table Positions'}
          </h2>
          <p className="text-gray-800 mb-4">
            {isHr
              ? 'Lokacija svakog stola u prostoru je jednako važna kao i to ko sedi za njim:'
              : 'The location of each table in the space is just as important as who sits at it:'}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 bg-green-50 rounded-lg p-3">
              <span className="text-2xl">⭐</span>
              <div>
                <h4 className="font-bold text-green-900">
                  {isHr ? 'Glavni Sto (ako ga imate)' : 'Main Table (if you have one)'}
                </h4>
                <p className="text-gray-800 text-sm">
                  {isHr
                    ? 'Bliska porodica, kum/kuma, možda najbliži prijatelji. Centralna pozicija sa dobrim pogledom na sve.'
                    : 'Close family, best man/maid of honor, perhaps closest friends. Central position with a good view of everything.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-purple-50 rounded-lg p-3">
              <span className="text-2xl">👴</span>
              <div>
                <h4 className="font-bold text-purple-900">
                  {isHr ? 'Starije Osobe i Gosti sa Posebnim Potrebama' : 'Elderly and Guests with Special Needs'}
                </h4>
                <p className="text-gray-800 text-sm">
                  {isHr
                    ? 'Blizu izlaza, dalje od zvučnika i muzike, lako dostupni toaleti. Izbegnite gužve i prolaznička mesta.'
                    : 'Close to exits, away from speakers and music, easy bathroom access. Avoid crowds and high-traffic areas.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-yellow-50 rounded-lg p-3">
              <span className="text-2xl">🎵</span>
              <div>
                <h4 className="font-bold text-yellow-900">
                  {isHr ? 'Mladi i Zabavna Ekipa' : 'Young People and Party Crowd'}
                </h4>
                <p className="text-gray-800 text-sm">
                  {isHr
                    ? 'Blizu plesa i muzike. Ovi gosti će najviše uživati u energičnoj atmosferi i biće prvi na plesnom podijumu.'
                    : 'Close to the dance floor and music. These guests will enjoy the energetic atmosphere the most and will be first on the dance floor.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-blue-50 rounded-lg p-3">
              <span className="text-2xl">👨‍💼</span>
              <div>
                <h4 className="font-bold text-blue-900">
                  {isHr ? 'Poslovni Gosti' : 'Business Guests'}
                </h4>
                <p className="text-gray-800 text-sm">
                  {isHr
                    ? 'Tiha zona gde mogu da razgovaraju. Možda sa lepim pogledom, ali dalje od najglasnijih delova sale.'
                    : 'Quiet zone where they can talk. Maybe with a nice view, but away from the loudest parts of the room.'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-pink-50 rounded-lg p-3">
              <span className="text-2xl">👶</span>
              <div>
                <h4 className="font-bold text-pink-900">
                  {isHr ? 'Porodice sa Decom' : 'Families with Children'}
                </h4>
                <p className="text-gray-800 text-sm">
                  {isHr
                    ? 'Blizu izlaza za lak pristup kada deci treba pauza. Idealno sa malo više prostora između stolova za kolica ili igru.'
                    : 'Close to exits for easy access when children need a break. Ideally with a bit more space between tables for strollers or play.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 4 */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-md border-l-4 border-yellow-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            4️⃣ {isHr ? 'Pravila za Balansiranje Stolova' : 'Rules for Balancing Tables'}
          </h2>
          <p className="text-gray-800 mb-4">
            {isHr
              ? 'Svaki sto treba da bude mikrokosmos dobre energije. Evo kako to postići:'
              : 'Each table should be a microcosm of good energy. Here\'s how to achieve that:'}
          </p>
          
          <div className="space-y-4">
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="font-bold text-yellow-900 mb-2">
                ⚖️ {isHr ? 'Balans Ličnosti' : 'Personality Balance'}
              </h3>
              <p className="text-gray-800 mb-2">
                {isHr
                  ? 'Ne sedite sve tihte ljude zajedno ili sve glasne ljude zajedno. Idealan sto ima:'
                  : 'Don\'t seat all quiet people together or all loud people together. An ideal table has:'}
              </p>
              <ul className="text-gray-700 text-sm space-y-1 ml-4">
                <li>• 2-3 {isHr ? 'ekstroverta koji pokreću razgovore' : 'extroverts who start conversations'}</li>
                <li>• 2-3 {isHr ? 'dobrih slušalaca' : 'good listeners'}</li>
                <li>• 2-3 {isHr ? 'ljudi koji su negde između' : 'people who are somewhere in between'}</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-bold text-orange-900 mb-2">
                🎭 {isHr ? 'Balans Generacija' : 'Generation Balance'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Mešanje generacija može biti odlično, ali pazite: ne sedite jednu osobu od 70 godina sa stolom punim ljudi od 25. Pokušajte da imate barem 2-3 osobe sličnih godina za svakim stolom.'
                  : 'Mixing generations can be great, but be careful: don\'t seat one 70-year-old with a table full of 25-year-olds. Try to have at least 2-3 people of similar ages at each table.'}
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-bold text-red-900 mb-2">
                💑 {isHr ? 'Parovi' : 'Couples'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Sedite parove zajedno, ali ih nemojte izolovati. Mešajte više parova sa singlovima da ne bi stvorili "parove vs. singlovi" dinamiku. Takođe, izbegnite sedenje svih novopečenih parova za jedan sto - može biti nezgodno.'
                  : 'Seat couples together, but don\'t isolate them. Mix several couples with singles so you don\'t create a "couples vs. singles" dynamic. Also, avoid seating all newly dating couples at one table - it can be awkward.'}
              </p>
            </div>
          </div>
        </section>

        {/* Step 5 */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-md border-l-4 border-pink-600">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            5️⃣ {isHr ? 'Testirajte i Prilagodite' : 'Test and Adjust'}
          </h2>
          <p className="text-gray-800 mb-4">
            {isHr
              ? 'Nikada nećete pogoditi savršen raspored iz prvog pokušaja. Evo kako da testirate vaš plan:'
              : 'You\'ll never nail the perfect arrangement on the first try. Here\'s how to test your plan:'}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <p className="text-gray-800">
                <strong>{isHr ? 'Vizualizujte:' : 'Visualize:'}</strong> {isHr ? 'Koristite WeddingSeats da vidite raspored u vizuelnom formatu. Lakše je uočiti probleme kada vidite stolove grafički.' : 'Use WeddingSeats to see the arrangement in visual format. It\'s easier to spot problems when you see tables graphically.'}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <p className="text-gray-800">
                <strong>{isHr ? 'Proverite svaki sto:' : 'Check each table:'}</strong> {isHr ? 'Zamislite razgovor za tim stolom. Ima li zajedničkih tema? Može li "najtiša" osoba biti uključena?' : 'Imagine the conversation at that table. Are there common topics? Can the "quietest" person be included?'}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <p className="text-gray-800">
                <strong>{isHr ? 'Pitajte pouzdane ljude:' : 'Ask trusted people:'}</strong> {isHr ? 'Pokažite raspored bliskim prijateljima ili porodici koji poznaju većinu gostiju. Oni mogu uočiti probleme koje ste vi propustili.' : 'Show the arrangement to close friends or family who know most guests. They can spot problems you missed.'}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              <p className="text-gray-800">
                <strong>{isHr ? 'Budite fleksibilni:' : 'Be flexible:'}</strong> {isHr ? 'Očekujte da ćete morati napraviti izmene kako gosti potvrđuju ili odustaju. Digitalni alati vam štede vreme ovde.' : 'Expect that you\'ll need to make changes as guests confirm or cancel. Digital tools save you time here.'}
              </p>
            </div>
          </div>
        </section>

        {/* Advanced Tips */}
        <section className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🚀 {isHr ? 'Napredni Saveti' : 'Advanced Tips'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-indigo-900 mb-2">
                💬 {isHr ? 'Kreiranje "Tema" za Stolove' : 'Creating "Themes" for Tables'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Neki wedding planneri preporučuju kreiranje mini-tema za svaki sto - npr. "sportski entuzijasti", "putnici", "ljubitelji knjiga". Ovo daje ljudima trenutnu temu za razgovor.'
                  : 'Some wedding planners recommend creating mini-themes for each table - e.g., "sports enthusiasts," "travelers," "book lovers." This gives people an instant conversation topic.'}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-indigo-900 mb-2">
                🎲 {isHr ? 'Igre za Upoznavanje za Stolom' : 'Table Icebreaker Games'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Za stolove sa ljudima koji se ne poznaju dobro, razmislite o dodavanju male kartice sa pitanjima za upoznavanje ili zanimljivim činjenicama o mladencima. Ovo pomaže da se razgovori pokrenu prirodno.'
                  : 'For tables with people who don\'t know each other well, consider adding a small card with icebreaker questions or interesting facts about the couple. This helps conversations start naturally.'}
              </p>
            </div>

            <div>
              <h3 className="font-bold text-indigo-900 mb-2">
                📸 {isHr ? 'Razmislite o Fotografijama' : 'Think About Photos'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Pozicionirajte ljude koje želite da fotografišete zajedno na stolovima koji imaju dobar osvetljenje i pozadinu. Fotografi će vam biti zahvalni!'
                  : 'Position people you want photographed together at tables with good lighting and background. Photographers will thank you!'}
              </p>
            </div>
          </div>
        </section>

        {/* Common Scenarios */}
        <section className="mb-8 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            🎪 {isHr ? 'Specifični Scenariji i Rešenja' : 'Specific Scenarios and Solutions'}
          </h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-red-400 pl-4 bg-red-50 p-3 rounded-r-lg">
              <h3 className="font-bold text-red-900 mb-2">
                {isHr ? '❓ Šta Ako: Razvedeni Roditelji?' : '❓ What If: Divorced Parents?'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Sedite ih na različite stolove sa njihovim novim partnerima i prijateljima/porodicom. Ako su odnosi veoma loši, sedite ih na različitim stranama sale. Razgovarajte sa njima unapred o rasporedu.'
                  : 'Seat them at different tables with their new partners and friends/family. If relations are very bad, seat them on different sides of the room. Talk to them about the arrangement in advance.'}
              </p>
            </div>

            <div className="border-l-4 border-orange-400 pl-4 bg-orange-50 p-3 rounded-r-lg">
              <h3 className="font-bold text-orange-900 mb-2">
                {isHr ? '❓ Šta Ako: Gost Koji Ne Poznaje Nikoga?' : '❓ What If: Guest Who Doesn\'t Know Anyone?'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Sedite ih sa najboljim "mostovima" - društvenim ljudima koji će ih odmah uvesti u razgovor. Takođe, sednite sa ljudima sa kojima dele neke interese (isti grad, ista industrija, itd).'
                  : 'Seat them with the best "bridges" - social people who will immediately bring them into conversation. Also, seat with people they share some interests with (same city, same industry, etc).'}
              </p>
            </div>

            <div className="border-l-4 border-green-400 pl-4 bg-green-50 p-3 rounded-r-lg">
              <h3 className="font-bold text-green-900 mb-2">
                {isHr ? '❓ Šta Ako: Plus-One Koji Nije Potvrđen?' : '❓ What If: Plus-One Not Confirmed?'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Napravite fleksibilne stolove gde možete lako dodati ili ukloniti mesto. Koristite WeddingSeats da brzo prilagodite raspored kada dobijete potvrdu.'
                  : 'Create flexible tables where you can easily add or remove a seat. Use WeddingSeats to quickly adjust the arrangement when you get confirmation.'}
              </p>
            </div>

            <div className="border-l-4 border-blue-400 pl-4 bg-blue-50 p-3 rounded-r-lg">
              <h3 className="font-bold text-blue-900 mb-2">
                {isHr ? '❓ Šta Ako: Previše/Premalo Ljudi za Sto?' : '❓ What If: Too Many/Few People for a Table?'}
              </h3>
              <p className="text-gray-800 text-sm">
                {isHr
                  ? 'Okrugli stolovi mogu primiti 6-10 ljudi (idealno 8), pravougaoni 8-12. Ako vam fali 1-2 osobe, razmislite o spajanju sa sličnom grupom ili korišćenju manjeg stola. Ako imate previše, razdvojite grupu logički.'
                  : 'Round tables can accommodate 6-10 people (ideally 8), rectangular 8-12. If you\'re missing 1-2 people, consider merging with a similar group or using a smaller table. If you have too many, divide the group logically.'}
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ✨ {isHr ? 'Zaključak: Savršen Raspored Ne Postoji, Ali...' : 'Conclusion: Perfect Arrangement Doesn\'t Exist, But...'}
          </h2>
          <p className="text-gray-800 mb-4">
            {isHr
              ? 'Važno je shvatiti da ne postoji "savršen" raspored koji će apsolutno sve ljude učiniti srećnim. Uvek će biti neko ko bi radije sedeo negde drugde. I to je u redu!'
              : 'It\'s important to understand that there\'s no "perfect" arrangement that will make absolutely everyone happy. There will always be someone who would rather sit somewhere else. And that\'s okay!'}
          </p>
          <p className="text-gray-800 mb-4">
            {isHr
              ? 'Vaš cilj je da napravite najbolji mogući raspored sa informacijama koje imate, poštujući potrebe vaših gostiju i osiguravajući da niko nije u neugodnoj situaciji. Ako sledite principe iz ovog vodiča, već ste 90% tamo.'
              : 'Your goal is to make the best possible arrangement with the information you have, respecting your guests\' needs and ensuring no one is in an uncomfortable situation. If you follow the principles from this guide, you\'re already 90% there.'}
          </p>
          <p className="text-gray-800 font-semibold">
            {isHr
              ? 'Na kraju dana, vaše venčanje će biti uspešno jer slavite ljubav sa ljudima do kojih vam je stalo - ne zbog savršenog rasporeda stolova. 💜'
              : 'At the end of the day, your wedding will be successful because you\'re celebrating love with people you care about - not because of a perfect table arrangement. 💜'}
          </p>
        </section>

        {/* CTA */}
        <div className="bg-purple-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">
            {isHr ? 'Spremni da Počnete?' : 'Ready to Get Started?'}
          </h3>
          <p className="mb-6">
            {isHr
              ? 'Koristite WeddingSeats da primenite sve ove savete i napravite raspored koji će vaše goste učiniti srećnim.'
              : 'Use WeddingSeats to apply all these tips and create an arrangement that will make your guests happy.'}
          </p>
          <Link
            href="/guests"
            className="inline-block bg-white text-purple-600 font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            {isHr ? 'Počnite Planiranje - Besplatno!' : 'Start Planning - Free!'}
          </Link>
        </div>
      </div>

      {/* Related Articles */}
      <aside className="mt-12 border-t pt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          {getContent({
            en: 'Related Articles',
            hr: 'Povezani Članci',
            es: 'Artículos Relacionados',
            de: 'Verwandte Artikel',
            fr: 'Articles Connexes'
          })}
        </h3>
        <Link
          href="/blog/5-wedding-seating-mistakes"
          className="block bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚫</span>
            <div>
              <h4 className="font-semibold text-gray-900 hover:text-purple-600">
                {getContent({
                  en: '5 Mistakes When Arranging Wedding Guests',
                  hr: '5 Grešaka Pri Rasporedu Gostiju na Venčanju',
                  es: '5 Errores al Organizar Mesas de Boda',
                  de: '5 Fehler bei der Hochzeitssitzordnung',
                  fr: '5 Erreurs dans le Plan de Table de Mariage'
                })}
              </h4>
              <p className="text-sm text-gray-600">
                {getContent({
                  en: 'Learn what not to do',
                  hr: 'Saznajte šta ne treba raditi',
                  es: 'Aprende qué no hacer',
                  de: 'Lernen Sie, was Sie nicht tun sollten',
                  fr: 'Apprenez ce qu\'il ne faut pas faire'
                })}
              </p>
            </div>
          </div>
        </Link>
      </aside>
    </article>
    </>
  );
}

