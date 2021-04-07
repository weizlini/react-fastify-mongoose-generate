const search = async (terms) => {
  const response = await fetch(`http://localhost:5000/search?terms=${terms}`);
  if (response.ok) {
    return response.json();
  }
};
export default search;
