import React from 'react';

const SearchInput = ({ onChange, onSubmit, placeholder }) => (
  <form onSubmit={onSubmit}>
    <input type="text" onChange={onChange} placeholder={placeholder} />
    <button type='submit'>Search</button>
  </form>
);

export default SearchInput;
