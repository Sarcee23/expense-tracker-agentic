import { useState } from 'react'
import CategoryFilter from './components/CategoryFilter'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  function handleAddExpense(expense) {
    setExpenses((currentExpenses) => [
      ...currentExpenses,
      { id: crypto.randomUUID(), ...expense },
    ])
  }

  function handleDeleteExpense(id) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter((expense) => expense.id !== id),
    )
  }

  const filteredExpenses =
    selectedCategory === 'All'
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory)

  const total = filteredExpenses
    .reduce((sum, expense) => sum + Number(expense.amount), 0)
    .toFixed(2)

  return (
    <main>
      <h1>Expense Tracker</h1>
      <ExpenseForm onAddExpense={handleAddExpense} />
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <p data-cy="total">Total: {total}</p>
      <p data-cy="count">Count: {filteredExpenses.length}</p>
      <ExpenseList
        expenses={filteredExpenses}
        onDeleteExpense={handleDeleteExpense}
      />
    </main>
  )
}

export default App
