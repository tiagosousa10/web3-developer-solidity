"use client";

import HeroCard from "@/components/hero-card";
import styles from "../../../styles/Home.module.css";
import { WalletBalance } from "./WalletBalance";
import { userMetadata } from "./userMetadata";

export default function ERC20Project() {
  // Wallet balance
  const { balance, isLoadingBalance, isErrorBalance } = WalletBalance();
  // Fetch -> Metadata | Supply | Symbol
  const { metadata, tokenSupply, tokenSymbol, isLoading, imageUrl } =
    userMetadata();

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
            <p>Loading supply...</p>
          ) : (
            <p>
              Total supply: {tokenSupply} {tokenSymbol}
            </p>
          )}
        </div>
        <div className={styles.componentCard}>
          <h3>Token Balance</h3>
          {isLoadingBalance ? (
            <p>Loading balance...</p>
          ) : isErrorBalance ? (
            <p>Erro ao carregar balance</p>
          ) : !balance ? (
            <p>Sem dados de balance</p>
          ) : (
            <p>
              {balance.displayValue} {balance.symbol ?? tokenSymbol}
            </p>
          )}
        </div>
        <div className={styles.componentCard}>
          <h3>Earn Tokens</h3>
        </div>
      </div>
    </div>
  );
}
