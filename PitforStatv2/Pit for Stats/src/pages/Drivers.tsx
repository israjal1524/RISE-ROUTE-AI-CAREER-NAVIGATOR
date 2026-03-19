import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, BarChart, Bar, Legend
} from 'recharts'

const BASE = 'https://api.jolpi.ca/ergast/f1'

const card = "rounded-xl border p-5"
const cardStyle = { backgroundColor: 'var(--f1-card)', borderColor: 'var(--f1-border)' }

function useDrivers() {
  return useQuery({
    queryKey: ['drivers-2026'],
    queryFn: async () => {
      const res = await fetch(`${BASE}/2026/drivers.json`)
      const data = await res.json()
      return data.MRData.DriverTable.Drivers
    },
  })
}

function useDriverStandings() {
  return useQuery({
    queryKey: ['driver-standings-2026'],
    queryFn: async () => {
      const res = await fetch(`${BASE}/2026/driverStandings.json`)
      const data = await res.json()
      return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? []
    },
  })
}

function useDriverImage(wikipediaUrl: string | undefined) {
  return useQuery({
    queryKey: ['driver-img', wikipediaUrl],
    enabled: !!wikipediaUrl,
    staleTime: Infinity,
    queryFn: async () => {
      const title = wikipediaUrl!.split('/wiki/')[1]
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=200&origin=*`
      )
      const data = await res.json()
      const pages = data.query.pages
      const page  = pages[Object.keys(pages)[0]]
      return page?.thumbnail?.source ?? null
    },
  })
}

function useDriverCareer(driverId: string | null) {
  return useQuery({
    queryKey: ['career', driverId],
    enabled: !!driverId,
    queryFn: async () => {
      const res = await fetch(`${BASE}/drivers/${driverId}/results.json?limit=1000`)
      const data = await res.json()
      const races = data.MRData.RaceTable.Races
      const byYear: Record<string, { points: number; wins: number; races: number; podiums: number }> = {}
      races.forEach((race: any) => {
        const year = race.season
        if (!byYear[year]) byYear[year] = { points: 0, wins: 0, races: 0, podiums: 0 }
        const r = race.Results[0]
        byYear[year].points  += parseFloat(r.points)
        byYear[year].races   += 1
        if (r.position === '1') byYear[year].wins += 1
        if (['1','2','3'].includes(r.position)) byYear[year].podiums += 1
      })
      return Object.entries(byYear).map(([year, stats]) => ({ year, ...stats }))
    },
  })
}

function useDriverResults2026(driverId: string | null) {
  return useQuery({
    queryKey: ['results-2026', driverId],
    enabled: !!driverId,
    queryFn: async () => {
      const res = await fetch(`${BASE}/2026/drivers/${driverId}/results.json`)
      const data = await res.json()
      return data.MRData.RaceTable.Races ?? []
    },
  })
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border p-3 text-xs space-y-1"
      style={{ backgroundColor: '#1a1a1a', borderColor: 'var(--f1-border)' }}>
      <p className="text-gray-400 mb-1">{label}</p>
      {payload.map((p: any) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-gray-300">{p.name}:</span>
          <span className="text-white font-medium">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border p-3 text-center"
      style={{ backgroundColor: 'var(--f1-dark)', borderColor: 'var(--f1-border)' }}>
      <p className="text-xl font-black" style={{ color: 'var(--f1-red)' }}>{value}</p>
      <p className="text-xs text-gray-400 mt-0.5">{label}</p>
    </div>
  )
}

function DriverCard({
  d, s, isSelected, isCompare, onClick
}: {
  d: any; s: any; isSelected: boolean; isCompare: boolean; onClick: () => void
}) {
  const img = useDriverImage(d.url)

  return (
    <motion.div
      className="rounded-xl border p-3 cursor-pointer overflow-hidden"
      style={{
        backgroundColor: isSelected
          ? 'rgba(225,6,0,0.1)'
          : isCompare
          ? 'rgba(255,255,255,0.05)'
          : 'var(--f1-card)',
        borderColor: isSelected
          ? 'var(--f1-red)'
          : isCompare
          ? 'white'
          : 'var(--f1-border)',
      }}
      whileHover={{ scale: 1.03, borderColor: 'var(--f1-red)' }}
      transition={{ duration: 0.15 }}
      onClick={onClick}
    >
      {/* Driver photo */}
      <div
        className="w-full h-24 rounded-lg mb-2 overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: 'var(--f1-border)' }}
      >
        {img.isLoading && (
          <div className="w-full h-full animate-pulse"
            style={{ backgroundColor: 'var(--f1-border)' }} />
        )}
        {img.data && (
          <img
            src={img.data}
            alt={d.familyName}
            className="w-full h-full object-cover object-top"
          />
        )}
        {!img.data && !img.isLoading && (
          <span className="text-3xl">👤</span>
        )}
      </div>

      <div className="flex items-center justify-between mb-1">
        <p
          className="text-xs font-bold"
          style={{
            color: isSelected
              ? 'var(--f1-red)'
              : isCompare
              ? 'white'
              : '#6b6b6b',
          }}
        >
          {s ? `P${s.position}` : '—'}
        </p>
        {isCompare && <span className="text-xs text-gray-400">VS</span>}
      </div>
      <p className="text-sm font-semibold leading-tight">{d.familyName}</p>
      <p className="text-xs text-gray-400 truncate">{d.givenName}</p>
      {s && (
        <p className="text-xs mt-1" style={{ color: 'var(--f1-red)' }}>
          {s.points} pts
        </p>
      )}
    </motion.div>
  )
}

export default function Drivers() {
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null)
  const [compareDriver, setCompareDriver]   = useState<string | null>(null)
  const [chartMode, setChartMode]           = useState<'points' | 'wins'>('points')

  const drivers   = useDrivers()
  const standings = useDriverStandings()
  const career    = useDriverCareer(selectedDriver)
  const career2   = useDriverCareer(compareDriver)
  const results26 = useDriverResults2026(selectedDriver)

  const standingMap: Record<string, any> = {}
  standings.data?.forEach((s: any) => {
    standingMap[s.Driver.driverId] = s
  })

  const selectedDriverInfo = drivers.data?.find(
    (d: any) => d.driverId === selectedDriver
  )
  const compareDriverInfo = drivers.data?.find(
    (d: any) => d.driverId === compareDriver
  )

  const mergedCareer = (() => {
    if (!career.data) return []
    const map: Record<string, any> = {}
    career.data.forEach((y: any) => {
      map[y.year] = { year: y.year, [selectedDriver!]: y[chartMode] }
    })
    career2.data?.forEach((y: any) => {
      if (map[y.year]) map[y.year][compareDriver!] = y[chartMode]
      else map[y.year] = { year: y.year, [compareDriver!]: y[chartMode] }
    })
    return Object.values(map).sort((a: any, b: any) => a.year - b.year)
  })()

  const totalCareerStats = career.data?.reduce(
    (acc: any, y: any) => ({
      points:  acc.points  + y.points,
      wins:    acc.wins    + y.wins,
      races:   acc.races   + y.races,
      podiums: acc.podiums + y.podiums,
    }),
    { points: 0, wins: 0, races: 0, podiums: 0 }
  )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">
          <span style={{ color: 'var(--f1-red)' }}>Driver</span> Profiles
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Career stats, season analysis and head-to-head comparison
        </p>
      </motion.div>

      {/* Driver grid */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
          Select a driver
        </p>
        {drivers.isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {Array(20).fill(0).map((_, i) => (
              <div key={i} className="h-40 rounded-xl animate-pulse"
                style={{ backgroundColor: 'var(--f1-card)' }} />
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {drivers.data?.map((d: any) => {
            const s = standingMap[d.driverId]
            const isSelected = selectedDriver === d.driverId
            const isCompare  = compareDriver  === d.driverId
            return (
              <DriverCard
                key={d.driverId}
                d={d}
                s={s}
                isSelected={isSelected}
                isCompare={isCompare}
                onClick={() => {
                  if (isSelected) {
                    setSelectedDriver(null)
                    setCompareDriver(null)
                  } else if (selectedDriver && !isCompare) {
                    setCompareDriver(d.driverId)
                  } else {
                    setSelectedDriver(d.driverId)
                    setCompareDriver(null)
                  }
                }}
              />
            )
          })}
        </div>
        {selectedDriver && (
          <p className="text-xs text-gray-500 mt-2">
            Click another driver to compare · Click selected driver to deselect
          </p>
        )}
      </motion.div>

      {/* Driver detail */}
      <AnimatePresence>
        {selectedDriver && selectedDriverInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Driver header card */}
            <div className={card} style={cardStyle}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">
                    Driver profile
                  </p>
                  <h2 className="text-2xl font-black mt-1">
                    {selectedDriverInfo.givenName}{' '}
                    <span style={{ color: 'var(--f1-red)' }}>
                      {selectedDriverInfo.familyName}
                    </span>
                  </h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {selectedDriverInfo.nationality} · DOB{' '}
                    {new Date(selectedDriverInfo.dateOfBirth).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                  {standingMap[selectedDriver] && (
                    <p className="text-sm mt-1 font-medium">
                      {standingMap[selectedDriver].Constructors[0]?.name}
                    </p>
                  )}
                </div>
                {standingMap[selectedDriver] && (
                  <div className="text-right">
                    <p className="text-4xl font-black" style={{ color: 'var(--f1-red)' }}>
                      P{standingMap[selectedDriver].position}
                    </p>
                    <p className="text-gray-400 text-sm">2026 championship</p>
                    <p className="text-white font-bold">
                      {standingMap[selectedDriver].points} pts
                    </p>
                  </div>
                )}
              </div>

              {totalCareerStats && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  <StatPill label="Races"   value={totalCareerStats.races} />
                  <StatPill label="Wins"    value={totalCareerStats.wins} />
                  <StatPill label="Podiums" value={totalCareerStats.podiums} />
                  <StatPill label="Points"  value={Math.round(totalCareerStats.points)} />
                </div>
              )}
            </div>

            {/* Career chart */}
            <div className={card} style={cardStyle}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  Career {chartMode === 'points' ? 'points' : 'wins'} per season
                  {compareDriver && compareDriverInfo && (
                    <span className="ml-2 text-white">
                      vs {compareDriverInfo.familyName}
                    </span>
                  )}
                </p>
                <div className="flex gap-2">
                  {(['points', 'wins'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setChartMode(m)}
                      className="text-xs px-3 py-1 rounded-full border transition-colors"
                      style={{
                        backgroundColor: chartMode === m ? 'var(--f1-red)' : 'transparent',
                        borderColor: chartMode === m ? 'var(--f1-red)' : 'var(--f1-border)',
                        color: chartMode === m ? 'white' : '#6b6b6b',
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {career.isLoading && (
                <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
                  Loading career data...
                </div>
              )}

              {mergedCareer.length > 0 && (
                <ResponsiveContainer width="100%" height={260}>
                  {compareDriver ? (
                    <BarChart data={mergedCareer}>
                      <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" />
                      <XAxis dataKey="year" stroke="#6b6b6b"
                        tick={{ fill: '#6b6b6b', fontSize: 11 }} />
                      <YAxis stroke="#6b6b6b"
                        tick={{ fill: '#6b6b6b', fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend wrapperStyle={{ fontSize: '12px', color: '#6b6b6b' }} />
                      <Bar dataKey={selectedDriver!} fill="#e10600" radius={[4,4,0,0]} />
                      <Bar dataKey={compareDriver!}  fill="#ffffff" radius={[4,4,0,0]} />
                    </BarChart>
                  ) : (
                    <LineChart data={mergedCareer}>
                      <CartesianGrid stroke="#2a2a2a" strokeDasharray="3 3" />
                      <XAxis dataKey="year" stroke="#6b6b6b"
                        tick={{ fill: '#6b6b6b', fontSize: 11 }} />
                      <YAxis stroke="#6b6b6b"
                        tick={{ fill: '#6b6b6b', fontSize: 11 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line
                        type="monotone"
                        dataKey={chartMode}
                        stroke="#e10600"
                        strokeWidth={2.5}
                        dot={{ fill: '#e10600', r: 3 }}
                        connectNulls
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              )}
            </div>

            {/* 2026 season results */}
            {results26.data && results26.data.length > 0 && (
              <div className={card} style={cardStyle}>
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                  2026 season results
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-gray-500 border-b"
                        style={{ borderColor: 'var(--f1-border)' }}>
                        <th className="pb-2 pr-4">Round</th>
                        <th className="pb-2 pr-4">Race</th>
                        <th className="pb-2 pr-4">Grid</th>
                        <th className="pb-2 pr-4">Finish</th>
                        <th className="pb-2 pr-4">Points</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results26.data.map((race: any) => {
                        const r = race.Results[0]
                        return (
                          <tr key={race.round} className="border-b"
                            style={{ borderColor: 'var(--f1-border)' }}>
                            <td className="py-2 pr-4 text-gray-400">R{race.round}</td>
                            <td className="py-2 pr-4 font-medium text-xs">{race.raceName}</td>
                            <td className="py-2 pr-4 text-gray-400">{r.grid}</td>
                            <td className="py-2 pr-4 font-bold"
                              style={{ color: ['1','2','3'].includes(r.position) ? 'var(--f1-red)' : 'white' }}>
                              P{r.position}
                            </td>
                            <td className="py-2 pr-4 font-semibold"
                              style={{ color: parseFloat(r.points) > 0 ? 'var(--f1-red)' : 'var(--f1-muted)' }}>
                              {r.points}
                            </td>
                            <td className="py-2 text-xs text-gray-400">{r.status}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

      {!selectedDriver && !drivers.isLoading && (
        <div className="text-center py-12 text-gray-500 text-sm">
          Select a driver above to see their full profile and career stats
        </div>
      )}

    </div>
  )
}