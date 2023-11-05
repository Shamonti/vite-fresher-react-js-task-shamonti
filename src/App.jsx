import { useState, useRef, useEffect } from 'react';

import './index.css';

export default function App() {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [gallery, setGallery] = useState([
    { id: 0, src: 'image-1.webp', featured: true },
    { id: 1, src: 'image-2.webp', featured: false },
    { id: 2, src: 'image-3.webp', featured: false },
  ]);

  const [selectedImageCount, setSelectedImageCount] = useState(0);

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;

    const copyListItems = [...gallery];
    const dragItemContent = copyListItems[dragItem.current];
    const dragOverItemContent = copyListItems[dragOverItem.current];

    if (dragOverItemContent.featured) {
      copyListItems[dragItem.current] = {
        ...dragOverItemContent,
        featured: true,
      };

      copyListItems[dragOverItem.current] = {
        ...dragItemContent,
        featured: false,
      };
    } else {
      copyListItems[dragItem.current] = { ...dragOverItemContent };
      copyListItems[dragOverItem.current] = { ...dragItemContent };
    }

    dragItem.current = null;
    dragOverItem.current = null;
    setGallery(copyListItems);
  };

  const handleDelete = () => {
    const updatedGallery = gallery.filter((item) => !item.checked);

    if (updatedGallery.length > 0) {
      updatedGallery[0].featured = true;
    }

    setGallery(updatedGallery);
  };

  const handleSelect = (id) => {
    const updatedGallery = gallery.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });

    setGallery(updatedGallery);
  };

  useEffect(() => {
    const count = gallery.filter((item) => item.checked).length;
    setSelectedImageCount(count);
  }, [gallery]);

  return (
    <div>
      <h2 className="text-center text-3xl font-bold tracking-wider underline">
        Image gallery
      </h2>
      <div>
        <span>{selectedImageCount} images selected</span>
        <button
          disabled={false}
          className="focus inline-block rounded bg-red-600 px-4 py-2 font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-red-500 focus:bg-red-500 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
      <div className="flex justify-between">
        {gallery.map((item, index) => (
          <div
            key={index}
            className="image-container"
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            draggable
          >
            <input
              type="checkbox"
              value={item.id}
              className="checkbox"
              onChange={() => handleSelect(item.id)}
              checked={item.checked || false}
            />
            <img
              src={item.src}
              alt={item.src}
              className={`img ${item.featured ? 'featured' : ''}`}
              draggable={item.featured}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
