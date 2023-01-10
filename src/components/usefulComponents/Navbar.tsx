import {ImAirplane} from 'react-icons/im';

const NavbarC: React.FC = () => {
    return (    
        <nav 
            className="navbar navbar-expand-lg navbar-light bg-secondary bg-gradient my-2"
            style={{padding:'20px 20px'}}
        >
            <a className="navbar-brand ms-4" href="/">
                <ImAirplane size={15}/>{' '}
                Winn Travels
            </a>
            <ul className="navbar-nav mr-auto">
            <li className="nav-item ms-2">
                <a className="nav-link" href="/reserveflight">Chercher vol</a>
            </li>
            <li className="nav-item ms-2">
                <a className="nav-link" href="/favoris">Favoris</a>
            </li>
            </ul>
        </nav>
    );
}

export default NavbarC;