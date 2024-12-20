import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarFooter, SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SendHorizontalIcon, BotIcon, FileIcon, Sparkles } from "lucide-react";
import { useState, useEffect, useRef, FormEvent } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chat = () => {
  const { user } = useUser();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-message',
      text: "Hello! I'm your AI assistant. Select a file to get started.",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState<string>(""); 
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  const messagesEndRef = useRef<HTMLDivElement>(null); 
  const inputRef = useRef<HTMLInputElement>(null); 

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleProjectSelect = (projectName: string) => {
    setSelectedFile(projectName);
    setMessages([
      {
        id: 'welcome-message',
        text: `I'm ready to answer questions about ${projectName}. How can I help you?`,
        sender: "bot",
        timestamp: new Date()
      }
    ]);
  };

  const sendMessage = async (e?: FormEvent) => {
    e?.preventDefault(); 

    if (!selectedFile) {
      toast({
        description: 'Please select a file first',
        variant: 'destructive',
      });
      return;
    }

    const trimmedMessage = currentMessage.trim();
    if (!trimmedMessage) return; 

    const userMessage: Message = {
      id: generateId(),
      text: trimmedMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage(""); 
    inputRef.current?.focus(); 
    setIsLoading(true);

    try {
      const response = await axios.post(
        `https://docquery.onrender.com/api/v1/nlp/index/answer/${user?.primaryEmailAddress?.emailAddress}/${selectedFile}`,
        {
          text: trimmedMessage, 
        }
      );

      const botMessage: Message = {
        id: generateId(),
        text: response.data.anwser, 
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]); 

    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        description: 'Failed to send message', 
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false); 
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(); 
    }
  };

  return (
    <SidebarProvider className="w-full min-h-screen flex bg-background text-foreground">
      <AppSidebar 
        collapsible="icon" 
        variant="floating" 
        className="bg-background text-foreground"
        onProjectSelect={handleProjectSelect}
      />

      <SidebarInset className="bg-background text-foreground">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b">
          <div className="flex flex-1 items-center gap-2 px-4">
            <SidebarTrigger />
            {selectedFile ? (
              <div className="flex items-center gap-2">
                <FileIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{selectedFile}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm">Select a file to start</span>
              </div>
            )}
          </div>
        </header>

        <div className="flex flex-col h-[calc(100vh-3.5rem)]">
          <div className="flex flex-1 flex-col gap-4 px-4 py-10">
            <div className="mx-auto h-[calc(100vh-250px)] w-full max-w-3xl rounded-xl bg-accent overflow-y-auto flex flex-col-reverse">
              <div className="space-y-4 p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-3 transition-all",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <BotIcon className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <Card
                      className={cn(
                        "px-4 py-3 max-w-[75%] transition-all",
                        message.sender === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-card"
                      )}
                    >
                      <div className="whitespace-pre-wrap">{message.text}</div>
                    </Card>
                  </div>
                ))}
                
                {/* Loading Message */}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <BotIcon className="w-4 h-4 text-primary" />
                    </div>
                    <Card className="px-4 py-3 bg-card max-w-[75%]">
                      <div className="flex gap-4 items-center">
                        <Skeleton className="w-32 h-4" />
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-16 h-4" />
                      </div>
                    </Card>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>

            <form 
              onSubmit={sendMessage} 
              className="bg-background w-1/2 flex flex-row items-center justify-center self-center"
            >
              <input
                ref={inputRef}
                type="text"
                className="bg-background text-foreground w-full p-2 rounded-l-lg border border-gray-300 outline-none"
                placeholder={selectedFile ? "Type your message..." : "Select a file to start chatting..."}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!selectedFile || isLoading}
              />
              <Button 
                type="submit" 
                variant="outline" 
                size="icon" 
                disabled={!currentMessage.trim() || !selectedFile || isLoading}
                className="h-10 w-12 bg-primary"
              >
                <SendHorizontalIcon className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Chat;