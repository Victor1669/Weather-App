export default function ErrorMessage({ errorMessage, onRetry }) {
  return (
    <div id="Error">
      <img width={40} src="/images/icon-error.svg" />
      <h3>Something went wrong</h3>
      <p>
        We couldn't connect to the server ({errorMessage}). please try again in
        a few moments.
      </p>
      <button onClick={onRetry} className="generalBackground hover">
        <img src="/images/icon-retry.svg" />
        Retry
      </button>
    </div>
  );
}
