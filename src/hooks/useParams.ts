import { useSelector } from 'react-redux'

const useParams = () => useSelector((state: any) => state.params)

export { useParams }
