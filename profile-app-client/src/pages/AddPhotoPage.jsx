import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addPhoto } from './auth.service';

const AddPhotoPage = () => {
  const [image, setImage] = useState('');
  const storedToken = localStorage.getItem('authToken');
  const { userId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newImage = { image };

    try {
      const response = await addPhoto(userId, newImage, storedToken);

      setImage(response.data);
      navigate('/userprofile');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>Add</h2>
      <form onSubmit={handleSubmit}>
        <label>URL:</label>
        <input
          type="text"
          name="image"
          value={image}
          onChange={(e) => setImage(e.target.value)} // Update to e.target.value
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddPhotoPage;
