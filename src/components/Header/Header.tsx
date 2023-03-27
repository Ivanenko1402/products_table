import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const links = [
    { name: 'home', id: 1, link: '/' },
    { name: 'products', id: 2, link: '/products'},
  ]

  return (
    <div className='header'>
      {links.map(link =>(
        <NavLink
          to={link.link}
          key={link.id}
          className={({ isActive }) => classNames('header_link', {
            'active': isActive,
          })}
        >
          {link.name}
        </NavLink>
      ))}
    </div>
  )
}