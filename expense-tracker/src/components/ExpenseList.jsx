<<<<<<< HEAD
function ExpenseList({ expenses }) {
  return (
    <ul data-cy="expense-list">
      {expenses.map((expense) => (
        <li key={expense.id ?? expense.title} data-cy="expense">
          <span data-cy="expense-title">{expense.title}</span>
          <span data-cy="expense-amount">{expense.amount.toFixed(2)}</span>
          <span data-cy="expense-category">{expense.category}</span>
        </li>
=======
import ExpenseItem from './ExpenseItem'

// Props: expenses — an array of expenses to display.
function ExpenseList({ expenses }) {
  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
>>>>>>> 5c010faae657704a859106fe7ae9220b7a55958e
      ))}
    </ul>
  )
}

export default ExpenseList
