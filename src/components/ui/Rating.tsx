import clsx from 'clsx';
import { useState } from 'react';

interface Props {
  amount?: number;
  rating?: number;
}

// let 

export const Rating: React.FC<Props> = ({ amount = 5, rating }) => {

  const [ rate, setRate ] = useState<number>(rating || 0);

  return (
    <div className='flex'>
      {[...Array(amount)].map((_, i) => {
        const givenRating = i + 1;
        return (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={clsx(
              "w-6 h-6 hover:cursor-pointer hover:fill-yellow-300 hover:text-yellow-300 transition duration-75 ease-in-out", {
              "fill-yellow-300 text-yellow-300": givenRating < rate || givenRating === rate
            }
            )}
            id={`${givenRating}`}
            onClick={() => {
              if (rate === givenRating) return setRate(0);
              setRate(givenRating)
            }}
            // onMouseEnter={e => setRate(Number(e.target.id))}
            // onMouseLeave={(() => setRate(0))}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        )
      })}
      <span className="ml-2 font-light text-normal">^{rating} ratings</span>
    </div>
  )
}



