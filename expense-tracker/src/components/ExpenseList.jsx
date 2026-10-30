import ExpenseItem from './ExpenseItem'

// Props: expenses — an array of expenses to display.
function ExpenseList({ expenses }) {
  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </ul>
  )
}

export default ExpenseList
