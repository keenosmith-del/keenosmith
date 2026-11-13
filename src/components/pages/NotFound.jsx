import { Link } from 'react-router-dom';
import './NotFound.css';
export default function NotFound(){
 return <main className="not-found"><h1>Page not found.</h1><p>This page could not be found. You can return to the portfolio or browse Explore.</p><nav aria-label="Page recovery"><Link className="hero-button hero-button-primary" to="/">Back to portfolio</Link><Link className="hero-button hero-button-secondary" to="/explore">Explore</Link></nav></main>;
}
