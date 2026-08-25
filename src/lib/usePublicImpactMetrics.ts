import { useQuery } from '@tanstack/react-query';
import { fetchPublicImpactMetrics, type PublicImpactMetrics } from './googleSheets';

export const publicImpactMetricsFallback: PublicImpactMetrics = {
  familiesServed: '900',
  tutoringEnrollment: '169',
  studentImprovement: '100%',
  youthMentored: '7',
  localLeadersEmpowered: '0',
  roleplaySessions: '0',
  healthParticipants: '347',
  communityPrograms: '702',
  financialSustainability: '27%',
  livesImpacted: '3,870',
};

export function usePublicImpactMetrics() {
  return useQuery({
    queryKey: ['public-impact-metrics'],
    queryFn: fetchPublicImpactMetrics,
    placeholderData: publicImpactMetricsFallback,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
