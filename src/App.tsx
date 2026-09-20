import { useState } from 'react';
import { Layout, type PageId } from '@/components/Layout';
import { DashboardPage } from '@/pages/DashboardPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { TrendsPage } from '@/pages/TrendsPage';
import { WarningsPage } from '@/pages/WarningsPage';
import { RootCausePage } from '@/pages/RootCausePage';
import { WhatChangedPage } from '@/pages/WhatChangedPage';
import { RumorsPage } from '@/pages/RumorsPage';
import { CoordinationPage } from '@/pages/CoordinationPage';
import { NetworkPage } from '@/pages/NetworkPage';
import { DemographicsPage } from '@/pages/DemographicsPage';
import { ComplaintsPage } from '@/pages/ComplaintsPage';
import { EvidencePage } from '@/pages/EvidencePage';
import { ForecastPage } from '@/pages/ForecastPage';

function App() {
  const [page, setPage] = useState<PageId>('dashboard');

  return (
    <Layout current={page} onNavigate={setPage}>
      {page === 'dashboard' && <DashboardPage onNavigate={setPage} />}
      {page === 'analytics' && <AnalyticsPage />}
      {page === 'trends' && <TrendsPage />}
      {page === 'warnings' && <WarningsPage />}
      {page === 'rootcause' && <RootCausePage />}
      {page === 'whatchanged' && <WhatChangedPage />}
      {page === 'rumors' && <RumorsPage />}
      {page === 'coordination' && <CoordinationPage />}
      {page === 'network' && <NetworkPage />}
      {page === 'demographics' && <DemographicsPage />}
      {page === 'complaints' && <ComplaintsPage />}
      {page === 'evidence' && <EvidencePage />}
      {page === 'forecast' && <ForecastPage />}
    </Layout>
  );
}

export default App;
