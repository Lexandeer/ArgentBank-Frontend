import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="container-error">
      <span className="container-error__error">404</span>
      <span className="container-error__message">
        Oups! La page que vous demandez n&#39;existe pas.
      </span>
      <Link className="container-error__link" to="/">
        Retourner sur la page d&#39;accueil
      </Link>
    </div>
  );
};
