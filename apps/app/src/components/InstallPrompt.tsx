import { useEffect, useState } from "react";
import { Button } from "@dojo-fs/ui";

/**
 * Captura o evento `beforeinstallprompt` e oferece botão pra instalar PWA.
 * Aparece só em browsers que suportam install prompt (Chrome/Edge desktop+Android).
 * iOS Safari NÃO dispara esse evento — precisa instrução manual ("Adicionar à tela inicial").
 */

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

export function InstallPrompt() {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === "accepted") setInstalled(true);
    setPromptEvent(null);
  }

  if (installed || !promptEvent) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-dojo-red bg-card px-4 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        <p className="text-sm">Instalar como app?</p>
        <Button size="sm" variant="default" onClick={handleInstall}>
          Instalar
        </Button>
      </div>
    </div>
  );
}
