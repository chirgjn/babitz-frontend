import "../styles/globals.css";
import "../Bootstrap/css/bootstrap.min.css";
import { ToastProvider } from "../hooks/useToast";
function MyApp({ Component, pageProps }) {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Oswald"
        rel="stylesheet"
      />
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </div>
  );
}

export default MyApp;
