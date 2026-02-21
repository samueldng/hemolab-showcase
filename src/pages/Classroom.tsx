import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { ArrowLeft, Send, Image, Paperclip, Users, MessageSquare, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────
interface ChatMessage {
    id: string;
    type: "text" | "image" | "file" | "system";
    userName?: string;
    content: string;
    fileName?: string;
    fileSize?: number;
    timestamp: string;
}

// ─── Constants ───────────────────────────────────────────────────────
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// ─── Helper ──────────────────────────────────────────────────────────
function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatFileSize(bytes: number) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

// ─── Entry Screen ────────────────────────────────────────────────────
function EntryScreen({ onJoin }: { onJoin: (name: string) => void }) {
    const [name, setName] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (trimmed.length >= 2) onJoin(trimmed);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-md"
            >
                <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground mb-2">
                            Sala de Aula
                        </h1>
                        <p className="text-muted-foreground text-sm">
                            Compartilhe prompts, comandos e arquivos em tempo real
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="userName"
                                className="block text-sm font-medium text-muted-foreground mb-2"
                            >
                                Seu nome
                            </label>
                            <input
                                ref={inputRef}
                                id="userName"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Digite seu nome..."
                                maxLength={30}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={name.trim().length < 2}
                            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            Entrar na Sala
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/"
                            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                        >
                            <ArrowLeft className="w-3 h-3" />
                            Voltar ao início
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

// ─── Message Bubble ──────────────────────────────────────────────────
function MessageBubble({ msg, isOwn }: { msg: ChatMessage; isOwn: boolean }) {
    if (msg.type === "system") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center my-3"
            >
                <span className="text-xs text-muted-foreground/60 bg-muted/30 px-3 py-1 rounded-full">
                    {msg.content}
                </span>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}
        >
            <div
                className={`max-w-[80%] sm:max-w-[70%] ${isOwn
                        ? "bg-primary/20 border-primary/30"
                        : "bg-card border-border"
                    } border rounded-2xl ${isOwn ? "rounded-br-md" : "rounded-bl-md"
                    } px-4 py-3 shadow-md`}
            >
                {!isOwn && (
                    <p className="text-xs font-semibold text-primary mb-1">
                        {msg.userName}
                    </p>
                )}

                {msg.type === "text" && (
                    <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                        {msg.content}
                    </p>
                )}

                {msg.type === "image" && (
                    <div className="space-y-2">
                        <img
                            src={msg.content}
                            alt="Imagem compartilhada"
                            className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            style={{ maxHeight: "300px" }}
                            onClick={() => window.open(msg.content, "_blank")}
                        />
                        {msg.fileName && (
                            <p className="text-xs text-muted-foreground">{msg.fileName}</p>
                        )}
                    </div>
                )}

                {msg.type === "file" && (
                    <a
                        href={msg.content}
                        download={msg.fileName}
                        className="flex items-center gap-3 p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors group"
                    >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                            <Paperclip className="w-5 h-5 text-accent" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
                                {msg.fileName || "arquivo"}
                            </p>
                            {msg.fileSize && (
                                <p className="text-xs text-muted-foreground">
                                    {formatFileSize(msg.fileSize)}
                                </p>
                            )}
                        </div>
                    </a>
                )}

                <p
                    className={`text-[10px] mt-1 ${isOwn ? "text-primary/50" : "text-muted-foreground/50"
                        } text-right`}
                >
                    {formatTime(msg.timestamp)}
                </p>
            </div>
        </motion.div>
    );
}

// ─── Chat Room ───────────────────────────────────────────────────────
function ChatRoom({
    userName,
    socket,
}: {
    userName: string;
    socket: Socket;
}) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [onlineCount, setOnlineCount] = useState(0);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }
        function onDisconnect() {
            setIsConnected(false);
        }
        function onHistory(history: ChatMessage[]) {
            setMessages(history);
        }
        function onMessage(msg: ChatMessage) {
            setMessages((prev) => [...prev, msg]);
        }
        function onOnlineCount(count: number) {
            setOnlineCount(count);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("history", onHistory);
        socket.on("message", onMessage);
        socket.on("onlineCount", onOnlineCount);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("history", onHistory);
            socket.off("message", onMessage);
            socket.off("onlineCount", onOnlineCount);
        };
    }, [socket]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const sendText = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed) return;

        socket.emit("message", {
            type: "text",
            userName,
            content: trimmed,
        });
        setInput("");
        inputRef.current?.focus();
    };

    const handleFile = (file: File, type: "image" | "file") => {
        if (file.size > MAX_FILE_SIZE) {
            alert(`Arquivo muito grande. Limite: ${formatFileSize(MAX_FILE_SIZE)}`);
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            socket.emit("message", {
                type,
                userName,
                content: reader.result as string,
                fileName: file.name,
                fileSize: file.size,
            });
        };
        reader.readAsDataURL(file);
    };

    const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file, "image");
        e.target.value = "";
    };

    const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file, "file");
        e.target.value = "";
    };

    return (
        <div className="h-screen flex flex-col bg-background">
            {/* Header */}
            <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-xl">
                <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/"
                            className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-muted transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        <div>
                            <h1 className="text-base font-bold text-foreground leading-tight">
                                Sala de Aula
                            </h1>
                            <div className="flex items-center gap-2">
                                <span
                                    className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"
                                        }`}
                                />
                                <span className="text-xs text-muted-foreground">
                                    {isConnected ? "Conectado" : "Desconectado"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="w-4 h-4" />
                        <span className="text-sm font-medium">{onlineCount}</span>
                    </div>
                </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground/40">
                            <MessageSquare className="w-12 h-12 mb-3" />
                            <p className="text-sm">Nenhuma mensagem ainda</p>
                            <p className="text-xs mt-1">
                                Compartilhe prompts, comandos e arquivos!
                            </p>
                        </div>
                    )}

                    <AnimatePresence>
                        {messages.map((msg) => (
                            <MessageBubble
                                key={msg.id}
                                msg={msg}
                                isOwn={msg.userName === userName}
                            />
                        ))}
                    </AnimatePresence>

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input bar */}
            <div className="flex-shrink-0 border-t border-border bg-card/80 backdrop-blur-xl">
                <form
                    onSubmit={sendText}
                    className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2"
                >
                    {/* Hidden file inputs */}
                    <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onImageSelect}
                    />
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={onFileSelect}
                    />

                    {/* Image button */}
                    <button
                        type="button"
                        onClick={() => imageInputRef.current?.click()}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all flex-shrink-0"
                        title="Enviar imagem"
                    >
                        <Image className="w-5 h-5" />
                    </button>

                    {/* File button */}
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-all flex-shrink-0"
                        title="Enviar arquivo"
                    >
                        <Paperclip className="w-5 h-5" />
                    </button>

                    {/* Text input */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Digite sua mensagem..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />

                    {/* Send button */}
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </div>
    );
}

// ─── Main Page Component ─────────────────────────────────────────────
export default function Classroom() {
    const [userName, setUserName] = useState<string | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);

    const handleJoin = useCallback((name: string) => {
        const newSocket = io(SOCKET_URL, {
            transports: ["websocket", "polling"],
        });

        newSocket.on("connect", () => {
            newSocket.emit("join", name);
        });

        setSocket(newSocket);
        setUserName(name);
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);

    if (!userName || !socket) {
        return <EntryScreen onJoin={handleJoin} />;
    }

    return <ChatRoom userName={userName} socket={socket} />;
}
