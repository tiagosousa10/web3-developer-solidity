"use client";
import HeroCard from "@/components/hero-card";
import styles from "../../../styles/Home.module.css";

import {
  ClaimButton,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { createThirdwebClient, getContract } from "thirdweb";
import { ERC721_CONTRACT_ADDRESS } from "@/constants/addresses";
import { useEffect, useState } from "react";
import { polygonAmoy } from "thirdweb/chains";
import {
  claimTo,
  getTotalClaimedSupply,
  totalSupply,
} from "thirdweb/extensions/erc721";
import { getContractMetadata, symbol } from "thirdweb/extensions/common";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { ownerOf } from "thirdweb/extensions/erc721";
export default function ERC721Project() {
  const [metadata, setMetadata] = useState<any>(null);
  const [tokenSupply, setTokenSupply] = useState<any>(null);
  const [tokenSymbol, setTokenSymbol] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [contractUser, setContractUser] = useState<any>(null);
  const [totalClaimedSupply, setTotalClaimedSupply] = useState<any>(null);
  const [userOwnedNFTs, setUserOwnedNFTs] = useState<any[]>([]);

  const clientIdWeb = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as string,
  });

  const account = useActiveAccount();
  const address = account?.address || undefined;
  const imageUrl = metadata?.image ?? "";

  // Fetch -> Contract | Metadata | Supply | Symbol
  useEffect(() => {
    const loadMetadata = async () => {
      try {
        const contract = getContract({
          client: clientIdWeb,
          address: ERC721_CONTRACT_ADDRESS,
          chain: polygonAmoy,
        });
        const owner = await ownerOf({ contract, tokenId: 1n });

        const ownedNFTs = await getOwnedNFTs({
          contract,
          owner: owner,
        });

        setUserOwnedNFTs(ownedNFTs);

        setContractUser(contract);

        const supply = await totalSupply({ contract });
        setTokenSupply(supply);

        const totalSupplyClaimedData = await getTotalClaimedSupply({
          contract,
        });
        setTotalClaimedSupply(totalSupplyClaimedData);

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
  return (
    <div className={styles.container}>
      <div className={styles.contractPage}>
        <HeroCard
          isLoading={isLoading}
          title={metadata?.name || ""}
          description={metadata?.description || ""}
          image={imageUrl}
        />
        <div className={styles.grid}>
          <div className={styles.componentCard}>
            <h3>Claim ERC721</h3>
            <p className="text-[12px] mb-4">Claim ERC721 NFT for FREE!</p>
            <ClaimButton
              contractAddress={ERC721_CONTRACT_ADDRESS}
              chain={polygonAmoy}
              client={clientIdWeb}
              claimParams={{
                type: "ERC721",
                quantity: 1n, // Number of tokens to claim
              }}
              onTransactionConfirmed={(tx) => {
                alert("NFT claimed!");
                console.log(tx);
              }}
              onError={(err) => {
                alert("Error claiming NFT: " + err.message);
                console.error(err);
              }}
            >
              Claim now
            </ClaimButton>
          </div>

          <div className={styles.componentCard}>
            <h3>Contract Stats</h3>
            <p className="text-[12px]">Total Supply: {tokenSupply}</p>
            <p className="text-[12px]">Total Claimed: {totalClaimedSupply}</p>
          </div>

          <div className={styles.componentCard}>
            <h3>Your NFTs</h3>
            <p>Total Owned : {userOwnedNFTs?.length ?? 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
