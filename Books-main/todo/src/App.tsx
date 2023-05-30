import './App.css'
import Header from './sections/header/Header'
import Main from './sections/main/Main'
import Footer from './sections/footer/Footer'
import BookList from './sections/book-list/BookList'

const elems = ['Login', 'About Us', 'Themes', 'Contacts', 'Options']
const elemsFooter = ['Instagram', 'Twitter', 'Vk', 'Facebook']


function App() {
  return (
    <>
        <Header elems={elems} />
        <Main/>
        <BookList />
        <Footer elems={elemsFooter}/>
    </>
  )
}

export default App
