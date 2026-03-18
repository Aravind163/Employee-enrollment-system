import { useState, useRef, useEffect } from 'react'
import { MdSearch, MdSend, MdAttachFile, MdMessage } from 'react-icons/md'
import Layout from '../components/layout/Layout.jsx'

const CONTACTS = [
  { id: 1, name: 'Arlene Cooper',  role: 'Design Lead',          color: '#1976d2', unread: 2,
    messages: [
      { id: 1, from: 'them', text: 'Hey! Can you review the new dashboard mockup?', time: '9:10 AM' },
      { id: 2, from: 'me',   text: 'Sure, sending it over in 10 mins.', time: '9:12 AM' },
      { id: 3, from: 'them', text: 'Great, also the client wants revisions on the login page.', time: '9:15 AM' },
      { id: 4, from: 'me',   text: 'Got it, I will handle that too.', time: '9:16 AM' },
      { id: 5, from: 'them', text: 'Thanks! Let me know when the mockup is ready.', time: '9:20 AM' },
    ]
  },
  { id: 2, name: 'James Wilson',   role: 'Frontend Developer',   color: '#7c3aed', unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'The PR is ready for review.', time: 'Yesterday' },
      { id: 2, from: 'me',   text: 'Will review it by EOD.', time: 'Yesterday' },
      { id: 3, from: 'them', text: 'No rush, take your time!', time: 'Yesterday' },
    ]
  },
  { id: 3, name: 'Sarah Chen',     role: 'HR Manager',           color: '#0891b2', unread: 1,
    messages: [
      { id: 1, from: 'them', text: 'Reminder: Performance reviews start next Monday.', time: 'Mon' },
      { id: 2, from: 'me',   text: 'Thanks for the heads up, I will prepare.', time: 'Mon' },
      { id: 3, from: 'them', text: 'Please submit your self-assessment by Friday.', time: 'Tue' },
    ]
  },
  { id: 4, name: 'Michael Ross',   role: 'Project Manager',      color: '#d97706', unread: 0,
    messages: [
      { id: 1, from: 'me',   text: 'Can we push the deadline by 2 days?', time: 'Mon' },
      { id: 2, from: 'them', text: 'I will check with the client and get back to you.', time: 'Mon' },
      { id: 3, from: 'them', text: 'Client agreed. New deadline is Friday.', time: 'Tue' },
      { id: 4, from: 'me',   text: 'Perfect, thanks Michael!', time: 'Tue' },
    ]
  },
  { id: 5, name: 'Priya Nair',     role: 'Backend Developer',    color: '#059669', unread: 3,
    messages: [
      { id: 1, from: 'them', text: 'The API endpoint is throwing a 500 error.', time: '10:00 AM' },
      { id: 2, from: 'me',   text: 'Can you share the logs?', time: '10:02 AM' },
      { id: 3, from: 'them', text: 'Shared in the slack channel.', time: '10:03 AM' },
      { id: 4, from: 'them', text: 'Also the auth token expires too fast.', time: '10:05 AM' },
      { id: 5, from: 'them', text: 'Can you fix it before the demo?', time: '10:06 AM' },
    ]
  },
  { id: 6, name: 'David Park',     role: 'QA Engineer',          color: '#be185d', unread: 0,
    messages: [
      { id: 1, from: 'them', text: 'Found 3 bugs in the latest build.', time: 'Wed' },
      { id: 2, from: 'me',   text: 'Filed them in Jira, will fix ASAP.', time: 'Wed' },
      { id: 3, from: 'them', text: 'Two are critical, please prioritize.', time: 'Wed' },
    ]
  },
]

const MessagesPage = () => {
  const [activeId, setActiveId] = useState(1)
  const [search, setSearch] = useState('')
  const [msgInputs, setMsgInputs] = useState({})
  const [conversations, setConversations] = useState(CONTACTS)
  const messagesEndRef = useRef(null)

  const filtered = conversations.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.role.toLowerCase().includes(search.toLowerCase())
  )
  const active = conversations.find(c => c.id === activeId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeId, conversations])

  const handleSelect = (id) => {
    setActiveId(id)
    // clear unread
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c))
  }

  const handleSend = () => {
    const text = (msgInputs[activeId] || '').trim()
    if (!text) return
    const newMsg = { id: Date.now(), from: 'me', text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    setConversations(prev => prev.map(c => c.id === activeId ? { ...c, messages: [...c.messages, newMsg] } : c))
    setMsgInputs(prev => ({ ...prev, [activeId]: '' }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">Messages</h1>
      </div>

      <div className="messages-layout">
        {/* Sidebar */}
        <div className="messages-sidebar">
          <div className="messages-sidebar-header">
            <span className="messages-sidebar-title">Conversations</span>
            <span style={{ fontSize: 12, color: '#6b7280' }}>{conversations.reduce((a, c) => a + c.unread, 0)} unread</span>
          </div>
          <div className="messages-search">
            <MdSearch />
            <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="conversation-list">
            {filtered.map(c => {
              const last = c.messages[c.messages.length - 1]
              return (
                <div key={c.id} className={`conversation-item ${c.id === activeId ? 'active' : ''}`} onClick={() => handleSelect(c.id)}>
                  <div className="conv-avatar" style={{ background: c.color }}>
                    {c.name.charAt(0)}
                  </div>
                  <div className="conv-info">
                    <div className="conv-name">{c.name}</div>
                    <div className="conv-preview">{last?.from === 'me' ? 'You: ' : ''}{last?.text}</div>
                  </div>
                  <div className="conv-meta">
                    <span className="conv-time">{last?.time}</span>
                    {c.unread > 0 && <span className="conv-badge">{c.unread}</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Chat */}
        {active ? (
          <div className="chat-area">
            <div className="chat-header">
              <div className="conv-avatar" style={{ background: active.color, width: 38, height: 38, fontSize: 14 }}>
                {active.name.charAt(0)}
              </div>
              <div className="chat-header-info">
                <div className="chat-header-name">{active.name}</div>
                <div className="chat-header-status">● Online</div>
              </div>
            </div>

            <div className="chat-messages">
              <div className="chat-date-divider">Today</div>
              {active.messages.map(msg => (
                <div key={msg.id} className={`message-row ${msg.from === 'me' ? 'sent' : ''}`}>
                  {msg.from !== 'me' && (
                    <div className="msg-avatar" style={{ background: active.color }}>{active.name.charAt(0)}</div>
                  )}
                  <div className={`message-bubble ${msg.from === 'me' ? 'sent' : 'received'}`}>
                    {msg.text}
                    <span className="msg-time">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
              <button className="chat-attach-btn" title="Attach file"><MdAttachFile /></button>
              <input
                className="chat-input"
                placeholder={`Message ${active.name.split(' ')[0]}...`}
                value={msgInputs[activeId] || ''}
                onChange={e => setMsgInputs(prev => ({ ...prev, [activeId]: e.target.value }))}
                onKeyDown={handleKeyDown}
              />
              <button className="chat-send-btn" onClick={handleSend} title="Send"><MdSend /></button>
            </div>
          </div>
        ) : (
          <div className="no-chat-selected">
            <MdMessage />
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default MessagesPage
