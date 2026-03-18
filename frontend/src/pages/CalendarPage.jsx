import { useState } from 'react'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import Layout from '../components/layout/Layout.jsx'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

const generateEvents = (year, month) => ({
  [`${year}-${month}-3`]:  [{ label: 'Team Standup', color: 'event-blue' }],
  [`${year}-${month}-5`]:  [{ label: 'Sprint Review', color: 'event-green' }],
  [`${year}-${month}-7`]:  [{ label: 'Holiday', color: 'event-orange' }],
  [`${year}-${month}-10`]: [{ label: 'HR Meeting', color: 'event-purple' }, { label: 'Lunch 1:1', color: 'event-blue' }],
  [`${year}-${month}-12`]: [{ label: 'Project Demo', color: 'event-green' }],
  [`${year}-${month}-15`]: [{ label: 'Payroll Day', color: 'event-orange' }],
  [`${year}-${month}-17`]: [{ label: 'Board Meeting', color: 'event-red' }],
  [`${year}-${month}-19`]: [{ label: 'Team Lunch', color: 'event-green' }],
  [`${year}-${month}-21`]: [{ label: 'Performance Review', color: 'event-purple' }],
  [`${year}-${month}-24`]: [{ label: 'Sprint Planning', color: 'event-blue' }],
  [`${year}-${month}-26`]: [{ label: 'Code Freeze', color: 'event-red' }],
  [`${year}-${month}-28`]: [{ label: 'Team Outing', color: 'event-orange' }],
})

const CalendarPage = () => {
  const today = new Date()
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() })
  const { year, month } = current

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrev = new Date(year, month, 0).getDate()
  const events = generateEvents(year, month)

  const prevMonth = () => setCurrent(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 })
  const nextMonth = () => setCurrent(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 })
  const goToday = () => setCurrent({ year: today.getFullYear(), month: today.getMonth() })

  const cells = []
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, type: 'prev' })
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, type: 'current' })
  for (let d = 1; d <= 42 - cells.length; d++) cells.push({ day: d, type: 'next' })

  const isToday = (day, type) =>
    type === 'current' && day === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Calendar</h1>
      </div>
      <div className="calendar-wrapper">
        <div className="calendar-header">
          <div className="calendar-nav">
            <button className="calendar-nav-btn" onClick={prevMonth}><MdChevronLeft /></button>
            <div className="calendar-month-title">{MONTHS[month]} {year}</div>
            <button className="calendar-nav-btn" onClick={nextMonth}><MdChevronRight /></button>
          </div>
          <button className="calendar-today-btn" onClick={goToday}>Today</button>
        </div>
        <div className="calendar-grid-header">
          {DAYS.map(d => <div className="calendar-day-name" key={d}>{d}</div>)}
        </div>
        <div className="calendar-grid">
          {cells.map((cell, idx) => {
            const key = `${year}-${month}-${cell.day}`
            const dayEvents = cell.type === 'current' ? (events[key] || []) : []
            return (
              <div key={idx} className={['calendar-cell', cell.type !== 'current' ? 'other-month' : '', isToday(cell.day, cell.type) ? 'today' : ''].join(' ').trim()}>
                <div className="cell-date">{cell.day}</div>
                {dayEvents.slice(0, 2).map((ev, ei) => (
                  <div key={ei} className={`cell-event ${ev.color}`}>{ev.label}</div>
                ))}
                {dayEvents.length > 2 && (
                  <div style={{ fontSize: 11, color: '#6b7280', paddingLeft: 4 }}>+{dayEvents.length - 2} more</div>
                )}
              </div>
            )
          })}
        </div>
        <div className="calendar-legend">
          {[
            { label: 'Meetings', bg: '#1565c0' },
            { label: 'Events', bg: '#2e7d32' },
            { label: 'Holidays', bg: '#e65100' },
            { label: 'HR / Reviews', bg: '#6a1b9a' },
            { label: 'Deadlines', bg: '#b91c1c' },
          ].map(l => (
            <div className="legend-item" key={l.label}>
              <div className="legend-dot" style={{ background: l.bg }} />
              <span>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default CalendarPage
