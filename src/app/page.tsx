import React from 'react';
import { NavigationMenuItem } from '@/components/ui/navigation-menu';
function LandingPage() {
  return (
    <div>
      <NavigationMenuItem />
      <main>
        <h1>Hackfolio</h1>
        <p>a linkinbio for Hack Clubbers!</p>
        <button type="button">Login</button>
      </main>
    </div>
  );
}
export default LandingPage;
