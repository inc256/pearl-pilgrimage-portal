import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import faqData from "@/data/ai_data.json";
import companyInfo from "@/data/company-info.json";

// Types
interface FAQ {
  id: string;
  keywords: string[];
  answer: string;
}

interface CompanyInfo {
  name: string;
  shortName: string;
  phone: {
    main: string;
    display: string;
    alternative: string[];
  };
  office: {
    address: string;
    city: string;
    country: string;
    googleMaps: string;
  };
  workingHours: {
    weekdays: string;
    hours: string;
  };
}

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ type: 'user' | 'bot'; text: string; timestamp: string }[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Load FAQ data
  const faqs: FAQ[] = faqData.faqs || [];
  const company: CompanyInfo = companyInfo;

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          type: 'bot',
          text: `Assalamu alaikum. I am your ${company.name} AI assistant. How can I help you with your pilgrimage journey today?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, []);

  // Get current time for timestamp
  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Find answer in FAQ
  const findAnswer = (question: string): string | null => {
    const lowerQuestion = question.toLowerCase().trim();
    
    for (const faq of faqs) {
      for (const keyword of faq.keywords) {
        if (lowerQuestion.includes(keyword.toLowerCase()) || 
            keyword.toLowerCase().includes(lowerQuestion) ||
            lowerQuestion.split(' ').some(word => word.length > 3 && keyword.toLowerCase().includes(word))) {
          return faq.answer;
        }
      }
    }
    return null;
  };

  // Get AI response
  const getAIResponse = (question: string): { found: boolean; response: string } => {
    const lowerQuestion = question.toLowerCase().trim();

    // Check greetings
    const greetings = ["salam", "hello", "hi", "hey", "assalamu", "good morning", "good afternoon"];
    if (greetings.some(g => lowerQuestion.includes(g))) {
      return { 
        found: true, 
        response: `Wa alaikum assalam. Welcome to ${company.name}. I am here to help with packages, bookings, payments, and any questions you have. What would you like to know?` 
      };
    }

    // Check thank you
    const thanks = ["thank", "thanks", "jazak", "shukran", "barakallahu"];
    if (thanks.some(g => lowerQuestion.includes(g))) {
      return { 
        found: true, 
        response: "Barakallahu feek. It is my pleasure to assist. If you need anything else, I am always here. May Allah accept your intentions and make your pilgrimage easy." 
      };
    }

    // Check booking
    const booking = ["book", "booking", "reserve", "reservation"];
    if (booking.some(g => lowerQuestion.includes(g))) {
      return { 
        found: true, 
        response: `I would be happy to help you book. Please share: 1) Your preferred package (Umrah or Hajj), 2) Number of travelers, 3) Preferred dates, and 4) Your contact number. I will prepare your booking and connect you with our team.` 
      };
    }

    // Check human agent
    const human = ["human", "agent", "speak", "call", "talk", "person", "representative"];
    if (human.some(g => lowerQuestion.includes(g))) {
      return { 
        found: true, 
        response: `You can reach our team directly at ${company.phone.display} or visit our office at ${company.office.address}, ${company.office.city}. Our team is available ${company.workingHours.weekdays}, ${company.workingHours.hours}.` 
      };
    }

    // Search FAQ
    const answer = findAnswer(question);
    if (answer) {
      return { found: true, response: answer };
    }

    // Unknown question
    return { 
      found: false, 
      response: "I appreciate your question. While I do not have an immediate answer, our team would be happy to assist you directly." 
    };
  };

  // Handle sending message
  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    const timestamp = getTimestamp();

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userMessage, timestamp }]);
    setInputValue("");
    setHasInteracted(true);
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const result = getAIResponse(userMessage);
      
      if (result.found) {
        setMessages(prev => [...prev, { type: 'bot', text: result.response, timestamp: getTimestamp() }]);
        setIsTyping(false);
      } else {
        // Unknown - show response then WhatsApp redirect
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: result.response, 
          timestamp: getTimestamp() 
        }]);
        setIsTyping(false);
        
        // Show WhatsApp redirect message after short delay
        setTimeout(() => {
          const waMessage = `I have sent your question to our team via WhatsApp. You will receive a response within 24 hours during working hours.\n\nClick the button below to continue the conversation on WhatsApp.`;
          setMessages(prev => [...prev, { 
            type: 'bot', 
            text: waMessage, 
            timestamp: getTimestamp() 
          }]);
        }, 800);
      }
    }, 1000 + Math.random() * 800);
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // WhatsApp redirect URL
  const getWhatsAppUrl = (question?: string) => {
    const baseUrl = `https://api.whatsapp.com/send/?phone=${company.phone.main.replace('+', '')}&type=phone_number&app_absent=0`;
    if (question) {
      const text = `Assalamu alaikum. I have a question about: ${question}\n\nI would appreciate your guidance on this matter.`;
      return `${baseUrl}&text=${encodeURIComponent(text)}`;
    }
    return baseUrl;
  };

  // Quick replies
  const quickReplies = [
    { label: "Umrah Prices", query: "umrah price uganda" },
    { label: "Hajj 2027", query: "hajj 2027 price" },
    { label: "Package Inclusions", query: "what is included" },
    { label: "Booking Process", query: "how do i book" },
    { label: "Office Location", query: "office location" },
    { label: "Contact Number", query: "phone number" }
  ];

  return (
    <>
      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 bg-[#5C0120] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-[#4a0019] transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Chat with AI assistant"
      >
        <MessageCircle size={24} />
      </button>

      {/* Close FAB when open */}
      <button
        onClick={() => setIsOpen(false)}
        className={`fixed bottom-6 right-6 z-50 bg-[#5C0120] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-[#4a0019] transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
        aria-label="Close chat"
      >
        <X size={24} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-[rgba(92,1,32,0.06)] overflow-hidden transition-all duration-300 transform ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ height: '580px', maxHeight: 'calc(100vh - 120px)' }}
      >
        {/* Header */}
        <div className="bg-[#5C0120] px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm border-2 border-white/20 flex-shrink-0">
            PH
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-serif text-white text-sm font-semibold">{company.shortName} AI</h3>
            <p className="text-white/70 text-xs">Online · Ready to assist</p>
          </div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-[#faf8f8] space-y-3" style={{ height: 'calc(100% - 130px)' }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.type === 'user'
                    ? 'bg-[#5C0120] text-white rounded-br-none'
                    : 'bg-white text-[#1a1212] border border-[rgba(92,1,32,0.06)] shadow-sm rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <span className={`text-[10px] mt-1 block ${msg.type === 'user' ? 'text-white/50 text-right' : 'text-[#8b7676]'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-[rgba(92,1,32,0.06)] shadow-sm rounded-2xl rounded-bl-none px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-[rgba(92,1,32,0.3)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-2 h-2 bg-[rgba(92,1,32,0.3)] rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                  <span className="w-2 h-2 bg-[rgba(92,1,32,0.3)] rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></span>
                </div>
              </div>
            </div>
          )}

          {/* WhatsApp Redirect Button for unknown questions */}
          {messages.length > 0 && messages[messages.length - 1]?.type === 'bot' && 
           messages[messages.length - 1]?.text.includes('WhatsApp') && (
            <div className="flex justify-center">
              <a
                href={getWhatsAppUrl(
                  messages.length > 1 && messages[messages.length - 2]?.type === 'user' 
                    ? messages[messages.length - 2].text 
                    : undefined
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#1da851] transition-all shadow-md hover:shadow-lg"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Ask on WhatsApp
              </a>
            </div>
          )}

          {/* Quick Replies - show only before first interaction */}
          {!hasInteracted && (
            <div className="flex flex-wrap gap-2 justify-start pt-1">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInputValue(reply.query);
                    setTimeout(handleSend, 100);
                  }}
                  className="bg-white border border-[rgba(92,1,32,0.12)] text-[#5C0120] px-4 py-1.5 rounded-full text-xs font-medium hover:bg-[#5C0120] hover:text-white hover:border-[#5C0120] transition-all"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[rgba(92,1,32,0.06)] p-3 flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 bg-[#faf8f8] border border-[rgba(92,1,32,0.08)] rounded-xl text-sm focus:outline-none focus:border-[#5C0120] focus:ring-2 focus:ring-[rgba(92,1,32,0.1)] transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-[#5C0120] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#4a0019] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default WhatsAppButton;