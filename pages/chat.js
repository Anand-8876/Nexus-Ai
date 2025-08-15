import { useState, useEffect, useRef } from 'react';
import { Plus, MessageSquare, Send, User, Bot, Loader, KeyRound, Sparkles, Menu, X } from 'lucide-react';

export default function AIAssistant() {
    const [currentView, setCurrentView] = useState('login');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleLogin = () => {
        setLoginLoading(true);
        // Simulate API call
        setTimeout(() => {
            setCurrentView('chat');
            setMessages([{
                text: "Hello! I'm Nexus AI, your intelligent assistant. I'm here to help you with questions, analysis, creative tasks, and much more. How can I assist you today?",
                isUser: false
            }]);
            setLoginLoading(false);
        }, 1500);
    };

    const simulateAIResponse = (userInput) => {
        const responses = [
            "That's an interesting question! Let me think about that for a moment...",
            "I'd be happy to help you with that. Here's what I think:",
            "Great question! Based on my understanding:",
            "Let me break this down for you:",
            "That's a fascinating topic. Here's my perspective:"
        ];

        const topics = {
            hello: "Hello there! It's great to meet you. I'm Nexus AI, and I'm here to assist you with whatever you need.",
            code: "I can help you with coding! Whether it's debugging, explaining concepts, or writing new code, I'm here to assist.",
            weather: "I'd love to help with weather information, but I don't have access to real-time weather data in this demo. However, I can discuss weather patterns and forecasting!",
            ai: "Artificial Intelligence is a fascinating field! I'm an example of conversational AI, designed to understand and respond to human queries in a helpful way.",
            default: "That's an interesting topic! I'm here to help you explore ideas, answer questions, and assist with various tasks."
        };

        const lowerInput = userInput.toLowerCase();
        let response = responses[Math.floor(Math.random() * responses.length)] + " ";

        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            response = topics.hello;
        } else if (lowerInput.includes('code') || lowerInput.includes('programming')) {
            response = topics.code;
        } else if (lowerInput.includes('weather')) {
            response = topics.weather;
        } else if (lowerInput.includes('ai') || lowerInput.includes('artificial intelligence')) {
            response = topics.ai;
        } else {
            response += topics.default;
        }

        return response;
    };

    const handleSend = async () => {
        if (input.trim() === '' || isLoading) return;

        const userMessage = { text: input, isUser: true };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        // Simulate AI processing time
        setTimeout(() => {
            const aiResponse = simulateAIResponse(currentInput);
            const botMessage = { text: aiResponse, isUser: false };
            setMessages(prev => [...prev, botMessage]);
            setIsLoading(false);
        }, 1000 + Math.random() * 2000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const startNewChat = () => {
        setMessages([{
            text: "Hello! I'm Nexus AI, your intelligent assistant. How can I help you today?",
            isUser: false
        }]);
    };

    if (currentView === 'login') {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white font-sans">
                <div className="w-full max-w-md p-8 space-y-8 bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-700/50 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="text-center">
                        <div className="flex justify-center mb-6">
                            <div className="relative">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                    <Sparkles size={32} className="text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                            Nexus AI
                        </h1>
                        <p className="mt-3 text-gray-300">Your intelligent conversation partner devloped by Anand</p>
                        <p className="mt-1 text-sm text-gray-400">Please sign in to continue</p>
                    </div>
                    
                    <div className="space-y-6">
                        <div className="relative">
                            <input
                                placeholder="you@example.com"
                                className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 backdrop-blur-sm"
                                type="email"
                            />
                        </div>
                        
                        <div className="relative">
                            <input
                                placeholder="••••••••"
                                className="w-full px-4 py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200 backdrop-blur-sm"
                                type="password"
                            />
                        </div>
                        
                        <button
                            onClick={handleLogin}
                            disabled={loginLoading}
                            className="w-full flex justify-center items-center gap-3 px-4 py-4 font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {loginLoading ? (
                                <>
                                    <Loader className="animate-spin" size={20} />
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <>
                                    <KeyRound size={20} />
                                    <span>Sign In</span>
                                </>
                            )}
                        </button>
                    </div>

                    <div className="pt-4 border-t border-gray-700/50">
                        <p className="text-xs text-center text-gray-400">
                            This is a demo application. Any credentials will work.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white font-sans">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg border border-gray-700"
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 w-64 h-full bg-gray-800/90 backdrop-blur-sm border-r border-gray-700/50 p-4 flex flex-col transition-transform duration-300`}>
                <div className="flex items-center mb-8 mt-8 lg:mt-0">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <Sparkles size={20} className="text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                        Nexus AI
                    </h1>
                </div>
                
                <button 
                    onClick={startNewChat}
                    className="flex items-center justify-center w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl p-3 mb-6 transition-all duration-200 transform hover:scale-[1.02]"
                >
                    <Plus size={20} className="mr-2" />
                    New Chat
                </button>
                
                <div className="flex-grow overflow-y-auto pr-2">
                    <h2 className="text-sm font-semibold text-gray-400 mb-3">Recent Conversations</h2>
                    <div className="space-y-2">
                        <div className="p-3 bg-gray-700/50 rounded-xl cursor-pointer truncate hover:bg-gray-700/70 transition-colors">
                            What is machine learning?
                        </div>
                        <div className="p-3 rounded-xl cursor-pointer truncate hover:bg-gray-700/50 transition-colors">
                            Help with React components
                        </div>
                        <div className="p-3 rounded-xl cursor-pointer truncate hover:bg-gray-700/50 transition-colors">
                            Creative writing ideas
                        </div>
                        <div className="p-3 rounded-xl cursor-pointer truncate hover:bg-gray-700/50 transition-colors">
                            Data analysis tips
                        </div>
                    </div>
                </div>
                
                <div className="border-t border-gray-700/50 pt-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3">
                            <User size={20} />
                        </div>
                        <div>
                            <div className="font-medium">User</div>
                            <div className="text-xs text-gray-400">Free Plan</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col lg:ml-0">
                <div className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-4xl mx-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex items-start gap-4 my-8 ${msg.isUser ? 'justify-end' : ''}`}>
                                {!msg.isUser && (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Bot size={20} className="text-white" />
                                    </div>
                                )}
                                <div className={`p-4 rounded-2xl max-w-2xl shadow-lg ${
                                    msg.isUser 
                                        ? 'bg-gradient-to-br from-indigo-600 to-purple-600 rounded-br-md text-white' 
                                        : 'bg-gray-700/70 backdrop-blur-sm rounded-bl-md border border-gray-600/30'
                                }`}>
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                                </div>
                                {msg.isUser && (
                                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <User size={20} />
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="flex items-start gap-4 my-8">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <Bot size={20} className="text-white" />
                                </div>
                                <div className="p-4 rounded-2xl max-w-2xl bg-gray-700/70 backdrop-blur-sm rounded-bl-md border border-gray-600/30">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-6 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Message Nexus AI..."
                                className="w-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-2xl p-4 pr-16 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition-all duration-200"
                                rows="1"
                                style={{minHeight: '56px'}}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || input.trim() === ''}
                                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <p className="text-xs text-center text-gray-400 mt-3">
                            Nexus AI can make mistakes. Please verify important information.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}