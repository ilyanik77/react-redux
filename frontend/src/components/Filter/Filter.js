import { useDispatch, useSelector } from 'react-redux'
import {
	setTitleFilter,
	selectTitleFilter,
	resetFilters,
} from '../../redux/slices/filterSlice'

import './Filter.css'

const Filter = () => {
	const dispatch = useDispatch()
	const titleFilter = useSelector(selectTitleFilter)

	const handleTitleFilterChange = e => {
		dispatch(setTitleFilter(e.target.value))
	}

	const handleResetFilters = () => {
		dispatch(resetFilters())
	}

	return (
		<div className='app-block filter'>
			<div className='filter-group'>
				<div className='filter-row'>
					<input
						type='text'
						placeholder='Filter by title...'
						value={titleFilter}
						onChange={handleTitleFilterChange}
					/>
				</div>
				<button type='button' onClick={handleResetFilters}>Reset Filters</button>
			</div>
		</div>
	)
}

export default Filter
