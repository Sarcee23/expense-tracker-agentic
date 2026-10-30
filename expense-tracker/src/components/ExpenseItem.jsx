// Props: expense — one expense with title, category, and amount fields.
function ExpenseItem({ expense }) {
  const { title, category, amount } = expense

  return (
    <li data-cy="expense-item">
      <span>{title}</span>
      <span>{category}</span>
      <span>{Number(amount).toFixed(2)}</span>
    </li>
  )
}

export default ExpenseItem
