"use client";
import { ERC20_CONTRACT_ADDRESS } from "@/constants/addresses";
import { createThirdwebClient } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";

export function WalletBalance() {
  const clientIdWeb = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as string,
  });

  const account = useActiveAccount();
  const address = account?.address;

  const {
    data: balance,
    isLoading: isLoadingBalance,
    isError: isErrorBalance,
  } = useWalletBalance({
    chain: polygonAmoy,
    address: address,
    client: clientIdWeb, // your thirdweb client instance
    tokenAddress: ERC20_CONTRACT_ADDRESS,
  });

  return {
    balance,
    isLoadingBalance,
    isErrorBalance,
  };
}
