import { withErrorBoundary } from "react-error-boundary";

const withErrorFallBack = (Component) =>
  withErrorBoundary(Component, {
    FallbackComponent: () => "Something Went Wrong",
    onError(error, info) {
      // Do something with the error
      // E.g. log to an error logging client here
    },
  });

export default withErrorFallBack;
