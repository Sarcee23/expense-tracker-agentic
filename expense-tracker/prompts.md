# Prompt Templates

## New feature

### Context
Describe the existing application, relevant files/components, and the user-facing workflow.

### Goal
Implement the following feature: **[FEATURE NAME]**. Summarize the expected behavior.

### Constraints
- Preserve existing behavior and public interfaces.
- Use the project's existing framework and patterns.
- Keep changes focused on the requested feature.
- Add tests for new behavior.

### Acceptance criteria
- [ ] [Observable behavior that can be asserted in a test]
- [ ] [Edge case that can be asserted in a test]
- [ ] [Integration or regression behavior that can be asserted in a test]

### Examples
```text
Input: [example input]
Expected output: [expected result]
```

## Bug fix

### Context
Describe the bug, where it occurs, the current behavior, and the relevant implementation.

### Goal
Fix **[BUG DESCRIPTION]** and preserve unrelated behavior.

### Constraints
- Reproduce the bug before changing code.
- Make the smallest complete fix.
- Do not fix unrelated issues.
- Add or update a regression test.

### Acceptance criteria
- [ ] A test reproducing the original bug passes after the fix.
- [ ] [Edge case or expected boundary condition] passes.
- [ ] Existing relevant tests pass.

### Examples
```text
Before: [current incorrect behavior]
After: [correct behavior]
```

## Refactor

### Context
Identify the code or subsystem to refactor, its current problems, and any surrounding behavior that must remain stable.

### Goal
Refactor **[TARGET]** to improve [readability/testability/structure/performance] without changing behavior.

### Constraints
- Do not change externally observable behavior.
- Do not combine the refactor with feature work.
- Preserve existing APIs unless the change explicitly requires otherwise.
- Run relevant tests before and after the change.

### Acceptance criteria
- [ ] Existing behavior tests still pass.
- [ ] [Specific design improvement] is verified by inspection or an automated check.
- [ ] The relevant build and lint commands succeed.

### Examples
```text
Before structure: [brief example]
After structure: [brief example]
Unchanged behavior: [example]
```

## Generate tests

### Context
Describe the code or feature to test, the test framework, and the relevant existing test suite.

### Goal
Generate focused automated tests for **[FEATURE OR MODULE]**.

### Constraints
- Test observable behavior rather than implementation details where possible.
- Cover success, validation, and relevant edge cases.
- Use deterministic fixtures and avoid external services.
- Keep tests isolated and consistent with the project style.

### Acceptance criteria
- [ ] Each public behavior in the requested scope has a passing test.
- [ ] At least one valid-input case and one invalid-input case are covered.
- [ ] Tests can be run with the project's existing test command.

### Examples
```text
Test: [scenario]
Arrange: [initial state/input]
Assert: [observable result]
```

## Review diff

### Context
Review the current implementation diff and its associated requirements.

### Goal
Identify correctness, regression, security, and maintainability problems introduced by the diff.

### Constraints
- Review only the changed behavior and its direct dependencies.
- Prefer high-confidence, reproducible findings.
- Report file locations and explain the impact of each finding.
- Do not change the implementation unless explicitly asked.

### Acceptance criteria
- [ ] Every finding cites a changed line or changed code block.
- [ ] Every finding describes a concrete failure or risk.
- [ ] No unrelated existing code is reported as a new issue.

### Examples
```text
Finding: [severity] [file and line] — [problem and impact]
```

## Commit message

### Context
Summarize the completed changes and why they were made.

### Goal
Create a concise commit message describing the diff accurately.

### Constraints
- Use the repository's existing commit-message convention when one exists.
- Keep the subject imperative and ideally no longer than 72 characters.
- Include the relevant issue or scope only when available.
- Keep the body limited to important user-visible or architectural changes.

### Acceptance criteria
- [ ] The subject accurately summarizes the diff.
- [ ] The body names the main change and its validation, if applicable.
- [ ] The message contains no unsupported claims or secret values.

### Examples
```text
Subject: feat(expenses): add expense entry form

Body: Add validated expense creation and update the expense list and total.
Tests: npm test
```

---

# Add Expense Feature Prompt

## Context

The expense tracker is a React application created with Vite. The app must support the broader expense tracker requirements: add, list, filter, delete, total, and display-count behavior. The current implementation is the starter UI. "Add expense" means providing the user with a form for a title, amount, and category, then adding the expense to the in-memory expense list. The expense categories are exactly `Food`, `Travel`, `Bills`, and `Other`.

## Goal

Implement expense creation through a form that accepts a title, a numeric amount, and one of the four allowed categories. A valid submission must add the expense to the displayed list, update the running total, update the currently displayed count, clear or reset the form after submission, and preserve it when filtering or performing other list operations unless deletion changes it.

## Constraints

- Use React state and the existing React/Vite project structure.
- Amount input must be parsed or validated as a numeric value; no string-only or concatenated amounts are allowed.
- Title validation must reject whitespace-only titles after trimming.
- Amount validation must reject non-numeric, zero, and negative values.
- Do not add invalid expenses to the list or change the running total and displayed count for invalid submissions.
- Category values must be restricted to `Food`, `Travel`, `Bills`, and `Other`.
- Existing application behavior and project scripts must remain functional.
- Add code only for this feature; do not implement category filtering, deletion, list rendering, or running total behavior beyond the minimum interactions required by the add-expense acceptance criteria.

## Acceptance Criteria

- [ ] When the title is `Lunch`, amount is `12.5`, and category is `Food`, submitting the form adds exactly one expense with title `Lunch`, amount `12.5`, and category `Food` to the expense list.
- [ ] When an expense is added, its title, numeric amount, and category are visible in the expense list.
- [ ] When a submitted amount is numeric, adding it updates the running total by the exact sum of all added numeric amounts and displays the result with exactly two decimal places.
- [ ] Submitting the form with an empty title does not add an expense and does not change the expense list or running total.
- [ ] Submitting the form with a whitespace-only title does not add an expense and does not change the expense list or running total.
- [ ] Submitting the form with a non-numeric amount such as `abc` does not add an expense and does not change the expense list or running total.
- [ ] Submitting the form with amount `0` does not add an expense and does not change the expense list or running total.
- [ ] Submitting the form with amount `-5` does not add an expense and does not change the expense list or running total.
- [ ] A valid submission clears the title and amount fields and resets the category selector to a valid default category.
- [ ] The displayed expense count increases by exactly one after each valid submission and remains unchanged after each invalid submission.
- [ ] Each submission can be verified by querying rendered form controls, submitting the form, and asserting the rendered expense list, total, count, and validation outcome.

## Examples

### Valid submission

```text
Title: Lunch
Amount: 12.50
Category: Food
Expected result:
- One expense row is added with title "Lunch", amount "12.50", and category "Food".
- The running total displays "12.50".
- The displayed expense count is "1".
- The title and amount fields are empty after submission.
```

### Running total

```text
Add expense 1: Bus pass, 25, Travel
Add expense 2: Coffee, 4.5, Food
Expected result:
- Running total displays "29.50".
- Displayed expense count is "2".
```

### Invalid title

```text
Input title: "   "
Amount: 10
Category: Other
Expected result:
- No expense row is added.
- Running total remains unchanged.
- Displayed expense count remains unchanged.
```

### Invalid amounts

```text
Input title: Lunch
Inputs: abc, 0, -5
Category: Food
Expected result for each input:
- No expense row is added.
- Running total remains unchanged.
- Displayed expense count remains unchanged.
```
