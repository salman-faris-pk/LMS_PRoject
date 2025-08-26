"use client"
import { useState } from 'react';

const FAQSection = () => {
  // Sample FAQ data - can be replaced with props or API data
  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How can I pay for my appointment?",
      answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas eaque nobis, fugit odit omnis fugiat deleniti animi ab maxime cum laboriosam recusandae facere dolorum veniam quia pariatur obcaecati illo ducimus?",
      isOpen: false
    },
    {
      id: 2,
      question: "Is the cost of the appointment covered by private health insurance?",
      answer: "Answer about insurance coverage would go here.",
      isOpen: false
    },
    {
      id: 3,
      question: "Do I need a referral?",
      answer: "Answer about referrals would go here.",
      isOpen: false
    },
    {
      id: 4,
      question: "What are your opening hours?",
      answer: "Answer about opening hours would go here.",
      isOpen: false
    },
    {
      id: 5,
      question: "What can I expect at my first consultation?",
      answer: "Answer about first consultation would go here.",
      isOpen: false
    }
  ]);

  const toggleFAQ = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id 
        ? { ...faq, isOpen: !faq.isOpen } 
        : { ...faq, isOpen: false } 
    ));
  };

  return (
    <section className="bg-white">
      <div className="container max-w-4xl px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 lg:text-3xl">
          Frequently asked questions
        </h1>

        <div className="mt-12 space-y-2">
          {faqs.map((faq) => (
            <div key={faq.id} className="border-2 border-gray-100 rounded-lg">
              <button 
                className="flex items-center justify-between w-full p-5"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={faq.isOpen}
              >
                <h1 className="font-semibold text-gray-700">
                  {faq.question}
                </h1>

                <span className={`rounded-full ${faq.isOpen ? 'text-gray-400 bg-gray-200' : 'text-white bg-primary'}`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-6 h-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    {faq.isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    )}
                  </svg>
                </span>
              </button>

              {faq.isOpen && (
                <>
                  <p className="p-5 text-sm text-gray-500">
                    {faq.answer}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;