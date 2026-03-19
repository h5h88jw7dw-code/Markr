import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'
import type { Submission } from '@/types'
import { getMarkPercent } from '@/lib/constants'

interface TrendChartProps {
  submissions: Submission[]
}

export function TrendChart({ submissions }: TrendChartProps) {
  if (submissions.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-sm text-[var(--text-muted)]">
        No data yet
      </div>
    )
  }

  const data = [...submissions]
    .sort((a, b) => a.created_at.localeCompare(b.created_at))
    .map((sub, i) => ({
      name: new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
      percent: getMarkPercent(sub.mark_achieved, sub.mark_max),
      mark: `${sub.mark_achieved}/${sub.mark_max}`,
      band: sub.band,
      index: i + 1,
    }))

  const avg = Math.round(data.reduce((acc, d) => acc + d.percent, 0) / data.length)

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              fontSize: '12px',
              color: 'var(--text-primary)',
            }}
            formatter={(value, _name, props) => [
              `${String(value)}% (${(props.payload as { mark?: string })?.mark ?? ''}) — ${(props.payload as { band?: string })?.band ?? ''}`,
              'Score',
            ]}
          />
          <ReferenceLine y={avg} stroke="var(--text-muted)" strokeDasharray="4 4" />
          <Line
            type="monotone"
            dataKey="percent"
            stroke="var(--gcse-accent)"
            strokeWidth={2}
            dot={{ fill: 'var(--gcse-accent)', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-[var(--text-muted)] text-right mt-1">
        Average: {avg}% · {data.length} submission{data.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
