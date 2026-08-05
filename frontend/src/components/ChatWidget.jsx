import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Truck, Maximize2, Minimize2, FileText } from 'lucide-react'
import QuotationForm from './QuotationForm'

const faqs = [
  'What can you help me with?',
  'What services do you offer?',
  'How do I get a shipping quote?',
  'What is your contact info?',
]

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inlineFormat(line) {
  return escapeHtml(line).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

function renderBlock(lines) {
  const html = []
  let i = 0
  while (i < lines.length) {
    if (/^-\s+/.test(lines[i])) {
      const items = []
      while (i < lines.length && /^-\s+/.test(lines[i])) {
        items.push(`<li>${inlineFormat(lines[i].replace(/^-\s+/, ''))}</li>`)
        i++
      }
      html.push(`<ul class="list-disc pl-4 my-1 space-y-0.5">${items.join('')}</ul>`)
      continue
    }
    if (/^\*\*(.+)\*\*$/.test(lines[i])) {
      html.push(`<div class="font-semibold text-gray-900 mt-2 first:mt-0">${inlineFormat(lines[i])}</div>`)
    } else {
      html.push(`<p class="mb-1 last:mb-0">${inlineFormat(lines[i])}</p>`)
    }
    i++
  }
  return html.join('')
}

function formatMessage(text) {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((block) => renderBlock(block.split('\n').map((l) => l.trim()).filter(Boolean)))
    .join('<div class="h-2"></div>')
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 0, role: 'assistant', content: 'Hello! How can I help you with your logistics needs today?' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [animated, setAnimated] = useState(true)
  const [wide, setWide] = useState(false)
  const bottomRef = useRef(null)
  const nextId = useRef(1)

  function handleToggle() {
    setOpen((v) => !v)
    setAnimated(false)
  }

  const sessionId = useRef('session-' + Math.random().toString(36).slice(2))

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function send(text) {
    if (!text.trim() || loading) return
    const userMsg = { id: nextId.current++, role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId.current, message: text }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { id: nextId.current++, role: 'assistant', content: data.reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: 'assistant', content: 'Sorry, something went wrong. Please try again or call +855 88 983 9999.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    send(input)
  }

  function handleFaq(q) {
    send(q)
  }

  function handleShowForm() {
    setMessages((prev) => [...prev, { id: nextId.current++, role: 'form' }])
  }

  function handleFormSubmitted(formId, quotationId) {
    setMessages((prev) => prev.map((m) => (
      m.id === formId
        ? {
            id: formId,
            role: 'assistant',
            content: `Thanks! Your quotation request has been submitted (**Quotation ID: ${quotationId}**). Our team will follow up shortly — for urgent quotation follow-ups you can also reach us directly at **+855 93 688 688** or **ceo@camfreight.com**.`,
          }
        : m
    )))
  }

  return (
    <>
      {open && (
        <div className={`fixed bottom-20 right-4 sm:right-6 bg-white rounded-2xl shadow-2xl border z-50 flex flex-col transition-all duration-300 ${
            wide ? 'w-[90vw] sm:w-[800px] max-h-[85vh]' : 'w-96 sm:w-[450px] max-h-[650px]'
          }`}>
          <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 rounded-xl p-2">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <span className="font-semibold">Cam Freight AI</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="h-2 w-2 bg-green-400 rounded-full" />
                  <span className="text-xs text-blue-200">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setWide(!wide)} className="hover:bg-white/10 rounded-lg p-1.5 transition" title={wide ? 'Shrink' : 'Expand'}>
                {wide ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </button>
              <button onClick={() => setOpen(false)} className="hover:bg-white/10 rounded-lg p-1.5 transition">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className={`flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50/50 ${
            wide ? 'min-h-[60vh] max-h-[65vh]' : 'min-h-[400px] max-h-[460px]'
          }`}>
            {messages.map((m) => (
              m.role === 'form' ? (
                <div key={m.id} className="w-full">
                  <QuotationForm
                    sessionId={sessionId.current}
                    onSubmitted={(quotationId) => handleFormSubmitted(m.id, quotationId)}
                  />
                </div>
              ) : (
                <div
                  key={m.id}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-md'
                    }`}
                  >
                    <span dangerouslySetInnerHTML={{ __html: formatMessage(m.content) }} />
                  </div>
                </div>
              )
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm border border-gray-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                  <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="px-4 pb-2 pt-1 bg-gray-50/50 border-t">
            <button
              onClick={handleShowForm}
              disabled={loading}
              className="w-full mb-2 inline-flex items-center justify-center gap-1.5 text-xs font-semibold bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-500 transition disabled:opacity-50"
            >
              <FileText className="h-3.5 w-3.5" /> Request a Quote (fill out form)
            </button>
            <p className="text-xs text-gray-400 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto pr-1">
              {faqs.map((q) => (
                <button
                  key={q}
                  onClick={() => handleFaq(q)}
                  disabled={loading}
                  className="text-xs bg-white border border-gray-200 text-gray-600 rounded-full px-3 py-1.5 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t p-4 bg-white rounded-b-2xl">
            <div className="flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border-0 bg-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-500 disabled:opacity-50 transition shadow-sm"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {animated && !open ? (
        <div className="fixed bottom-4 z-50 pointer-events-none" style={{ left: 0, right: 0 }}>
          <div className="relative h-14 animate-drive-in">
            <div className="absolute bottom-12" style={{ left: 'calc(100vw - 5rem)' }}>
              <div className="w-3 h-3 bg-gray-300/60 rounded-full blur-sm animate-smoke" style={{ position: 'absolute', bottom: '0', left: '0' }} />
              <div className="w-4 h-4 bg-gray-400/40 rounded-full blur-sm animate-smoke" style={{ position: 'absolute', bottom: '0', left: '-10px', animationDelay: '0.3s' }} />
              <div className="w-2.5 h-2.5 bg-gray-300/50 rounded-full blur-sm animate-smoke" style={{ position: 'absolute', bottom: '0', left: '-20px', animationDelay: '0.6s' }} />
              <div className="w-3.5 h-3.5 bg-gray-400/30 rounded-full blur-sm animate-smoke" style={{ position: 'absolute', bottom: '0', left: '-30px', animationDelay: '0.9s' }} />
            </div>
            <div className="absolute animate-pop-in" style={{ right: '1rem', bottom: '5rem', animationDelay: '5.5s' }}>
              <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 px-4 py-3 text-sm text-gray-700 max-w-[200px] pointer-events-auto">
                <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white border-r border-b border-gray-100 rotate-45" />
                <p className="leading-snug">Hello! Want to ask something? &#128666;</p>
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="absolute bottom-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all pointer-events-auto"
              style={{ right: '1rem' }}
            >
              <Truck className="h-6 w-6" />
            </button>
          </div>
        </div>
      ) : !open ? (
        <>
          <button
            onClick={handleToggle}
            className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all z-50"
          >
            <Truck className="h-6 w-6" />
          </button>
        </>
      ) : (
        <button
          onClick={handleToggle}
          className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all z-50"
        >
          <X className="h-6 w-6" />
        </button>
      )}
    </>
  )
}
