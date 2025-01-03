import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>404 Not Found</h1>
      <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" style={{ textDecoration: 'underline', color: 'blue' }}>
        Go to Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
