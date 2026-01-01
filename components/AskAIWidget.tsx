"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
// Changed icons: ChevronDown for minimize, ArrowUp for send
import { ChevronDown, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/lib/TranslationContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { v4 as uuidv4 } from "uuid";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function AskAIWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const [sessionId, setSessionId] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize session ID
    useEffect(() => {
        let sid = localStorage.getItem("hotelmol_session_id");
        if (!sid) {
            sid = uuidv4();
            localStorage.setItem("hotelmol_session_id", sid);
        }
        setSessionId(sid);
    }, []);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    // Listen for custom event to open chat (from mobile nav)
    useEffect(() => {
        const handleOpen = () => setIsOpen(true);
        window.addEventListener("open-ai-chat", handleOpen);
        return () => window.removeEventListener("open-ai-chat", handleOpen);
    }, []);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
        setIsLoading(true);

        try {
            const response = await fetch("https://n8n.myn8napp.online/webhook/40d5e18a-9a16-408e-b594-7d4797e085f6/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chatInput: userMsg,
                    sessionId: sessionId,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();

            // Handle various possible response formats from n8n
            let aiResponse = "Thinking process complete.";

            if (typeof data === 'string') {
                aiResponse = data;
            } else if (data.output) {
                aiResponse = data.output;
            } else if (data.response) {
                aiResponse = data.response;
            } else if (data.text) {
                aiResponse = data.text;
            } else if (Array.isArray(data) && data.length > 0) {
                aiResponse = data[0].output || data[0].text || JSON.stringify(data[0]);
            } else {
                aiResponse = JSON.stringify(data);
            }

            setMessages((prev) => [...prev, { role: "assistant", content: aiResponse }]);

        } catch (error) {
            console.error("Error sending message:", error);
            setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error connecting to the server. Please check your connection." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed z-[60] flex flex-col items-end gap-4 text-left pointer-events-none md:right-[10px] md:bottom-[10px] md:top-[10px] inset-0 md:inset-auto">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        // UI Polish: Maximize height (h-full), increased width (410px) on desktop. 
                        // Mobile: Full screen when open (top-0 bottom-0 left-0 right-0 w-full h-full).
                        className="pointer-events-auto relative w-full h-full md:w-[410px] md:h-full rounded-none md:rounded-2xl overflow-hidden flex flex-col origin-bottom-right border border-black/5 shadow-2xl backdrop-blur-3xl bg-white/70 dark:bg-black/70 ring-1 ring-black/5"
                    >
                        {/* Chat Header */}
                        <div className="p-4 bg-white/10 border-b border-white/10 text-foreground flex justify-between items-center backdrop-blur-md shrink-0">
                            <div className="flex items-center gap-3">
                                {/* UI Polish: Header icon reduced (w-16 h-16) */}
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlSpace="preserve"
                                        width="100%"
                                        height="100%"
                                        version="1.1"
                                        viewBox="0 0 203.18 203.18"
                                        className="w-full h-full text-foreground"
                                        style={{
                                            shapeRendering: "geometricPrecision",
                                            textRendering: "geometricPrecision",
                                            fillRule: "evenodd",
                                            clipRule: "evenodd",
                                        }}
                                    >
                                        <g id="Слой_x0020_1">
                                            <metadata id="CorelCorpID_0Corel-Layer" />
                                            <g id="_2278661208240">
                                                <circle fill="none" cx="101.59" cy="101.59" r="101.6" />
                                                <path fill="currentColor" d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                {/* UI Polish: Updates header title */}
                                <span className="font-semibold text-lg">{t("aiWidget.headerTitle") || "hotelmol assistant"}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hover:bg-white/20"
                                onClick={() => setIsOpen(false)}
                            >
                                {/* UI Polish: ChevronDown for minimize */}
                                <ChevronDown className="h-6 w-6" />
                            </Button>
                        </div>

                        {/* Chat Messages Area */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {/* Welcome Message */}
                            {/* UI Polish: auto-width bubble (w-fit), prominent shadows */}
                            <div className="bg-white/60 dark:bg-black/40 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none max-w-[85%] w-fit text-base shadow-lg border border-white/10 self-start">
                                {t("aiWidget.welcome") || "Hello! How can I help you today?"}
                            </div>

                            {/* Conversation History */}
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    // UI Polish: auto-width bubble (w-fit), prominent shadows
                                    className={`p-4 rounded-2xl text-base shadow-lg border border-white/10 max-w-[85%] w-fit ${msg.role === 'user'
                                        ? 'bg-[#0752A0] text-white rounded-tr-none ml-auto'
                                        : 'bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-tl-none self-start text-foreground'
                                        }`}
                                >
                                    {msg.role === 'assistant' ? (
                                        <div className="prose prose-sm dark:prose-invert max-w-none">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {msg.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.content
                                    )}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <div className="bg-white/60 dark:bg-black/40 backdrop-blur-sm p-4 rounded-2xl rounded-tl-none max-w-[85%] w-fit self-start border border-white/10 flex items-center gap-2">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    </div>
                                    <span className="text-xs text-muted-foreground ml-2">{t("aiWidget.thinking")}</span>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/10 bg-white/20 backdrop-blur-md shrink-0">
                            {/* UI Polish: Button inside input area */}
                            <div className="relative flex items-center">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={t("aiWidget.inputPlaceholder") || "Type a message..."}
                                    // UI Polish: Color #20629B and thinner ring (ring-[4px] -> ring-[2.5px])
                                    className="w-full pr-12 py-6 bg-white/60 dark:bg-black/40 border-white/30 focus-visible:ring-offset-0 focus-visible:ring-[#20629B] focus-visible:ring-[2.5px] placeholder:text-muted-foreground/80 shadow-inner rounded-full"
                                    disabled={isLoading}
                                />
                                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                    {/* UI Polish: Minimalistic ArrowUp icon, gray background circle like image */}
                                    {/* Keeping previous blue style as per 'Оставь цвет подсветки' but adapting to minimal arrow requested */}
                                    <Button
                                        size="icon"
                                        className="h-9 w-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 shadow-sm transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-200"
                                        onClick={handleSendMessage}
                                        disabled={isLoading || !input.trim()}
                                    >
                                        <ArrowUp className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* UI Polish: Hide trigger button when isOpen is true. Desktop ONLY trigger. */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => setIsOpen(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        // UI Polish: Compact trigger (h-10 instead of default, py-1, tighter padding). Narrower width.
                        className="pointer-events-auto absolute bottom-4 right-0 group hidden md:flex items-center gap-1.5 pl-1.5 pr-3 h-10 bg-[#0752A0] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] border border-white/20 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300"
                    >
                        {/* Content */}
                        <div className="relative z-10 flex items-center gap-1.5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                xmlSpace="preserve"
                                width="44"
                                height="44"
                                version="1.1"
                                viewBox="0 0 203.18 203.18"
                                style={{
                                    shapeRendering: "geometricPrecision",
                                    textRendering: "geometricPrecision",
                                    fillRule: "evenodd",
                                    clipRule: "evenodd",
                                }}
                                className="drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                            >
                                <defs>
                                    <style type="text/css">
                                        {`
                                            .fil0 {fill:none}
                                            .fil1 {fill:white}
                                        `}
                                    </style>
                                </defs>
                                <g id="Слой_x0020_1">
                                    <metadata id="CorelCorpID_0Corel-Layer" />
                                    <g id="_2278661208240">
                                        <circle className="fil0" cx="101.59" cy="101.59" r="101.6" />
                                        <path className="fil1" d="M106.13 53.03c22.55,2.08 40.65,19.52 43.75,41.75l-96.58 0c3.18,-22.75 22.05,-40.47 45.33,-41.87l0 -4.17 -2.36 0c-2.32,0 -4.23,-1.91 -4.23,-4.23l0 0c0,-2.33 1.91,-4.23 4.23,-4.23l12.4 0c2.33,0 4.23,1.9 4.23,4.23l0 0c0,2.32 -1.9,4.23 -4.23,4.23l-2.54 0 0 4.29zm15.16 63.75c1.5,-1.94 4.29,-2.3 6.23,-0.8 1.94,1.5 2.3,4.29 0.8,6.23 -3.14,4.07 -7.19,7.4 -11.86,9.7 -4.51,2.21 -9.56,3.46 -14.87,3.46 -5.31,0 -10.36,-1.25 -14.87,-3.46 -4.67,-2.3 -8.72,-5.63 -11.86,-9.7 -1.5,-1.94 -1.14,-4.73 0.8,-6.23 1.94,-1.5 4.73,-1.14 6.23,0.8 2.33,3.01 5.31,5.47 8.74,7.15 3.28,1.62 7,2.52 10.96,2.52 3.96,0 7.68,-0.9 10.96,-2.52 3.43,-1.68 6.41,-4.14 8.74,-7.15zm-10.04 39.85c-1.68,1.41 -4.25,2.17 -4.31,-1.17 -0.02,-0.99 -0.04,-1.26 -0.06,-2.26 -0.81,-2.45 -3.2,-2.84 -5.68,-2.84l0 -0.01c-25.76,-0.2 -46.76,-20.38 -48.29,-45.8l97.36 0c-0.71,11.75 -5.05,23.66 -13.15,30.44l-25.87 21.64z" />
                                    </g>
                                </g>
                            </svg>
                            <span className="font-semibold text-sm text-white tracking-wide whitespace-nowrap">{t("aiWidget.button") || "Ask AI"}</span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
