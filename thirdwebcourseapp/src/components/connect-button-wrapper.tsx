"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "thirdweb/react";
import { polygonAmoy } from "thirdweb/chains";
import { createThirdwebClient } from "thirdweb";

export function ConnectButtonWrapper() {
  const [mounted, setMounted] = useState(false);

  const clientIdWeb = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as string,
  });

  // Depois que o React monta no cliente, ligamos o botão
  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR + primeira hidratação: sempre retorna o mesmo HTML (null)
  if (!mounted) {
    // Se quiser, coloque um botão fake/skeleton aqui, mas algo 100% estático
    return null;
  }

  return (
    <ConnectButton client={clientIdWeb} chain={polygonAmoy} theme="dark" />
  );
}
