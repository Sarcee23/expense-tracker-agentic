function ExpenseList({ expenses }) {
  return (
    <ul data-cy="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id ?? expense.title} data-cy="expense">
          <span data-cy="expense-title">{expense.title}</span>
          <span data-cy="expense-amount">{expense.amount.toFixed(2)}</span>
          <span data-cy="expense-category">{expense.category}</span>
        </li>
      ))}
    </ul>
  )
}

export default ExpenseList
