import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Home from "../pages/index";

it("Renders appropriately", () => {
  render(<Home />);
  expect(screen.getByText( "Babitz" )).toBeInTheDocument();
});
