import { FallingLines } from 'react-loader-spinner'

const Spinner = (props) => {
  let { mode } = props
  return (
    <div className='text-center' >
      <FallingLines color={mode === 'light' ? 'dark' : 'white'} />
    </div>
  )
}
export default Spinner