"use client";
import { ERC20_CONTRACT_ADDRESS } from "@/constants/addresses";
import { useEffect, useState } from "react";
import { createThirdwebClient, getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { getContractMetadata, symbol } from "thirdweb/extensions/common";
import { totalSupply } from "thirdweb/extensions/erc20";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";

export function userMetadata() {
  const [metadata, setMetadata] = useState<any>(null);
  const [tokenSupply, setTokenSupply] = useState<any>(null);
  const [tokenSymbol, setTokenSymbol] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contractUser, setContractUser] = useState<any>(null);

  const clientIdWeb = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as string,
  });

  const account = useActiveAccount();
  const address = account?.address;
  const imageUrl = metadata?.image ?? "";

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const contract = getContract({
          client: clientIdWeb,
          address: ERC20_CONTRACT_ADDRESS,
          chain: polygonAmoy,
        });

        setContractUser(contract);

        const supply = await totalSupply({ contract });
        setTokenSupply(supply);

        setTokenSymbol(await symbol({ contract }));

        const data = await getContractMetadata({ contract });
        setMetadata(data);
      } catch (error) {
        console.error("Erro ao carregar metadata:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMetadata();
  }, []);

  return {
    metadata,
    tokenSupply,
    tokenSymbol,
    isLoading,
    imageUrl,
    contractUser,
  };
}
