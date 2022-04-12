import { AppProps } from "next/app";
import "../styles/global.css";
import { RootProvider } from "../context/RootContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RootProvider>
      <div className="bg-neutral-900 w-full h-screen text-slate-200 overflow-hidden">
        <Component {...pageProps} />
      </div>
    </RootProvider>
  );
};

export default MyApp;
