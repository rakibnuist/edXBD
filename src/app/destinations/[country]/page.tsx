// Add this import at the top
import DestinationTracking from '@/components/DestinationTracking';

// Add this component inside your page component, after the structured data
<DestinationTracking 
  countryName={country.name} 
  userData={userData} // if available from session/auth
/>