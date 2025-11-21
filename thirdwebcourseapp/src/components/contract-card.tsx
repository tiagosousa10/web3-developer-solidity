import Link from "next/link";
import styles from "../styles/Home.module.css";
import { MediaRenderer } from "thirdweb/react";
import { getContract } from "thirdweb/contract";
import { getContractMetadata } from "thirdweb/extensions/common";
import { createThirdwebClient } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";

type CardProps = {
  href: string;
  contractAddress: string;
  title: string;
  description: string;
};

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as string,
});

export default async function ContractCard(props: CardProps) {
  const contract = getContract({
    client,
    address: props.contractAddress,
    chain: polygonAmoy,
  });

  // Fetch the deployed contract's metadata (this includes the image)

  const metadata = await getContractMetadata({ contract });

  const imageUrl = metadata?.image as string;

  return (
    <Link href={props.href} className={styles.card}>
      <MediaRenderer
        client={client}
        src={imageUrl}
        width="100%"
        height="auto"
      />
      <div className={styles.cardText}>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </Link>
  );
}
