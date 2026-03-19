import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import type { SubjectAnalytics } from '@/types'
import { useAnalytics } from '@/hooks/useAnalytics'
import { TrendChart } from '@/components/analytics/TrendChart'
import { WeaknessTracker } from '@/components/analytics/WeaknessTracker'
import { CoverageHeatmap } from '@/components/analytics/CoverageHeatmap'
import { PriorityList } from '@/components/analytics/PriorityList'
import { TrackBadge } from '@/components/ui/Badge'
import { GCSE_SUBJECTS, IB_SUBJECTS } from '@/lib/constants'

export function AnalyticsPage() {
  const { subjectId } = useParams<{ subjectId?: string }>()
  const navigate = useNavigate()
  const { loading, getSubjectAnalytics, getGlobalStats, loadPriorityList } = useAnalytics()
  const [subjectData, setSubjectData] = useState<SubjectAnalytics | null>(null)

  useEffect(() => {
    if (subjectId) {
      setSubjectData(getSubjectAnalytics(subjectId))
    } else {
      setSubjectData(null)
    }
  }, [subjectId, getSubjectAnalytics])

  if (loading) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center text-sm text-[var(--text-muted)]">
        Loading analytics...
      </div>
    )
  }

  if (subjectId && subjectData) {
    return <SubjectView data={subjectData} loadPriorities={loadPriorityList} onBack={() => navigate('/analytics')} />
  }

  const stats = getGlobalStats()

  return (
    <div className="flex-1 p-6 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* GCSE column */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrackBadge track="gcse" />
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">GCSE</h2>
          </div>
          <div className="space-y-2">
            {stats.gcse.map((item) => (
              <SubjectRow
                key={item.subject.id}
                label={item.subject.label}
                avgPct={item.avgPct}
                count={item.count}
                daysSinceLast={item.daysSinceLast}
                onClick={() => navigate(`/analytics/${item.subject.id}`)}
              />
            ))}
          </div>
        </div>

        {/* IB column */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrackBadge track="ib" />
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">IB Diploma</h2>
          </div>
          <div className="space-y-2">
            {stats.ib.map((item) => (
              <SubjectRow
                key={item.subject.id}
                label={item.subject.label}
                avgPct={item.avgPct}
                count={item.count}
                daysSinceLast={item.daysSinceLast}
                onClick={() => navigate(`/analytics/${item.subject.id}`)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-[var(--sidebar)] rounded-lg border border-[var(--border)]">
        <p className="text-xs text-[var(--text-muted)]">
          Total submissions: <span className="font-mono font-semibold text-[var(--text-primary)]">{stats.totalSubmissions}</span>
        </p>
      </div>
    </div>
  )
}

function SubjectRow({
  label,
  avgPct,
  count,
  daysSinceLast,
  onClick,
}: {
  label: string
  avgPct: number | null
  count: number
  daysSinceLast: number | null
  onClick: () => void
}) {
  const pctColor = avgPct === null ? 'text-[var(--text-muted)]'
    : avgPct >= 80 ? 'text-green-600'
    : avgPct >= 60 ? 'text-amber-600'
    : 'text-red-600'

  const stale = daysSinceLast !== null && daysSinceLast > 14

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2.5 bg-white dark:bg-[#1e1e1e] border border-[var(--border)] rounded-lg hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150"
    >
      <div className="text-left">
        <p className="text-sm text-[var(--text-primary)]">{label}</p>
        <p className="text-xs text-[var(--text-muted)]">{count} submission{count !== 1 ? 's' : ''}</p>
      </div>
      <div className="flex items-center gap-2">
        {stale && (
          <span className="text-xs bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded-md">
            {daysSinceLast}d ago
          </span>
        )}
        <span className={['font-mono text-sm font-semibold', pctColor].join(' ')}>
          {avgPct !== null ? `${avgPct}%` : '—'}
        </span>
        <svg className="w-3 h-3 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </button>
  )
}

function SubjectView({
  data,
  loadPriorities,
  onBack,
}: {
  data: SubjectAnalytics
  loadPriorities: (id: string) => Promise<string[]>
  onBack: () => void
}) {
  return (
    <div className="flex-1 p-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-5">
        <button onClick={onBack} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-all duration-150">
          ← Analytics
        </button>
        <span className="text-[var(--border)]">/</span>
        <h2 className="text-sm font-semibold text-[var(--text-primary)]">{data.subjectLabel}</h2>
        <TrackBadge track={data.track} />
      </div>

      {data.submissions.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <p className="text-sm">No submissions yet for {data.subjectLabel}.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Mark trend */}
          <Section title="Mark Trend">
            <TrendChart submissions={data.submissions} />
          </Section>

          {/* Band distribution */}
          <Section title="Band Distribution">
            <BandDistributionChart distribution={data.bandDistribution} />
          </Section>

          {/* Weakness tracker */}
          <Section title="Recurring Weaknesses" subtitle="Ranked by frequency">
            <WeaknessTracker weaknesses={data.weaknesses} />
          </Section>

          {/* Question type coverage */}
          <Section title="Question Type Coverage">
            <CoverageHeatmap subjectId={data.subjectId} coverage={data.questionTypeCoverage} />
          </Section>

          {/* Priority revision list */}
          <Section title="Priority Revision List" subtitle="AI-generated from your weakness data">
            <PriorityList subjectId={data.subjectId} loadPriorities={loadPriorities} />
          </Section>
        </div>
      )}
    </div>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3">
        <h3 className="text-sm font-semibold text-[var(--text-primary)]">{title}</h3>
        {subtitle && <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

function BandDistributionChart({ distribution }: { distribution: Record<string, number> }) {
  const data = Object.entries(distribution).map(([band, count]) => ({ band, count }))
  if (data.length === 0) return <p className="text-sm text-[var(--text-muted)]">No data yet.</p>

  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="band" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} allowDecimals={false} />
        <Tooltip
          contentStyle={{
            background: 'var(--bg)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            fontSize: '12px',
          }}
        />
        <Bar dataKey="count" fill="var(--gcse-accent)" radius={[3, 3, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
