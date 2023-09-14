import { Contract } from "ethers";
import { useCallback } from "react";

import { useDNSContract } from "../../hooks/useContract";
import { ethers } from "ethers";
import { toast } from "react-toastify";

export const useGetDomainLabel = () => {
  const contract: Contract | null = useDNSContract();
  return useCallback(async () => {
    try {
      const label = await contract?.domainLabel();
      return label;
    } catch (error) {
      console.log("DNS_LABEL_ERROR:", error);
      toast.error(error);
    }
  }, [contract]);
};

export const useSetDomain = () => {
  const contract: Contract | null = useDNSContract();
  return useCallback(
    async (value: string, dns: string) => {
      try {
        const tx = await contract?.setDomain(value, {
          gasLimit: ethers.utils.parseUnits("0.000000000001"),
        });
        await tx.wait();
        toast.success(`Successfully minted ${value}.${dns}.eth`);
      } catch (error) {
        console.log("DNS_CREATION_ERROR:", error);
        toast.error(error);
      }
    },
    [contract]
  );
};
