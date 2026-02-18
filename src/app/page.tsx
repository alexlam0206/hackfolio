"use client";

import React from 'react';
import { NavigationMenuItem } from '@/components/ui/navigation-menu';
import { signIn } from "next-auth/react";


function LandingPage() {
  return (
    <div>
      <NavigationMenuItem />
      <main>
        <h1>Hackfolio</h1>
        <p>a linkinbio for Hack Clubbers!</p>
        <button onClick={() => signIn()}>Login with Hack Club Auth</button>
      </main>
    </div>
  );
}
export default LandingPage;
