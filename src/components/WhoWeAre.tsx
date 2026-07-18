export function WhoWeAre() {
  return (
    <section id="who-we-are" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="reveal mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Who We Are
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            A vision of <span className="text-gradient-warm">Prosperous Uttarakhand</span>
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="reveal overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
            <img
              src="https://himfla.com/assets/images/about-img-main.jpg"
              alt="Himalayan Flavours - women of Uttarakhand"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="reveal space-y-4 text-base leading-relaxed text-muted-foreground">
            <h3 className="text-2xl font-bold text-foreground">About Himalayan Flavours</h3>
            <p>
              Himfla was established with a vision of building livelihoods through
              micro-enterprises for women and youth — developing sustainability, improving
              household income and creating jobs in the rural areas of Uttarakhand.
            </p>
            <p>
              Our unit in Kakrighat is run by regional women producing flavoured salt and
              authentic Pahadi products. These have reached customers through 400+ retail
              stores across Uttarakhand and at festivals like Uttarayani Mela, Kissan Mela
              and Sharadotsav.
            </p>
          </div>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="reveal order-2 space-y-3 md:order-1">
            <h3 className="text-2xl font-bold">Our Objectives</h3>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "Sustainable development at grassroots level — without disrupting nature.",
                "Tackling environment & climate issues through cooperation and data.",
                "Preserving culture, tradition, cuisine and beliefs of Devbhoomi Uttarakhand.",
                "Community-based models for natural resource management.",
                "Reviving traditional tools — oakhli, jaat, soopa, tokari — as livelihoods.",
                "Documenting heritage through photography, video and audio.",
              ].map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal order-1 overflow-hidden rounded-2xl shadow-[var(--shadow-card)] md:order-2">
            <img
              src="https://himfla.com/assets/images/objectiveimg.jpg"
              alt="Himfla objectives"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        <div className="mt-20 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="reveal overflow-hidden rounded-2xl shadow-[var(--shadow-card)]">
            <img
              src="https://himfla.com/assets/images/stragiesimg.jpg"
              alt="Himfla strategies"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="reveal space-y-3">
            <h3 className="text-2xl font-bold">Our Strategies</h3>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "Collaborate with government, industry and NGOs across India and abroad.",
                "Strengthen rural livelihoods and diversify hill-farmer income.",
                "Deliver high-quality products while building exceptional customer experience.",
                "Provide income opportunities to prevent brain drain from Uttarakhand.",
              ].map((o) => (
                <li key={o} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal mt-20 rounded-3xl border border-border bg-warm-drift p-8 md:p-12">
          <h3 className="mb-4 text-2xl font-bold text-gradient-warm">पहाड़ी पिसी नूण</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              हमारा उत्पाद पहाड़ी पिसी नूण (सिलबट्टे में पिसा नमक) है। सिलबट्टा पहाड़ की नदी में
              पड़े सबसे कठोर पत्थर से बनाया जाता है। हमारे पहाड़ की महिलाओं द्वारा सेंधा नमक
              (Pink Salt) के साथ लहसुन, मिर्च, धनिया, तिमुर, अलसी, भांग, तिल, भंगिरा, हरा धनिया,
              अदरक, पीली सरसों, राई, कालाजीरा आदि अनेक हिमालयन जड़ी बूटियों को मिलाकर सिलबट्टे
              में पीसा जाता है — जिसके बाद तैयार होता है Flavoured Salt।
            </p>
            <p>
              हिमफ्ला Pvt. Ltd. उत्तराखंड राज्य की ग्रामीण महिलाओं तथा कुशल उद्यमियों के सामाजिक
              उत्थान, आर्थिक सशक्तिकरण और सामूहिक आत्मनिर्भरता हेतु निरंतर कार्यशील है।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
