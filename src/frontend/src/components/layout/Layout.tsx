import { useCallback, useEffect, useState } from "react";
import type { SpeechResultEvent } from "../../types/speech.d";
import { TrailerModal } from "../shared/TrailerModal";
import { BottomNav } from "./BottomNav";
import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isListening, setIsListening] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState("");

  const handleMicClick = useCallback(() => {
    const SpeechAPI =
      typeof window !== "undefined"
        ? (window.SpeechRecognition ?? window.webkitSpeechRecognition)
        : null;

    if (!SpeechAPI) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechAPI();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: SpeechResultEvent) => {
      const transcript = event.results[0][0].transcript;
      setVoiceQuery(transcript);
    };

    recognition.start();
  }, [isListening]);

  useEffect(() => {
    if (voiceQuery) {
      window.location.href = `/search?q=${encodeURIComponent(voiceQuery)}`;
    }
  }, [voiceQuery]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <MobileHeader isListening={isListening} onMicClick={handleMicClick} />
      <Sidebar />
      <main
        className="lg:ml-[280px] xl:ml-80 pt-14 lg:pt-0 pb-[60px] lg:pb-0 min-h-screen"
        data-ocid="main-content"
      >
        {children}
      </main>
      <BottomNav />
      <TrailerModal />
    </div>
  );
}
