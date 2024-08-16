import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBook } from '../../redux/slices/booksSlice'
import createBookWithId from '../../utils/createBookWithId'
import booksData from '../../data/books.json'

import './BookForm.css'

const BookForm = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const dispatch = useDispatch()

	const handleSubmit = e => {
		e.preventDefault()

		if (title && author) {

			dispatch(addBook(createBookWithId({ title, author }, 'manual')))
			setTitle('')
			setAuthor('')
		}
	}

	const handleAddRandomBook = () => {
		const randomIndex = Math.floor(Math.random() * booksData.length)

		const randomBook = booksData[randomIndex]
		dispatch(addBook(createBookWithId(randomBook, 'random')))
	}

    const handleAddRandomBookViaAPI = async () => {
        try {
            const res = await axios.get('http://localhost:4000/random-book')
            if (res?.data?.title  && res?.data?.author) {
                dispatch(addBook(createBookWithId(res.data, 'API')))
            }
        } catch (error) {
            console.log('Error', error);
        }
        
    }

	return (
		<div className='app-block book-form'>
			<h2>Add a New Book</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='title'>Title: </label>
					<input
						type='text'
						id='title'
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor='autor'>Author: </label>
					<input
						type='text'
						id='autor'
						value={author}
						onChange={e => setAuthor(e.target.value)}
					/>
				</div>
				<button type='submit'>Add Book</button>
				<button type='button' onClick={handleAddRandomBook}>
					Add random
				</button>
				<button type='button' onClick={handleAddRandomBookViaAPI}>
					Add Random via API
				</button>
			</form>
		</div>
	)
}

export default BookForm
