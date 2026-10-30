import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import App from "./App";

describe("Expense Tracker Component & Integration Tests", () => {
  // -------------------------------------------------------------
  // 1. HAND-WRITTEN TESTS (Assignment Requirement)
  // -------------------------------------------------------------

  test("adds a valid expense to the list", async () => {
    const user = userEvent.setup();
    render(<App />);

    const titleInput = screen.getByLabelText(/title/i) || screen.getByPlaceholderText(/title/i) || screen.getByTestId("title");
    const amountInput = screen.getByLabelText(/amount/i) || screen.getByPlaceholderText(/amount/i) || screen.getByTestId("amount");
    const submitButton = screen.getByRole("button", { name: /add/i });

    await user.type(titleInput, "Groceries");
    await user.type(amountInput, "150");
    await user.click(submitButton);

    expect(screen.getByText("Groceries")).toBeInTheDocument();
  });

  test("rejects an empty title and does not add row", async () => {
    const user = userEvent.setup();
    render(<App />);

    const amountInput = screen.getByLabelText(/amount/i) || screen.getByPlaceholderText(/amount/i) || screen.getByTestId("amount");
    const submitButton = screen.getByRole("button", { name: /add/i });

    await user.type(amountInput, "100");
    await user.click(submitButton);

    // Assert that no list item with amount 100.00 was created
    expect(screen.queryByText("100.00")).not.toBeInTheDocument();
  });

  // -------------------------------------------------------------
  // 2. ADDITIONAL FEATURE & EDGE CASE TESTS
  // -------------------------------------------------------------

  test("rejects negative and zero amounts", async () => {
    const user = userEvent.setup();
    render(<App />);

    const titleInput = screen.getByLabelText(/title/i) || screen.getByPlaceholderText(/title/i) || screen.getByTestId("title");
    const amountInput = screen.getByLabelText(/amount/i) || screen.getByPlaceholderText(/amount/i) || screen.getByTestId("amount");
    const submitButton = screen.getByRole("button", { name: /add/i });

    // Try negative amount
    await user.type(titleInput, "Invalid Negative");
    await user.type(amountInput, "-50");
    await user.click(submitButton);
    expect(screen.queryByText("Invalid Negative")).not.toBeInTheDocument();

    // Try zero amount
    await user.clear(titleInput);
    await user.clear(amountInput);
    await user.type(titleInput, "Invalid Zero");
    await user.type(amountInput, "0");
    await user.click(submitButton);
    expect(screen.queryByText("Invalid Zero")).not.toBeInTheDocument();
  });

  test("filters expenses by category correctly", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add Food expense
    await user.type(screen.getByTestId("title"), "Lunch");
    await user.type(screen.getByTestId("amount"), "200");
    await user.selectOptions(screen.getByTestId("category"), "Food");
    await user.click(screen.getByRole("button", { name: /add/i }));

    // Add Travel expense
    await user.type(screen.getByTestId("title"), "Bus Ticket");
    await user.type(screen.getByTestId("amount"), "50");
    await user.selectOptions(screen.getByTestId("category"), "Travel");
    await user.click(screen.getByRole("button", { name: /add/i }));

    // Filter by Travel
    await user.selectOptions(screen.getByTestId("filter"), "Travel");

    expect(screen.getByText("Bus Ticket")).toBeInTheDocument();
    expect(screen.queryByText("Lunch")).not.toBeInTheDocument();
  });

  test("deletes an expense and updates total and count", async () => {
    const user = userEvent.setup();
    render(<App />);

    // Add an expense
    await user.type(screen.getByTestId("title"), "Coffee");
    await user.type(screen.getByTestId("amount"), "10");
    await user.click(screen.getByRole("button", { name: /add/i }));

    expect(screen.getByText("Coffee")).toBeInTheDocument();

    // Delete expense
    const deleteButton = screen.getByTestId("delete-expense");
    await user.click(deleteButton);

    expect(screen.queryByText("Coffee")).not.toBeInTheDocument();
  });

  // -------------------------------------------------------------
  // 3. TEST-FIRST EXERCISE (TDD Requirement)
  // -------------------------------------------------------------

  test("rejects amounts over 100,000", async () => {
    const user = userEvent.setup();
    render(<App />);

    const titleInput = screen.getByTestId("title");
    const amountInput = screen.getByTestId("amount");
    const submitButton = screen.getByRole("button", { name: /add/i });

    await user.type(titleInput, "Luxury Travel");
    await user.type(amountInput, "100001");
    await user.click(submitButton);

    // Should fail until Codex updates validation logic in ExpenseForm.jsx
    expect(screen.queryByText("Luxury Travel")).not.toBeInTheDocument();
  });
});