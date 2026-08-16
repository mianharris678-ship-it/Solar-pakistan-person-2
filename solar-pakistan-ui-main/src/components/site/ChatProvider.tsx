import { createContext, useContext, useState, type ReactNode } from "react";

type ChatCtx = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void };

const SolarChatContext = createContext<ChatCtx>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
});

export function SolarChatProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SolarChatContext.Provider value={{ open, setOpen, toggle: () => setOpen(!open) }}>
      {children}
    </SolarChatContext.Provider>
  );
}

export function useSolarChat() {
  return useContext(SolarChatContext);
}
