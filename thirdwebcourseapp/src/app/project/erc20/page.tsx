"use client";

import HeroCard from "@/components/hero-card";
import styles from "../../../styles/Home.module.css";
import { WalletBalance } from "./WalletBalance";
import { userMetadata } from "./userMetadata";
import { burn } from "thirdweb/extensions/erc20";
import { TransactionButton } from "thirdweb/react";
import Link from "next/link";

export default function ERC20Project() {
  // Wallet balance
  const { balance, isLoadingBalance, isErrorBalance } = WalletBalance();
  // Fetch -> Metadata | Supply | Symbol
  const {
    metadata,
    tokenSupply,
    tokenSymbol,
    isLoading,
    imageUrl,
    contractUser,
  } = userMetadata();

  return (
    <div className={styles.container}>
      <HeroCard
        isLoading={isLoading}
        title={metadata?.name || ""}
        description={metadata?.description || ""}
        image={imageUrl}
      />

      <div className={styles.grid}>
        <div className={styles.componentCard}>
          <h3>Token Stats</h3>
          {isLoading ? (
            <p className="text-[12px]">Loading supply...</p>
          ) : (
            <p className="text-[12px]">
              Total supply: {tokenSupply} {tokenSymbol}
            </p>
          )}
        </div>
        <div className={styles.componentCard}>
          <h3>Token Balance</h3>
          {isLoadingBalance ? (
            <p className="text-[12px]">Loading balance...</p>
          ) : isErrorBalance ? (
            <p className="text-[12px]">Erro ao carregar balance</p>
          ) : !balance ? (
            <p className="text-[12px]">Sem dados de balance</p>
          ) : (
            <p className="text-[12px]">
              {balance.displayValue} {balance.symbol ?? tokenSymbol}
            </p>
          )}
          <div className="mt-4">
            <TransactionButton
              transaction={() =>
                burn({
                  contract: contractUser,
                  amount: 10n,
                })
              }
              onTransactionConfirmed={() => alert("ERC20 burned!")}
              onError={() => alert("Error!")}
            >
              Burn 10 Tokens
            </TransactionButton>
          </div>
        </div>
        <div className={styles.componentCard}>
          <h3>Earn Tokens</h3>
          <p className="text-[12px]">
            Earn more tokens by staking an ERC721 NFT.
          </p>
          <div className="flex gap-4 justify-center items-center mx-auto">
            <Link href="/project/staking">
              <button className={styles.matchButton}>Stake ERC721</button>
            </Link>
            <Link href="/project/erc721">
              <button className={styles.matchButton}>Claim ERC721</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
