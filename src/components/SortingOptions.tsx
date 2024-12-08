import { useState } from 'react';

type SortingOption = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

type SortingOptionsProps = {
  currentSort: SortingOption;
  onSortChange: (sort: SortingOption) => void;
};

function SortingOptions({ currentSort, onSortChange }: SortingOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const options: SortingOption[] = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];
  const handleOptionClick = (option: SortingOption) => {
    onSortChange(option);
    setIsOpen(false);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsOpen(!isOpen)}>
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpen && (
        <ul className="places__options places__options--custom places__options--opened">
          {options.map((option) => (
            <li
              key={option}
              className={`places__option ${option === currentSort ? 'places__option--active' : ''}`}
              tabIndex={0}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SortingOptions;
