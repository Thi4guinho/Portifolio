import { motion, useScroll, useTransform } from "motion/react";
import { portfolioData } from "../data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, ExternalLink, ArrowRight, Github, Linkedin, Instagram } from "lucide-react";
import { useRef, useState } from "react";
import { Language, translations } from "../translations";
import { SettingsFAB } from "./SettingsFAB";

const SectionTitle = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-baseline gap-2 md:gap-4 mb-8 md:mb-12">
    <span className="text-accent font-display text-2xl sm:text-4xl md:text-6xl opacity-70 block shrink-0">
      {number}
    </span>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-display text-3xl sm:text-5xl lg:text-6xl xl:text-8xl block leading-none"
    >
      {title}
    </motion.h2>
  </div>
);

export default function Portfolio() {
  const [lang, setLang] = useState<Language>('pt');
  const t = translations[lang];
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-white overflow-x-hidden transition-colors duration-300">
      <SettingsFAB currentLanguage={lang} onLanguageChange={setLang} />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Floating Nav */}
      <nav className="fixed bottom-6 left-0 right-0 z-[90] px-2 md:top-8 md:bottom-auto md:left-1/2 md:-translate-x-1/2 md:px-0">
        <div className="glass rounded-full mx-auto px-1 md:px-6 py-2 md:py-3 flex items-center justify-between md:justify-start gap-0 md:gap-8 w-full max-w-[380px] md:w-auto overflow-hidden">
          {[
            { label: t.nav.about, id: "sobre" },
            { label: t.nav.exp_short, full: t.nav.experience, id: "experiencia" },
            { label: t.nav.education, id: "formacao" },
            { label: t.nav.certs_short, full: t.nav.certificates, id: "certificados" }
          ].map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-tighter md:tracking-widest hover:text-accent transition-colors whitespace-nowrap px-1 md:px-2 py-1 flex-1 text-center"
            >
              <span className="md:hidden">{item.label}</span>
              <span className="hidden md:inline">{item.full || item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-noise" />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden border-b border-foreground/10">
        <div className="absolute top-8 md:top-12 left-6 md:left-12 z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-accent font-heading uppercase tracking-widest text-xs md:text-sm"
          >
            <div className="w-8 h-[1px] bg-accent" />
            Portfólio 2026
          </motion.div>
        </div>

        <div className="relative z-10">
          <motion.h1 
            initial={{ y: "100%", skewY: 10 }}
            animate={{ y: 0, skewY: 0 }}
            whileHover={{ skewX: -5, scale: 1.02 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-[22vw] sm:text-[18vw] md:text-[15vw] leading-[0.8] mt-12 mb-4 cursor-default select-none break-words sm:break-normal max-w-full"
          >
            THIAGO<br />BASSI
          </motion.h1>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-8">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="max-w-md text-lg md:text-xl font-light text-foreground/80 leading-relaxed"
            >
              {t.data.summary}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-start md:items-end gap-6"
            >
              <div className="flex flex-col items-start md:items-end gap-2">
                <span className="text-accent font-display text-4xl">01</span>
                <span className="font-heading uppercase tracking-tighter text-2xl md:text-4xl text-right">
                  {t.data.role}
                </span>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="glass px-8 py-4 rounded-full font-heading uppercase tracking-widest text-sm hover:bg-accent hover:text-white transition-all flex items-center gap-2"
              >
                {t.hero.workWithMe} <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Background Text */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 text-display text-[45vw] md:text-[30vw] opacity-[0.03] pointer-events-none whitespace-nowrap select-none overflow-hidden"
        >
          {t.hero.creative}
        </motion.div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 px-6 md:px-12 border-b border-foreground/10">
        <SectionTitle number="02" title={t.sections.about} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-heading text-3xl md:text-5xl leading-tight">
              {(t.sections as any).aboutHeadline}
              <span className="text-accent italic">{(t.sections as any).aboutHeadlineAccent}</span>.
            </h3>
            <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
              {t.data.objective}
            </p>
            <div className="flex flex-wrap gap-3">
              {portfolioData.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="px-4 py-2 text-sm border-foreground/30 hover:bg-accent hover:border-accent transition-colors">
                  {skill}
                </Badge>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 scroll-mt-32" id="contato">
            <Card className="glass border-none rounded-none p-8">
              <CardContent className="p-0 space-y-8">
                <div className="border-b border-foreground/10 pb-6">
                  <h4 className="text-2xl md:text-3xl font-heading uppercase tracking-tighter">
                    {(t.sections as any).contactHeadline}
                    <span className="text-accent italic">{(t.sections as any).contactHeadlineAccent}</span>
                  </h4>
                  <p className="text-foreground/60 text-sm font-light mt-1">
                    {lang === 'pt' ? 'Aqui estão meus contatos. O WhatsApp é a forma mais rápida de falar comigo:' : 
                     lang === 'en' ? 'Here are my contacts. WhatsApp is the fastest way to reach me:' :
                     'Aquí estão mis contactos. WhatsApp es la forma más rápida de contactarme:'}
                  </p>
                </div>
                
                <motion.a 
                  href={`https://wa.me/55${portfolioData.contact.phone.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover="hover"
                  animate={{ 
                    boxShadow: [
                      "0 0 0 0px rgba(242, 125, 38, 0)",
                      "0 0 0 10px rgba(242, 125, 38, 0.2)",
                      "0 0 0 0px rgba(242, 125, 38, 0)"
                    ],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="flex items-center gap-4 group p-4 rounded-xl bg-accent text-white shadow-lg relative overflow-hidden w-full justify-center md:justify-start"
                >
                  <div className="absolute top-2 right-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                    </span>
                  </div>
                  
                  <motion.div 
                    variants={{
                      hover: { y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } }
                    }}
                    className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0"
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase text-white/70 tracking-widest font-heading">{t.contact.phone} (WhatsApp)</p>
                    <p className="text-lg md:text-2xl font-heading truncate">{portfolioData.contact.phone}</p>
                  </div>
                </motion.a>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-foreground/5">
                  <motion.div whileHover="hover" className="flex items-center gap-4 group">
                    <motion.div 
                      variants={{
                        hover: { y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } }
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center group-hover:bg-accent transition-colors shrink-0"
                    >
                      <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase text-foreground/60 tracking-widest">{t.contact.email}</p>
                      <p className="text-sm md:text-lg font-heading truncate">{portfolioData.contact.email}</p>
                    </div>
                  </motion.div>

                  <motion.div whileHover="hover" className="flex items-center gap-4 group">
                    <motion.div 
                      variants={{
                        hover: { y: -5, transition: { type: "spring", stiffness: 400, damping: 10 } }
                      }}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full glass flex items-center justify-center group-hover:bg-accent transition-colors shrink-0"
                    >
                      <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                    <div>
                      <p className="text-[10px] uppercase text-foreground/60 tracking-widest">{t.contact.address}</p>
                      <p className="text-sm md:text-lg font-heading leading-tight">{portfolioData.contact.address}</p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-24 px-6 md:px-12 border-b border-foreground/10 bg-foreground/[0.02]">
        <SectionTitle number="03" title={t.sections.experience} />
        <div className="space-y-12">
          {t.data.experience.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 py-12 border-b border-foreground/10 group-hover:border-accent transition-colors">
                <div className="space-y-2">
                  <span className="text-accent font-display text-2xl">{exp.period}</span>
                  <h4 className="text-heading text-4xl uppercase">{exp.company}</h4>
                  <p className="text-foreground/60 font-heading tracking-widest uppercase text-sm">{exp.role}</p>
                </div>
                <ul className="space-y-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex gap-4 text-lg text-foreground/80 leading-relaxed">
                      <ArrowRight className="w-6 h-6 text-accent shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education & Certs */}
      <section id="formacao" className="py-16 md:py-24 px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          <div>
            <SectionTitle number="04" title={t.sections.education} />
            <div className="space-y-8 md:space-y-12">
              {t.data.education.map((edu) => (
                <div key={edu.institution} className="space-y-3 md:space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <h4 className="text-heading text-xl md:text-3xl sm:max-w-[70%]">{edu.institution}</h4>
                    <span className="text-accent font-display text-lg md:text-xl">{edu.period}</span>
                  </div>
                  <p className="text-lg md:text-xl text-foreground/80 leading-tight">{edu.course}</p>
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-none text-[10px] md:text-xs">{edu.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <div id="certificados">
              <SectionTitle number="05" title={t.sections.certificates} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {portfolioData.certifications.map((cert) => (
                <motion.div
                  key={cert}
                  whileHover={{ scale: 1.02 }}
                  className="glass p-4 md:p-6 flex items-center justify-between group cursor-pointer"
                >
                  <span className="font-heading text-[10px] md:text-sm uppercase tracking-wider leading-tight">{cert}</span>
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4 opacity-0 group-hover:opacity-100 transition-opacity text-accent shrink-0" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="py-12 pb-32 md:pb-12 px-6 md:px-12 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-display text-4xl">TB</div>
        
        <div className="flex gap-8">
          <motion.a 
            whileHover={{ y: -5 }} 
            href={portfolioData.social.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-foreground/60 hover:text-accent transition-colors"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>
          <motion.a 
            whileHover={{ y: -5 }} 
            href={portfolioData.social.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-foreground/60 hover:text-accent transition-colors"
          >
            <Github className="w-6 h-6" />
          </motion.a>
          <motion.a 
            whileHover={{ y: -5 }} 
            href={portfolioData.social.instagram} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-foreground/60 hover:text-accent transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </motion.a>
        </div>

        <p className="text-foreground/50 font-heading text-xs uppercase tracking-widest">
          © 2026 Thiago Bassi. {t.footer.rights}
        </p>
      </footer>
    </div>
  );
}
