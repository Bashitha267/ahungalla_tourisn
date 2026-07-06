'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, ArrowUpRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: Date;
  isWhatsAppCTA?: boolean;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function Chatbot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Constants
  const WHATSAPP_NUMBER = '94912234567';
  const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

  const FAQS_EN: FAQItem[] = [
    {
      id: 'tours',
      question: 'What tour packages do you offer?',
      answer: 'We offer three signature private tour packages:\n\n🌴 **Half-Day Excursion** ($45/person): Includes Madu River mangrove safari, Cinnamon Island, and Kosgoda Sea Turtle Hatchery.\n\n🚗 **01-Day Tour** ($85/person): Includes Galle Dutch Fort, Bentota beach/water sports, and Madu River safari.\n\n⛰️ **02-Day Expedition** ($175/person): Covers Kandy, Sigiriya Lion Rock, Nuwara Eliya tea hills, and Yala wildlife safari.\n\nAll packages include a private AC vehicle, fuel, highway tolls, a licensed guide, and passenger insurance.'
    },
    {
      id: 'private',
      question: 'Are the tours private or shared?',
      answer: 'All Berty Tours are **100% private** for you and your group. You will travel in a private, air-conditioned vehicle (modern car, luxury van, or SUV) with your own dedicated SLTDA-licensed tourist guide lecturer.'
    },
    {
      id: 'pickup',
      question: 'Is hotel pickup & drop-off included?',
      answer: 'Yes! We provide **free hotel pickup and drop-off** from hotels in Ahungalla, Bentota, Kosgoda, Induruwa, Ambalangoda, Hikkaduwa, and Balapitiya. For other locations, we can arrange transfers for a small surcharge.'
    },
    {
      id: 'custom',
      question: 'Can I customize my tour itinerary?',
      answer: 'Absolutely! Since our tours are completely private, we can adjust routes, timings, and sightseeing stops to match your preferences. We can also organize custom multi-day tours across Sri Lanka. Message Berty on WhatsApp to design your custom route!'
    },
    {
      id: 'booking',
      question: 'How do I book or customize a tour?',
      answer: 'To book a tour, you can click the **"Book / Inquire Now"** button on any package page to submit a form. Alternatively, you can message Berty directly on WhatsApp for instant booking, custom adjustments, and quick response times.'
    }
  ];

  const FAQS_DE: FAQItem[] = [
    {
      id: 'tours',
      question: 'Welche Touren bieten Sie an?',
      answer: 'Wir bieten drei exklusive private Touren an:\n\n🌴 **Halbtagestour** ($45/Person): Beinhaltet Madu River Boots-Safari, Zimtinsel & Kosgoda Schildkröten-Farm.\n\n🚗 **Eintägige Tour** ($85/Person): Beinhaltet Galle Dutch Fort, Bentota Strand/Wassersport und Madu River Safari.\n\n⛰️ **Zweitägige Tour** ($175/Person): Umfasst Kandy, Sigiriya Löwenfelsen, Nuwara Eliya Teefelder und Yala Nationalpark Safari.\n\nAlle Preise beinhalten ein privates klimatisiertes Fahrzeug, Benzin, Mautgebühren, einen zertifizierten Reiseleiter und eine Insassenversicherung.'
    },
    {
      id: 'private',
      question: 'Sind die Touren privat oder in der Gruppe?',
      answer: 'Alle Touren von Berty Tours sind **zu 100% privat** nur für Ihre Familie/Gruppe. Sie reisen in einem komfortablen, klimatisierten Fahrzeug mit Ihrem eigenen lizenzierten Reiseleiter.'
    },
    {
      id: 'pickup',
      question: 'Ist der Hoteltransfer inklusive?',
      answer: 'Ja! Wir bieten **kostenlose Abholung und Rückbringung** für alle Hotels in den Regionen Ahungalla, Bentota, Kosgoda, Induruwa, Ambalangoda, Hikkaduwa und Balapitiya. Für entferntere Orte können wir den Transfer gegen einen geringen Aufpreis organisieren.'
    },
    {
      id: 'custom',
      question: 'Kann ich meine Reiseroute anpassen?',
      answer: 'Absolut! Da unsere Touren privat sind, können wir die Route, Zeiten und Zwischenstopps flexibel anpassen. Wir planen auch maßgeschneiderte Rundreisen durch ganz Sri Lanka. Schreiben Sie Berty auf WhatsApp, um Ihre Wunschroute zu planen!'
    },
    {
      id: 'booking',
      question: 'Wie kann ich buchen oder anpassen?',
      answer: 'Sie können eine Anfrage über die Schaltfläche **"Jetzt Buchen / Anfragen"** auf der jeweiligen Tour-Detailseite senden. Für eine schnellere Buchung oder individuelle Fragen kontaktieren Sie Berty am besten direkt per WhatsApp!'
    }
  ];

  const currentFAQs = language === 'de' ? FAQS_DE : FAQS_EN;

  // Initialize welcome messages
  useEffect(() => {
    const welcomeText = language === 'de' 
      ? 'Ayubowan! 🌸 Willkommen bei Berty Tours. Ich bin Ihr digitaler Assistent. Wie kann ich Ihnen heute helfen, Ihre Traumreise in Sri Lanka zu planen?'
      : 'Ayubowan! 🌸 Welcome to Berty Tours. I am your digital travel assistant. How can I help you plan your tropical escape in Sri Lanka today?';
    
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: welcomeText,
        timestamp: new Date()
      }
    ]);

    // Show tooltip after 5 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTooltip(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [language]);

  // Handle auto scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Close tooltip when chatbot is opened
  useEffect(() => {
    if (isOpen) {
      setShowTooltip(false);
    }
  }, [isOpen]);

  const simulateBotResponse = (responseText: string, hasWhatsApp = false) => {
    setIsTyping(true);
    const typingTime = Math.min(1200, Math.max(600, responseText.length * 5));

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'bot',
          text: responseText,
          timestamp: new Date(),
          isWhatsAppCTA: hasWhatsApp
        }
      ]);
    }, typingTime);
  };

  const handleFAQClick = (faq: FAQItem) => {
    if (isTyping) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: faq.question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    // Simulate bot reply
    simulateBotResponse(faq.answer, faq.id === 'custom' || faq.id === 'booking');
  };

  const getKeywordResponse = (text: string): { response: string; hasWA: boolean } => {
    const lower = text.toLowerCase().trim();
    const isGerman = language === 'de';

    if (isGerman) {
      if (lower.includes('preis') || lower.includes('kost') || lower.includes('geld') || lower.includes('dollar') || lower.includes('euro') || lower.includes('preise')) {
        return {
          response: 'Unsere Touren starten ab $45 pro Person für die Halbtagestour, $85 für die Tagestour und $175 für unsere zweitägigen Safaris. Darin enthalten sind Privat-Fahrzeug mit AC, Benzin, Maut und Reiseleiter. Für ein genaues Angebot kontaktieren Sie uns gerne!',
          hasWA: true
        };
      }
      if (lower.includes('anpass') || lower.includes('änder') || lower.includes('route') || lower.includes('wunsch') || lower.includes('plan')) {
        return {
          response: 'Ja, all unsere Touren sind zu 100% anpassbar! Sie können Stopps hinzufügen oder weglassen. Senden Sie uns Ihre Ideen einfach direkt auf WhatsApp, damit wir sie planen können.',
          hasWA: true
        };
      }
      if (lower.includes('buch') || lower.includes('reserv') || lower.includes('anmeld')) {
        return {
          response: 'Sie können über die Webseite ein Anfrageformular ausfüllen oder Berty direkt auf WhatsApp anschreiben. WhatsApp ist am schnellsten für Buchungsbestätigungen!',
          hasWA: true
        };
      }
      if (lower.includes('galle') || lower.includes('sigiriya') || lower.includes('yala') || lower.includes('kandy') || lower.includes('safari') || lower.includes('fluss') || lower.includes('schildkröte')) {
        return {
          response: 'Das sind fantastische Reiseziele! Wir besuchen Galle Fort, den Madu Fluss, das Kosgoda Schildkrötenzentrum, den Sigiriya Löwenfelsen, Kandy und machen Jeep-Safaris in Yala. Alle diese Highlights finden Sie in unseren Programmen.',
          hasWA: false
        };
      }
      if (lower.includes('kontakt') || lower.includes('telefon') || lower.includes('nummer') || lower.includes('handy') || lower.includes('mail') || lower.includes('whatsapp')) {
        return {
          response: 'Berty ist direkt auf WhatsApp erreichbar unter +94 91 223 4567. Alternativ können Sie uns eine E-Mail an hello@bertytours.com schreiben.',
          hasWA: true
        };
      }
      if (lower.includes('hallo') || lower.includes('hi') || lower.includes('guten tag')) {
        return {
          response: 'Hallo! Wie kann ich Ihnen bei Ihren Reiseplänen für Sri Lanka behilflich sein?',
          hasWA: false
        };
      }
      // Default German response
      return {
        response: 'Das ist eine tolle Frage! Um Ihnen am besten weiterzuhelfen oder eine individuelle Reiseroute zu planen, sprechen Sie am besten direkt mit Berty auf WhatsApp.',
        hasWA: true
      };
    } else {
      // English keywords
      if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('rate') || lower.includes('dollar') || lower.includes('pay')) {
        return {
          response: 'Our tours start from $45/person for half-day trips, $85/person for full-day tours, and $175/person for 2-day expeditions. This includes a private AC vehicle, fuel, toll fees, and your licensed guide lecturer. Feel free to ask for a custom quote!',
          hasWA: true
        };
      }
      if (lower.includes('custom') || lower.includes('tailor') || lower.includes('change') || lower.includes('route') || lower.includes('plan')) {
        return {
          response: 'Yes, every tour is 100% private and customizable. You can adjust the route, times, and destinations. Contact us on WhatsApp to tailor-make your dream itinerary!',
          hasWA: true
        };
      }
      if (lower.includes('book') || lower.includes('reserv') || lower.includes('inquir')) {
        return {
          response: 'You can book by clicking "Book Now" on our packages pages, or message Berty directly on WhatsApp for instant confirmation. WhatsApp is the easiest way to book!',
          hasWA: true
        };
      }
      if (lower.includes('galle') || lower.includes('sigiriya') || lower.includes('yala') || lower.includes('kandy') || lower.includes('safari') || lower.includes('river') || lower.includes('turtle')) {
        return {
          response: 'Those are wonderful destinations! We offer Madu River boat safaris, Galle Fort tours, Kosgoda turtle releases, Sigiriya Rock climbs, Kandy temple visits, and Yala national park safaris. Check our Package catalog to find them all!',
          hasWA: false
        };
      }
      if (lower.includes('contact') || lower.includes('phone') || lower.includes('number') || lower.includes('call') || lower.includes('email') || lower.includes('whatsapp')) {
        return {
          response: 'You can contact Berty directly on WhatsApp at +94 91 223 4567 or email us at hello@bertytours.com.',
          hasWA: true
        };
      }
      if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey') || lower.includes('greetings')) {
        return {
          response: 'Hello there! How can I help you plan your journey through Sri Lanka today?',
          hasWA: false
        };
      }
      // Default English response
      return {
        response: 'That is a great question! For custom routes, pricing details, and quick answers, you can talk directly with Berty on WhatsApp.',
        hasWA: true
      };
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isTyping) return;

    const userText = inputVal.trim();
    setInputVal('');

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);

    // Get matched answer
    const { response, hasWA } = getKeywordResponse(userText);
    simulateBotResponse(response, hasWA);
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Tooltip Helper */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-3.5 mr-1 glass p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-xl max-w-[260px] text-xs relative flex flex-col space-y-1.5"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="absolute top-1.5 right-1.5 text-slate-400 hover:text-slate-655 dark:hover:text-slate-200"
            >
              <X className="h-3 w-3" />
            </button>
            <div className="flex items-center space-x-1.5 text-cyan-600 dark:text-amber-500 font-bold">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>{language === 'de' ? 'Haben Sie Fragen?' : 'Have Questions?'}</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              {language === 'de' 
                ? 'Planen Sie Ihre Sri Lanka Tour mit Berty. Klicken Sie hier, um zu chatten!'
                : 'Plan your Sri Lanka trip with Berty. Click here to start chatting!'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="w-[350px] sm:w-[400px] h-[500px] sm:h-[550px] rounded-[30px] border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-2xl flex flex-col overflow-hidden mb-4 transition-colors duration-300"
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-900 bg-gradient-to-r from-cyan-600/10 to-transparent dark:from-amber-500/10 flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative h-10 w-10 rounded-full border border-cyan-500/30 dark:border-amber-500/30 overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center shadow-inner">
                  {/* Berty Avatar placeholder */}
                  <img
                    src="https://res.cloudinary.com/dnfbik3if/image/upload/v1782981291/pkg1mb_ye9rsd.jpg"
                    alt="Berty Avatar"
                    className="object-cover h-full w-full"
                  />
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-950 animate-pulse" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    Berty Tours Chatbot
                  </h4>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center">
                    {language === 'de' ? 'Online • Hilft Ihnen' : 'Online • Ready to assist'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:text-slate-655 dark:hover:text-slate-205 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Body - Scrollable Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col min-h-0 bg-slate-50/30 dark:bg-slate-950/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    msg.sender === 'user' ? 'items-end' : 'items-start'
                  } space-y-1 max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end' : 'self-start'
                  }`}
                >
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm whitespace-pre-line font-medium ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 text-white rounded-tr-none dark:bg-amber-500 dark:text-slate-950'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200/50 dark:border-slate-850'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Render WhatsApp CTA button */}
                  {msg.isWhatsAppCTA && (
                    <motion.a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-2 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-colors self-start cursor-pointer"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>{language === 'de' ? 'Über WhatsApp chatten' : 'Chat on WhatsApp'}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </motion.a>
                  )}

                  <span className="text-[9px] text-slate-400 font-semibold px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {/* Bot typing simulation */}
              {isTyping && (
                <div className="flex flex-col items-start space-y-1 max-w-[85%] self-start">
                  <div className="p-3 px-4 bg-white dark:bg-slate-900 rounded-2xl rounded-tl-none border border-slate-200/50 dark:border-slate-855 flex items-center space-x-1.5 shadow-sm">
                    <span className="h-1.5 w-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* FAQs List Wrapper - Quick select options */}
            <div className="px-4 py-2 bg-slate-50/50 dark:bg-slate-900/10 border-t border-slate-200/60 dark:border-slate-900 shrink-0">
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block mb-2 text-left">
                {language === 'de' ? 'Häufig gestellte Fragen:' : 'Frequently Asked Questions:'}
              </span>
              <div className="flex flex-wrap gap-1.5 max-h-[105px] overflow-y-auto pr-1 pb-1">
                {currentFAQs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleFAQClick(faq)}
                    disabled={isTyping}
                    className="text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/70 hover:bg-cyan-50 dark:bg-slate-900/60 dark:hover:bg-slate-800/80 text-slate-600 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-amber-400 transition-all duration-200 text-left cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Input form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={language === 'de' ? 'Schreiben Sie eine Nachricht...' : 'Type a message...'}
                className="flex-grow rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-3.5 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 dark:focus:ring-amber-500/50 transition-all"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="h-9 w-9 rounded-xl flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 text-white dark:bg-amber-500/10 dark:hover:bg-amber-500 dark:text-amber-400 dark:hover:text-slate-950 transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none shrink-0"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl relative cursor-pointer border ${
          isOpen
            ? 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700'
            : 'bg-gradient-to-tr from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white border-cyan-500/20 dark:from-amber-500 dark:to-yellow-400 dark:hover:from-amber-400 dark:hover:to-yellow-300 dark:text-slate-950 dark:border-amber-400/20'
        }`}
        aria-label="Toggle Chatbot"
      >
        {/* Pulsing ring if closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-cyan-500/30 dark:bg-amber-500/30 animate-ping opacity-75" />
        )}
        
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </motion.button>

    </div>
  );
}
