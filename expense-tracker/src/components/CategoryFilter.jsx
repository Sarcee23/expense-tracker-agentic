// selectedCategory: The currently selected category value.
// onSelectCategory: Callback invoked with the newly selected category.

function CategoryFilter({ selectedCategory, onSelectCategory }) {
  const handleChange = (event) => {
    onSelectCategory(event.target.value)
  }

  return (
    <select
      value={selectedCategory}
      onChange={handleChange}
      data-cy="filter"
    >
      <option value="All">All</option>
      <option value="Food">Food</option>
      <option value="Travel">Travel</option>
      <option value="Bills">Bills</option>
      <option value="Other">Other</option>
    </select>
  )
}

export default CategoryFilter
