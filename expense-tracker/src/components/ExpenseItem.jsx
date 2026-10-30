/**
 * Props:
 * - expense: the expense to display, including its unique id.
 * - onDeleteExpense: callback that removes an expense by id.
 */
function ExpenseItem({ expense, onDeleteExpense }) {
  const { title, category, amount } = expense

  return (
    <li data-cy="expense-item">
      <span>{title}</span>
      <span>{category}</span>
      <span>{Number(amount).toFixed(2)}</span>
      <button
        type="button"
        data-cy="delete-expense"
        data-testid="delete-expense"
        onClick={() => onDeleteExpense(expense.id)}
      >
        Delete
      </button>
    </li>
  )
}

export default ExpenseItem
