import axios from "axios";
import { useForm } from "react-hook-form";
import { APIURL } from "../configs/configs";
import { useEffect, useState } from "react";

export default function AddBookForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [showStatus, setShowStatus]=useState(false);
    const [answer, setAnswer]=useState("");
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
      setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
 
    return () => {
      clearTimeout(timer);
    };
  }, [answer]);


    const onSubmit = (data: any) => {
        axios.post(APIURL, {
            author: data.BookAuthor,
            book_name: data.BookName
        })
        .then ((response) => {
          setAnswer(response.statusText)
          setShowStatus(true)
          console.log(response.statusText);  
    })
    reset()}
  
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Enter Book Author" {...register("BookAuthor", { required: true })} />
        {errors.BookAuthor && <span style={{color: 'red'}}>This field is required*</span>}
        <input placeholder="Enter Book Name" {...register("BookName", { required: true })} />
        {errors.BookName && <span style={{color: 'red'}}>This field is required*</span>}
        <input type="submit" />
      </form>
      {showStatus && isVisible ?
      <div style={{color: answer === "OK" ? 'green': 'red'}}>
       {answer === "OK" ? 'Запрос ушел': 'Запрос не ушел'}
      </div>:
      null}
    </div>
  
  )
}
