## Verification Email session

// 1. After registration
const sessionId = generateUUID()
await db.query(
'INSERT INTO verification_sessions (id, user_id, email, expires_at) VALUES ($1, $2, $3, NOW() + INTERVAL 15 minutes)',
[sessionId, userId, email]
)

// 2. Set in httpOnly cookie or return to client
res.cookie('verification*session', sessionId, {
httpOnly: true,
maxAge: 15 * 60 \_ 1000 // 15 minutes
})

// 3. Redirect
router.push('/verify-email')

// 4. In /verify-email page (server component)
const sessionId = cookies().get('verification_session')?.value

if (!sessionId) {
redirect('/register')
}

const session = await db.query(
'SELECT email FROM verification_sessions WHERE id = $1 AND expires_at > NOW()',
[sessionId]
)

if (!session.rows[0]) {
redirect('/register') // Expired or invalid
}

// 5. Show page with email
return <VerifyEmailPage email={session.rows[0].email} />

// 6. Resend email endpoint checks the session
POST /api/auth/resend-verification

- Validate verification_session cookie
- Check not expired
- Check email not already verified
- Send email
- Update last_sent_at timestamp
