import ExpenseItem from './ExpenseItem'

// Props: expenses — the expenses to display; onDeleteExpense — removes an expense by id.
function ExpenseList({ expenses, onDeleteExpense }) {
  return (
    <ul>
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDeleteExpense={onDeleteExpense}
        />
      ))}
    </ul>
  )
}

export default ExpenseList
