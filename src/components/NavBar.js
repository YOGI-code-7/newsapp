import React from 'react';

const NavBar = ({ onCategoryChange }) => {
  const categories = ['general', 'business', 'sports', 'science', 'health', 'technology', 'entertainment'];

  return (
    <nav>
      <ul>
        {categories.map(category => (
          <li key={category}>
            <button onClick={() => onCategoryChange(category)}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
