import { describe, it, expect } from "vitest";
import App from "../../src/client/components/App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("HELLO WORLD", () => {
    render(<App />);
    expect(screen.getByRole("heading").textContent).toMatch("HELLO WORLD");
  });
});
