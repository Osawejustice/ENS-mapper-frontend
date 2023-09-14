import Header from "components/Header";
import { useEffect, useState } from "react";
import { useGetDomainLabel, useSetDomain } from "state/variables/hooks";

const Home = () => {
  const [label, setLabel] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [domainName, setDomainName] = useState("");

  const getDomainLabel = useGetDomainLabel();
  const setDomain = useSetDomain();

  const handleNewDomain = async () => {
    try {
      setLoading(true);
      await setDomain(domainName, label);
      setDomainName("");
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  };

  useEffect(() => {
    getDomainLabel().then((val) => {
      setLabel(val);
    });
  }, [getDomainLabel]);

  return (
    <>
      <Header />
      <div className="h-screen flex flex-col items-center justify-center max-w-5xl mx-auto px-5">
        <h1 className="text-3xl font-bold">NextJs Web3 Starter Kit.</h1>
        <div className="flex items-center w-full">
          <input
            type="text"
            value={domainName}
            onChange={(e) => setDomainName(e.target.value)}
            className="rounded-l-xl px-3 h-14 outline-none w-full border"
          />
          <button
            disabled={!label || loading || !domainName}
            onClick={handleNewDomain}
            className="rounded-r-xl h-14 px-5 bg-black text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {label ? `.${label}.eth` : "Loading"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
