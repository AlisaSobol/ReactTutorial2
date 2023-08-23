import { createContext, useState, useEffect } from "react";
import useAxiosFetch from '../hooks/useAxiosFetch';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [ posts, setPosts ] = useState([]);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data])



  return (
    <DataContext.Provider value ={{
      fetchError, 
      isLoading, 
      posts, 
      setPosts,
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContext;