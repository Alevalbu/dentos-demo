


import DashboardContent from '@/components/DashboardContent';
import { getMemberData } from './services/dashboardServices';

export default async function DashboardPage() {
  // Fetch data using the service
  const members = await getMemberData();
  
  return (
    <DashboardContent members={members}/>
  );
}