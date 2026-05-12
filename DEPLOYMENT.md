# ALR LLC Deployment Recommendation

## Best Course of Action

Keep the domain registered at Namecheap, but deploy the full-stack website to a modern app host such as Vercel.

This project uses Next.js with an API route at `/api/consultation`, so it needs a Node-capable runtime. Namecheap cPanel can run Node.js apps on supported hosting plans, but shared hosting is usually a less smooth fit for full-stack Next.js deployments, environment variables, server logs, and future integrations.

## Recommended Setup

1. Deploy this repository to Vercel.
2. In Namecheap DNS, point the domain to Vercel using the records Vercel provides.
3. Keep Namecheap for domain ownership and DNS if the customer already uses it.
4. Add production services as needed:
   - Email delivery for consultation notifications, such as Resend.
   - Database or CRM storage for leads, such as Supabase, Neon, Airtable, or HubSpot.
   - Analytics, such as Vercel Web Analytics or Google Analytics.

## Namecheap-Only Option

If the customer must keep hosting on Namecheap, use a Namecheap plan with cPanel Node.js support and deploy a Node server build. This is possible, but it is more manual and less ideal for a small business that wants easy updates, SSL, logging, previews, and future backend integrations.

## Current Backend

The consultation form posts to `/api/consultation`. Right now the endpoint validates the submission and logs it on the server. Before launch, connect that endpoint to email, CRM, or database storage.
