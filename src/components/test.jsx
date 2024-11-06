import { useEffect, useRef } from 'react';

// Inside the AddBlogs component
const modalRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    // Close modal if click is outside the modal content
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setShowModal(false);
    }
  };

  // Attach the event listener to the document
  document.addEventListener('mousedown', handleClickOutside);

  // Cleanup the event listener on component unmount
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
