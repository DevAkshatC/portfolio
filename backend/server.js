import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }))
app.use(express.json())

// Root
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Akshat Portfolio API', version: '1.0.0' })
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Akshat Portfolio API running' })
})

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: 'akshsvt123@gmail.com',
        subject: `[Portfolio] ${subject} — from ${name}`,
        html: `
          <div style="font-family: monospace; background: #000510; color: #e2e8f0; padding: 24px; border-radius: 8px;">
            <h2 style="color: #00d4ff;">New Portfolio Message</h2>
            <p><strong style="color:#00d4ff">From:</strong> ${name} (${email})</p>
            <p><strong style="color:#00d4ff">Subject:</strong> ${subject}</p>
            <hr style="border-color: #00d4ff33;" />
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        `,
      })
    }

    console.log(`Contact form submission from ${name} <${email}>: ${subject}`)
    res.json({ success: true, message: 'Message received!' })
  } catch (err) {
    console.error('Email error:', err.message)
    res.status(500).json({ error: 'Failed to send message' })
  }
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` })
})

app.listen(PORT, () => {
  console.log(`\n  🚀 Portfolio API running at http://localhost:${PORT}`)
  console.log(`  ✓ Health: http://localhost:${PORT}/api/health\n`)
})
