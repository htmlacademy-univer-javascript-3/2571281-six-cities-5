import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setCity } from '../store/action';

type CitiesListProps = {
  cities: string[];
};

function CitiesList({ cities }: CitiesListProps) {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: RootState) => state.city);

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li className="locations__item" key={city}>
          <a
            className={`locations__item-link tabs__item ${
              currentCity === city ? 'tabs__item--active' : ''
            }`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(setCity(city));
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
