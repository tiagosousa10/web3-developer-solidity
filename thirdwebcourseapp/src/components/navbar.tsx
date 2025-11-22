import Link from "next/link";
import styles from "../styles/Home.module.css";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButtonWrapper } from "./connect-button-wrapper";

const clientId = process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID;
const secretKey = process.env.NEXT_PUBLIC_TEMPLATE_SECRET_KEY;
const client = createThirdwebClient({
  clientId: clientId as string,
  secretKey: secretKey as string,
});

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link href="/">
        <p
          className={styles.gradientText1}
          style={{ cursor: "pointer", fontSize: "1.2rem", fontWeight: "bold" }}
        >
          Tiago Porfolio
        </p>
      </Link>

      <ConnectButtonWrapper />
    </div>
  );
}
