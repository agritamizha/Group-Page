import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import logoImg from './assets/logo.png';
import bannerImg from './assets/banner.jpg';
import iconImg from './assets/icon.jpg';

/**
 * Agri Tamizha - Modern Organic Tech Design
 * Premium dark mode with glassmorphism, bento grid, and holographic effects
 */

const App: React.FC = () => {
  const whatsappUrl = "https://chat.whatsapp.com/HvBFi18JsTE3EeW18kmQjy";
  const qrCodeImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(whatsappUrl)}&margin=10`;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.7, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Agri தமிழா',
      text: 'தமிழ் விவசாயிகளுக்கான ஒரு மாபெரும் குடும்பம். இப்போதே இணையுங்கள்!',
      url: whatsappUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(whatsappUrl);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation Variants
  const containerStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemFadeUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const scaleIn = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Bento Grid Features
  const bentoFeatures = [
    {
      title: "தகவல் ஒருங்கிணைப்பு",
      desc: "சரியான தகவல்களை மக்களிடம் கொண்டு செல்லுதல்",
      icon: "🌐",
      size: "col-span-2 row-span-2",
      gradient: "from-emerald-500/20 to-emerald-600/10"
    },
    {
      title: "Updates",
      desc: "புதிய திட்டங்கள் மற்றும் updates பகிர்வு",
      icon: "📈",
      size: "col-span-1 row-span-1",
      gradient: "from-amber-500/20 to-amber-600/10"
    },
    {
      title: "Network Building",
      desc: "Creators இணைந்து வேலை செய்ய ஒரு தளம்",
      icon: "🏗️",
      size: "col-span-1 row-span-1",
      gradient: "from-sky-500/20 to-sky-600/10"
    },
    {
      title: "Farmer Support",
      desc: "பயனுள்ள தகவல்களை வழங்குதல்",
      icon: "👨‍🌾",
      size: "col-span-2 row-span-1",
      gradient: "from-lime-500/20 to-lime-600/10"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-400 origin-left z-[101]"
        style={{ scaleX }}
      />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-6xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {['🍃', '🌾', '🌿', '💧', '🍂', '🌱'][i]}
          </motion.div>
        ))}
      </div>

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-[100] glass-morphism px-6 py-4 border-b border-emerald-400/20">
        <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={scrollToTop}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-2.5 rounded-2xl shadow-lg glow-green"
            >
              <img src={logoImg} alt="Logo" className="w-10 h-10 object-contain" />
            </motion.div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Agri <span className="neon-text-gold">தமிழா</span>
            </h1>
          </motion.div>
          <motion.a
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-emerald-400 to-emerald-500 text-emerald-950 px-6 py-3 rounded-xl text-sm font-black shadow-xl glow-green"
          >
            <span className="relative z-10">🚀 Join Group</span>
          </motion.a>
        </div>
      </nav>

      {/* HERO SECTION with Background Image */}
      <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: heroY }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${bannerImg})`,
            }}
          />
          <div className="absolute inset-0 dark-gradient-overlay" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
          style={{ opacity: heroOpacity }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
            className="inline-flex items-center gap-3 glass-morphism px-6 py-3 rounded-full mb-8 border border-emerald-400/30"
          >
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse glow-green" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Sri Lankan Agri Network</span>
          </motion.div>

          <motion.h3
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight pb-2"
          >
            <span className="block text-white/90 mb-4">விவசாயத்தின்</span>
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="inline-block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-amber-400 bg-[length:200%_auto]"
              style={{
                textShadow: "0 0 40px rgba(16, 185, 129, 0.3)"
              }}
            >
              நவீன தோழன்
            </motion.span>
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-emerald-100/80 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-bold mb-12"
          >
            விவசாயத்தை நேசிக்கும் இதயங்களை ஒன்றிணைக்கும் மிகப்பெரிய டிஜிட்டல் குடும்பம்.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 bg-gradient-to-r from-emerald-400 to-emerald-500 text-emerald-950 rounded-2xl font-black text-lg shadow-2xl glow-green-hover border-2 border-emerald-300/50"
            >
              இப்போதே இணையுங்கள்
            </motion.a>
            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-10 py-5 glass-morphism glass-morphism-hover text-white rounded-2xl font-black text-lg border-2 border-white/20"
            >
              பகிர்
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{
            opacity: { delay: 1.5 },
            y: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-emerald-400 rounded-full" />
          </div>
        </motion.div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 w-full py-24 space-y-32">

        {/* ABOUT SECTION - Glassmorphism */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerStagger}
          className="glass-morphism rounded-[3rem] p-10 md:p-16 border border-emerald-400/20"
        >
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div
              variants={itemFadeUp}
              className="w-full lg:w-1/2 overflow-hidden rounded-[2rem] shadow-2xl border-4 border-emerald-400/30 glow-green"
            >
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?q=80&w=1200&auto=format&fit=crop"
                alt="Agriculture Collaboration"
                className="w-full h-[400px] object-cover"
              />
            </motion.div>

            <div className="flex-grow lg:w-1/2">
              <motion.div variants={itemFadeUp} className="flex items-center gap-4 mb-8">
                <div className="h-12 w-1.5 bg-gradient-to-b from-emerald-400 to-amber-400 rounded-full glow-green" />
                <h3 className="text-5xl font-black neon-text-green">எங்கள் பயணம்</h3>
              </motion.div>

              <div className="text-emerald-100/90 text-lg space-y-6 leading-relaxed">
                <motion.p variants={itemFadeUp}>
                  Social Media-வில் விவசாயத்திற்காக உழைக்கும் பலர் இருக்கின்றார்கள். — <span className="neon-text-gold font-black">அவர்களை பார்த்தபோது ஒரு உண்மை புரிந்தது — நாம் தனியாக இல்லை.</span> அறிவு இருக்கின்றது. அனுபவம் இருக்கின்றது. முயற்சி இருக்கின்றது.ஆனா எல்லோரும் தனித்தனியாக செயல்படுகின்றோம்
                </motion.p>

                <motion.div
                  variants={scaleIn}
                  className="glass-morphism p-8 rounded-3xl border-l-4 border-amber-400 glow-gold italic font-bold text-white"
                >
                  <p className="text-xl leading-relaxed">
                    அதனால்தான் ஒரு முடிவு எடுத்தோம் —
                    “விவசாயத்தை நேசிக்கும் இதயங்களை ஒன்றிணைக்கும் ஒரு மாபெரும் டிஜிட்டல் குடும்பம் உருவாக்க வேண்டும்” என்று.
                    அந்த எண்ணத்தில்தான் இந்த "விவசாயம்" WhatsApp குழு உருவாக்கப்பட்டது.

                  </p>
                </motion.div>

                <motion.p variants={itemFadeUp}>
                  ஒவ்வொருவரின் அறிவும் அனுபவமும்
                  இன்னொருவருக்கு உதவியாக மாற வேண்டும்.
                  நாம் இணையும் ஒவ்வொரு தருணமும் விவசாயத்தின் வளர்ச்சிக்கான ஒரு புதிய படியாகும்.
                </motion.p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FEATURES SECTION - Premium Card Layout */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-5xl md:text-7xl font-black neon-text-green mb-6">குழுவின் செயல்பாடுகள்</h3>
            <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 to-amber-400 mx-auto rounded-full glow-green" />
          </motion.div>

          <motion.div
            variants={containerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Large Feature Card 1 */}
            <motion.div
              variants={itemFadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="lg:col-span-2 glass-morphism glass-morphism-hover rounded-[3rem] overflow-hidden border-2 border-emerald-400/20 glow-green-hover"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-[300px] md:h-auto overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop"
                    alt="Information Sharing"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent" />
                </div>
                <div className="p-10 md:p-12 flex flex-col justify-center">
                  <div className="text-6xl mb-6">🌐</div>
                  <h4 className="text-4xl font-black text-white mb-4">தகவல் ஒருங்கிணைப்பு</h4>
                  <p className="text-emerald-100/80 text-lg leading-relaxed mb-6">
                    சரியான தகவல்களை மக்களிடம் கொண்டு செல்லுதல். விவசாயிகளுக்கு தேவையான அனைத்து தகவல்களும் ஒரே இடத்தில்.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              variants={itemFadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-morphism glass-morphism-hover rounded-[3rem] overflow-hidden border-2 border-amber-400/20 glow-gold-hover"
            >
              <div className="relative h-[250px] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=800&auto=format&fit=crop"
                  alt="Video Updates"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-5xl mb-3">📈</div>
                  <h4 className="text-3xl font-black text-white mb-2">Updates</h4>
                </div>
              </div>
              <div className="p-8">
                <p className="text-emerald-100/80 text-base leading-relaxed">
                  புதிய திட்டங்கள் மற்றும் updates பகிர்வு. தினசரி விவசாய குறிப்புகள் மற்றும் வழிகாட்டுதல்கள்.
                </p>
              </div>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              variants={itemFadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-morphism glass-morphism-hover rounded-[3rem] overflow-hidden border-2 border-sky-400/20"
            >
              <div className="relative h-[250px] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=800&auto=format&fit=crop"
                  alt="Network Building"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/95 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="text-5xl mb-3">🏗️</div>
                  <h4 className="text-3xl font-black text-white mb-2">Network Building</h4>
                </div>
              </div>
              <div className="p-8">
                <p className="text-emerald-100/80 text-base leading-relaxed">
                  Creators இணைந்து வேலை செய்ய ஒரு தளம். வலுவான தொழில்முறை நெட்வொர்க் உருவாக்கம்.
                </p>
              </div>
            </motion.div>

            {/* Feature Card 4 */}
            <motion.div
              variants={itemFadeUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="lg:col-span-2 glass-morphism glass-morphism-hover rounded-[3rem] overflow-hidden border-2 border-lime-400/20"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-10 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <div className="text-6xl mb-6">👨‍🌾</div>
                  <h4 className="text-4xl font-black text-white mb-4">Farmer Support</h4>
                  <p className="text-emerald-100/80 text-lg leading-relaxed mb-6">
                    பயனுள்ள தகவல்களை வழங்குதல். விவசாயிகளுக்கு தேவையான ஆதரவு மற்றும் வழிகாட்டுதல் 24/7.
                  </p>
                  <div className="flex gap-4">
                    <div className="glass-morphism px-6 py-3 rounded-xl border border-emerald-400/30">
                      <div className="text-2xl font-black neon-text-green">100%</div>
                      <div className="text-xs text-emerald-100/70">Free Support</div>
                    </div>
                    <div className="glass-morphism px-6 py-3 rounded-xl border border-amber-400/30">
                      <div className="text-2xl font-black neon-text-gold">24/7</div>
                      <div className="text-xs text-emerald-100/70">Available</div>
                    </div>
                  </div>
                </div>
                <div className="relative h-[300px] md:h-auto overflow-hidden order-1 md:order-2">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=800&auto=format&fit=crop"
                    alt="Farmer Support"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* PREMIUM CTA - Holographic Membership Card */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerStagger}
        >
          <div className="glass-morphism rounded-[4rem] p-12 md:p-20 relative overflow-hidden border-2 border-emerald-400/30 holographic-border">
            <div className="holographic absolute inset-0 opacity-20" />

            <motion.h3
              variants={itemFadeUp}
              className="text-5xl md:text-7xl font-black text-center mb-16 relative z-10"
            >
              Join the <span className="neon-text-gold">Agri</span> <span className="neon-text-green">Network</span>
            </motion.h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-16 relative z-10">
              <motion.div
                variants={scaleIn}
                whileHover={{ rotate: 2, scale: 1.05 }}
                className="glass-morphism p-10 rounded-[3rem] glow-green border-4 border-emerald-400/40"
              >
                <img src={qrCodeImageUrl} alt="QR Code" className="w-64 h-64 object-contain" />
              </motion.div>

              <div className="text-center md:text-left space-y-8 max-w-md">
                <motion.div variants={itemFadeUp} className="flex items-center gap-6 justify-center md:justify-start">
                  <img src={iconImg} alt="Agri" className="w-20 h-20 rounded-2xl object-cover border-4 border-amber-400 shadow-2xl glow-gold" />
                  <div>
                    <h4 className="text-white font-black text-3xl">விவசாயம்</h4>
                    <div className="inline-block neon-text-green text-xs font-black uppercase tracking-wider mt-2 glass-morphism px-4 py-2 rounded-full border border-emerald-400/30">Verified Network</div>
                  </div>
                </motion.div>

                <motion.p variants={itemFadeUp} className="text-emerald-100/80 text-xl leading-relaxed">
                  The exclusive digital home for <span className="neon-text-green font-bold">Sri Lankan</span> agricultural innovators
                </motion.p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    href={whatsappUrl}
                    target="_blank"
                    className="flex-grow py-5 px-8 bg-gradient-to-r from-emerald-400 to-emerald-500 text-emerald-950 rounded-2xl font-black text-center text-lg glow-green-hover border-2 border-emerald-300/50"
                  >
                    Join Now
                  </motion.a>
                  <motion.button
                    variants={scaleIn}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleShare}
                    className="p-5 glass-morphism glass-morphism-hover text-white rounded-2xl border-2 border-white/20"
                  >
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer className="glass-morphism text-white relative z-10 mt-auto border-t border-emerald-400/20 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h4 className="text-3xl font-black mb-4">Agri <span className="neon-text-gold">தமிழா</span></h4>
              <p className="text-emerald-100/70 text-base leading-relaxed mb-6">
                விவசாயத்தை நேசிக்கிறவர்களுக்காக உருவாக்கப்பட்ட ஒரு டிஜிட்டல் குடும்பம்
              </p>

              <div className="flex items-center gap-3">
                {[
                  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=61583665466868", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
                  { name: "Instagram", url: "https://www.instagram.com/agritamizha", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z M17.5 6.5h.01 M7.5 21h9A4.5 4.5 0 0021 16.5v-9A4.5 4.5 0 0016.5 3h-9A4.5 4.5 0 003 7.5v9A4.5 4.5 0 007.5 21z" },
                  { name: "YouTube", url: "https://youtube.com/channel/UCVs8Fdg9VuCqC7fCSFwiNRQ?si=k0NZ19AjY8khwVaM", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
                  { name: "Tiktok", url: "https://www.tiktok.com/@agritamizha", icon: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" },
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-11 h-11 rounded-xl glass-morphism glass-morphism-hover flex items-center justify-center text-emerald-400 border border-emerald-400/20"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={social.icon} /></svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h5 className="neon-text-gold font-black text-sm uppercase tracking-wider mb-6">Who Is This For?</h5>
              <ul className="space-y-3 text-base text-emerald-100/80">
                {['Video Creators', 'Agri Startups', 'Agri Companies', 'Service Providers', 'Trainers / Teachers',].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 8, color: '#10b981' }}
                    className="cursor-pointer flex items-center gap-2 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 glow-green" /> {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              <h5 className="neon-text-gold font-black text-sm uppercase tracking-wider mb-6">Our Objectives</h5>
              <ul className="space-y-3 text-base text-emerald-100/80">
                {[
                  { text: 'Information Sharing', icon: '🎯' },
                  { text: 'Guidance & Support', icon: '🛡️' },
                  { text: 'Network Building', icon: '🤝' },
                  { text: 'Agri updates', icon: '🎬' },
                  { text: 'Farmer Support', icon: '👨‍🌾' },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 8, color: '#10b981' }}
                    className="cursor-pointer flex items-center gap-3 transition-colors"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span>{`0${i + 1}. ${item.text}`}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h5 className="neon-text-gold font-black text-sm uppercase tracking-wider mb-6">Contact Us</h5>
              <div className="space-y-4">
                <a href="https://wa.me/94702597012" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                  <div className="w-11 h-11 rounded-xl glass-morphism glass-morphism-hover flex items-center justify-center text-emerald-400 glow-green-hover border border-emerald-400/20">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  </div>
                  <span className="text-base font-bold text-emerald-100 group-hover:text-emerald-400 transition-colors">WhatsApp</span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl glass-morphism flex items-center justify-center text-amber-400 border border-amber-400/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-base font-bold text-emerald-100">agritamizha@gmail.com</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full h-px bg-emerald-400/20 mb-6" />
          <p className="text-center text-xs font-bold uppercase tracking-wider text-emerald-100/50">
            © 2026 Agri  தமிழா . Built  for  Farmers with ❤️
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Widget - Desktop Only */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="hidden md:flex fixed bottom-24 right-8 z-[200] w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full items-center justify-center shadow-2xl glow-green-hover border-4 border-white/20"
      >
        <svg className="w-9 h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.a>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0.8 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="hidden md:flex fixed bottom-8 right-8 z-[200] glass-morphism glass-morphism-hover w-14 h-14 rounded-2xl items-center justify-center text-emerald-400 border-2 border-emerald-400/30 glow-green-hover scroll-to-top"
        style={{ pointerEvents: showScrollTop ? 'auto' : 'none' }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" /></svg>
      </motion.button>
    </div >
  );
};

export default App;
