import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Classes from '/styles/tags.module.css'

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const TagInput = () => {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addTag(inputValue.trim());
    } else if (event.key === 'Backspace' && inputValue === '') {
      removeTag(tags.length - 1);
    }
  };

  const addTag = (tag) => {
    if (tag !== '' && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue('');
    }
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div className={Classes["tag-input"]}>
      
        <Stack direction="row" spacing={1}>
        {tags.map((tag, index) => (
          <Chip key={index} label={tag} onDelete={() => removeTag(index)} color="primary" />
        ))}
      </Stack>
      <TextField
        fullWidth
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        label="Add tags..."
        placeholder="Press Enter to add tags"
      />
   
    </div>
  );
};

export default TagInput;
