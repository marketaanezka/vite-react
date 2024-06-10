import React from 'react';

interface AuthorizedProps {
  user?: string;
}

const Authorized: React.FC<AuthorizedProps> = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>You are now authorized.</p>
    </div>
  );
};

export default Authorized;