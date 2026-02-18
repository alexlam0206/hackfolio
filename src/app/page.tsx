"use client";

import React from 'react';
import { NavigationMenuItem } from '@/components/ui/navigation-menu';
import { signIn, signOut, useSession } from "next-auth/react";


function LandingPage() {
  const { data: session, status } = useSession();

  return (
    <div>
      <NavigationMenuItem />
      <main>
        <h1>Hackfolio</h1>
        <p>a linkinbio for Hack Clubbers!</p>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <div>
            <p>Signed in</p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div>
            <p>Signed out</p>
            <button onClick={() => signIn("hackclub")}>Login with Hack Club Auth</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default LandingPage;

