import { MediaRenderer } from "thirdweb/react";
import styles from "../styles/Home.module.css";
import { createThirdwebClient } from "thirdweb";
type HeroCardProps = {
  isLoading: boolean;
  title: string;
  description: string;
  image: string;
};

const clientIdWeb = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID as string,
});

export default function HeroCard(props: HeroCardProps) {
  return (
    <>
      {props.isLoading ? (
        <div className={styles.loadingText}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className={styles.heroCardContainer}>
          <MediaRenderer
            client={clientIdWeb}
            src={props.image}
            width="100%"
            height="auto"
            className={styles.heroCardContractImage}
          />

          <div className={styles.heroCardContent}>
            <h1 className={styles.gradientText1}>{props.title}</h1>
            <p>{props.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
