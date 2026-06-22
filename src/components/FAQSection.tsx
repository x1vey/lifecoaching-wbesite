import { useState } from 'react';
import { faqs } from '../data/faqs';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 px-6 sm:px-12 lg:px-20 bg-brand-50 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column - Heading */}
        <div className="lg:col-span-5 relative z-10 reveal">
          <p className="text-[10px] uppercase tracking-super-wide text-brand-500 mb-6 font-medium">FAQs</p>
          <h2 className="font-serif text-5xl md:text-6xl text-brand-900 tracking-tight leading-editorial mb-8">
            Frequently <br/><span className="italic font-light text-brand-600">Asked.</span>
          </h2>
        </div>

        {/* Right Column - Accordion */}
        <div className="lg:col-span-7 relative z-10 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-brand-200 pb-4 reveal transition-all duration-500`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                className="w-full text-left py-4 flex justify-between items-center group cursor-pointer focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-xl md:text-2xl font-serif text-brand-900 group-hover:text-brand-600 transition-colors">
                  {faq.question}
                </h3>
                <span className={`transform transition-transform duration-300 text-brand-400 ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="text-brand-600 font-light leading-relaxed whitespace-pre-line">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
