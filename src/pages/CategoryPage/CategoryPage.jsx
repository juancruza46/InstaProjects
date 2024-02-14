import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
  const { category } = useParams();

  return (
    <div>
      <h1>All Posts</h1>
      {/* Add your content for the Category Page based on the category parameter */}
    </div>
  );
};

export default CategoryPage;
