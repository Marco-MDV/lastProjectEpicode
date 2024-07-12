import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePostId } from '../../../../../../redux/setPostId'; 

export default function ModButton({ setShowModal, cardId }) {
  const dispatch = useDispatch();
  const idCard = useSelector((state) => state.postId.value);

  const Trigger = () => {
    dispatch(togglePostId(cardId));
    setShowModal(true);
  };

  React.useEffect(() => {
  }, [idCard]);
  
  return (
    <button
      className='absolute bottom-1 left-1 bg-white text-black p-2 rounded-full shadow-xl group-hover:opacity-100 opacity-0 duration-500'
      onClick={Trigger}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%">
            <stop offset="0%" style={{ stopColor: '#7949EE', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#46DEE6', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        <path strokeLinecap="round" strokeLinejoin="round" stroke="url(#gradient1)" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
      </svg>
    </button>
  );
}

