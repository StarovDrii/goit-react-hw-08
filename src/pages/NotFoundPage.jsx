import { Link } from 'react-router-dom'
import img from '../img/pixel-cells-3974187_1920.webp'

export default function NotFoundPage() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <img
        src={img}
        alt="Error"
        style={{ width: 'min(100% - 30px, 650px)' }}
      />
      <b>Oops! Not found!</b>
      <Link to="/">Back to home page</Link>
    </div>
  )
}
