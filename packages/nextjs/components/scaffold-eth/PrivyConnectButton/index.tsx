import { Balance } from "../Balance";
import { WrongNetworkDropdown } from "./WrongNetworkDropdown";
import { usePrivy } from "@privy-io/react-auth";
import { Address, Chain } from "viem";
import { useAccount, useChains } from "wagmi";
import { useNetworkColor } from "~~/hooks/scaffold-eth";

export function PrivyLoginButton() {
  const { ready, authenticated, login } = usePrivy();
  const { address, chain } = useAccount();
  const chains = useChains();
  const networkColor = useNetworkColor();

  const isSupported = chains.some((c: Chain) => c.id === chain?.id);
  if (!chain || !isSupported) {
    return <WrongNetworkDropdown />;
  }

  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);
  console.log(chain, authenticated, address);
  if (authenticated && chain) {
    return (
      <>
        <div className="flex flex-col items-center mr-1">
          <Balance address={address as Address} className="min-h-0 h-auto" />
          <span className="text-xs" style={{ color: networkColor }}>
            {chain.name}
          </span>
        </div>
      </>
    );
  }

  return (
    <button disabled={disableLogin} onClick={login}>
      Log in
    </button>
  );
}
