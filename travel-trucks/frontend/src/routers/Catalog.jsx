import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCampers } from '../redux/slices/campersSlice';

const Catalog = () => {
  const dispatch = useDispatch();
  const { data: campers, status, error } = useSelector((state) => state.campers);
  const [filters, setFilters] = useState({ type: '', price: '', location: '' });
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCampers({ ...filters, page }));
  }, [dispatch, filters, page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Catalog</h1>
      <form>
        <input
          name="type"
          placeholder="Type"
          value={filters.type}
          onChange={handleFilterChange}
        />
        <input
          name="price"
          placeholder="Price"
          value={filters.price}
          onChange={handleFilterChange}
        />
        <input
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
        />
      </form>
      <div>
        {campers.map((camper) => (
          <div key={camper.id}>
            <h3>{camper.name}</h3>
            <p>{camper.description}</p>
            <img src={camper.imageUrl} alt={camper.name} style={{ width: '200px' }} />
          </div>
        ))}
      </div>
      <button onClick={loadMore}>Load More</button>
    </div>
  );
};

export default Catalog;