'use client'

import React, { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <header>
      <nav>
        {status === "loading" && <p>Loading...</p>}
        {status === "authenticated" && (
          <>
            <p>Welcome, {session.user.name}</p>
            <button className="blue-btn" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        )}
        {status === "unauthenticated" && providers && (
          <>
            {Object.values(providers).map((provider) => (
              <button
                className="blue-btn"
                key={provider.id}
                onClick={() => signIn(provider.id)}
              >
                Sign In with {provider.name}
              </button>
            ))}
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
