import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CamperDetails = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCamperDetails = async () => {
      try {
        const response = await fetch(`/api/campers/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch camper details');
        }
        const data = await response.json();
        setCamper(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCamperDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>{camper.name}</h1>
      <img src={camper.imageUrl} alt={camper.name} style={{ width: '100%' }} />
      <p>{camper.description}</p>
      <ul>
        <li>Price per day: ${camper.pricePerDay}</li>
        <li>Location: {camper.location}</li>
      </ul>
    </div>
  );
};

export default CamperDetails;
