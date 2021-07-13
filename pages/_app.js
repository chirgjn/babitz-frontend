import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"
      />
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
