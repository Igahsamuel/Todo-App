import {useState} from 'react'

function UseLocalStorage(key, initialValue) {
  const [localstorageValue, setLocalStorageValue] = useState(() => getLocalStorageValue(key, initialValue))
  const setValue = (value) => {
    const valueStored = value instanceof Function ? value(localstorageValue) : value;
    setLocalStorageValue(value)
    localStorage.setItem(key, JSON.stringify(valueStored))
  }
  return (
    [localstorageValue, setValue]
  )
}
function getLocalStorageValue(key, initialValue){
  const itemStored = localStorage.getItem(key)
  return itemStored ? JSON.parse(itemStored) : initialValue
}
export default UseLocalStorage